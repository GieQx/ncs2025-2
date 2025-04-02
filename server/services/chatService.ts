import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM polyfills for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the structure for a source in RAG results
type Source = {
  title: string;
  url?: string;
  snippet: string;
};

// Define the response structure for the chat service
type ChatResponse = {
  reply: string;
  sources?: Source[];
};

// Chat service implementation with OpenAI integration
class ChatService {
  private openai: OpenAI;
  private systemPrompt: string;
  private knowledgeBase: Map<string, string>;
  private knowledgeBasePath: string;
  private eventInfo: string;

  constructor() {
    // Initialize OpenAI client
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // Initialize knowledge base
    this.knowledgeBase = new Map<string, string>();
    this.knowledgeBasePath = path.join(__dirname, '../../knowledge_base');
    
    // Create knowledge base directory if it doesn't exist
    this.createKnowledgeBaseDir();
    
    // Load knowledge base files
    this.loadKnowledgeBase();
    
    // Event information for the base context
    this.eventInfo = `
    The National Convention on Statistics 2025:
    - Dates: September 15-17, 2025
    - Location: National Convention Center, 123 Statistical Avenue, Data City
    - Website: https://ncs2025.org
    - Registration options: 
      * Early Bird: $599 (20% off) until July 31, 2025
      * Student: $299 (requires student ID)
      * Regular: $749
      * Group discounts for 5+ attendees from the same organization
    
    The convention features keynote speeches, workshops, panel discussions, and resources 
    for statistics professionals across academia, government, and industry sectors.
    Registration can be completed on the external website only.
    
    Keynote speakers include:
    - Dr. Rebecca Chen, Chief Data Scientist at National Statistics Office
    - Prof. Michael Johnson, Director at Institute for Advanced Analytics
    - Dr. Sarah Patel, Lead Statistician at World Health Organization
    - Alex Rodriguez, PhD, Director of Data Science at TechStat Inc.
    - Dr. Mei Zhang, Professor of Statistical Science at Global University
    - Dr. James Wilson, Chief Economist at International Statistical Association
    `;
    
    // System prompt to define the assistant's behavior
    this.systemPrompt = `You are StatBot, the helpful AI assistant for the National Convention on Statistics 2025.

    IMPORTANT GUIDELINES:
    1. Be conversational and helpful, but keep responses concise and to the point
    2. Only provide information that is factual and based on the provided context
    3. If asked about something not in the knowledge base, acknowledge that you don't have specific details
    4. Focus on providing accurate information about the convention, speakers, schedule, and registration
    5. Do not make up information that is not provided in the context
    6. For registration, direct users to the official registration page
    7. When information is insufficient, suggest relevant sections of the website to check
    8. Always mention your sources at the end of your responses
    9. Use simple, precise language that is easy to understand

    Here is the event information:
    ${this.eventInfo}
    `;
  }

  /**
   * Create the knowledge base directory if it doesn't exist
   */
  private createKnowledgeBaseDir(): void {
    if (!fs.existsSync(this.knowledgeBasePath)) {
      try {
        fs.mkdirSync(this.knowledgeBasePath, { recursive: true });
        console.log('Created knowledge base directory');
        
        // Create example knowledge base files
        this.createExampleKnowledgeBaseFiles();
      } catch (error) {
        console.error('Error creating knowledge base directory:', error);
      }
    }
  }
  
