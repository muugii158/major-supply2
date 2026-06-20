"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"

// =============================================
// TYPES
// =============================================
export interface HeroSlide {
  id: string
  image: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  isActive: boolean
  order: number
}

export interface Category {
  id: string
  title: string
  description: string
  productCount: number
}

export interface Product {
  id: string
  title: string
  category: string
  description: string
  details: string
  image: string | null
}

export interface Project {
  id: string
  title: string
  description: string
  location: string
  year: string
  image: string | null
}

export interface Partner {
  id: string
  name: string
  logo: string | null
  description: string
  projects: string[]
  website: string
  contactPerson: string
  phone: string
  email?: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  image: string
  bio: string
}

export interface GalleryImage {
  id: string
  url: string
  caption: string
}

export interface AboutContent {
  mainTitle: string
  mainDescription: string
  mission: string
  vision: string
  history: string
  images: GalleryImage[]
  stats: { label: string; value: string }[]
  team: TeamMember[]
}

export interface ContactInfo {
  id: string
  type: "phone" | "email" | "address" | "hours"
  label: string
  value: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
}

export interface Branch {
  id: string
  name: string
  address: string
  phone: string
  email: string
  hours: string
  mapUrl: string
  image: string
}

export interface ContactContent {
  pageTitle: string
  pageDescription: string
  mainInfo: ContactInfo[]
  socialLinks: SocialLink[]
  branches: Branch[]
  formSettings: {
    enabled: boolean
    emailTo: string
    successMessage: string
  }
}

export interface CompanyInfo {
  name: string
  phone: string
  email: string
  address: string
  logo: string
}

export interface SiteData {
  companyInfo: CompanyInfo
  heroSlides: HeroSlide[]
  categories: Category[]
  products: Product[]
  projects: Project[]
  partners: Partner[]
  aboutContent: AboutContent
  contactContent: ContactContent
}

// =============================================
// DEFAULT DATA
// =============================================
const defaultData: SiteData = {
  companyInfo: {
    name: "Major Supply LLC",
    phone: "+976 9999-8888",
    email: "info@majorsupply.mn",
    address: "Улаанбаатар хот, Баянзүрх дүүрэг, 1-р хороо",
    logo: "/logo.png",
  },
  heroSlides: [],
  categories: [],
  products: [],
  projects: [],
  partners: [],
  aboutContent: {
    mainTitle: "Бидний тухай",
    mainDescription: "",
    mission: "",
    vision: "",
    history: "",
    images: [],
    stats: [],
    team: [],
  },
  contactContent: {
    pageTitle: "Холбоо барих",
    pageDescription: "",
    mainInfo: [],
    socialLinks: [],
    branches: [],
    formSettings: {
      enabled: true,
      emailTo: "",
      successMessage: "Таны хүсэлт амжилттай илгээгдлээ.",
    },
  },
}

// =============================================
// CONTEXT
// =============================================
interface SiteDataContextValue {
  data: SiteData
  loading: boolean
  setHeroSlides: (fn: (prev: HeroSlide[]) => HeroSlide[]) => void
  setCategories: (fn: (prev: Category[]) => Category[]) => void
  setProducts: (fn: (prev: Product[]) => Product[]) => void
  setProjects: (fn: (prev: Project[]) => Project[]) => void
  setPartners: (fn: (prev: Partner[]) => Partner[]) => void
  setAboutContent: (fn: (prev: AboutContent) => AboutContent) => void
  setContactContent: (fn: (prev: ContactContent) => ContactContent) => void
  setCompanyInfo: (info: CompanyInfo) => void
  refetch: () => void
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null)

