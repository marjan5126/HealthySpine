"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  Calendar,
  Clock,
  Heart,
  Home,
  LogOut,
  MapPin,
  MessageSquare,
  Moon,
  User,
  Users,
  Zap,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export function AppSidebar() {
  const pathname = usePathname()
  const { toast } = useToast()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserName(user.name || "User")
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    window.location.href = "/login"
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-4 w-4" />,
      href: "/dashboard",
    },
    {
      title: "Pain Tracker",
      icon: <Activity className="h-4 w-4" />,
      href: "/pain-tracker",
    },
    {
      title: "Posture Checker",
      icon: <User className="h-4 w-4" />,
      href: "/posture-checker",
    },
    {
      title: "Exercise Reminders",
      icon: <Clock className="h-4 w-4" />,
      href: "/exercise-reminders",
    },
    {
      title: "Exercise Plans",
      icon: <Zap className="h-4 w-4" />,
      href: "/exercise-plans",
    },
    {
      title: "Sleep Tracker",
      icon: <Moon className="h-4 w-4" />,
      href: "/sleep-tracker",
    },
    {
      title: "Sitting Duration",
      icon: <Calendar className="h-4 w-4" />,
      href: "/sitting-duration",
    },
    {
      title: "Profile",
      icon: <User className="h-4 w-4" />,
      href: "/profile",
    },
    {
      title: "Community",
      icon: <Users className="h-4 w-4" />,
      href: "/community",
    },
    {
      title: "Doctor Schedule",
      icon: <Heart className="h-4 w-4" />,
      href: "/doctor-schedule",
    },
    {
      title: "Gym Finder",
      icon: <MapPin className="h-4 w-4" />,
      href: "/gym-finder",
    },
    {
      title: "Mood Journal",
      icon: <MessageSquare className="h-4 w-4" />,
      href: "/mood-journal",
    },
  ]

  return (
    <Sidebar className="hidden md:block">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="font-poppins text-xl font-bold text-soft-blue">HealthySpine</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href} className={pathname === item.href ? "text-soft-blue" : ""}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt={userName} />
              <AvatarFallback className="bg-soft-blue text-white">{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{userName}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
