import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema, insertSubscriberSchema } from "@shared/schema";
import { chatService } from "./services/chatService";
import { googleCalendarService } from "./services/googleCalendarService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required and must be a string" });
      }
      
      const response = await chatService.getChatResponse(message);
      return res.json(response); // Returns {reply: string, sources?: Source[]}
    } catch (error) {
      console.error("Error in chat endpoint:", error);
      return res.status(500).json({ error: "Failed to get chat response" });
    }
  });

  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const validationResult = insertRegistrationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid registration data", 
          details: validationResult.error.format() 
        });
      }
      
      const registrationData = validationResult.data;
      const registration = await storage.createRegistration(registrationData);
      
      return res.status(201).json({ 
        message: "Registration successful",
        registration 
      });
    } catch (error) {
      console.error("Error in registration endpoint:", error);
      return res.status(500).json({ error: "Failed to process registration" });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validationResult = insertSubscriberSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid subscription data", 
          details: validationResult.error.format() 
        });
      }
      
      const subscriberData = validationResult.data;
      const subscriber = await storage.createSubscriber(subscriberData);
      
      return res.status(201).json({ 
        message: "Subscription successful",
        subscriber 
      });
    } catch (error) {
      console.error("Error in subscription endpoint:", error);
      return res.status(500).json({ error: "Failed to process subscription" });
    }
  });

  // Google Calendar integration endpoint
  app.get("/api/calendar/auth", (req, res) => {
    const authUrl = googleCalendarService.getAuthUrl();
    res.redirect(authUrl);
  });

  app.get("/api/calendar/callback", async (req, res) => {
    const { code } = req.query;
    
    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Authorization code is required" });
    }
    
    try {
      await googleCalendarService.handleAuthCallback(code);
      return res.redirect("/calendar-success");
    } catch (error) {
      console.error("Error in Google Calendar callback:", error);
      return res.status(500).json({ error: "Failed to authenticate with Google Calendar" });
    }
  });

  app.post("/api/calendar/add", async (req, res) => {
    try {
      const { title, description, location, startDateTime, endDateTime } = req.body;
      
      if (!title || !startDateTime || !endDateTime) {
        return res.status(400).json({ error: "Missing required event details" });
      }
      
      const eventResult = await googleCalendarService.addEvent({
        title,
        description: description || "",
        location: location || "",
        startDateTime,
        endDateTime
      });
      
      return res.json({ 
        message: "Event added to calendar",
        event: eventResult 
      });
    } catch (error) {
      console.error("Error adding event to calendar:", error);
      return res.status(500).json({ error: "Failed to add event to calendar" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
