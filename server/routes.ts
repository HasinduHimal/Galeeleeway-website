import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactFormSchema, passwordResetRequestSchema, passwordResetSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate input data
      const validatedData = insertContactFormSchema.parse(req.body);
      
      // Store form submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // Return success response
      res.status(201).json({
        message: "Contact form submitted successfully",
        id: submission.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details
        });
      } else {
        console.error("Error processing contact form:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.status(200).json(submissions);
    } catch (error) {
      console.error("Error retrieving contact submissions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Password reset request endpoint
  app.post("/api/reset-password/request", async (req, res) => {
    try {
      // Validate input data
      const validatedData = passwordResetRequestSchema.parse(req.body);
      
      // Create reset token and send email
      const token = await storage.createPasswordResetToken(validatedData.email);
      
      if (!token) {
        // Don't reveal if email exists for security reasons
        return res.status(200).json({ 
          message: "If your email exists in our system, you will receive a password reset link."
        });
      }
      
      // Success - email was sent
      res.status(200).json({ 
        message: "Password reset email sent successfully"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details
        });
      } else {
        console.error("Error processing password reset request:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  // Password reset completion endpoint
  app.post("/api/reset-password/reset", async (req, res) => {
    try {
      // Validate input data
      const validatedData = passwordResetSchema.parse(req.body);
      
      // Reset the password
      const success = await storage.resetPassword(validatedData.token, validatedData.password);
      
      if (!success) {
        return res.status(400).json({
          message: "Invalid or expired reset token"
        });
      }
      
      res.status(200).json({
        message: "Password reset successfully"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details
        });
      } else {
        console.error("Error processing password reset:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  // Validate token (for frontend to check if token is valid before showing reset form)
  app.get("/api/reset-password/validate", async (req, res) => {
    try {
      const token = req.query.token as string;
      
      if (!token) {
        return res.status(400).json({ message: "Token is required" });
      }
      
      const user = await storage.validateResetToken(token);
      
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      
      res.status(200).json({ message: "Token is valid" });
    } catch (error) {
      console.error("Error validating token:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
