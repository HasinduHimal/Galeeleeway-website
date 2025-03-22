import { users, contactSubmissions, type User, type InsertUser, type InsertContact, type Contact } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Client } from "@neondatabase/serverless";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Set up JWT secret for token generation
const JWT_SECRET = process.env.JWT_SECRET || "galeeleeway_secret_key";

// Set up email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hasinduhimal@gmail.com",
    pass: process.env.EMAIL_PASSWORD // This will be requested from the user
  }
});

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Password reset methods
  createPasswordResetToken(email: string): Promise<string | null>;
  validateResetToken(token: string): Promise<User | null>;
  resetPassword(token: string, newPassword: string): Promise<boolean>;
  
  // Contact form methods
  createContactSubmission(contact: InsertContact): Promise<Contact>;
  getContactSubmission(id: number): Promise<Contact | undefined>;
  getAllContactSubmissions(): Promise<Contact[]>;
}

// PostgreSQL Storage Implementation
export class PgStorage implements IStorage {
  private db;

  constructor() {
    const client = new Client(process.env.DATABASE_URL);
    // Connect to database without awaiting
    client.connect();
    this.db = drizzle(client);
    console.log("Connected to PostgreSQL database");
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where({ id }).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where({ username }).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Contact form methods
  async createContactSubmission(contact: InsertContact): Promise<Contact> {
    const result = await this.db.insert(contactSubmissions).values(contact).returning();
    console.log(`New contact submission stored with ID: ${result[0].id}`);
    return result[0];
  }
  
  async getContactSubmission(id: number): Promise<Contact | undefined> {
    const result = await this.db.select().from(contactSubmissions).where({ id }).limit(1);
    return result[0];
  }
  
  async getAllContactSubmissions(): Promise<Contact[]> {
    return await this.db.select().from(contactSubmissions).orderBy(contactSubmissions.submittedAt);
  }
}

// Memory Storage Implementation (Fallback)
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, Contact>;
  private userCurrentId: number;
  private contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    
    // Add admin user for testing if it doesn't exist
    this.createUser({
      username: "admin",
      password: "admin123",
      email: "hasinduhimal@gmail.com"
    }).catch(err => console.error("Error creating admin user:", err));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { 
      ...insertUser, 
      id,
      email: insertUser.email || null,
      resetToken: null,
      resetTokenExpiry: null
    };
    this.users.set(id, user);
    return user;
  }
  
  async createPasswordResetToken(email: string): Promise<string | null> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      return null;
    }
    
    // Create a random token
    const resetToken = randomBytes(32).toString('hex');
    
    // Set expiry to 1 hour from now
    const resetTokenExpiry = new Date(Date.now() + 3600000);
    
    // Update user with reset token
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    
    // Store updated user
    this.users.set(user.id, user);
    
    // Generate a JWT token that includes the reset token
    const token = jwt.sign({ resetToken }, JWT_SECRET, { expiresIn: '1h' });
    
    try {
      // Send email with reset link
      const resetUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/reset-password?token=${token}`;
      
      await transporter.sendMail({
        from: 'hasinduhimal@gmail.com',
        to: email,
        subject: 'Password Reset - Galeeleeway Educational Institute',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6;">Password Reset Request</h2>
            <p>You requested a password reset for your Galeeleeway Educational Institute admin account.</p>
            <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
            <div style="margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                 Reset Password
              </a>
            </div>
            <p>If you didn't request this password reset, please ignore this email or contact support.</p>
            <p>Thank you,<br>Galeeleeway Educational Institute Team</p>
          </div>
        `
      });
      
      return token;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return null;
    }
  }
  
  async validateResetToken(token: string): Promise<User | null> {
    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, JWT_SECRET) as { resetToken: string };
      const resetToken = decoded.resetToken;
      
      // Find user with this reset token
      const user = Array.from(this.users.values()).find(user => 
        user.resetToken === resetToken && 
        user.resetTokenExpiry && 
        user.resetTokenExpiry > new Date()
      );
      
      return user || null;
    } catch (error) {
      console.error('Error validating reset token:', error);
      return null;
    }
  }
  
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const user = await this.validateResetToken(token);
    if (!user) {
      return false;
    }
    
    // Update password and clear reset token
    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    
    // Store updated user
    this.users.set(user.id, user);
    
    return true;
  }
  
  // Contact form methods
  async createContactSubmission(contact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const now = new Date();
    
    // Create a properly typed Contact object
    const submission: Contact = { 
      id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone ?? null, // Ensure phone is never undefined
      subject: contact.subject,
      message: contact.message,
      submittedAt: now
    };
    this.contactSubmissions.set(id, submission);
    console.log(`New contact submission stored with ID: ${id}`);
    return submission;
  }
  
  async getContactSubmission(id: number): Promise<Contact | undefined> {
    return this.contactSubmissions.get(id);
  }
  
  async getAllContactSubmissions(): Promise<Contact[]> {
    return Array.from(this.contactSubmissions.values())
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }
}

// For simplicity, we'll use the MemStorage implementation
const storage = new MemStorage();
console.log("Using in-memory storage for development");

export { storage };
