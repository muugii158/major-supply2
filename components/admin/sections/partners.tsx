"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Pencil,
  Trash2,
  ImagePlus,
  X,
  Users,
  Building2,
  FolderOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSiteData, type Partner } from "@/lib/site-data-context"

export function PartnersSection() {
  const { data, setPartners } = useSiteData()
  const partners = data.partners

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [expandedPartner, setExpandedPartner] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [projects, setProjects] = useState("")
  const [website, setWebsite] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const partnerData = {
      name,
      logo: logoPreview,
      description,
      projects: projects
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      website,
      contactPerson,
      phone,
      email,
    }

    if (editingPartner) {
      setPartners((prev) =>
        prev.map((p) =>
          p.id === editingPartner.id
            ? { ...p, ...partnerData, logo: logoPreview ?? p.logo }
            : p,
        ),
      )
    } else {
      const newPartner: Partner = {
        id: Date.now().toString(),
        ...partnerData,
      }
      setPartners((prev) => [...prev, newPartner])
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner)
    setName(partner.name)
    setDescription(partner.description)
    setProjects(partner.projects.join(", "))
    setWebsite(partner.website)
    setContactPerson(partner.contactPerson)
    setPhone(partner.phone)
    setEmail(partner.email || "")
    setLogoPreview(partner.logo)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id))
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setProjects("")
    setWebsite("")
    setContactPerson("")
    setPhone("")
    setEmail("")
    setLogoPreview(null)
    setEditingPartner(null)
  }

  const toggleExpand = (id: string) => {
    setExpandedPartner(expandedPartner === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Хамтрагчид</h1>
          <p className="text-muted-foreground">Бидний хамтран ажилладаг байгууллагууд</p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Хамтрагч нэмэх
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPartner ? "Хамтрагч засах" : "Шинэ хамтрагч нэмэх"}
              </DialogTitle>
              <DialogDescription>
                Хамтрагч байгууллагын бүрэн мэдээллийг оруулна уу
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Байгууллагын лого</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                  {logoPreview ? (
                    <div className="relative inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo Preview"
                        className="rounded-lg object-contain max-h-32"
                      />
                      <button
                        type="button"
                        onClick={() => setLogoPreview(null)}
                        className="absolute -top-2 -right-2 p-1 bg-destructive text-white rounded-full hover:bg-destructive/90"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="cursor-pointer py-6" onClick={() => fileInputRef.current?.click()}>
                      <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Лого оруулах (дарна уу)</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Байгууллагын нэр *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Байгууллагын нэр"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Вэбсайт</Label>
                  <Input
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="www.example.mn"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Холбоо барих хүн</Label>
                  <Input
                    id="contactPerson"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Нэр"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Утас</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9911-1234"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">И-мэйл</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@example.mn"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Тайлбар / Танилцуулга</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Энэ байгууллагатай хамтран ажилладаг чиглэл, давуу тал..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projects">Хамтарсан төслүүд</Label>
                <Textarea
                  id="projects"
                  value={projects}
                  onChange={(e) => setProjects(e.target.value)}
                  placeholder="Төслүүдийг таслалаар тусгаарлана уу. Жишээ: Төсөл 1, Төсөл 2, Төсөл 3"
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  Төслүүдийг таслалаар (,) тусгаарлана уу
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Цуцлах
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {editingPartner ? "Хадгалах" : "Нэмэх"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-0">
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer"
                    onClick={() => toggleExpand(partner.id)}
                  >
                    <div className="flex-shrink-0">
                      {partner.logo ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-contain bg-muted h-[60px] w-[60px]"
                        />
                      ) : (
                        <div className="w-[60px] h-[60px] rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-7 w-7 text-primary" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{partner.description}</p>
                      {partner.projects.length > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          <FolderOpen className="h-3 w-3 text-secondary" />
                          <span className="text-xs text-secondary font-medium">
                            {partner.projects.length} төсөл
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(partner)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(partner.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 hidden sm:inline-flex">
                        {expandedPartner === partner.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedPartner === partner.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-2 border-t border-border bg-muted/30">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              {partner.description && (
                                <div>
                                  <h4 className="text-xs font-medium text-muted-foreground uppercase mb-1">
                                    Тайлбар
                                  </h4>
                                  <p className="text-sm text-foreground">{partner.description}</p>
                                </div>
                              )}
                              {partner.projects.length > 0 && (
                                <div>
                                  <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">
                                    Хамтарсан төслүүд
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {partner.projects.map((project, i) => (
                                      <span
                                        key={i}
                                        className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-medium"
                                      >
                                        {project}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="space-y-3">
                              {partner.contactPerson && (
                                <div>
                                  <h4 className="text-xs font-medium text-muted-foreground uppercase mb-1">
                                    Холбоо барих хүн
                                  </h4>
                                  <p className="text-sm text-foreground">{partner.contactPerson}</p>
                                </div>
                              )}
                              {partner.phone && (
                                <div>
                                  <h4 className="text-xs font-medium text-muted-foreground uppercase mb-1">
                                    Утас
                                  </h4>
                                  <p className="text-sm text-foreground">{partner.phone}</p>
                                </div>
                              )}
                              {partner.email && (
                                <div>
                                  <h4 className="text-xs font-medium text-muted-foreground uppercase mb-1">
                                    И-мэйл
                                  </h4>
                                  <a
                                    href={`mailto:${partner.email}`}
                                    className="text-sm text-primary hover:underline break-all"
                                  >
                                    {partner.email}
                                  </a>
                                </div>
                              )}
                              {partner.website && (
                                <div>
                                  <h4 className="text-xs font-medium text-muted-foreground uppercase mb-1">
                                    Вэбсайт
                                  </h4>
                                  <a
                                    href={
                                      partner.website.startsWith("http")
                                        ? partner.website
                                        : `https://${partner.website}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline break-all"
                                  >
                                    {partner.website}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {partners.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Хамтрагч байхгүй байна</p>
          <p className="text-sm text-muted-foreground mt-1">
            Дээрх товчийг дарж шинэ хамтрагч нэмнэ үү
          </p>
        </Card>
      )}
    </div>
  )
}
