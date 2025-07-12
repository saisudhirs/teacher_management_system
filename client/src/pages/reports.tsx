import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, BarChart3, TrendingUp } from "lucide-react";
import Header from "@/components/header";

export default function Reports() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
              <p className="mt-1 text-sm text-gray-500">Generate and view system reports</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: "Total Reports", value: "156", icon: FileText, color: "blue" },
            { title: "This Month", value: "24", icon: TrendingUp, color: "green" },
            { title: "Downloaded", value: "89", icon: Download, color: "purple" },
            { title: "Pending", value: "7", icon: BarChart3, color: "orange" }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Quick Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Teacher Performance Summary",
                "Student Enrollment Report",
                "Class Attendance Overview", 
                "Department Statistics"
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{report}</span>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Analytics Dashboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Advanced Analytics Coming Soon
                </h3>
                <p className="text-gray-600 mb-4">
                  This section will include detailed analytics, trends, and insights about your school's performance.
                </p>
                <Button variant="outline">
                  Request Feature
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}