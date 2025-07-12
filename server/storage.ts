import { teachers, type Teacher, type InsertTeacher, type UpdateTeacher } from "@shared/schema";
import { db } from "./db";
import { eq, like, or, and, count, countDistinct } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<Teacher | undefined>;
  getUserByUsername(username: string): Promise<Teacher | undefined>;
  createUser(user: any): Promise<Teacher>;
  
  // Teacher methods
  getAllTeachers(): Promise<Teacher[]>;
  getTeacher(id: number): Promise<Teacher | undefined>;
  getTeacherByEmployeeId(employeeId: string): Promise<Teacher | undefined>;
  createTeacher(teacher: InsertTeacher): Promise<Teacher>;
  updateTeacher(id: number, teacher: Partial<UpdateTeacher>): Promise<Teacher | undefined>;
  deleteTeacher(id: number): Promise<boolean>;
  searchTeachers(query: string, department?: string, status?: string): Promise<Teacher[]>;
  getTeacherStats(): Promise<{
    totalTeachers: number;
    activeTeachers: number;
    onLeave: number;
    departments: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<Teacher | undefined> {
    const [user] = await db.select().from(teachers).where(eq(teachers.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<Teacher | undefined> {
    const [user] = await db.select().from(teachers).where(eq(teachers.email, username));
    return user || undefined;
  }

  async createUser(insertUser: any): Promise<Teacher> {
    const [user] = await db.insert(teachers).values(insertUser).returning();
    return user;
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return await db.select().from(teachers);
  }

  async getTeacher(id: number): Promise<Teacher | undefined> {
    const [teacher] = await db.select().from(teachers).where(eq(teachers.id, id));
    return teacher || undefined;
  }

  async getTeacherByEmployeeId(employeeId: string): Promise<Teacher | undefined> {
    const [teacher] = await db.select().from(teachers).where(eq(teachers.employeeId, employeeId));
    return teacher || undefined;
  }

  async createTeacher(insertTeacher: InsertTeacher): Promise<Teacher> {
    const [teacher] = await db.insert(teachers).values(insertTeacher).returning();
    return teacher;
  }

  async updateTeacher(id: number, updateData: Partial<UpdateTeacher>): Promise<Teacher | undefined> {
    const [teacher] = await db.update(teachers)
      .set(updateData)
      .where(eq(teachers.id, id))
      .returning();
    return teacher || undefined;
  }

  async deleteTeacher(id: number): Promise<boolean> {
    const result = await db.delete(teachers).where(eq(teachers.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async searchTeachers(query: string, department?: string, status?: string): Promise<Teacher[]> {
    let conditions = [];
    
    if (query.trim()) {
      const lowerQuery = `%${query.toLowerCase()}%`;
      conditions.push(
        or(
          like(teachers.firstName, lowerQuery),
          like(teachers.lastName, lowerQuery),
          like(teachers.email, lowerQuery),
          like(teachers.employeeId, lowerQuery)
        )
      );
    }
    
    if (department && department !== "all") {
      conditions.push(eq(teachers.department, department));
    }
    
    if (status && status !== "all") {
      conditions.push(eq(teachers.status, status));
    }
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    
    return await db.select().from(teachers).where(whereClause);
  }

  async getTeacherStats(): Promise<{
    totalTeachers: number;
    activeTeachers: number;
    onLeave: number;
    departments: number;
  }> {
    const [totalResult] = await db.select({ count: count() }).from(teachers);
    const [activeResult] = await db.select({ count: count() }).from(teachers).where(eq(teachers.status, "active"));
    const [onLeaveResult] = await db.select({ count: count() }).from(teachers).where(eq(teachers.status, "on_leave"));
    const [departmentsResult] = await db.select({ count: countDistinct(teachers.department) }).from(teachers);
    
    return {
      totalTeachers: totalResult.count,
      activeTeachers: activeResult.count,
      onLeave: onLeaveResult.count,
      departments: departmentsResult.count,
    };
  }
}

export const storage = new DatabaseStorage();