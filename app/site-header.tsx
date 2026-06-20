"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { useSiteData } from "@/lib/site-data-context"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Нүүр" },
  { href: "/products", label: "Бүтээгдэхүүн" },
  { href: "/projects", label: "Төслүүд" },
  { href: "/partners", label: "Хамтрагчид" },
  { href: "/about", label: "Бидний тухай" },
  { href: "/contact", label: "Холбоо барих" },
]

export function SiteHeader() {
  const { data } = useSiteData()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-sidebar text-sidebar-foreground shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src={data.companyInfo.logo || "/logo.png"}
                alt={data.companyInfo.name}
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-sm leading-tight">{data.companyInfo.name}</div>
              <div className="text-[10px] text-sidebar-foreground/60">Төмөр бетон эдлэлийн үйлдвэр</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Phone + mobile toggle */}
          <div className="flex items-center gap-3">
            {data.companyInfo.phone && (
              <a
                href={`tel:${data.companyInfo.phone}`}
                className="hidden sm:flex items-center gap-2 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                {data.companyInfo.phone}
              </a>
            )}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-sidebar-accent"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Цэс нээх"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-sidebar-border py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
            {data.companyInfo.phone && (
              <a
                href={`tel:${data.companyInfo.phone}`}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-sidebar-foreground/70"
              >
                <Phone className="h-4 w-4" />
                {data.companyInfo.phone}
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
