import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { platforms } = await request.json()

    // Initialize metrics object
    let metrics = {
      revenue: { total: "₹0", change: "0%", trend: "up" },
      orders: { total: "0", change: "0%", trend: "up" },
      customers: { total: "0", change: "0%", trend: "up" },
      products: { total: "0", change: "0%", trend: "up" },
      topProducts: [],
    }

    // Fetch data from connected platforms
    for (const platform of platforms) {
      switch (platform.id) {
        case "shopify":
          const shopifyData = await fetchShopifyData()
          metrics = mergeMetrics(metrics, shopifyData)
          break
        case "stripe":
          const stripeData = await fetchStripeData()
          metrics = mergeMetrics(metrics, stripeData)
          break
        case "salesforce":
          const salesforceData = await fetchSalesforceData()
          metrics = mergeMetrics(metrics, salesforceData)
          break
        // Add more platform integrations
      }
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error("Error fetching business metrics:", error)
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 })
  }
}

async function fetchShopifyData() {
  const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY
  const SHOPIFY_SECRET_KEY = process.env.SHOPIFY_SECRET_KEY
  const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL

  if (!SHOPIFY_API_KEY || !SHOPIFY_SECRET_KEY || !SHOPIFY_STORE_URL) {
    return null
  }

  try {
    // Fetch orders from Shopify
    const ordersResponse = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-10/orders.json`, {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_API_KEY,
        "Content-Type": "application/json",
      },
    })

    const ordersData = await ordersResponse.json()

    // Calculate metrics from Shopify data
    const totalRevenue =
      ordersData.orders?.reduce((sum: number, order: any) => sum + Number.parseFloat(order.total_price), 0) || 0

    return {
      revenue: {
        total: `₹${(totalRevenue * 83).toLocaleString()}`, // Convert USD to INR
        change: "+12.5%",
        trend: "up",
      },
      orders: {
        total: ordersData.orders?.length.toString() || "0",
        change: "+8.2%",
        trend: "up",
      },
      customers: {
        total: new Set(ordersData.orders?.map((o: any) => o.customer?.id)).size.toString() || "0",
        change: "+15.3%",
        trend: "up",
      },
    }
  } catch (error) {
    console.error("Shopify API error:", error)
    return null
  }
}

async function fetchStripeData() {
  const STRIPE_API_KEY = process.env.STRIPE_API_KEY

  if (!STRIPE_API_KEY) {
    return null
  }

  try {
    // Fetch payments from Stripe
    const paymentsResponse = await fetch("https://api.stripe.com/v1/charges", {
      headers: {
        Authorization: `Bearer ${STRIPE_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    const paymentsData = await paymentsResponse.json()

    // Calculate metrics from Stripe data
    const totalRevenue = paymentsData.data?.reduce((sum: number, charge: any) => sum + charge.amount / 100, 0) || 0

    return {
      revenue: {
        total: `₹${totalRevenue.toLocaleString()}`,
        change: "+10.4%",
        trend: "up",
      },
      orders: {
        total: paymentsData.data?.length.toString() || "0",
        change: "+6.7%",
        trend: "up",
      },
    }
  } catch (error) {
    console.error("Stripe API error:", error)
    return null
  }
}

async function fetchSalesforceData() {
  const SALESFORCE_API_KEY = process.env.SALESFORCE_API_KEY
  const SALESFORCE_INSTANCE_URL = process.env.SALESFORCE_INSTANCE_URL

  if (!SALESFORCE_API_KEY || !SALESFORCE_INSTANCE_URL) {
    return null
  }

  try {
    // Fetch opportunities from Salesforce
    const opportunitiesResponse = await fetch(
      `${SALESFORCE_INSTANCE_URL}/services/data/v58.0/query/?q=SELECT+Id,Amount,StageName+FROM+Opportunity+WHERE+CloseDate+>=+THIS_MONTH`,
      {
        headers: {
          Authorization: `Bearer ${SALESFORCE_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    const opportunitiesData = await opportunitiesResponse.json()

    // Calculate metrics from Salesforce data
    const wonOpportunities = opportunitiesData.records?.filter((opp: any) => opp.StageName === "Closed Won") || []

    const totalRevenue = wonOpportunities.reduce((sum: number, opp: any) => sum + (opp.Amount || 0), 0)

    return {
      revenue: {
        total: `₹${(totalRevenue * 83).toLocaleString()}`, // Convert USD to INR
        change: "+18.2%",
        trend: "up",
      },
      customers: {
        total: wonOpportunities.length.toString(),
        change: "+22.1%",
        trend: "up",
      },
    }
  } catch (error) {
    console.error("Salesforce API error:", error)
    return null
  }
}

function mergeMetrics(existing: any, newData: any) {
  if (!newData) return existing

  // Merge revenue
  if (newData.revenue) {
    const existingRevenue = Number.parseFloat(existing.revenue.total.replace(/[₹,]/g, "")) || 0
    const newRevenue = Number.parseFloat(newData.revenue.total.replace(/[₹,]/g, "")) || 0
    existing.revenue.total = `₹${(existingRevenue + newRevenue).toLocaleString()}`
  }

  // Merge orders
  if (newData.orders) {
    const existingOrders = Number.parseInt(existing.orders.total) || 0
    const newOrders = Number.parseInt(newData.orders.total) || 0
    existing.orders.total = (existingOrders + newOrders).toString()
  }

  // Merge customers
  if (newData.customers) {
    const existingCustomers = Number.parseInt(existing.customers.total) || 0
    const newCustomers = Number.parseInt(newData.customers.total) || 0
    existing.customers.total = (existingCustomers + newCustomers).toString()
  }

  return existing
}
