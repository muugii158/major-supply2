"use client"

import { useState } from "react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  GripVertical,
  Eye,
  EyeOff,
  Upload,
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useSiteData, type HeroSlide } from "@/lib/site-data-context"

export function HeroSliderSection() {
  const { data, setHeroSlides } = useSiteData()
  const slides = data.heroSlides

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [newSlide, setNewSlide] = useState<Partial<HeroSlide>>({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    isActive: true,
  })
  const [draggedImage, setDraggedImage] = useState<string | null>(null)

  const activeSlides = slides.filter((s) => s.isActive)
  const safePreviewIndex =
    activeSlides.length > 0 ? previewIndex % activeSlides.length : 0

  const handleAddSlide = () => {
    if (!newSlide.title) return

    const slide: HeroSlide = {
      id: Date.now().toString(),
      image: draggedImage || "",
      title: newSlide.title || "",
      subtitle: newSlide.subtitle || "",
      buttonText: newSlide.buttonText || "",
      buttonLink: newSlide.buttonLink || "",
      isActive: true,
      order: slides.length + 1,
    }

    setHeroSlides((prev) => [...prev, slide])
    setNewSlide({ title: "", subtitle: "", buttonText: "", buttonLink: "", isActive: true })
    setDraggedImage(null)
    setIsAddDialogOpen(false)
  }

  const handleUpdateSlide = () => {
    if (!editingSlide) return

    setHeroSlides((prev) =>
      prev.map((s) =>
        s.id === editingSlide.id
          ? { ...editingSlide, image: draggedImage || editingSlide.image }
          : s,
      ),
    )
    setEditingSlide(null)
    setDraggedImage(null)
  }

  const handleDeleteSlide = (id: string) => {
    setHeroSlides((prev) => prev.filter((s) => s.id !== id))
  }

  const toggleSlideActive = (id: string) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)))
  }

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setDraggedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setDraggedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const nextPreview = () => {
    if (activeSlides.length === 0) return
    setPreviewIndex((prev) => (prev + 1) % activeSlides.length)
  }

  const prevPreview = () => {
    if (activeSlides.length === 0) return
    setPreviewIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Нүүр хуудасны слайдер</h2>
          <p className="text-muted-foreground">
            Нүүр хуудасны гол зургууд болон текстүүдийг удирдах
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Шинэ слайд нэмэх
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Шинэ слайд нэмэх</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Зураг</Label>
                <div
                  className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onDrop={handleImageDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {draggedImage ? (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={draggedImage || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => setDraggedImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Зураг чирж оруулах эсвэл</p>
                      <label className="cursor-pointer">
                        <span className="text-primary hover:underline">файл сонгох</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageSelect}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Гарчиг</Label>
                  <Input
                    id="title"
                    value={newSlide.title}
                    onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                    placeholder="Төмөр бетон эдлэлийн үйлдвэр"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Дэд гарчиг</Label>
                  <Textarea
                    id="subtitle"
                    value={newSlide.subtitle}
                    onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                    placeholder="Монгол улсын тэргүүлэгч барилгын материалын үйлдвэрлэгч"
                    className="mt-1"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="buttonText">Товчны текст</Label>
                    <Input
                      id="buttonText"
                      value={newSlide.buttonText}
                      onChange={(e) => setNewSlide({ ...newSlide, buttonText: e.target.value })}
                      placeholder="Дэлгэрэнгүй"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buttonLink">Товчны холбоос</Label>
                    <Input
                      id="buttonLink"
                      value={newSlide.buttonLink}
                      onChange={(e) => setNewSlide({ ...newSlide, buttonLink: e.target.value })}
                      placeholder="/about"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Болих
                </Button>
                <Button onClick={handleAddSlide} className="bg-primary">
                  Нэмэх
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Preview Section */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg">Урьдчилан харах</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPreview}
                disabled={activeSlides.length <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextPreview}
                disabled={activeSlides.length <= 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative aspect-[21/9] bg-muted overflow-hidden">
            <AnimatePresence mode="wait">
              {activeSlides[safePreviewIndex] && (
                <motion.div
                  key={activeSlides[safePreviewIndex].id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {activeSlides[safePreviewIndex].image && (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${activeSlides[safePreviewIndex].image})`,
                      }}
                    />
                  )}
                  {!activeSlides[safePreviewIndex].image && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="px-6 sm:px-8 md:px-16 max-w-2xl">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-3"
                      >
                        {activeSlides[safePreviewIndex].title}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs sm:text-sm md:text-lg text-white/90 mb-4"
                      >
                        {activeSlides[safePreviewIndex].subtitle}
                      </motion.p>
                      {activeSlides[safePreviewIndex].buttonText && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                            {activeSlides[safePreviewIndex].buttonText}
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {activeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPreviewIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === safePreviewIndex ? "bg-white w-6" : "bg-white/50 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slides List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Слайдууд ({slides.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Reorder.Group axis="y" values={slides} onReorder={setHeroSlides} className="space-y-3">
            {slides.map((slide) => (
              <Reorder.Item key={slide.id} value={slide}>
                <motion.div
                  layout
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-lg border ${
                    slide.isActive ? "bg-card border-border" : "bg-muted/50 border-border/50"
                  }`}
                >
                  <div className="hidden sm:flex cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                    <GripVertical className="h-5 w-5" />
                  </div>

                  <div className="w-full sm:w-32 h-32 sm:h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {slide.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-primary/50" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold truncate ${!slide.isActive && "text-muted-foreground"}`}
                    >
                      {slide.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">{slide.subtitle}</p>
                    {slide.buttonText && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                        {slide.buttonText} → {slide.buttonLink}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSlideActive(slide.id)}
                      className={slide.isActive ? "text-green-600" : "text-muted-foreground"}
                      aria-label={slide.isActive ? "Идэвхгүй болгох" : "Идэвхжүүлэх"}
                    >
                      {slide.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingSlide(slide)
                            setDraggedImage(null)
                          }}
                          aria-label="Засах"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Слайд засах</DialogTitle>
                        </DialogHeader>
                        {editingSlide && editingSlide.id === slide.id && (
                          <div className="space-y-4 mt-4">
                            <div>
                              <Label>Зураг</Label>
                              <div
                                className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
                                onDrop={handleImageDrop}
                                onDragOver={(e) => e.preventDefault()}
                              >
                                <div className="relative">
                                  {(draggedImage || editingSlide.image) ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                      src={draggedImage || editingSlide.image || "/placeholder.svg"}
                                      alt="Preview"
                                      className="max-h-40 mx-auto rounded-lg"
                                    />
                                  ) : (
                                    <div className="h-32 flex items-center justify-center bg-muted rounded">
                                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                  )}
                                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                                    <div className="text-white text-center">
                                      <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                                      <span>Зураг солих</span>
                                    </div>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={handleImageSelect}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label>Гарчиг</Label>
                              <Input
                                value={editingSlide.title}
                                onChange={(e) =>
                                  setEditingSlide({ ...editingSlide, title: e.target.value })
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label>Дэд гарчиг</Label>
                              <Textarea
                                value={editingSlide.subtitle}
                                onChange={(e) =>
                                  setEditingSlide({ ...editingSlide, subtitle: e.target.value })
                                }
                                className="mt-1"
                                rows={2}
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label>Товчны текст</Label>
                                <Input
                                  value={editingSlide.buttonText}
                                  onChange={(e) =>
                                    setEditingSlide({ ...editingSlide, buttonText: e.target.value })
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Товчны холбоос</Label>
                                <Input
                                  value={editingSlide.buttonLink}
                                  onChange={(e) =>
                                    setEditingSlide({ ...editingSlide, buttonLink: e.target.value })
                                  }
                                  className="mt-1"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                              <Button variant="outline" onClick={() => setEditingSlide(null)}>
                                Болих
                              </Button>
                              <Button onClick={handleUpdateSlide} className="bg-primary">
                                Хадгалах
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="text-destructive hover:text-destructive"
                      aria-label="Устгах"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </CardContent>
      </Card>
    </div>
  )
}
