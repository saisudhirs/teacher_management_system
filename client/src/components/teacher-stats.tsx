import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Clock, Award } from "lucide-react";

interface TeacherStats {
  totalTeachers: number;
  activeTeachers: number;
  onLeave: number;
  departments: number;
}

export default function TeacherStats() {
  const { data: stats, isLoading } = useQuery<TeacherStats>({
    queryKey: ["/api/teachers/stats"],
    queryFn: async () => {
      const response = await fetch("/api/teachers/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  const statCards = [
    {
      title: "Total Teachers",
      value: stats?.totalTeachers || 0,
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Active",
      value: stats?.activeTeachers || 0,
      icon: UserCheck,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "On Leave",
      value: stats?.onLeave || 0,
      icon: Clock,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Departments",
      value: stats?.departments || 0,
      icon: Award,
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="ml-3">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
