import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema, insertContactMessageSchema } from "@shared/schema";
import { generateAIResponse } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get portfolio data
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getDocuments();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  // Chat functionality
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      
      // Generate AI response
      const aiResponse = await generateAIResponse(validatedData.message);
      
      // Store the chat message
      const chatMessage = await storage.createChatMessage({
        message: validatedData.message,
        response: aiResponse
      });
      
      res.json({
        message: validatedData.message,
        response: aiResponse,
        timestamp: chatMessage.createdAt
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        message: "Failed to process chat message",
        response: "I'm sorry, I'm having trouble processing your request right now. Please try again later."
      });
    }
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      const contactMessage = await storage.createContactMessage(validatedData);
      
      res.json({ 
        message: "Message sent successfully",
        id: contactMessage.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Document preview/download
  app.get("/api/documents/:id/preview", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      res.json({
        title: document.title,
        type: document.type,
        description: document.description,
        previewUrl: document.previewUrl
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch document preview" });
    }
  });

  app.get("/api/documents/:id/download", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      res.json({
        title: document.title,
        filePath: document.filePath,
        downloadUrl: `/downloads${document.filePath}`
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to process download" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
