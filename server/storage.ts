import { IStorage } from "./storage/types";
import createMemoryStore from "memorystore";
import session from "express-session";
import { User, Profile, InsertUser, InsertProfile } from "@shared/schema";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private profiles: Map<number, Profile>;
  private currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...userData,
      id,
      created_at: new Date(),
      last_login: null
    };
    this.users.set(id, user);
    return user;
  }

  async getProfile(userId: number): Promise<Profile | undefined> {
    return this.profiles.get(userId);
  }

  async updateProfile(userId: number, data: Partial<InsertProfile>): Promise<Profile> {
    const existing = this.profiles.get(userId);
    const profile: Profile = {
      ...(existing || {}),
      ...data,
      id: existing?.id || this.currentId++,
      user_id: userId
    } as Profile;
    this.profiles.set(userId, profile);
    return profile;
  }
}

export const storage = new MemStorage();