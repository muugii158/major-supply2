"use client"

import { cn } from "@/lib/utils"
import type { Section } from "@/app/page"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Briefcase,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Eye,
  BarChart3,
  MessageCircle,
  ImageIcon,
  Info,
  Phone,
  X,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
  isOpen: boolean
  onToggle: () => void
  isMobile?: boolean
}

const menuItems: { id: Section; label: string; icon: React.ReactNode; badge?: string; divider?: boolean }[] = [
  { id: "dashboard", label: "Удирдлагын Самбар", icon: <LayoutDashboard className="h-5 w-5" /> },
  { id: "analytics", label: "Хандалтын статистик", icon: <BarChart3 className="h-5 w-5" />, divider: true },
  { id: "hero", label: "Нүүр хуудасны слайдер", icon: <ImageIcon className="h-5 w-5" /> },
  { id: "products", label: "Бүтээгдэхүүн", icon: <Package className="h-5 w-5" /> },
  { id: "categories", label: "Ангиллууд", icon: <FolderTree className="h-5 w-5" /> },
  { id: "projects", label: "Төслүүд", icon: <Briefcase className="h-5 w-5" /> },
  { id: "partners", label: "Хамтрагчид", icon: <Users className="h-5 w-5" /> },
  { id: "about", label: "Бидний тухай", icon: <Info className="h-5 w-5" /> },
  { id: "contact", label: "Холбоо барих", icon: <Phone className="h-5 w-5" />, divider: true },
  { id: "facebook", label: "Facebook", icon: <MessageCircle className="h-5 w-5" />, badge: "2" },
  { id: "preview", label: "Хэрэглэгч шиг харах", icon: <Eye className="h-5 w-5" />, divider: true },
  { id: "settings", label: "Тохиргоо", icon: <Settings className="h-5 w-5" /> },
]

export function Sidebar({ activeSection, onSectionChange, isOpen, onToggle, isMobile }: SidebarProps) {
  // On mobile: sidebar slides in/out as a fixed drawer
  // On desktop: sidebar stays in flow and toggles between collapsed/expanded
  const widthDesktop = isOpen ? 280 : 80
  const showLabels = isMobile ? isOpen : isOpen

  return (
    <motion.aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border",
        isMobile
          ? "fixed inset-y-0 left-0 z-40 w-[280px] shadow-2xl"
          : "relative"
      )}
      initial={false}
      animate={
        isMobile
          ? { x: isOpen ? 0 : -300 }
          : { width: widthDesktop, x: 0 }
      }
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden">
          <Image
            src="/logo.png"
            alt="Major Supply LLC Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <AnimatePresence>
          {showLabels && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden flex-1 min-w-0"
            >
              <h1 className="font-bold text-sidebar-foreground text-sm leading-tight truncate">
                MAJOR SUPPLY
              </h1>
              <p className="text-[10px] text-sidebar-foreground/60 truncate">
                Төмөр бетон эдлэлийн үйлдвэр
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {isMobile && (
          <button
            onClick={onToggle}
            className="flex-shrink-0 p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/70"
            aria-label="Хаах"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item, index) => (
            <li key={item.id}>
              {item.divider && index > 0 && (
                <div className="my-3 border-t border-sidebar-border" />
              )}
              <button
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "relative w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                  "hover:bg-sidebar-accent",
                  activeSection === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <AnimatePresence>
                  {showLabels && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 text-sm font-medium whitespace-nowrap overflow-hidden text-left"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && showLabels && (
                  <span className="ml-auto px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full">
                    {item.badge}
                  </span>
                )}
                {item.badge && !showLabels && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Toggle Button — desktop only */}
      {!isMobile && (
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 bg-sidebar-primary text-sidebar-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label={isOpen ? "Цэс багасгах" : "Цэс өргөтгөх"}
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <AnimatePresence>
          {showLabels && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] text-sidebar-foreground/50 text-center"
            >
              2024 Major Supply LLC
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  )
}
