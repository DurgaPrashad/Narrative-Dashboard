"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Zap, LogIn } from "lucide-react"

interface HeroProps {
  onOpenChat: () => void
}

export function Hero({ onOpenChat }: HeroProps) {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <Badge variant="outline" className="mb-4 sm:mb-6 bg-blue-50 text-blue-700 border-blue-200">
            <Zap className="h-3 w-3 mr-1" />
            <span className="text-xs sm:text-sm">Powered by Google Gemini AI</span>
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            <span className="block sm:inline">Transform Business Data into</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2 sm:mt-0 sm:ml-2">
              Smart Narratives
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            AI-powered business intelligence that converts complex data into clear, actionable insights. Ask questions
            in natural language and get instant reports, summaries, and recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
            <Button
              size="lg"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-sm sm:text-base"
              onClick={onOpenChat}
            >
              <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Get Started</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Watch Demo</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto px-4 sm:px-0">
            <div className="text-center py-4 sm:py-0">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">95%</div>
              <div className="text-sm sm:text-base text-gray-600">Time Saved</div>
            </div>
            <div className="text-center py-4 sm:py-0">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2">10x</div>
              <div className="text-sm sm:text-base text-gray-600">Faster Insights</div>
            </div>
            <div className="text-center py-4 sm:py-0">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">50+</div>
              <div className="text-sm sm:text-base text-gray-600">Platform Integrations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
