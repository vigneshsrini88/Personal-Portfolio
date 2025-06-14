import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Bot, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestedQuestions = [
  "Tell me about her API documentation experience",
  "What tools does she use?",
  "Show me her best work samples",
  "What's her background in technical writing?",
];

export default function AiChatSidebar() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hi! I'm here to answer any questions about Sarah's experience, skills, or work samples. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        }
      ]);
    },
    onError: () => {
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
          isUser: false,
          timestamp: new Date(),
        }
      ]);
    },
  });

  const sendMessage = () => {
    const message = input.trim();
    if (!message || chatMutation.isPending) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Send to AI
    chatMutation.mutate(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const askSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white border-l border-border z-30 flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Ask About Sarah</h3>
            <p className="text-sm text-muted-foreground">AI Assistant</p>
          </div>
        </div>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.isUser
                  ? "bg-primary text-white rounded-lg p-4 ml-8"
                  : "bg-blue-50 rounded-lg p-4"
              }`}
            >
              <div className="flex items-start space-x-3">
                {!message.isUser && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="text-white w-4 h-4" />
                  </div>
                )}
                {message.isUser && (
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-white w-4 h-4" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${message.isUser ? "text-white" : "text-slate-700"}`}>
                    {message.content}
                  </p>
                  <span className={`text-xs mt-1 block ${message.isUser ? "text-blue-100" : "text-muted-foreground"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {chatMutation.isPending && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <Bot className="text-white w-4 h-4" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-dot"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-6 border-t border-border">
        <div className="flex space-x-2 mb-4">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Sarah's experience..."
            className="flex-1"
            disabled={chatMutation.isPending}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || chatMutation.isPending}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="secondary"
              size="sm"
              className="text-xs"
              onClick={() => askSuggestedQuestion(question)}
              disabled={chatMutation.isPending}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}