  /**
   * Create example knowledge base files for demonstration
   */
  private createExampleKnowledgeBaseFiles(): void {
    const speakersInfo = `
    # Speakers at NCS 2025
    
    ## Keynote Speakers
    
    ### Dr. Rebecca Chen
    - Role: Chief Data Scientist, National Statistics Office
    - Topic: "The Future of National Statistics in the Age of AI"
    - Bio: Expert in computational statistics and machine learning applications in public policy with over 15 years of experience.
    - Session: Day 1, 9:30 AM, Main Hall
    
    ### Prof. Michael Johnson
    - Role: Director, Institute for Advanced Analytics
    - Topic: "Climate Change Analysis: Statistical Challenges and Innovations"
    - Bio: Pioneering researcher in statistical modeling for climate data and predictive analytics. Author of "Statistical Methods for Environmental Studies".
    - Session: Day 1, 2:00 PM, Main Hall
    
    ### Dr. Sarah Patel
    - Role: Lead Statistician, World Health Organization
    - Topic: "Global Health Statistics: Methodology and Impact"
    - Bio: Specialist in biostatistics and public health data analysis methodologies with experience spanning 20+ countries.
    - Session: Day 2, 9:30 AM, Main Hall
    
    ### Dr. Mei Zhang
    - Role: Professor of Statistical Science, Global University
    - Topic: "Advancing Statistical Education for the Next Generation"
    - Bio: Award-winning educator and researcher in statistical theory and applications.
    - Session: Day 2, 2:00 PM, Main Hall
    
    ### Alex Rodriguez, PhD
    - Role: Director of Data Science, TechStat Inc.
    - Topic: "Industry Applications of Advanced Statistics"
    - Bio: Industry leader in business intelligence and statistical methods for market analysis.
    - Session: Day 3, 9:30 AM, Main Hall
    
    ### Dr. James Wilson
    - Role: Chief Economist, International Statistical Association
    - Topic: "Economic Forecasting in Uncertain Times"
    - Bio: Expert in econometrics and statistical modeling for economic policy.
    - Session: Day 3, 2:00 PM, Main Hall
    `;
    
    const agendaInfo = `
    # NCS 2025 Agenda
    
    ## Day 1: September 15, 2025
    
    ### Morning Sessions
    - 8:00 AM - 9:00 AM: Registration and Welcome Coffee
    - 9:00 AM - 9:30 AM: Opening Ceremony
    - 9:30 AM - 10:30 AM: Keynote Address by Dr. Rebecca Chen, "The Future of National Statistics in the Age of AI"
    - 10:30 AM - 11:00 AM: Networking Break
    - 11:00 AM - 12:30 PM: Panel Discussion: "Challenges in Official Statistics"
    - 12:30 PM - 1:30 PM: Lunch Break
    
    ### Afternoon Sessions
    - 1:30 PM - 2:00 PM: Lightning Talks
    - 2:00 PM - 3:00 PM: Keynote Address by Prof. Michael Johnson, "Climate Change Analysis: Statistical Challenges and Innovations"
    - 3:00 PM - 3:30 PM: Afternoon Break
    - 3:30 PM - 5:00 PM: Parallel Workshops:
      * Workshop A: "Introduction to Bayesian Methods" (Workshop Room A)
      * Workshop B: "Data Visualization Techniques" (Workshop Room B)
      * Workshop C: "Survey Design Best Practices" (Meeting Room C)
    - 6:00 PM - 8:00 PM: Welcome Reception (Exhibition Hall)
    
    ## Day 2: September 16, 2025
    
    ### Morning Sessions
    - 8:30 AM - 9:00 AM: Morning Coffee
    - 9:00 AM - 9:30 AM: Day 2 Opening Remarks
    - 9:30 AM - 10:30 AM: Keynote Address by Dr. Sarah Patel, "Global Health Statistics: Methodology and Impact"
    - 10:30 AM - 11:00 AM: Networking Break
    - 11:00 AM - 12:30 PM: Panel Discussion: "International Collaboration in Statistics"
    - 12:30 PM - 1:30 PM: Lunch Break
    
    ### Afternoon Sessions
    - 1:30 PM - 2:00 PM: Poster Session
    - 2:00 PM - 3:00 PM: Keynote Address by Dr. Mei Zhang, "Advancing Statistical Education for the Next Generation"
    - 3:00 PM - 3:30 PM: Afternoon Break
    - 3:30 PM - 5:00 PM: Parallel Workshops:
      * Workshop D: "Machine Learning for Statisticians" (Workshop Room A)
      * Workshop E: "Time Series Analysis" (Workshop Room B)
      * Workshop F: "Statistical Programming with R" (Meeting Room C)
    - 7:00 PM - 10:00 PM: Gala Dinner (Grand Ballroom, registration required)
    
    ## Day 3: September 17, 2025
    
    ### Morning Sessions
    - 8:30 AM - 9:00 AM: Morning Coffee
    - 9:00 AM - 9:30 AM: Day 3 Opening Remarks
    - 9:30 AM - 10:30 AM: Keynote Address by Alex Rodriguez, PhD, "Industry Applications of Advanced Statistics"
    - 10:30 AM - 11:00 AM: Networking Break
    - 11:00 AM - 12:30 PM: Panel Discussion: "The Future of Statistical Analysis"
    - 12:30 PM - 1:30 PM: Lunch Break
    
    ### Afternoon Sessions
    - 1:30 PM - 2:00 PM: Innovation Showcase
    - 2:00 PM - 3:00 PM: Keynote Address by Dr. James Wilson, "Economic Forecasting in Uncertain Times"
    - 3:00 PM - 3:30 PM: Afternoon Break
    - 3:30 PM - 4:30 PM: Closing Panel: "Next Steps in Statistical Innovation"
    - 4:30 PM - 5:00 PM: Closing Ceremony and Remarks
    `;
    
    const registrationInfo = `
    # Registration Information for NCS 2025
    
    Registration for the National Convention on Statistics 2025 is handled through our external registration portal at https://example.com/register.
    
    ## Registration Options
    
    ### Early Bird Registration (Until July 31, 2025)
    - Regular: $599 (20% discount)
    - Student: $299 (requires valid student ID)
    - Group (5+ attendees): $549 per person
    
    ### Standard Registration (August 1, 2025 - September 10, 2025)
    - Regular: $749
    - Student: $349 (requires valid student ID)
    - Group (5+ attendees): $699 per person
    
    ### Late Registration (After September 10, 2025)
    - Regular: $849
    - Student: $399 (requires valid student ID)
    - Group (5+ attendees): $799 per person
    
    ## What's Included
    
    All registrations include:
    - Access to all keynote sessions
    - Participation in panel discussions
    - Access to workshops (pre-registration required)
    - Conference materials
    - Coffee breaks and lunches
    - Welcome reception
    
    The Gala Dinner on Day 2 requires separate registration at an additional cost of $99 per person.
    
    ## Registration Process
    
    1. Visit the registration page at https://example.com/register
    2. Select your registration type
    3. Complete your personal and professional information
    4. Select workshops and events you wish to attend
    5. Complete payment
    6. You will receive a confirmation email with your registration details
    
    For any registration questions, please contact registration@ncs2025.org
    `;
    
    const venueInfo = `
    # Venue Information for NCS 2025
    
    ## National Convention Center
    
    Address: 123 Statistical Avenue, Data City
    
    The National Convention Center is a state-of-the-art facility designed to accommodate large-scale conferences and events. The venue features:
    
    - Main Hall (capacity: 2,000)
    - Workshop Room A (capacity: 250)
    - Workshop Room B (capacity: 250)
    - Meeting Room C (capacity: 150)
    - Exhibition Hall (capacity: 1,000)
    - Grand Ballroom (capacity: 800)
    - Multiple breakout rooms and networking spaces
    
    ## Accessibility
    
    The venue is fully accessible for attendees with disabilities, featuring:
    - Wheelchair access throughout the facility
    - Assistive listening systems in all presentation rooms
    - Accessible restrooms on all floors
    - Dedicated parking spaces
    
    ## Transportation
    
    ### By Air
    The closest airport is Data City International Airport (DCI), approximately 20 minutes from the venue.
    
    ### By Public Transportation
    - Metro: Data City Metro Line 2, "Convention Center" station
    - Bus: Routes 15, 27, and 42 stop directly in front of the venue
    
    ### By Car
    Paid parking is available at the venue ($25 per day)
    
    ## Accommodations
    
    ### Official Conference Hotels
    
    1. **Statistics Grand Hotel**
       - 5-star luxury hotel
       - 5-minute walk to the venue
       - Conference rate: $220/night
    
    2. **Data Suites**
       - 4-star business hotel
       - 10-minute walk to the venue
       - Conference rate: $180/night
    
    3. **Analysis Inn**
       - 3-star budget-friendly option
       - 15-minute walk or 5-minute subway ride
       - Conference rate: $120/night
    
    To book at the conference rate, use code NCS2025 when making your reservation.
    
    ## Local Attractions
    
    - Museum of Statistical History (0.5 miles)
    - Data Science Park (1 mile)
    - Central Shopping District (1.5 miles)
    - Probability Gardens (2 miles)
    `;
    
    // Write the files
    fs.writeFileSync(path.join(this.knowledgeBasePath, 'speakers.md'), speakersInfo);
    fs.writeFileSync(path.join(this.knowledgeBasePath, 'agenda.md'), agendaInfo);
    fs.writeFileSync(path.join(this.knowledgeBasePath, 'registration.md'), registrationInfo);
    fs.writeFileSync(path.join(this.knowledgeBasePath, 'venue.md'), venueInfo);
  }

