"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TechStack() {
  const technologies = [
    {
      category: "Data Ingestion",
      tech: "Python (Pandas), ETL tools (Apache Airflow)",
      description: "Automated data collection from multiple sources",
    },
    {
      category: "Visualization",
      tech: "Power BI, Tableau, D3.js, Chart.js",
      description: "Interactive charts and dynamic visualizations",
    },
    {
      category: "NLG Engine",
      tech: "GPT, Google Gemini, Amazon Polly, ARRIA NLG",
      description: "Natural language generation for reports",
    },
    {
      category: "Dashboard Framework",
      tech: "ReactJS, Next.js, Streamlit, Flask",
      description: "Modern web frameworks for responsive UI",
    },
    {
      category: "Interactivity",
      tech: "Chatbot integration, voice input, dynamic filters",
      description: "Enhanced user experience and accessibility",
    },
  ]

  return (
    <section id="tech-stack" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Built with Modern Technology
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Powered by industry-leading tools and frameworks for maximum performance and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {technologies.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm h-full"
            >
              <CardHeader className="pb-3">
                <Badge variant="outline" className="w-fit mb-2 bg-purple-50 text-purple-700 border-purple-200 text-xs">
                  {item.category}
                </Badge>
                <CardTitle className="text-base sm:text-lg leading-tight">{item.tech}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Key Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">95%</div>
              <div className="text-gray-700 text-xs sm:text-sm leading-tight">Time Saved on Manual Reporting</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">10x</div>
              <div className="text-gray-700 text-xs sm:text-sm leading-tight">Faster Decision Making</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">100%</div>
              <div className="text-gray-700 text-xs sm:text-sm leading-tight">Accessible for Non-Technical Users</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">24/7</div>
              <div className="text-gray-700 text-xs sm:text-sm leading-tight">Automated Insights</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
