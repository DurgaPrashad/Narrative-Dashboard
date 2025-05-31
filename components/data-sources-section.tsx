"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Database,
  FileSpreadsheet,
  Users,
  Building2,
  CreditCard,
  BarChart3,
  TrendingUp,
  DollarSign,
  Package,
} from "lucide-react"

export function DataSourcesSection() {
  const dataSources = [
    {
      category: "Sales Platforms",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      sources: ["Shopify", "Amazon Seller Central", "Stripe", "Razorpay", "WooCommerce", "Magento"],
    },
    {
      category: "CRM Tools",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      sources: ["Salesforce", "HubSpot", "Zoho CRM", "Pipedrive", "Freshworks", "Monday.com"],
    },
    {
      category: "Databases",
      icon: Database,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      sources: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase", "AWS RDS"],
    },
    {
      category: "Spreadsheets",
      icon: FileSpreadsheet,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      sources: ["Google Sheets", "Excel", "Airtable", "Notion", "CSV Files", "JSON Data"],
    },
    {
      category: "ERP Systems",
      icon: Building2,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      sources: ["SAP", "Oracle ERP", "Tally", "QuickBooks", "NetSuite", "Odoo"],
    },
    {
      category: "Payment Gateways",
      icon: CreditCard,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      sources: ["PayPal", "Square", "Razorpay", "Paytm", "PhonePe", "Google Pay"],
    },
  ]

  const workflowSteps = [
    {
      step: 1,
      title: "Connect Data Sources",
      description: "Link your business platforms and databases",
      icon: Database,
      color: "bg-blue-600",
    },
    {
      step: 2,
      title: "Clean & Process",
      description: "ETL pipeline cleans and standardizes data",
      icon: BarChart3,
      color: "bg-indigo-600",
    },
    {
      step: 3,
      title: "Analyze Metrics",
      description: "Calculate KPIs, trends, and insights",
      icon: TrendingUp,
      color: "bg-purple-600",
    },
    {
      step: 4,
      title: "Generate Narratives",
      description: "AI creates human-readable reports",
      icon: DollarSign,
      color: "bg-green-600",
    },
  ]

  return (
    <section id="data-sources" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-3 sm:mb-4 bg-blue-50 text-blue-700 border-blue-200">
            <Package className="h-3 w-3 mr-1" />
            <span className="text-xs sm:text-sm">Data Integration</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Connect Your Business Data Sources
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Seamlessly integrate with 50+ platforms to get comprehensive business insights
          </p>
        </div>

        {/* Data Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {dataSources.map((source, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm h-full"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`${source.bgColor} rounded-lg p-2 flex-shrink-0`}>
                    <source.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${source.color}`} />
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-tight">{source.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {source.sources.map((platform, platformIndex) => (
                    <Badge key={platformIndex} variant="outline" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Workflow Steps */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
            How We Transform Your Data into Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className={`${step.color} text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                >
                  <step.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="bg-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mx-auto mb-2 sm:mb-3 text-xs sm:text-sm font-bold text-gray-700">
                  {step.step}
                </div>
                <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{step.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example Business Metrics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Business Metrics We Track</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {[
              { label: "Total Revenue", value: "₹12.3L", change: "+10.4%" },
              { label: "Orders", value: "1,247", change: "+8.2%" },
              { label: "AOV", value: "₹987", change: "+5.1%" },
              { label: "Customers", value: "892", change: "+12.3%" },
              { label: "Conversion", value: "3.4%", change: "+0.8%" },
              { label: "Retention", value: "65%", change: "+2.1%" },
            ].map((metric, index) => (
              <div key={index} className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 mb-1 leading-tight">{metric.label}</div>
                <div className="text-xs font-medium text-green-600">{metric.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
