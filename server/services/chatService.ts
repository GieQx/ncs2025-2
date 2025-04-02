import OpenAI from "openai";

// Chat service implementation with OpenAI integration
class ChatService {
  private openai: OpenAI;
  private systemPrompt: string;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // System prompt to define the assistant's behavior
    this.systemPrompt = `You are StatBot, the helpful assistant for the National Convention on Statistics 2025.
    
    The convention details:
    - Dates: September 15-17, 2025
    - Location: National Convention Center, 123 Statistical Avenue, Data City
    - Registration options: 
      * Early Bird: $599 (20% off) until July 31, 2025
      * Student: $299 (requires student ID)
      * Regular: $749
      * Group discounts for 5+ attendees from the same organization
    
    The convention features keynote speeches, workshops, networking events, and resources for statistics professionals.
    
    Be helpful, friendly, and concise. If you're not sure about something, direct users to the website sections or suggest they contact the organizers at info@ncs2025.org.`;
  }

  /**
   * Get an AI-powered response for a chat message
   */
  async getChatResponse(message: string): Promise<string> {
    try {
      // Call OpenAI API for chat completion
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 300
      });
      
      // Extract the response content
      const reply = response.choices[0].message.content;
      return reply || "I'm sorry, I couldn't generate a response. Please try again.";
      
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      
      // Fallback response in case of API errors
      return "I'm currently experiencing some technical difficulties. Please try again later or check the website for information about National Convention on Statistics 2025.";
    }
  }
}

export const chatService = new ChatService();
