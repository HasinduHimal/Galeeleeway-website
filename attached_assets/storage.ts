import { users, contactSubmissions, type User, type InsertUser, type InsertContact, type Contact } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Client } from "@neondatabase/serverless";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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

// For now, we'll use the MemStorage implementation
// In a production environment, we would use PgStorage
// But for development, we'll use MemStorage to avoid WebSocket issues

const storage = new MemStorage();
console.log("Using in-memory storage for development");

export { storage };
