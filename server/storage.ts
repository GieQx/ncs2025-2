import { 
  users, type User, type InsertUser,
  registrations, type Registration, type InsertRegistration,
  subscribers, type Subscriber, type InsertSubscriber
} from "@shared/schema";

// modified interface with additional CRUD methods

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Registration methods
  getRegistration(id: number): Promise<Registration | undefined>;
  getRegistrationByEmail(email: string): Promise<Registration | undefined>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  
  // Subscriber methods
  getSubscriber(id: number): Promise<Subscriber | undefined>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private registrations: Map<number, Registration>;
  private subscribers: Map<number, Subscriber>;
  
  private userIdCounter: number;
  private registrationIdCounter: number;
  private subscriberIdCounter: number;

  constructor() {
    this.users = new Map();
    this.registrations = new Map();
    this.subscribers = new Map();
    
    this.userIdCounter = 1;
    this.registrationIdCounter = 1;
    this.subscriberIdCounter = 1;
  }

  // User methods
  
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Registration methods
  
  async getRegistration(id: number): Promise<Registration | undefined> {
    return this.registrations.get(id);
  }
  
  async getRegistrationByEmail(email: string): Promise<Registration | undefined> {
    return Array.from(this.registrations.values()).find(
      (registration) => registration.email === email,
    );
  }
  
  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const id = this.registrationIdCounter++;
    const registration: Registration = {
      ...insertRegistration,
      id,
      createdAt: new Date()
    };
    this.registrations.set(id, registration);
    return registration;
  }
  
  // Subscriber methods
  
  async getSubscriber(id: number): Promise<Subscriber | undefined> {
    return this.subscribers.get(id);
  }
  
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
  
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberIdCounter++;
    const subscriber: Subscriber = {
      ...insertSubscriber,
      id,
      isActive: true,
      createdAt: new Date()
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
}

export const storage = new MemStorage();