  /**
   * Load knowledge base files
   */
  private loadKnowledgeBase(): void {
    try {
      if (fs.existsSync(this.knowledgeBasePath)) {
        const files = fs.readdirSync(this.knowledgeBasePath);
        files.forEach(file => {
          try {
            const filePath = path.join(this.knowledgeBasePath, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const fileName = path.basename(file, path.extname(file));
            this.knowledgeBase.set(fileName, content);
            console.log(`Loaded knowledge base file: ${file}`);
          } catch (readError) {
            console.error(`Error reading knowledge base file ${file}:`, readError);
          }
        });
      }
    } catch (error) {
      console.error('Error loading knowledge base:', error);
    }
  }

  /**
   * Search the knowledge base for relevant information based on a query
   */
  private async searchKnowledgeBase(query: string): Promise<{sources: Source[], context: string}> {
    const sources: Source[] = [];
    let context = "";
    
    try {
      // Use the embedding model to find relevant documents (simplified approach)
      // In a production environment, this would use embeddings and vector similarity
      // Convert Map.entries() to array to avoid TypeScript downlevelIteration issues
      Array.from(this.knowledgeBase.entries()).forEach(([title, content]) => {
        // Simple keyword matching (a production system would use embeddings)
        if (this.isRelevant(query, content)) {
          const relevantSnippet = this.extractRelevantSnippet(query, content);
          context += `\n\nInformation from ${title}:\n${relevantSnippet}`;
          
          // Add to sources
          sources.push({
            title: this.formatTitle(title),
            url: `#${title.toLowerCase()}`,
            snippet: this.truncateSnippet(relevantSnippet)
          });
        }
      });
    } catch (error) {
      console.error('Error searching knowledge base:', error);
    }
    
    return { sources, context };
  }
  
  /**
   * Format the title for display
   */
  private formatTitle(title: string): string {
    return title
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  /**
   * Check if a document is relevant to the query (simplified)
   */
  private isRelevant(query: string, content: string): boolean {
    const queryTerms = query.toLowerCase().split(/\s+/);
    const contentLower = content.toLowerCase();
    
    // Document is relevant if it contains multiple query terms
    return queryTerms.filter(term => term.length > 3 && contentLower.includes(term)).length > 0;
  }
  
  /**
   * Extract a relevant snippet from the content
   */
  private extractRelevantSnippet(query: string, content: string): string {
    const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 3);
    const lines = content.split('\n');
    let relevantLines: string[] = [];
    
    // Find lines that contain query terms
    lines.forEach(line => {
      const lineLower = line.toLowerCase();
      if (queryTerms.some(term => lineLower.includes(term))) {
        relevantLines.push(line);
      }
    });
    
    // If no specific lines match, return the beginning of the document
    if (relevantLines.length === 0) {
      relevantLines = lines.slice(0, 10);
    }
    
    return relevantLines.join('\n');
  }
  
  /**
   * Truncate a snippet to a reasonable length
   */
  private truncateSnippet(snippet: string): string {
    return snippet.length > 200 ? snippet.slice(0, 200) + '...' : snippet;
  }

  /**
   * Get an AI-powered response for a chat message using RAG
   */
  async getChatResponse(message: string): Promise<ChatResponse> {
    try {
      // Search the knowledge base for relevant information
      const { sources, context } = await this.searchKnowledgeBase(message);
      
      // Create a RAG-enhanced prompt
      const enhancedPrompt = `
      ${this.systemPrompt}
      
      RELEVANT CONTEXT FROM KNOWLEDGE BASE:
      ${context || "No specific information found in the knowledge base."}
      
      USER QUERY: ${message}
      
      Instructions for responding:
      1. Respond to the user's query based on the provided context.
      2. If the knowledge base does not contain relevant information, acknowledge the limits of your knowledge.
      3. Do not include source citations in your response text - the sources will be displayed separately.
      4. Your response should be helpful, concise, and conversational.
      `;
      
      // Call OpenAI API for chat completion with RAG context
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          { role: "system", content: enhancedPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 400
      });
      
      // Extract the response content
      const reply = response.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";
      
      // Return the response with sources if available
      return {
        reply,
        sources: sources.length > 0 ? sources : undefined
      };
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      
      // Fallback response in case of API errors
      return {
        reply: "I'm currently experiencing some technical difficulties. Please try again later or check the website for information about National Convention on Statistics 2025."
      };
    }
  }
}

export const chatService = new ChatService();
