import { useQuery, useMutation } from "@tanstack/react-query";
import { FileText, Download, Eye, BookOpen, Settings, Lightbulb, Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useState, useMemo } from "react";
import type { Document } from "@shared/schema";

const getDocumentIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "user guide":
      return FileText;
    case "administration guide":
      return BookOpen;
    case "technical guide":
      return Settings;
    case "reference guide":
      return Lightbulb;
    default:
      return FileText;
  }
};

const getDocumentColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "user guide":
      return "bg-blue-100 text-blue-600";
    case "administration guide":
      return "bg-green-100 text-green-600";
    case "technical guide":
      return "bg-purple-100 text-purple-600";
    case "reference guide":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function DocumentsSection() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: documents, isLoading, error } = useQuery<Document[]>({
    queryKey: ["/api/documents"],
  });

  const filteredDocuments = useMemo(() => {
    if (!documents || !searchQuery.trim()) return documents || [];
    
    const query = searchQuery.toLowerCase();
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(query) ||
      doc.type.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query)
    );
  }, [documents, searchQuery]);

  const previewMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("GET", `/api/documents/${id}/preview`);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Document Preview",
        description: `Opening preview for "${data.title}"`,
      });
      // In a real implementation, this would open a preview modal or navigate to preview page
    },
    onError: () => {
      toast({
        title: "Preview Error",
        description: "Failed to load document preview",
        variant: "destructive",
      });
    }
  });

  const downloadMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("GET", `/api/documents/${id}/download`);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Download Started",
        description: `Downloading "${data.title}"`,
      });
      // In a real implementation, this would trigger the file download
    },
    onError: () => {
      toast({
        title: "Download Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  });

  if (error) {
    return (
      <section id="documents" className="mb-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Sample Documents</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">Failed to load documents. Please try again later.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="documents" className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Sample Documents</h2>
        {documents && documents.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {searchQuery ? `${filteredDocuments.length} of ${documents.length} documents` : `${documents.length} documents`}
          </span>
        )}
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search documents by title, type, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery("")}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredDocuments.length === 0 ? (
              <>No documents found for "<span className="font-medium">{searchQuery}</span>"</>
            ) : (
              <>Found {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} matching "<span className="font-medium">{searchQuery}</span>"</>
            )}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="w-6 h-6" />
                </div>
                <Skeleton className="h-16 w-full mb-4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredDocuments.length === 0 && searchQuery ? (
          <div className="col-span-full text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No documents found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or browse all documents below.
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          </div>
        ) : (
          filteredDocuments?.map((document) => {
            const IconComponent = getDocumentIcon(document.type);
            const colorClass = getDocumentColor(document.type);
            
            return (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{document.title}</h3>
                        <p className="text-sm text-muted-foreground">{document.type}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadMutation.mutate(document.id)}
                      disabled={downloadMutation.isPending}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {document.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      PDF • {document.pages} pages
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => previewMutation.mutate(document.id)}
                      disabled={previewMutation.isPending}
                      className="text-primary hover:text-primary/80"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </section>
  );
}
