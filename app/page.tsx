"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/admin/sidebar"
import { Header } from "@/components/admin/header"
import { DashboardSection } from "@/components/admin/sections/dashboard"
import { ProductsSection } from "@/components/admin/sections/products"
import { CategoriesSection } from "@/components/admin/sections/categories"
import { ProjectsSection } from "@/components/admin/sections/projects"
import { PartnersSection } from "@/components/admin/sections/partners"
import { SettingsSection } from "@/components/admin/sections/settings"
import { UserPreview } from "@/components/admin/sections/user-preview"
import { AnalyticsSection } from "@/components/admin/sections/analytics"
import { FacebookSection } from "@/components/admin/sections/facebook"
import { HeroSliderSection } from "@/components/admin/sections/hero-slider"
import { AboutUsSection } from "@/components/admin/sections/about-us"
import { ContactSection } from "@/components/admin/sections/contact"
import { AnimatePresence, motion } from "framer-motion"

export type Section = "dashboard" | "products" | "categories" | "projects" | "partners" | "settings" | "preview" | "analytics" | "facebook" | "hero" | "about" | "contact"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile and adjust sidebar default state
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // On mobile, sidebar starts closed; on desktop it starts open
      setSidebarOpen(!mobile)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const handleSectionChange = (section: Section) => {
    setActiveSection(section)
    // Auto-close sidebar on mobile after selecting a section
    if (isMobile) setSidebarOpen(false)
  }

  const renderSection = () => {
    const sectionProps = {
      key: activeSection,
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3, ease: "easeOut" }
    }

    switch (activeSection) {
      case "dashboard":
        return <motion.div {...sectionProps}><DashboardSection /></motion.div>
      case "products":
        return <motion.div {...sectionProps}><ProductsSection /></motion.div>
      case "categories":
        return <motion.div {...sectionProps}><CategoriesSection /></motion.div>
      case "projects":
        return <motion.div {...sectionProps}><ProjectsSection /></motion.div>
      case "partners":
        return <motion.div {...sectionProps}><PartnersSection /></motion.div>
      case "settings":
        return <motion.div {...sectionProps}><SettingsSection /></motion.div>
      case "preview":
        return <motion.div {...sectionProps}><UserPreview /></motion.div>
      case "analytics":
        return <motion.div {...sectionProps}><AnalyticsSection /></motion.div>
      case "facebook":
        return <motion.div {...sectionProps}><FacebookSection /></motion.div>
      case "hero":
        return <motion.div {...sectionProps}><HeroSliderSection /></motion.div>
      case "about":
        return <motion.div {...sectionProps}><AboutUsSection /></motion.div>
      case "contact":
        return <motion.div {...sectionProps}><ContactSection /></motion.div>
      default:
        return <motion.div {...sectionProps}><DashboardSection /></motion.div>
    }
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
      />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
