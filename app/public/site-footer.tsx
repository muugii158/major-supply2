"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react"
import { useSiteData } from "@/lib/site-data-context"

export function SiteFooter() {
  const { data } = useSiteData()
  const { companyInfo, contactContent } = data

  const phone = contactContent.mainInfo.find((i) => i.type === "phone")?.value || companyInfo.phone
  const email = contactContent.mainInfo.find((i) => i.type === "email")?.value || companyInfo.email
  const address = contactContent.mainInfo.find((i) => i.type === "address")?.value || companyInfo.address

  return (
    <footer className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Компани */}
          <div className="space-y-3">
            <h3 className="font-bold text-base">{companyInfo.name}</h3>
            <p className="text-sm text-sidebar-foreground/60 leading-relaxed">
              Монгол улсын тэргүүлэгч төмөр бетон эдлэлийн үйлдвэрлэгч.
            </p>
          </div>

          {/* Холбоос */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-sidebar-foreground/60">Холбоос</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/products", label: "Бүтээгдэхүүн" },
                { href: "/projects", label: "Төслүүд" },
                { href: "/partners", label: "Хамтрагчид" },
                { href: "/about", label: "Бидний тухай" },
                { href: "/contact", label: "Холбоо барих" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Холбоо барих */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-sidebar-foreground/60">Холбоо барих</h3>
            <ul className="space-y-2 text-sm">
              {phone && (
                <li>
                  <a href={`tel:${phone}`} className="flex items-center gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="flex items-center gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    {email}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-2 text-sidebar-foreground/70">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  {address}
                </li>
              )}
            </ul>
          </div>

          {/* Сошиал */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-sidebar-foreground/60">Сошиал хаяг</h3>
            <div className="flex gap-3">
              {contactContent.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-sidebar-accent hover:bg-sidebar-primary transition-colors"
                  aria-label={social.platform}
                >
                  {social.icon === "facebook" && <Facebook className="h-4 w-4" />}
                  {social.icon === "instagram" && <Instagram className="h-4 w-4" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-sidebar-border flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-sidebar-foreground/50">
          <p>© {new Date().getFullYear()} {companyInfo.name}. Бүх эрх хуулиар хамгаалагдсан.</p>
          <Link href="/admin" className="hover:text-sidebar-foreground transition-colors">
            Админ
          </Link>
        </div>
      </div>
    </footer>
  )
}
