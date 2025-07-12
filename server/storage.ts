import { teachers, type Teacher, type InsertTeacher, type UpdateTeacher } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private teachers: Map<number, Teacher>;
  currentId: number;
  currentTeacherId: number;

  constructor() {
    this.users = new Map();
    this.teachers = new Map();
    this.currentId = 1;
    this.currentTeacherId = 1;
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleTeachers: Omit<Teacher, 'id'>[] = [
      {
        employeeId: "TCH001",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.j@school.edu",
        phone: "+1 (555) 123-4567",
        department: "Mathematics",
        subjects: ["Algebra", "Calculus"],
        experience: 8,
        hireDate: "2016-08-15",
        status: "active",
        avatar: null,
      },
      {
        employeeId: "TCH002",
        firstName: "Michael",
        lastName: "Chen",
        email: "m.chen@school.edu",
        phone: "+1 (555) 234-5678",
        department: "Science",
        subjects: ["Physics", "Chemistry"],
        experience: 5,
        hireDate: "2019-01-10",
        status: "on_leave",
        avatar: null,
      },
      {
        employeeId: "TCH003",
        firstName: "David",
        lastName: "Wilson",
        email: "d.wilson@school.edu",
        phone: "+1 (555) 345-6789",
        department: "English",
        subjects: ["Literature", "Writing"],
        experience: 15,
        hireDate: "2009-09-01",
        status: "active",
        avatar: null,
      },
    ];

    sampleTeachers.forEach(teacher => {
      const id = this.currentTeacherId++;
      this.teachers.set(id, { ...teacher, id });
    });
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentId++;
    const user: any = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return Array.from(this.teachers.values());
  }

  async getTeacher(id: number): Promise<Teacher | undefined> {
    return this.teachers.get(id);
  }

  async getTeacherByEmployeeId(employeeId: string): Promise<Teacher | undefined> {
    return Array.from(this.teachers.values()).find(
      (teacher) => teacher.employeeId === employeeId,
    );
  }

  async createTeacher(insertTeacher: InsertTeacher): Promise<Teacher> {
    const id = this.currentTeacherId++;
    const teacher: Teacher = { ...insertTeacher, id };
    this.teachers.set(id, teacher);
    return teacher;
  }

  async updateTeacher(id: number, updateData: Partial<UpdateTeacher>): Promise<Teacher | undefined> {
    const teacher = this.teachers.get(id);
    if (!teacher) return undefined;
    
    const updatedTeacher = { ...teacher, ...updateData };
    this.teachers.set(id, updatedTeacher);
    return updatedTeacher;
  }

  async deleteTeacher(id: number): Promise<boolean> {
    return this.teachers.delete(id);
  }

  async searchTeachers(query: string, department?: string, status?: string): Promise<Teacher[]> {
    let teachers = Array.from(this.teachers.values());
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      teachers = teachers.filter(teacher => 
        teacher.firstName.toLowerCase().includes(lowerQuery) ||
        teacher.lastName.toLowerCase().includes(lowerQuery) ||
        teacher.email.toLowerCase().includes(lowerQuery) ||
        teacher.employeeId.toLowerCase().includes(lowerQuery) ||
        teacher.subjects.some(subject => subject.toLowerCase().includes(lowerQuery))
      );
    }
    
    if (department && department !== "all") {
      teachers = teachers.filter(teacher => teacher.department === department);
    }
    
    if (status && status !== "all") {
      teachers = teachers.filter(teacher => teacher.status === status);
    }
    
    return teachers;
  }

  async getTeacherStats(): Promise<{
    totalTeachers: number;
    activeTeachers: number;
    onLeave: number;
    departments: number;
  }> {
    const teachers = Array.from(this.teachers.values());
    const departments = new Set(teachers.map(t => t.department));
    
    return {
      totalTeachers: teachers.length,
      activeTeachers: teachers.filter(t => t.status === "active").length,
      onLeave: teachers.filter(t => t.status === "on_leave").length,
      departments: departments.size,
    };
  }
}

export const storage = new MemStorage();
