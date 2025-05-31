"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  BarChart3,
  Brain,
  Monitor,
  Download,
  Zap,
  TrendingUp,
  FileText,
  Users,
  DollarSign,
  Target,
  PieChart,
} from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "Natural Language Interface",
      description: "Ask questions in plain English and get instant insights",
      badge: "AI-Powered",
    },
    {
      icon: BarChart3,
      title: "Interactive Dashboards",
      description: "Click, filter, and drill down into your data",
      badge: "Interactive",
    },
    {
      icon: Brain,
      title: "Smart Analytics",
      description: "AI identifies trends and anomalies automatically",
      badge: "Intelligent",
    },
    {
      icon: Monitor,
      title: "Screen Analysis",
      description: "Share your screen for visual context analysis",
      badge: "Visual AI",
    },
    {
      icon: Download,
      title: "Export Reports",
      description: "Generate PDFs, Word docs, and presentations",
      badge: "Export",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Live data synchronization and instant notifications",
      badge: "Real-time",
    },
  ]

  const reportTypes = [
    { icon: TrendingUp, title: "Executive Summary", color: "text-blue-600" },
    { icon: DollarSign, title: "Sales Reports", color: "text-green-600" },
    { icon: PieChart, title: "Financial Reports", color: "text-purple-600" },
    { icon: Target, title: "Marketing Reports", color: "text-orange-600" },
    { icon: Users, title: "HR & Operations", color: "text-indigo-600" },
    { icon: FileText, title: "Custom Reports", color: "text-pink-600" },
  ]

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Powerful Features for Modern Business
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Everything you need to transform raw data into actionable business intelligence
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm h-full"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-base sm:text-lg leading-tight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Types */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Types of Reports We Generate</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {reportTypes.map((report, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 rounded-full p-3 sm:p-4 mb-2 sm:mb-3 mx-auto w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                  <report.icon className={`h-5 w-5 sm:h-8 sm:w-8 ${report.color}`} />
                </div>
                <h4 className="font-medium text-xs sm:text-sm text-gray-900 leading-tight px-1">{report.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
