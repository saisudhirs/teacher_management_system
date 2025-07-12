import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  employeeId: text("employee_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  department: text("department").notNull(),
  subjects: text("subjects").array().notNull(),
  experience: integer("experience").notNull(),
  hireDate: text("hire_date").notNull(),
  status: text("status").notNull().default("active"), // active, on_leave, inactive
  avatar: text("avatar"),
});

export const insertTeacherSchema = createInsertSchema(teachers).omit({
  id: true,
}).extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  department: z.string().min(1, "Department is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  experience: z.number().min(0, "Experience must be 0 or greater"),
  hireDate: z.string().min(1, "Hire date is required"),
  status: z.enum(["active", "on_leave", "inactive"]).default("active"),
  employeeId: z.string().min(1, "Employee ID is required"),
});

export const updateTeacherSchema = insertTeacherSchema.partial().extend({
  id: z.number(),
});

export type InsertTeacher = z.infer<typeof insertTeacherSchema>;
export type UpdateTeacher = z.infer<typeof updateTeacherSchema>;
export type Teacher = typeof teachers.$inferSelect;
