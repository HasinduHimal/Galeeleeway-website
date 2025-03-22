import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  submittedAt: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Simple authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const { data: contactSubmissions, error, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contact'],
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-primary mb-6 font-heading text-center">Admin Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  placeholder="Enter admin password"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                Login
              </Button>
            </form>
            <p className="mt-4 text-sm text-gray-500 text-center">
              <a 
                href="/reset-password" 
                className="text-primary hover:underline"
              >
                Forgot password?
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary font-heading">Admin Dashboard</h1>
          <Button 
            variant="ghost"
            onClick={() => setIsAuthenticated(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{contactSubmissions?.length || 0}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {contactSubmissions && contactSubmissions.length > 0 
                  ? "Active" 
                  : "No Activity"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">Online</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Form Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-4">Loading submissions...</p>
            ) : error ? (
              <p className="text-center py-4 text-red-500">Error loading submissions</p>
            ) : contactSubmissions && contactSubmissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Subject</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{submission.id}</td>
                        <td className="py-3 px-4">{submission.name}</td>
                        <td className="py-3 px-4">{submission.email}</td>
                        <td className="py-3 px-4">
                          {submission.subject === "general" ? "General Inquiry" :
                           submission.subject === "admission" ? "Admission Information" :
                           submission.subject === "courses" ? "Course Information" :
                           submission.subject === "feedback" ? "Feedback" : "Other"}
                        </td>
                        <td className="py-3 px-4">{formatDate(new Date(submission.submittedAt))}</td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Message Details",
                                description: submission.message,
                              });
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-4">No submissions found</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
