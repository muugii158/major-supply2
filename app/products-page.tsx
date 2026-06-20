"use client"

import { useState, useMemo } from "react"
import { Package } from "lucide-react"
import { useSiteData } from "@/lib/site-data-context"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductsPage() {
  const { data } = useSiteData()
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filtered = useMemo(() => {
    if (activeCategory === "all") return data.products
    return data.products.filter((p) => p.category === activeCategory)
  }, [data.products, activeCategory])

  const categoryNames = useMemo(
    () => Array.from(new Set(data.products.map((p) => p.category).filter(Boolean))),
    [data.products]
  )

  return (
    <div className="py-10 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Бүтээгдэхүүн</h1>
          <p className="text-muted-foreground mt-2">Манай бүтээгдэхүүний бүрэн жагсаалт</p>
        </div>

        {/* Category filter */}
        {categoryNames.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
            >
              Бүгд ({data.products.length})
            </Button>
            {categoryNames.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat} ({data.products.filter((p) => p.category === cat).length})
              </Button>
            ))}
          </div>
        )}

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
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
                      <Package className="h-14 w-14 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-foreground mt-2 line-clamp-2">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                    {product.details && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-1">{product.details}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Бүтээгдэхүүн байхгүй байна</p>
          </div>
        )}
      </div>
    </div>
  )
}
