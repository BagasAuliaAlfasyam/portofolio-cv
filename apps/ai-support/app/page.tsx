"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquareText, Zap, Send, User, Bot, Sparkles, AlertCircle, CheckCircle2, ChevronRight, BarChart3, Settings } from "lucide-react";
import { useAiChat } from "@repo/api/hooks";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
  actions?: { label: string; action: string }[];
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm the Catalyst Forge AI Support Agent. I can help you with technical support, account management, and product inquiries. How can I assist you today?",
    timestamp: new Date(Date.now() - 60000),
    actions: [
      { label: "Check system status", action: "status" },
      { label: "Reset password", action: "reset" },
      { label: "Talk to human", action: "human" }
    ]
  }
];

export default function AiSupportApp() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isPending } = useAiChat();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim() || isPending) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
      status: "sending"
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");

    sendMessage({ message: text }, {
      onSuccess: (data) => {
        setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: "sent" } : m));
        
        setTimeout(() => {
          const reply: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.reply || "I've processed your request. Is there anything else you need help with?",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, reply]);
        }, 500);
      },
      onError: () => {
        setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: "error" } : m));
      }
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Agent Details */}
      <aside className={`${sidebarOpen ? "w-72" : "w-0 overflow-hidden"} border-r border-white/[0.06] bg-surface-50/50 flex flex-col transition-all duration-300 shrink-0`}>
        <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">AI Agent Hub</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 flex items-center justify-center border border-indigo-500/30 mb-4 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 blur-md animate-pulse-slow" />
              <Bot className="w-10 h-10 text-indigo-400 relative z-10" />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Nexus v2.4</h2>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online & Ready
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Capabilities</h3>
              <div className="space-y-2">
                {["Contextual understanding", "Multi-turn reasoning", "Tool invocation", "Sentiment analysis"].map(cap => (
                  <div key={cap} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> {cap}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl glass">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs text-slate-400">Resolution Rate</span>
                <span className="text-sm font-bold text-emerald-400">94.2%</span>
              </div>
              <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[94.2%]" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        <header className="h-16 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 -ml-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04]">
              <MessageSquareText className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-white">Support Session</h1>
              <p className="text-[10px] text-slate-500">ID: #CS-8472-B</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04]"><BarChart3 className="w-4 h-4" /></button>
            <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04]"><Settings className="w-4 h-4" /></button>
          </div>
        </header>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 pb-32">
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.role === "user" 
                      ? "bg-surface-200" 
                      : "bg-gradient-to-br from-indigo-500 to-pink-500 shadow-lg shadow-indigo-500/20"
                  }`}>
                    {msg.role === "user" ? <User className="w-4 h-4 text-slate-400" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>

                  <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[80%]`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-slate-400">
                        {msg.role === "user" ? "You" : "Nexus AI"}
                      </span>
                      <span className="text-[10px] text-slate-600">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-surface-100 text-slate-200 rounded-tr-sm border border-white/[0.04]"
                        : "glass rounded-tl-sm text-slate-300"
                    }`}>
                      {msg.content}
                      
                      {msg.status === "sending" && (
                        <div className="flex items-center gap-1 mt-2 text-slate-500">
                          <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce" />
                          <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce delay-100" />
                          <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce delay-200" />
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    {msg.actions && msg.role === "assistant" && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(action.label)}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface-50 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-500/40 transition-colors flex items-center gap-1.5"
                          >
                            {action.label}
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isPending && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="p-4 rounded-2xl glass rounded-tl-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce delay-200" />
                  </div>
                 </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent pt-10">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur opacity-50 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative flex items-end gap-2 bg-surface-50 border border-white/[0.08] rounded-xl p-2 shadow-2xl">
              <button className="p-3 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors shrink-0">
                <Sparkles className="w-5 h-5" />
              </button>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything..."
                className="w-full bg-transparent border-none text-sm text-slate-100 placeholder:text-slate-500 focus:ring-0 resize-none py-3 max-h-32 focus:outline-none"
                rows={1}
              />
              
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isPending}
                className="p-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-slate-500">AI can make mistakes. Verify important information.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
