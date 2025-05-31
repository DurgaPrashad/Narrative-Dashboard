"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, DollarSign, Users, Target, BarChart3, PieChart } from "lucide-react"

export function ReportsSection() {
  const reportCategories = [
    {
      icon: TrendingUp,
      title: "Executive Summary",
      description: "Plain text summary of performance across departments",
      features: ["KPI Overview", "Trend Analysis", "Action Items", "Executive Insights"],
    },
    {
      icon: DollarSign,
      title: "Sales Reports",
      description: "Comprehensive sales performance and forecasting",
      features: ["Top Products", "Regional Performance", "Sales Funnels", "YoY Comparisons"],
    },
    {
      icon: PieChart,
      title: "Financial Reports",
      description: "Revenue, costs, and profitability analysis",
      features: ["Revenue vs Target", "Cost Breakdown", "Profit Margins", "Budget Analysis"],
    },
    {
      icon: Target,
      title: "Marketing Reports",
      description: "Campaign performance and ROI tracking",
      features: ["Campaign ROI", "Traffic Sources", "Conversion Rates", "Customer Acquisition"],
    },
    {
      icon: Users,
      title: "HR & Operations",
      description: "Workforce analytics and operational efficiency",
      features: ["Turnover Trends", "Hiring Progress", "Performance Metrics", "Department Efficiency"],
    },
    {
      icon: BarChart3,
      title: "Custom Reports",
      description: "Tailored reports for specific business needs",
      features: ["Inventory Status", "Supply Chain", "Customer Churn", "Custom KPIs"],
    },
  ]

  return (
    <section id="reports" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-3 sm:mb-4 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            <span className="text-xs sm:text-sm">Report Generation</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Comprehensive Business Reports
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Generate detailed reports across all business functions with AI-powered insights and recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {reportCategories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm h-full"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
                    <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-tight">{category.title}</CardTitle>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{category.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">How Report Generation Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Data Collection</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Pulls data from Excel/CSV files, Google Sheets, databases, and APIs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">AI Analysis</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                AI processes data, identifies patterns, and generates insights
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Report Generation</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Creates narrative reports with charts, summaries, and recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
