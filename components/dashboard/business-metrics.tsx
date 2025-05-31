"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

interface BusinessMetricsProps {
  connectedPlatforms: any[]
}

export function BusinessMetrics({ connectedPlatforms }: BusinessMetricsProps) {
  const [metrics, setMetrics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBusinessMetrics()
  }, [connectedPlatforms])

  const fetchBusinessMetrics = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/business-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platforms: connectedPlatforms }),
      })

      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error("Error fetching metrics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!metrics) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Connect your business platforms to see metrics</p>
        </CardContent>
      </Card>
    )
  }

  const metricCards = [
    {
      title: "Total Revenue",
      value: metrics.revenue?.total || "₹0",
      change: metrics.revenue?.change || "0%",
      trend: metrics.revenue?.trend || "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: metrics.orders?.total || "0",
      change: metrics.orders?.change || "0%",
      trend: metrics.orders?.trend || "up",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Active Customers",
      value: metrics.customers?.total || "0",
      change: metrics.customers?.change || "0%",
      trend: metrics.customers?.trend || "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Products Sold",
      value: metrics.products?.total || "0",
      change: metrics.products?.change || "0%",
      trend: metrics.products?.trend || "up",
      icon: Package,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Business Overview</h2>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Live Data
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>{metric.change}</span>
                <span className="text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Products */}
      {metrics.topProducts && (
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Based on your connected sales platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.topProducts.map((product: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{product.revenue}</p>
                    <p className="text-sm text-gray-600">{product.units} units</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
