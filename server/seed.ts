import { db } from "./db";
import { teachers } from "@shared/schema";

async function seedDatabase() {
  const sampleTeachers = [
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
      status: "active" as const,
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
      status: "on_leave" as const,
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
      status: "active" as const,
      avatar: null,
    },
  ];

  try {
    await db.insert(teachers).values(sampleTeachers);
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  }
}

seedDatabase().then(() => process.exit(0));