import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["worker", "hr_admin"] }).notNull().default("worker"),
  created_at: timestamp("created_at").defaultNow(),
  last_login: timestamp("last_login")
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  user_id: serial("user_id").references(() => users.id),
  full_name: text("full_name"),
  department: text("department"),
  position: text("position"),
  phone: text("phone"),
  address: text("address"),
  status: text("status", { enum: ["active", "inactive", "on_leave"] }).default("active"),
  avatar_url: text("avatar_url"),
  tax_id: text("tax_id"),
  bank_account: text("bank_account")
});

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  manager_id: serial("manager_id").references(() => users.id),
  created_at: timestamp("created_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  role: true
});

export const insertProfileSchema = createInsertSchema(profiles).pick({
  full_name: true,
  department: true,
  position: true,
  phone: true,
  address: true,
  status: true
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Department = typeof departments.$inferSelect;