// =============================================
// HELPER: base64 зургийг Supabase Storage-д upload хийх
// =============================================
async function uploadBase64Image(base64: string, bucket: string, path: string): Promise<string> {
  try {
    if (!base64 || base64.startsWith("/") || base64.startsWith("http")) {
      return base64
    }
    const base64Data = base64.split(",")[1]
    const mimeType = base64.split(";")[0].split(":")[1] || "image/jpeg"
    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: mimeType })
    const ext = mimeType.split("/")[1] || "jpg"
    const fileName = `${path}-${Date.now()}.${ext}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, blob, { contentType: mimeType, upsert: true })

    if (error) return base64

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
    return urlData.publicUrl
  } catch {
    return base64
  }
}

// =============================================
// PROVIDER
// =============================================
export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData)
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [
        { data: companyRows },
        { data: slides },
        { data: cats },
        { data: prods },
        { data: projs },
        { data: parts },
        { data: abouts },
        { data: contacts },
      ] = await Promise.all([
        supabase.from("company_info").select("*").limit(1),
        supabase.from("hero_slides").select("*").order("order"),
        supabase.from("categories").select("*").order("created_at"),
        supabase.from("products").select("*").order("created_at"),
        supabase.from("projects").select("*").order("created_at"),
        supabase.from("partners").select("*").order("created_at"),
        supabase.from("about_content").select("*").limit(1),
        supabase.from("contact_content").select("*").limit(1),
      ])

      const company = companyRows?.[0]
      const about = abouts?.[0]
      const contact = contacts?.[0]

      setData({
        companyInfo: company
          ? {
              name: company.name,
              phone: company.phone,
              email: company.email,
              address: company.address,
              logo: company.logo || "/logo.png",
            }
          : defaultData.companyInfo,

        heroSlides: (slides || []).map((s) => ({
          id: s.id,
          image: s.image || "",
          title: s.title,
          subtitle: s.subtitle || "",
          buttonText: s.button_text || "",
          buttonLink: s.button_link || "",
          isActive: s.is_active,
          order: s.order,
        })),

        categories: (cats || []).map((c) => ({
          id: c.id,
          title: c.title,
          description: c.description || "",
          productCount: 0,
        })),

        products: (prods || []).map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category || "",
          description: p.description || "",
          details: p.details || "",
          image: p.image,
        })),

        projects: (projs || []).map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description || "",
          location: p.location || "",
          year: p.year || "",
          image: p.image,
        })),

        partners: (parts || []).map((p) => ({
          id: p.id,
          name: p.name,
          logo: p.logo,
          description: p.description || "",
          projects: p.projects || [],
          website: p.website || "",
          contactPerson: p.contact_person || "",
          phone: p.phone || "",
          email: p.email,
        })),

        aboutContent: about
          ? {
              mainTitle: about.main_title || "",
              mainDescription: about.main_description || "",
              mission: about.mission || "",
              vision: about.vision || "",
              history: about.history || "",
              images: about.images || [],
              stats: about.stats || [],
              team: about.team || [],
            }
          : defaultData.aboutContent,

        contactContent: contact
          ? {
              pageTitle: contact.page_title || "",
              pageDescription: contact.page_description || "",
              mainInfo: contact.main_info || [],
              socialLinks: contact.social_links || [],
              branches: contact.branches || [],
              formSettings: contact.form_settings || defaultData.contactContent.formSettings,
            }
          : defaultData.contactContent,
      })
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  // =============================================
  // SETTERS — Supabase-д хадгалах
  // =============================================

  const setHeroSlides = useCallback(async (fn: (prev: HeroSlide[]) => HeroSlide[]) => {
    const next = fn(data.heroSlides)

    // Зургуудыг upload хийх
    const processed = await Promise.all(
      next.map(async (s) => ({
        ...s,
        image: s.image ? await uploadBase64Image(s.image, "images", `slide-${s.id}`) : "",
      }))
    )

    setData((prev) => ({ ...prev, heroSlides: processed }))

    // Supabase sync
    const existing = await supabase.from("hero_slides").select("id")
    const existingIds = (existing.data || []).map((r) => r.id)
    const nextIds = processed.map((s) => s.id)

    // Устгах
    const toDelete = existingIds.filter((id) => !nextIds.includes(id))
    if (toDelete.length > 0) {
      await supabase.from("hero_slides").delete().in("id", toDelete)
    }

    // Upsert
    await supabase.from("hero_slides").upsert(
      processed.map((s) => ({
        id: s.id,
        image: s.image,
        title: s.title,
        subtitle: s.subtitle,
        button_text: s.buttonText,
        button_link: s.buttonLink,
        is_active: s.isActive,
        order: s.order,
      }))
    )
  }, [data.heroSlides])

  const setCategories = useCallback(async (fn: (prev: Category[]) => Category[]) => {
    const next = fn(data.categories)
    setData((prev) => ({ ...prev, categories: next }))

    const existing = await supabase.from("categories").select("id")
    const existingIds = (existing.data || []).map((r) => r.id)
    const nextIds = next.map((c) => c.id)

    const toDelete = existingIds.filter((id) => !nextIds.includes(id))
    if (toDelete.length > 0) {
      await supabase.from("categories").delete().in("id", toDelete)
    }

    await supabase.from("categories").upsert(
      next.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
      }))
    )
  }, [data.categories])

  const setProducts = useCallback(async (fn: (prev: Product[]) => Product[]) => {
    const next = fn(data.products)

    const processed = await Promise.all(
      next.map(async (p) => ({
        ...p,
        image: p.image ? await uploadBase64Image(p.image, "images", `product-${p.id}`) : null,
      }))
    )

    setData((prev) => ({ ...prev, products: processed }))

    const existing = await supabase.from("products").select("id")
    const existingIds = (existing.data || []).map((r) => r.id)
    const nextIds = processed.map((p) => p.id)

    const toDelete = existingIds.filter((id) => !nextIds.includes(id))
    if (toDelete.length > 0) {
      await supabase.from("products").delete().in("id", toDelete)
    }

    await supabase.from("products").upsert(
      processed.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        description: p.description,
        details: p.details,
        image: p.image,
      }))
    )
  }, [data.products])

  const setProjects = useCallback(async (fn: (prev: Project[]) => Project[]) => {
    const next = fn(data.projects)

    const processed = await Promise.all(
      next.map(async (p) => ({
        ...p,
        image: p.image ? await uploadBase64Image(p.image, "images", `project-${p.id}`) : null,
      }))
    )

    setData((prev) => ({ ...prev, projects: processed }))

    const existing = await supabase.from("projects").select("id")
    const existingIds = (existing.data || []).map((r) => r.id)
    const nextIds = processed.map((p) => p.id)

    const toDelete = existingIds.filter((id) => !nextIds.includes(id))
    if (toDelete.length > 0) {
      await supabase.from("projects").delete().in("id", toDelete)
    }

    await supabase.from("projects").upsert(
      processed.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        location: p.location,
        year: p.year,
        image: p.image,
      }))
    )
  }, [data.projects])

  const setPartners = useCallback(async (fn: (prev: Partner[]) => Partner[]) => {
    const next = fn(data.partners)

    const processed = await Promise.all(
      next.map(async (p) => ({
        ...p,
        logo: p.logo ? await uploadBase64Image(p.logo, "images", `partner-${p.id}`) : null,
      }))
    )

    setData((prev) => ({ ...prev, partners: processed }))

    const existing = await supabase.from("partners").select("id")
    const existingIds = (existing.data || []).map((r) => r.id)
    const nextIds = processed.map((p) => p.id)

    const toDelete = existingIds.filter((id) => !nextIds.includes(id))
    if (toDelete.length > 0) {
      await supabase.from("partners").delete().in("id", toDelete)
    }

    await supabase.from("partners").upsert(
      processed.map((p) => ({
        id: p.id,
        name: p.name,
        logo: p.logo,
        description: p.description,
        projects: p.projects,
        website: p.website,
        contact_person: p.contactPerson,
        phone: p.phone,
        email: p.email,
      }))
    )
  }, [data.partners])

  const setAboutContent = useCallback(async (fn: (prev: AboutContent) => AboutContent) => {
    const next = fn(data.aboutContent)
    setData((prev) => ({ ...prev, aboutContent: next }))

    const { data: existing } = await supabase.from("about_content").select("id").limit(1)
    const id = existing?.[0]?.id

    const row = {
      main_title: next.mainTitle,
      main_description: next.mainDescription,
      mission: next.mission,
      vision: next.vision,
      history: next.history,
      images: next.images,
      stats: next.stats,
      team: next.team,
      updated_at: new Date().toISOString(),
    }

    if (id) {
      await supabase.from("about_content").update(row).eq("id", id)
    } else {
      await supabase.from("about_content").insert(row)
    }
  }, [data.aboutContent])

  const setContactContent = useCallback(async (fn: (prev: ContactContent) => ContactContent) => {
    const next = fn(data.contactContent)
    setData((prev) => ({ ...prev, contactContent: next }))

    const { data: existing } = await supabase.from("contact_content").select("id").limit(1)
    const id = existing?.[0]?.id

    const row = {
      page_title: next.pageTitle,
      page_description: next.pageDescription,
      main_info: next.mainInfo,
      social_links: next.socialLinks,
      branches: next.branches,
      form_settings: next.formSettings,
      updated_at: new Date().toISOString(),
    }

    if (id) {
      await supabase.from("contact_content").update(row).eq("id", id)
    } else {
      await supabase.from("contact_content").insert(row)
    }
  }, [data.contactContent])

  const setCompanyInfo = useCallback(async (info: CompanyInfo) => {
    const logo = info.logo
      ? await uploadBase64Image(info.logo, "images", "company-logo")
      : info.logo

    const updated = { ...info, logo }
    setData((prev) => ({ ...prev, companyInfo: updated }))

    const { data: existing } = await supabase.from("company_info").select("id").limit(1)
    const id = existing?.[0]?.id

    const row = {
      name: updated.name,
      phone: updated.phone,
      email: updated.email,
      address: updated.address,
      logo: updated.logo,
      updated_at: new Date().toISOString(),
    }

    if (id) {
      await supabase.from("company_info").update(row).eq("id", id)
    } else {
      await supabase.from("company_info").insert(row)
    }
  }, [data.companyInfo])

  return (
    <SiteDataContext.Provider
      value={{
        data,
        loading,
        setHeroSlides,
        setCategories,
        setProducts,
        setProjects,
        setPartners,
        setAboutContent,
        setContactContent,
        setCompanyInfo,
        refetch: fetchAll,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider")
  return ctx
}
