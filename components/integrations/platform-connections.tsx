"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  Users,
  Database,
  FileSpreadsheet,
  Building2,
  CreditCard,
  CheckCircle,
  Plus,
  Settings,
} from "lucide-react"

interface PlatformConnectionsProps {
  user: any
  onConnectionUpdate: (platforms: any[]) => void
}

export function PlatformConnections({ user, onConnectionUpdate }: PlatformConnectionsProps) {
  const [connectedPlatforms, setConnectedPlatforms] = useState(user.connectedPlatforms || [])
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const platformCategories = [
    {
      id: "sales",
      title: "Sales & E-commerce",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
      platforms: [
        { id: "shopify", name: "Shopify", description: "E-commerce platform", requiresAuth: true },
        { id: "amazon", name: "Amazon Seller", description: "Amazon marketplace", requiresAuth: true },
        { id: "stripe", name: "Stripe", description: "Payment processing", requiresAuth: true },
        { id: "razorpay", name: "Razorpay", description: "Indian payment gateway", requiresAuth: true },
        { id: "woocommerce", name: "WooCommerce", description: "WordPress e-commerce", requiresAuth: true },
      ],
    },
    {
      id: "crm",
      title: "CRM & Customer Data",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      platforms: [
        { id: "salesforce", name: "Salesforce", description: "CRM platform", requiresAuth: true },
        { id: "hubspot", name: "HubSpot", description: "Marketing & CRM", requiresAuth: true },
        { id: "zoho", name: "Zoho CRM", description: "Business CRM", requiresAuth: true },
        { id: "pipedrive", name: "Pipedrive", description: "Sales CRM", requiresAuth: true },
      ],
    },
    {
      id: "database",
      title: "Databases",
      icon: Database,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      platforms: [
        { id: "mysql", name: "MySQL", description: "Relational database", requiresAuth: false },
        { id: "postgresql", name: "PostgreSQL", description: "Advanced database", requiresAuth: false },
        { id: "mongodb", name: "MongoDB", description: "NoSQL database", requiresAuth: false },
        { id: "firebase", name: "Firebase", description: "Google database", requiresAuth: true },
      ],
    },
    {
      id: "spreadsheets",
      title: "Spreadsheets & Files",
      icon: FileSpreadsheet,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      platforms: [
        { id: "google_sheets", name: "Google Sheets", description: "Cloud spreadsheets", requiresAuth: true },
        { id: "excel", name: "Microsoft Excel", description: "Spreadsheet files", requiresAuth: false },
        { id: "airtable", name: "Airtable", description: "Database-spreadsheet hybrid", requiresAuth: true },
        { id: "csv", name: "CSV Files", description: "Upload CSV data", requiresAuth: false },
      ],
    },
    {
      id: "erp",
      title: "ERP Systems",
      icon: Building2,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      platforms: [
        { id: "sap", name: "SAP", description: "Enterprise resource planning", requiresAuth: true },
        { id: "quickbooks", name: "QuickBooks", description: "Accounting software", requiresAuth: true },
        { id: "tally", name: "Tally", description: "Indian accounting software", requiresAuth: true },
        { id: "odoo", name: "Odoo", description: "Open source ERP", requiresAuth: true },
      ],
    },
    {
      id: "payments",
      title: "Payment Gateways",
      icon: CreditCard,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      platforms: [
        { id: "paypal", name: "PayPal", description: "Global payments", requiresAuth: true },
        { id: "square", name: "Square", description: "Point of sale", requiresAuth: true },
        { id: "paytm", name: "Paytm", description: "Indian payment platform", requiresAuth: true },
        { id: "phonepe", name: "PhonePe", description: "UPI payments", requiresAuth: true },
      ],
    },
  ]

  const handleConnect = async (platformId: string, platform: any) => {
    setIsConnecting(platformId)

    // Simulate API connection
    setTimeout(() => {
      const newConnection = {
        id: platformId,
        name: platform.name,
        status: "connected",
        connectedAt: new Date().toISOString(),
        lastSync: new Date().toISOString(),
      }

      const updated = [...connectedPlatforms, newConnection]
      setConnectedPlatforms(updated)
      onConnectionUpdate(updated)
      setIsConnecting(null)
    }, 2000)
  }

  const handleDisconnect = (platformId: string) => {
    const updated = connectedPlatforms.filter((p) => p.id !== platformId)
    setConnectedPlatforms(updated)
    onConnectionUpdate(updated)
  }

  const isConnected = (platformId: string) => {
    return connectedPlatforms.some((p) => p.id === platformId)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Your Business Data</h1>
        <p className="text-gray-600">Connect your business platforms to get AI-powered insights from your data</p>
      </div>

      {/* Connected Platforms Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Connected Platforms ({connectedPlatforms.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {connectedPlatforms.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {connectedPlatforms.map((platform) => (
                <Badge key={platform.id} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {platform.name}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No platforms connected yet. Connect your first platform below.</p>
          )}
        </CardContent>
      </Card>

      {/* Platform Categories */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          {platformCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              <category.icon className="h-4 w-4 mr-1" />
              {category.title.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {platformCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.platforms.map((platform) => (
                <Card key={platform.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`${category.bgColor} rounded-lg p-2`}>
                          <category.icon className={`h-5 w-5 ${category.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{platform.name}</CardTitle>
                          <CardDescription className="text-sm">{platform.description}</CardDescription>
                        </div>
                      </div>
                      {isConnected(platform.id) && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isConnected(platform.id) ? (
                      <div className="space-y-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Connected
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="h-4 w-4 mr-1" />
                            Configure
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(platform.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleConnect(platform.id, platform)}
                        disabled={isConnecting === platform.id}
                        className="w-full"
                      >
                        {isConnecting === platform.id ? (
                          "Connecting..."
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            Connect
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
