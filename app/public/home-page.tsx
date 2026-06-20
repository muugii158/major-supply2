"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Package, Briefcase, Users, ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSiteData } from "@/lib/site-data-context"
import { motion, AnimatePresence } from "framer-motion"

export default function HomePage() {
  const { data } = useSiteData()
  const [currentSlide, setCurrentSlide] = useState(0)

  const activeSlides = useMemo(
    () => data.heroSlides.filter((s) => s.isActive).sort((a, b) => a.order - b.order),
    [data.heroSlides]
  )

  // Auto slide
  useEffect(() => {
    if (activeSlides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [activeSlides.length])

  const safeSlide = activeSlides[currentSlide] ?? null

  const featuredProducts = data.products.slice(0, 4)
  const featuredProjects = data.projects.slice(0, 3)

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[400px] md:h-[560px] overflow-hidden bg-sidebar">
        <AnimatePresence mode="wait">
          {safeSlide ? (
            <motion.div
              key={safeSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              {safeSlide.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={safeSlide.image}
                  alt={safeSlide.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-6xl px-4 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-2xl space-y-4 text-white"
                  >
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                      {safeSlide.title}
                    </h1>
                    <p className="text-sm md:text-lg text-white/85">
                      {safeSlide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href={safeSlide.buttonLink || "/about"}>
                          {safeSlide.buttonText || "Дэлгэрэнгүй"}
                        </Link>
                      </Button>
                      <Button asChild variant="secondary">
                        <Link href="/contact">Үнийн санал авах</Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sidebar to-sidebar/80 flex items-center justify-center">
              <div className="text-center text-white space-y-4 px-4">
                <h1 className="text-3xl md:text-5xl font-bold">{data.companyInfo.name}</h1>
                <p className="text-white/80">Монгол улсын тэргүүлэгч төмөр бетон эдлэлийн үйлдвэрлэгч</p>
                <div className="flex flex-wrap gap-3 justify-center pt-2">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/products">Бүтээгдэхүүн харах</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/contact">Холбоо барих</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Slider controls */}
        {activeSlides.length > 1 && (
          <>
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % activeSlides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {activeSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === currentSlide ? "bg-white w-6" : "bg-white/50 w-2"}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Stats */}
      <section className="bg-primary py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {(data.aboutContent.stats.length > 0
              ? data.aboutContent.stats.slice(0, 4)
              : [
                  { value: "15+", label: "Жилийн туршлага" },
                  { value: "500+", label: "Амжилттай төсөл" },
                  { value: "200+", label: "Ажилтнууд" },
                  { value: "50+", label: "Хамтрагч" },
                ]
            ).map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/80 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Бүтээгдэхүүн */}
      {featuredProducts.length > 0 && (
        <section className="py-14 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Онцлох бүтээгдэхүүн</h2>
                <p className="text-muted-foreground mt-1">Манай тэргүүлэгч бүтээгдэхүүнүүд</p>
              </div>
              <Button asChild variant="outline" className="hidden sm:flex gap-2">
                <Link href="/products">
                  Бүгдийг харах <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href="/products"
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Package className="h-12 w-12 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-foreground line-clamp-2">{product.title}</h3>
                    {product.category && (
                      <span className="text-xs text-muted-foreground mt-1 block">{product.category}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 sm:hidden">
              <Button asChild variant="outline" className="w-full gap-2">
                <Link href="/products">
                  Бүгдийг харах <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Бидний тухай товч */}
      {data.aboutContent.mainDescription && (
        <section className="py-14 px-4 bg-muted/40">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">{data.aboutContent.mainTitle || "Бидний тухай"}</h2>
                <p className="text-muted-foreground leading-relaxed">{data.aboutContent.mainDescription}</p>
                {data.aboutContent.mission && (
                  <p className="text-muted-foreground leading-relaxed">{data.aboutContent.history}</p>
                )}
                <Button asChild variant="outline" className="gap-2 mt-2">
                  <Link href="/about">
                    Дэлгэрэнгүй <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {data.aboutContent.stats.slice(0, 4).map((stat, i) => (
                  <div key={i} className="bg-card rounded-xl border p-5 text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Төслүүд */}
      {featuredProjects.length > 0 && (
        <section className="py-14 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Сүүлийн төслүүд</h2>
                <p className="text-muted-foreground mt-1">Бидний хэрэгжүүлсэн томоохон төслүүд</p>
              </div>
              <Button asChild variant="outline" className="hidden sm:flex gap-2">
                <Link href="/projects">
                  Бүгдийг харах <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href="/projects"
                  className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Briefcase className="h-12 w-12 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      {project.location && <span>{project.location}</span>}
                      {project.year && <span>{project.year}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Хамтрагчид */}
      {data.partners.length > 0 && (
        <section className="py-14 px-4 bg-muted/40">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Манай хамтрагчид</h2>
              <p className="text-muted-foreground mt-2">Бид олон жилийн турш итгэлтэй түншүүдтэйгээ хамтран ажиллаж байна</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.partners.slice(0, 6).map((partner) => (
                <div
                  key={partner.id}
                  className="bg-card border rounded-xl p-4 flex items-center justify-center h-24 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  {partner.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-12 object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <Users className="h-6 w-6 text-primary/50 mx-auto mb-1" />
                      <span className="text-xs text-muted-foreground font-medium line-clamp-2 text-center">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/partners">
                  Бүх хамтрагчдыг харах <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 px-4 bg-primary text-white">
        <div className="mx-auto max-w-6xl text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Бидэнтэй холбогдох</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Та бүтээгдэхүүний үнийн санал авах, захиалга өгөх бол бидэнтэй холбогдоно уу.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Button asChild variant="secondary">
              <Link href="/contact">Холбоо барих</Link>
            </Button>
            {data.companyInfo.phone && (
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                <a href={`tel:${data.companyInfo.phone}`}>
                  <Phone className="h-4 w-4" />
                  {data.companyInfo.phone}
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
