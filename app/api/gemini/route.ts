import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt, isScreenSharing } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    // Enhanced business intelligence prompt with data source context
    const businessPrompt = `You are an expert business intelligence analyst with access to comprehensive business data. Your role is to:

1. Analyze business queries and provide detailed, actionable insights
2. Generate comprehensive reports with specific metrics, trends, and recommendations
3. Simulate realistic business data analysis based on common business scenarios
4. Provide context-aware analysis for various business platforms and data sources

BUSINESS DATA CONTEXT:
- Sales Platforms: Shopify, Amazon, Stripe, Razorpay, WooCommerce
- CRM Systems: Salesforce, HubSpot, Zoho CRM, Pipedrive
- Databases: MySQL, PostgreSQL, MongoDB, Firebase
- Spreadsheets: Google Sheets, Excel, Airtable
- ERP Systems: SAP, Oracle, Tally, QuickBooks
- Payment Gateways: PayPal, Square, Paytm, PhonePe

SAMPLE BUSINESS METRICS TO REFERENCE:
- Monthly Revenue: ₹12.3L (10.4% increase)
- Total Orders: 1,247 (8.2% increase)
- Average Order Value: ₹987 (5.1% increase)
- Customer Count: 892 (12.3% increase)
- Conversion Rate: 3.4% (0.8% increase)
- Customer Retention: 65% (2.1% increase)
- Top Categories: Men's T-Shirts, Electronics, Home Decor
- Best Regions: Bangalore, Hyderabad, Mumbai
- Peak Sales Days: Weekends and festival periods

${isScreenSharing ? "The user is sharing their screen, so they may be looking at dashboards, reports, or data visualizations. Provide analysis that could relate to what they're viewing." : ""}

RESPONSE GUIDELINES:
- Provide specific numbers, percentages, and actionable insights
- Include trend analysis and comparisons (MoM, YoY)
- Suggest KPIs to track and optimization strategies
- Highlight opportunities and potential issues
- Structure responses with clear sections when appropriate
- Keep responses comprehensive but under 250 words
- Use Indian currency (₹) and business context

User Query: ${prompt}`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: businessPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", errorText)
      return NextResponse.json({ error: "Failed to generate response from Gemini API" }, { status: response.status })
    }

    const data = await response.json()
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      return NextResponse.json({ error: "No response generated" }, { status: 500 })
    }

    return NextResponse.json({ text: generatedText })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
