"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Send, Monitor, Minimize2, Maximize2, Move, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
  connectedPlatforms: any[]
}

export function ChatInterface({ isOpen, onClose, connectedPlatforms }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm your AI Business Analyst. I can analyze data from your connected platforms: ${connectedPlatforms.map((p) => p.name).join(", ")}. What business insights would you like to know?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const quickQuestions = [
    "Show me this month's revenue from all platforms",
    "What are my top-selling products?",
    "Compare this month vs last month performance",
    "Which platform is generating the most revenue?",
    "Show me customer acquisition trends",
    "Analyze my payment gateway performance",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      },
    ])

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMessage,
          isScreenSharing,
          connectedPlatforms: connectedPlatforms.map((p) => p.name),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "I apologize, but I couldn't generate a response. Please try again.",
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm experiencing technical difficulties. Please check your connection and try again.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  const handleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: "always" },
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsScreenSharing(true)

          stream.getVideoTracks()[0].onended = () => {
            setIsScreenSharing(false)
            if (videoRef.current) {
              videoRef.current.srcObject = null
            }
          }
        }
      } catch (error) {
        console.error("Screen sharing error:", error)
      }
    } else {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
      setIsScreenSharing(false)
    }
  }

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        const dx = e.clientX - dragRef.current.startX
        const dy = e.clientY - dragRef.current.startY

        setPosition({
          x: Math.max(0, dragRef.current.startPosX + dx),
          y: Math.max(0, dragRef.current.startPosY + dy),
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      dragRef.current = null
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed shadow-2xl rounded-lg bg-white overflow-hidden border border-gray-200 z-50"
        style={{
          width: isMinimized ? "320px" : "450px",
          height: isMinimized ? "60px" : "650px",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 flex items-center justify-between cursor-move"
          onMouseDown={handleDragStart}
        >
          <div className="flex items-center space-x-2">
            <Move className="h-4 w-4" />
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="font-medium">AI Business Analyst</span>
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {connectedPlatforms.length} Connected
            </Badge>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={handleScreenShare}
              title="Share Screen"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={onClose}
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="h-[480px] overflow-y-auto p-4 bg-gray-50">
              {messages.map((message, index) => (
                <div key={index} className={cn("mb-4 flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] p-3 rounded-lg",
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm",
                    )}
                  >
                    <div className="text-sm leading-relaxed">{message.content}</div>
                    <div
                      className={cn(
                        "text-xs mt-2 opacity-70",
                        message.role === "user" ? "text-blue-100" : "text-gray-500",
                      )}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 p-3 rounded-lg flex items-center space-x-2 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600">Analyzing your business data...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-600 mb-2">Quick questions:</div>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs h-6 px-2 bg-white hover:bg-blue-50"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your business data..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        )}
      </div>

      {isScreenSharing && (
        <div className="fixed bottom-4 right-4 w-80 h-48 bg-black rounded-lg overflow-hidden shadow-lg border-2 border-blue-500 z-40">
          <video ref={videoRef} autoPlay muted className="w-full h-full object-contain" />
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            🔴 LIVE
          </div>
        </div>
      )}
    </>
  )
}
