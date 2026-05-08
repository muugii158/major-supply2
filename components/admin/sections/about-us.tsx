"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Trash2,
  Edit3,
  Upload,
  X,
  Building2,
  Target,
  Award,
  Users,
  Eye,
} from "lucide-react"
import { useSiteData, type TeamMember } from "@/lib/site-data-context"

export function AboutUsSection() {
  const { data, setAboutContent } = useSiteData()
  const content = data.aboutContent

  const [newImage, setNewImage] = useState<{ url: string; caption: string }>({ url: "", caption: "" })
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({})
  const [newStat, setNewStat] = useState({ label: "", value: "" })

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "gallery" | "member",
    memberId?: string,
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string
        if (target === "gallery") {
          setNewImage((prev) => ({ ...prev, url }))
        } else if (target === "member" && memberId) {
          setAboutContent((prev) => ({
            ...prev,
            team: prev.team.map((m) => (m.id === memberId ? { ...m, image: url } : m)),
          }))
        } else if (target === "member") {
          setNewMember((prev) => ({ ...prev, image: url }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const addImage = () => {
    if (!newImage.url) return
    setAboutContent((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        { id: Date.now().toString(), url: newImage.url, caption: newImage.caption },
      ],
    }))
    setNewImage({ url: "", caption: "" })
  }

  const removeImage = (id: string) => {
    setAboutContent((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }))
  }

  const addTeamMember = () => {
    if (!newMember.name) return
    setAboutContent((prev) => ({
      ...prev,
      team: [
        ...prev.team,
        {
          id: Date.now().toString(),
          name: newMember.name || "",
          position: newMember.position || "",
          image: newMember.image || "",
          bio: newMember.bio || "",
        },
      ],
    }))
    setNewMember({})
  }

  const removeTeamMember = (id: string) => {
    setAboutContent((prev) => ({
      ...prev,
      team: prev.team.filter((m) => m.id !== id),
    }))
  }

  const addStat = () => {
    if (!newStat.label || !newStat.value) return
    setAboutContent((prev) => ({
      ...prev,
      stats: [...prev.stats, newStat],
    }))
    setNewStat({ label: "", value: "" })
  }

  const removeStat = (index: number) => {
    setAboutContent((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Бидний тухай</h2>
          <p className="text-muted-foreground">Компанийн мэдээлэл, түүх, баг хамт олон</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted/50 flex-wrap h-auto">
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Ерөнхий</span>
          </TabsTrigger>
          <TabsTrigger value="mission" className="gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Эрхэм зорилго</span>
          </TabsTrigger>
          <TabsTrigger value="gallery" className="gap-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Зургийн цомог</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Баг хамт олон</span>
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Үндсэн мэдээлэл</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Гарчиг</Label>
                <Input
                  value={content.mainTitle}
                  onChange={(e) =>
                    setAboutContent((prev) => ({ ...prev, mainTitle: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Тайлбар</Label>
                <Textarea
                  value={content.mainDescription}
                  onChange={(e) =>
                    setAboutContent((prev) => ({ ...prev, mainDescription: e.target.value }))
                  }
                  className="mt-1"
                  rows={5}
                />
              </div>
              <div>
                <Label>Түүх</Label>
                <Textarea
                  value={content.history}
                  onChange={(e) =>
                    setAboutContent((prev) => ({ ...prev, history: e.target.value }))
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Статистик тоо баримт</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {content.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    layout
                    className="relative group p-4 bg-muted/50 rounded-lg text-center"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                      onClick={() => removeStat(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                <Input
                  placeholder="Гарчиг (жнь: Ажилтнууд)"
                  value={newStat.label}
                  onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                />
                <Input
                  placeholder="Утга (жнь: 200+)"
                  value={newStat.value}
                  onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
                  className="sm:w-32"
                />
                <Button onClick={addStat} className="bg-primary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mission Tab */}
        <TabsContent value="mission" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Эрхэм зорилго
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={content.mission}
                  onChange={(e) =>
                    setAboutContent((prev) => ({ ...prev, mission: e.target.value }))
                  }
                  rows={5}
                  placeholder="Компанийн эрхэм зорилго..."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-secondary" />
                  Алсын хараа
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={content.vision}
                  onChange={(e) =>
                    setAboutContent((prev) => ({ ...prev, vision: e.target.value }))
                  }
                  rows={5}
                  placeholder="Компанийн алсын хараа..."
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Урьдчилан харах</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Эрхэм зорилго</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{content.mission}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <Eye className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold">Алсын хараа</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{content.vision}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gallery Tab */}
        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Зургийн цомог</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <AnimatePresence>
                  {content.images.map((image) => (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative group aspect-[3/2] rounded-lg overflow-hidden bg-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => removeImage(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {image.caption && (
                        <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-white text-sm truncate">{image.caption}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="aspect-[3/2] rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                  {newImage.url ? (
                    <div className="relative h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={newImage.url || "/placeholder.svg"}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => setNewImage({ url: "", caption: "" })}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Зураг нэмэх</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, "gallery")}
                      />
                    </label>
                  )}
                </div>
              </div>

              {newImage.url && (
                <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                  <Input
                    placeholder="Зургийн тайлбар"
                    value={newImage.caption}
                    onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                  />
                  <Button onClick={addImage} className="bg-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Нэмэх
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Удирдлагын баг</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.team.map((member) => (
                  <motion.div
                    key={member.id}
                    layout
                    className="relative group p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => removeTeamMember(member.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        {member.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                          <Upload className="h-4 w-4 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, "member", member.id)}
                          />
                        </label>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold truncate">{member.name}</h4>
                        <p className="text-sm text-primary truncate">{member.position}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{member.bio}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Шинэ гишүүн нэмэх</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      {newMember.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={newMember.image || "/placeholder.svg"}
                          alt=""
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <Upload className="h-4 w-4 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, "member")}
                        />
                      </label>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Нэр"
                        value={newMember.name || ""}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      />
                      <Input
                        placeholder="Албан тушаал"
                        value={newMember.position || ""}
                        onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Товч танилцуулга"
                      value={newMember.bio || ""}
                      onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                      rows={3}
                    />
                    <Button onClick={addTeamMember} className="w-full bg-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Гишүүн нэмэх
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
