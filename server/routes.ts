import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTeacherSchema, updateTeacherSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all teachers with optional filtering
  app.get("/api/teachers", async (req, res) => {
    try {
      const { search, department, status } = req.query;
      const teachers = await storage.searchTeachers(
        search as string || "",
        department as string,
        status as string
      );
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teachers" });
    }
  });

  // Get teacher stats
  app.get("/api/teachers/stats", async (req, res) => {
    try {
      const stats = await storage.getTeacherStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teacher stats" });
    }
  });

  // Get single teacher
  app.get("/api/teachers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid teacher ID" });
      }

      const teacher = await storage.getTeacher(id);
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      res.json(teacher);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teacher" });
    }
  });

  // Create new teacher
  app.post("/api/teachers", async (req, res) => {
    try {
      const validatedData = insertTeacherSchema.parse(req.body);
      
      // Check if employee ID already exists
      const existingTeacher = await storage.getTeacherByEmployeeId(validatedData.employeeId);
      if (existingTeacher) {
        return res.status(400).json({ message: "Employee ID already exists" });
      }

      const teacher = await storage.createTeacher(validatedData);
      res.status(201).json(teacher);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create teacher" });
    }
  });

  // Update teacher
  app.put("/api/teachers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid teacher ID" });
      }

      const validatedData = updateTeacherSchema.parse({ ...req.body, id });
      const teacher = await storage.updateTeacher(id, validatedData);
      
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      res.json(teacher);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update teacher" });
    }
  });

  // Delete teacher
  app.delete("/api/teachers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid teacher ID" });
      }

      const deleted = await storage.deleteTeacher(id);
      if (!deleted) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete teacher" });
    }
  });

  // Get unique departments
  app.get("/api/departments", async (req, res) => {
    try {
      const teachers = await storage.getAllTeachers();
      const departments = [...new Set(teachers.map(t => t.department))];
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch departments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
