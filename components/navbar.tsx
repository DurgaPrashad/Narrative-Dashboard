"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, BarChart3, FileText, LogIn } from "lucide-react"

interface NavbarProps {
  onLoginClick: () => void
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">Narrative Dashboard</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a
              href="#features"
              className="text-sm text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Features
            </a>
            <a
              href="#data-sources"
              className="text-sm text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Integrations
            </a>
            <a
              href="#reports"
              className="text-sm text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Reports
            </a>
            <a
              href="#tech-stack"
              className="text-sm text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Technology
            </a>
            <Button variant="outline" size="sm" className="flex items-center space-x-1 text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden xl:inline">Documentation</span>
              <span className="xl:hidden">Docs</span>
            </Button>
            <Button onClick={onLoginClick} size="sm" className="flex items-center space-x-1 text-sm">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-3">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#data-sources"
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Integrations
              </a>
              <a
                href="#reports"
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Reports
              </a>
              <a
                href="#tech-stack"
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Technology
              </a>
              <Button variant="outline" className="w-full mt-2">
                Documentation
              </Button>
              <Button onClick={onLoginClick} className="w-full">
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
