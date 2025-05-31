"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ReportsSection } from "@/components/reports-section"
import { FeaturesSection } from "@/components/features-section"
import { DataSourcesSection } from "@/components/data-sources-section"
import { TechStack } from "@/components/tech-stack"
import { LoginForm } from "@/components/auth/login-form"
import { PlatformConnections } from "@/components/integrations/platform-connections"
import { BusinessMetrics } from "@/components/dashboard/business-metrics"
import { ChatInterface } from "@/components/chat-interface"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Button } from "@/components/ui/button"
import { LogOut, Settings } from "lucide-react"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [currentView, setCurrentView] = useState<"dashboard" | "connections">("dashboard")
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleLogin = (userData: any) => {
    setUser(userData)
    setShowLogin(false)
    if (userData.connectedPlatforms?.length === 0) {
      setCurrentView("connections")
    }
  }

  const handleLogout = () => {
    setUser(null)
    setShowLogin(false)
    setCurrentView("dashboard")
  }

  const handleConnectionUpdate = (platforms: any[]) => {
    setUser({ ...user, connectedPlatforms: platforms })
    if (platforms.length > 0) {
      setCurrentView("dashboard")
    }
  }

  // Show login form when requested
  if (showLogin && !user) {
    return <LoginForm onLogin={handleLogin} onBack={() => setShowLogin(false)} />
  }

  // Show dashboard if user is logged in
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Dashboard Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-900">Narrative Dashboard</h1>
                <div className="hidden md:flex space-x-4">
                  <Button
                    variant={currentView === "dashboard" ? "default" : "ghost"}
                    onClick={() => setCurrentView("dashboard")}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant={currentView === "connections" ? "default" : "ghost"}
                    onClick={() => setCurrentView("connections")}
                  >
                    Connections
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === "dashboard" ? (
            user.connectedPlatforms?.length > 0 ? (
              <BusinessMetrics connectedPlatforms={user.connectedPlatforms} />
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Narrative Dashboard</h2>
                <p className="text-gray-600 mb-6">
                  Connect your business platforms to start getting AI-powered insights
                </p>
                <Button onClick={() => setCurrentView("connections")}>Connect Your First Platform</Button>
              </div>
            )
          ) : (
            <PlatformConnections user={user} onConnectionUpdate={handleConnectionUpdate} />
          )}
        </div>

        {/* Floating Chat Button */}
        {user.connectedPlatforms?.length > 0 && <FloatingChatButton onClick={() => setIsChatOpen(true)} />}

        {/* Chat Interface */}
        {user.connectedPlatforms?.length > 0 && (
          <ChatInterface
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            connectedPlatforms={user.connectedPlatforms}
          />
        )}
      </div>
    )
  }

  // Show main landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <Hero onOpenChat={() => setShowLogin(true)} />
      <FeaturesSection />
      <DataSourcesSection />
      <ReportsSection />
      <TechStack />
    </div>
  )
}
