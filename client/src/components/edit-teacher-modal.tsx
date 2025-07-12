import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { updateTeacherSchema, type UpdateTeacher, type Teacher } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { X } from "lucide-react";

interface EditTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
}

export default function EditTeacherModal({ isOpen, onClose, teacher }: EditTeacherModalProps) {
  const [subjectsInput, setSubjectsInput] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: departments = [] } = useQuery<string[]>({
    queryKey: ["/api/departments"],
    queryFn: async () => {
      const response = await fetch("/api/departments");
      if (!response.ok) throw new Error("Failed to fetch departments");
      return response.json();
    },
  });

  const form = useForm<UpdateTeacher>({
    resolver: zodResolver(updateTeacherSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      employeeId: "",
      department: "",
      subjects: [],
      experience: 0,
      hireDate: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (teacher) {
      form.reset({
        id: teacher.id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        phone: teacher.phone,
        employeeId: teacher.employeeId,
        department: teacher.department,
        subjects: teacher.subjects,
        experience: teacher.experience,
        hireDate: teacher.hireDate,
        status: teacher.status,
      });
      setSubjectsInput(teacher.subjects.join(", "));
    }
  }, [teacher, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateTeacher) => {
      await apiRequest("PUT", `/api/teachers/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teachers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/teachers/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/departments"] });
      toast({
        title: "Success",
        description: "Teacher updated successfully",
      });
      handleClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update teacher",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UpdateTeacher) => {
    const subjects = subjectsInput
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    updateMutation.mutate({
      ...data,
      subjects,
    });
  };

  const handleClose = () => {
    form.reset();
    setSubjectsInput("");
    onClose();
  };

  if (!teacher) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Edit Teacher</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...form.register("firstName")}
                placeholder="Enter first name"
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...form.register("lastName")}
                placeholder="Enter last name"
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="teacher@school.edu"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...form.register("phone")}
                placeholder="+1 (555) 123-4567"
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                {...form.register("employeeId")}
                placeholder="TCH001"
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select
                value={form.watch("department")}
                onValueChange={(value) => form.setValue("department", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={`edit-dept-${dept}`} value={dept}>{dept}</SelectItem>
                  ))}
                  <SelectItem key="edit-Mathematics" value="Mathematics">Mathematics</SelectItem>
                  <SelectItem key="edit-Science" value="Science">Science</SelectItem>
                  <SelectItem key="edit-English" value="English">English</SelectItem>
                  <SelectItem key="edit-History" value="History">History</SelectItem>
                  <SelectItem key="edit-Art" value="Art">Art</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.department && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.department.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                {...form.register("experience", { valueAsNumber: true })}
                placeholder="5"
              />
              {form.formState.errors.experience && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.experience.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subjects">Subjects Taught</Label>
              <Input
                id="subjects"
                value={subjectsInput}
                onChange={(e) => setSubjectsInput(e.target.value)}
                placeholder="e.g., Algebra, Calculus (comma-separated)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter subjects separated by commas
              </p>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.watch("status")}
                onValueChange={(value) => form.setValue("status", value as "active" | "on_leave" | "inactive")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="hireDate">Hire Date</Label>
            <Input
              id="hireDate"
              type="date"
              {...form.register("hireDate")}
            />
            {form.formState.errors.hireDate && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.hireDate.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Updating..." : "Update Teacher"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}