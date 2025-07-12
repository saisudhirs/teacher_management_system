import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Teacher } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import ViewTeacherModal from "./view-teacher-modal";
import EditTeacherModal from "./edit-teacher-modal";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/teachers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teachers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/teachers/stats"] });
      toast({
        title: "Success",
        description: "Teacher deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete teacher",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "on_leave":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">On Leave</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleDelete = () => {
    deleteMutation.mutate(teacher.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(teacher.firstName, teacher.lastName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {teacher.firstName} {teacher.lastName}
                </h3>
                <p className="text-xs text-gray-500">ID: {teacher.employeeId}</p>
                <p className="text-sm text-gray-600">{teacher.department}</p>
              </div>
            </div>
            {getStatusBadge(teacher.status)}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Email:</span>
              <p className="text-gray-900 break-all">{teacher.email}</p>
            </div>
            <div>
              <span className="text-gray-500">Experience:</span>
              <p className="text-gray-900">{teacher.experience} years</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Subjects:</span>
              <p className="text-gray-900">{teacher.subjects.join(", ")}</p>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-primary"
              onClick={() => setViewTeacher(teacher)}
            >
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-yellow-600"
              onClick={() => setEditTeacher(teacher)}
            >
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {teacher.firstName} {teacher.lastName}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ViewTeacherModal 
        isOpen={viewTeacher !== null} 
        onClose={() => setViewTeacher(null)} 
        teacher={viewTeacher} 
      />
      
      <EditTeacherModal 
        isOpen={editTeacher !== null} 
        onClose={() => setEditTeacher(null)} 
        teacher={editTeacher} 
      />
    </>
  );
}
