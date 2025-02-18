import { User, Profile, InsertUser, InsertProfile } from "@shared/schema";
import { Store } from "express-session";

export interface IStorage {
  sessionStore: Store;
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: InsertUser): Promise<User>;
  getProfile(userId: number): Promise<Profile | undefined>;
  updateProfile(userId: number, data: Partial<InsertProfile>): Promise<Profile>;
}
