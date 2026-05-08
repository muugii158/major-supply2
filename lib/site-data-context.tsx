"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

// =====================
// Types
// =====================

export interface CompanyInfo {
  name: string
  phone: string
  email: string
  address: string
  logo: string | null
}

export interface Product {
  id: string
  title: string
  category: string
  description: string
  details: string
  image: string | null
}

export interface Category {
  id: string
  title: string
  description: string
  productCount: number
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

export interface AboutImage {
  id: string
  url: string
  caption: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  image: string
  bio: string
}

export interface AboutContent {
  mainTitle: string
  mainDescription: string
  mission: string
  vision: string
  history: string
  images: AboutImage[]
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

export interface SiteData {
  companyInfo: CompanyInfo
  products: Product[]
  categories: Category[]
  projects: Project[]
  partners: Partner[]
  heroSlides: HeroSlide[]
  aboutContent: AboutContent
  contactContent: ContactContent
}

// =====================
// Default / Initial Data
// =====================

const defaultData: SiteData = {
  companyInfo: {
    name: "Major Supply LLC",
    phone: "+976 9999-8888",
    email: "info@majorsupply.mn",
    address: "Улаанбаатар хот, Баянзүрх дүүрэг, 1-р хороо",
    logo: "/logo.png",
  },
  products: [
    {
      id: "1",
      title: "Армирован Бетон Дамнуруу",
      category: "Дамнуруу",
      description:
        "Өндөр хүчин чадалтай армирован бетон дамнуруу. Барилгын суурь, хана, шал зэрэгт хэрэглэнэ.",
      details: "Шахалтын бат бэх: 500 кг/см², Арматур: A500C",
      image: null,
    },
    {
      id: "2",
      title: "Төмөр Бетон Шон",
      category: "Шон",
      description:
        "Цахилгаан, холбооны шугам татахад зориулагдсан бетон шон.",
      details: "Өндөр: 9м, 11м, 13м, Даац: 500кг",
      image: null,
    },
  ],
  categories: [
    { id: "1", title: "Дамнуруу", description: "Армирован бетон дамнуруу, гүүрийн дамнуруу", productCount: 0 },
    { id: "2", title: "Шон", description: "Цахилгааны шон, холбооны шон, гэрэлтүүлгийн шон", productCount: 0 },
    { id: "3", title: "Хавтан", description: "Дээврийн хавтан, шалны хавтан, хана хавтан", productCount: 0 },
    { id: "4", title: "Блок", description: "Хөнгөн бетон блок, керамзит блок, фундаментийн блок", productCount: 0 },
    { id: "5", title: "Хоолой", description: "Канализацийн хоолой, ус дамжуулах хоолой", productCount: 0 },
  ],
  projects: [
    {
      id: "1",
      title: "Худалдааны Төв Барилга",
      description: "25,000 м² талбай бүхий орчин үеийн худалдааны төв барилга. Бүх төрлийн төмөр бетон эдлэлээр хангасан.",
      location: "Улаанбаатар хот",
      year: "2024",
      image: null,
    },
    {
      id: "2",
      title: "Орон Сууцны Хороолол",
      description: "500 айлын орон сууцны хороолол. Суурь, шат, хана хавтан зэргийг нийлүүлсэн.",
      location: "Дархан хот",
      year: "2023",
      image: null,
    },
    {
      id: "3",
      title: "Үйлдвэрийн Байр",
      description: "Хүнд үйлдвэрийн зориулалттай 15,000 м² талбай бүхий байр. Армирован бетон дамнуруу ашигласан.",
      location: "Эрдэнэт хот",
      year: "2023",
      image: null,
    },
  ],
  partners: [
    {
      id: "1",
      name: "Монгол Барилга ХХК",
      logo: null,
      description: "Барилгын үндсэн түүхий эдээр хангадаг гол түнш",
      projects: ["Төв цэвэрлэх байгууламж", "Дархан шинэ хороолол"],
      website: "www.mongolbarillga.mn",
      contactPerson: "Б. Болд",
      phone: "9911-1234",
      email: "info@mongolbarillga.mn",
    },
    {
      id: "2",
      name: "Эрдэнэт Барилга",
      logo: null,
      description: "Эрдэнэт хотын барилгын төслүүдийн гүйцэтгэгч",
      projects: ["Эрдэнэт ус татуурга"],
      website: "",
      contactPerson: "Д. Дорж",
      phone: "9922-5678",
      email: "erdenet@construction.mn",
    },
    {
      id: "3",
      name: "ABC Construction",
      logo: null,
      description: "Олон улсын стандартын барилгын материал",
      projects: ["Оюу толгой дэд бүтэц", "Говийн бүс нутаг хөгжил"],
      website: "www.abcconstruction.com",
      contactPerson: "John Smith",
      phone: "9933-9999",
      email: "contact@abcconstruction.com",
    },
    {
      id: "4",
      name: "Дархан Метал",
      logo: null,
      description: "Металл бүтээцийн гол нийлүүлэгч",
      projects: ["Дарханы ус хангамж"],
      website: "",
      contactPerson: "С. Сүхбат",
      phone: "9944-1111",
      email: "sales@darkhanmetal.mn",
    },
  ],
  heroSlides: [
    {
      id: "1",
      image: "",
      title: "Төмөр бетон эдлэлийн үйлдвэр",
      subtitle: "Монгол улсын тэргүүлэгч барилгын материалын үйлдвэрлэгч",
      buttonText: "Дэлгэрэнгүй",
      buttonLink: "/about",
      isActive: true,
      order: 1,
    },
    {
      id: "2",
      image: "",
      title: "Чанартай бүтээгдэхүүн",
      subtitle: "Олон улсын стандартад нийцсэн төмөр бетон эдлэлүүд",
      buttonText: "Бүтээгдэхүүн харах",
      buttonLink: "/products",
      isActive: true,
      order: 2,
    },
    {
      id: "3",
      image: "",
      title: "Итгэлтэй түншлэл",
      subtitle: "100+ томоохон төсөлд амжилттай хамтран ажилласан",
      buttonText: "Төслүүд харах",
      buttonLink: "/projects",
      isActive: true,
      order: 3,
    },
  ],
  aboutContent: {
    mainTitle: "Бидний тухай",
    mainDescription:
      "Major Supply LLC нь 2010 онд үүсгэн байгуулагдсан бөгөөд Монгол улсын барилгын салбарт төмөр бетон эдлэл үйлдвэрлэх, нийлүүлэх чиглэлээр тэргүүлэгч компани юм. Бид олон улсын стандартад нийцсэн, чанартай бүтээгдэхүүн үйлдвэрлэж, харилцагч байгууллагуудадаа итгэлтэй түншлэлийг санал болгодог.",
    mission:
      "Монгол улсын барилгын салбарт дэлхийн жишигт нийцсэн чанартай төмөр бетон эдлэлийг хүргэж, тогтвортой хөгжилд хувь нэмэр оруулах.",
    vision:
      "Төв Азийн бүс нутагт төмөр бетон эдлэлийн үйлдвэрлэлээр тэргүүлэгч компани болох.",
    history:
      "2010 онд 20 ажилтантайгаар үйл ажиллагаагаа эхэлсэн бид өнөөдөр 200 гаруй ажилтантай, орчин үеийн тоног төхөөрөмжөөр тоноглогдсон үйлдвэртэй болсон.",
    images: [],
    stats: [
      { label: "Жилийн туршлага", value: "15+" },
      { label: "Амжилттай төсөл", value: "500+" },
      { label: "Ажилтнууд", value: "200+" },
      { label: "Хамтрагч байгууллага", value: "50+" },
    ],
    team: [
      {
        id: "1",
        name: "Б. Батболд",
        position: "Гүйцэтгэх захирал",
        image: "",
        bio: "20 жилийн туршлагатай удирдах ажилтан",
      },
      {
        id: "2",
        name: "Д. Дэлгэрмаа",
        position: "Санхүүгийн захирал",
        image: "",
        bio: "Санхүү, нягтлан бодох бүртгэлийн мэргэжилтэн",
      },
    ],
  },
  contactContent: {
    pageTitle: "Холбоо барих",
    pageDescription: "Бидэнтэй холбогдох хамгийн хурдан арга замууд",
    mainInfo: [
      { id: "1", type: "phone", label: "Утас", value: "+976 7000 1234" },
      { id: "2", type: "phone", label: "Факс", value: "+976 7000 1235" },
      { id: "3", type: "email", label: "И-мэйл", value: "info@majorsupply.mn" },
      {
        id: "4",
        type: "address",
        label: "Хаяг",
        value: "Улаанбаатар хот, Баянзүрх дүүрэг, 1-р хороо, Төв зам 100",
      },
      { id: "5", type: "hours", label: "Ажлын цаг", value: "Даваа - Баасан: 09:00 - 18:00" },
    ],
    socialLinks: [
      { id: "1", platform: "Facebook", url: "https://facebook.com/majorsupply", icon: "facebook" },
      { id: "2", platform: "Instagram", url: "https://instagram.com/majorsupply", icon: "instagram" },
      { id: "3", platform: "Website", url: "https://majorsupply.mn", icon: "globe" },
    ],
    branches: [
      {
        id: "1",
        name: "Төв оффис",
        address: "Улаанбаатар хот, Баянзүрх дүүрэг, 1-р хороо",
        phone: "+976 7000 1234",
        email: "office@majorsupply.mn",
        hours: "09:00 - 18:00",
        mapUrl: "https://maps.google.com",
        image: "",
      },
      {
        id: "2",
        name: "Үйлдвэр",
        address: "Төв аймаг, Зуунмод сум",
        phone: "+976 7000 5678",
        email: "factory@majorsupply.mn",
        hours: "08:00 - 17:00",
        mapUrl: "https://maps.google.com",
        image: "",
      },
    ],
    formSettings: {
      enabled: true,
      emailTo: "info@majorsupply.mn",
      successMessage:
        "Таны хүсэлт амжилттай илгээгдлээ. Бид тантай удахгүй холбогдох болно.",
    },
  },
}

// =====================
// Context
// =====================

interface SiteDataContextValue {
  data: SiteData
  hydrated: boolean
  setCompanyInfo: (info: CompanyInfo) => void
  setProducts: (next: Product[] | ((prev: Product[]) => Product[])) => void
  setCategories: (next: Category[] | ((prev: Category[]) => Category[])) => void
  setProjects: (next: Project[] | ((prev: Project[]) => Project[])) => void
  setPartners: (next: Partner[] | ((prev: Partner[]) => Partner[])) => void
  setHeroSlides: (next: HeroSlide[] | ((prev: HeroSlide[]) => HeroSlide[])) => void
  setAboutContent: (next: AboutContent | ((prev: AboutContent) => AboutContent)) => void
  setContactContent: (next: ContactContent | ((prev: ContactContent) => ContactContent)) => void
  resetAll: () => void
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null)

const STORAGE_KEY = "major-supply:site-data:v1"

function loadFromStorage(): SiteData | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return { ...defaultData, ...parsed } as SiteData
  } catch {
    return null
  }
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData)
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    const stored = loadFromStorage()
    if (stored) setData(stored)
    setHydrated(true)
  }, [])

  // Persist to localStorage when data changes (after hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // ignore quota errors silently
    }
  }, [data, hydrated])

  const value: SiteDataContextValue = {
    data,
    hydrated,
    setCompanyInfo: (companyInfo) => setData((d) => ({ ...d, companyInfo })),
    setProducts: (next) =>
      setData((d) => ({
        ...d,
        products: typeof next === "function" ? (next as (p: Product[]) => Product[])(d.products) : next,
      })),
    setCategories: (next) =>
      setData((d) => ({
        ...d,
        categories: typeof next === "function" ? (next as (p: Category[]) => Category[])(d.categories) : next,
      })),
    setProjects: (next) =>
      setData((d) => ({
        ...d,
        projects: typeof next === "function" ? (next as (p: Project[]) => Project[])(d.projects) : next,
      })),
    setPartners: (next) =>
      setData((d) => ({
        ...d,
        partners: typeof next === "function" ? (next as (p: Partner[]) => Partner[])(d.partners) : next,
      })),
    setHeroSlides: (next) =>
      setData((d) => ({
        ...d,
        heroSlides: typeof next === "function" ? (next as (p: HeroSlide[]) => HeroSlide[])(d.heroSlides) : next,
      })),
    setAboutContent: (next) =>
      setData((d) => ({
        ...d,
        aboutContent:
          typeof next === "function" ? (next as (p: AboutContent) => AboutContent)(d.aboutContent) : next,
      })),
    setContactContent: (next) =>
      setData((d) => ({
        ...d,
        contactContent:
          typeof next === "function" ? (next as (p: ContactContent) => ContactContent)(d.contactContent) : next,
      })),
    resetAll: () => {
      setData(defaultData)
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {
        // ignore
      }
    },
  }

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) {
    throw new Error("useSiteData must be used within SiteDataProvider")
  }
  return ctx
}
