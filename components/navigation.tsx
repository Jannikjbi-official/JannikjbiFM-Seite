"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Radio,
  Users,
  Calendar,
  MessageSquare,
  Newspaper,
  Settings,
  BarChart3,
  MessageCircle,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Radio },
  { href: "/live", label: "Live Stream", icon: Radio },
  { href: "/djs", label: "DJs", icon: Users },
  { href: "/schedule", label: "Programm", icon: Calendar },
  { href: "/requests", label: "Song Requests", icon: MessageSquare },
  { href: "/chat", label: "Live Chat", icon: MessageCircle },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/stats", label: "Statistiken", icon: BarChart3 },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary pulse-glow">
            <Radio className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text">jannikjbiFM</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Admin
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <Button className="mt-6">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Dashboard
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
