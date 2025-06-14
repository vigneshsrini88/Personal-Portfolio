import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Download } from "lucide-react";

const apiExamples = [
  {
    id: 1,
    title: "User Authentication API",
    description: "RESTful API for user authentication and session management",
    endpoint: "POST /api/auth/login",
    method: "POST",
    status: "200 OK",
    statusColor: "bg-green-100 text-green-800",
    requestBody: {
      email: "user@example.com",
      password: "securePassword123",
      remember: true
    },
    response: {
      success: true,
      data: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          id: 123,
          email: "user@example.com",
          name: "John Doe"
        }
      }
    }
  },
  {
    id: 2,
    title: "Data Analytics API",
    description: "Query and retrieve analytics data with flexible filtering options",
    endpoint: "GET /api/analytics/reports",
    method: "GET",
    status: "GET",
    statusColor: "bg-blue-100 text-blue-800",
    parameters: [
      { name: "start_date", type: "ISO 8601 date" },
      { name: "end_date", type: "ISO 8601 date" },
      { name: "metrics", type: "Comma-separated list" },
      { name: "limit", type: "Number (max 1000)" }
    ]
  }
];

export default function ApiDocsSection() {
  return (
    <section id="api-docs" className="mb-16">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">API Documentation Samples</h2>
      
      <div className="space-y-8">
        {apiExamples.map((api) => (
          <Card key={api.id} className="overflow-hidden">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">{api.title}</h3>
              <p className="text-muted-foreground mb-6">{api.description}</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono text-slate-600">{api.endpoint}</span>
                  <Badge className={api.statusColor}>{api.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {api.id === 1 ? "Authenticate user with email and password" : 
                   "Retrieve analytics reports with optional date range and filters"}
                </p>
              </div>
              
              <div className="space-y-4">
                {api.requestBody && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Request Body</h4>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
                      <code className="language-json">
                        {JSON.stringify(api.requestBody, null, 2)}
                      </code>
                    </pre>
                  </div>
                )}
                
                {api.response && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Response</h4>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
                      <code className="language-json">
                        {JSON.stringify(api.response, null, 2)}
                      </code>
                    </pre>
                  </div>
                )}
                
                {api.parameters && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Query Parameters</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {api.parameters.map((param, index) => (
                          <div key={index}>
                            <span className="font-mono text-primary">{param.name}</span>
                            <span className="text-muted-foreground ml-2">{param.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex space-x-4">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Full Documentation
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {api.id === 1 ? "Download OpenAPI Spec" : "Try in Sandbox"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
