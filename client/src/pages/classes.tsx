import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Calendar } from "lucide-react";
import Header from "@/components/header";

export default function Classes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Classes</h2>
              <p className="mt-1 text-sm text-gray-500">Manage class schedules and assignments</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Class
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: "Total Classes", value: "48", icon: BookOpen, color: "blue" },
            { title: "Active Sessions", value: "32", icon: Calendar, color: "green" },
            { title: "This Week", value: "12", icon: Calendar, color: "purple" },
            { title: "New Classes", value: "3", icon: Plus, color: "cyan" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-8 h-8 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-4 w-4 text-${stat.color}-600`} />
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Class Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Class Management Coming Soon
              </h3>
              <p className="text-gray-600 mb-4">
                This section will include class scheduling, curriculum management, and assignment tracking features.
              </p>
              <Button variant="outline">
                Request Feature
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}