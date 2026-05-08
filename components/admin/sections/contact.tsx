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
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Globe,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"
import {
  useSiteData,
  type ContactInfo,
  type SocialLink,
  type Branch,
} from "@/lib/site-data-context"

const iconMap: Record<string, React.ReactNode> = {
  phone: <Phone className="h-5 w-5" />,
  email: <Mail className="h-5 w-5" />,
  address: <MapPin className="h-5 w-5" />,
  hours: <Clock className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  globe: <Globe className="h-5 w-5" />,
}

export function ContactSection() {
  const { data, setContactContent } = useSiteData()
  const content = data.contactContent

  const [expandedBranch, setExpandedBranch] = useState<string | null>(null)
  const [newInfo, setNewInfo] = useState<Partial<ContactInfo>>({ type: "phone" })
  const [newSocial, setNewSocial] = useState<Partial<SocialLink>>({
    platform: "Facebook",
    icon: "facebook",
  })

  const addContactInfo = () => {
    if (!newInfo.label || !newInfo.value) return
    setContactContent((prev) => ({
      ...prev,
      mainInfo: [
        ...prev.mainInfo,
        {
          id: Date.now().toString(),
          type: newInfo.type || "phone",
          label: newInfo.label!,
          value: newInfo.value!,
        },
      ],
    }))
    setNewInfo({ type: "phone" })
  }

  const removeContactInfo = (id: string) => {
    setContactContent((prev) => ({
      ...prev,
      mainInfo: prev.mainInfo.filter((i) => i.id !== id),
    }))
  }

  const addSocialLink = () => {
    if (!newSocial.url) return
    setContactContent((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        {
          id: Date.now().toString(),
          platform: newSocial.platform || "Website",
          url: newSocial.url!,
          icon: newSocial.icon || "globe",
        },
      ],
    }))
    setNewSocial({ platform: "Facebook", icon: "facebook" })
  }

  const removeSocialLink = (id: string) => {
    setContactContent((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((s) => s.id !== id),
    }))
  }

  const addBranch = () => {
    const newBranch: Branch = {
      id: Date.now().toString(),
      name: "Шинэ салбар",
      address: "",
      phone: "",
      email: "",
      hours: "",
      mapUrl: "",
      image: "",
    }
    setContactContent((prev) => ({
      ...prev,
      branches: [...prev.branches, newBranch],
    }))
    setExpandedBranch(newBranch.id)
  }

  const updateBranch = (branch: Branch) => {
    setContactContent((prev) => ({
      ...prev,
      branches: prev.branches.map((b) => (b.id === branch.id ? branch : b)),
    }))
  }

  const removeBranch = (id: string) => {
    setContactContent((prev) => ({
      ...prev,
      branches: prev.branches.filter((b) => b.id !== id),
    }))
  }

  const handleBranchImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    branchId: string,
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string
        setContactContent((prev) => ({
          ...prev,
          branches: prev.branches.map((b) => (b.id === branchId ? { ...b, image: url } : b)),
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Холбоо барих</h2>
          <p className="text-muted-foreground">Холбоо барих мэдээлэл, салбарууд</p>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 flex-wrap h-auto">
          <TabsTrigger value="info" className="gap-2">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Үндсэн мэдээлэл</span>
          </TabsTrigger>
          <TabsTrigger value="branches" className="gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Салбарууд</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Сошиал</span>
          </TabsTrigger>
          <TabsTrigger value="form" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Хүсэлтийн форм</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Хуудасны тохиргоо</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Хуудасны гарчиг</Label>
                <Input
                  value={content.pageTitle}
                  onChange={(e) =>
                    setContactContent((prev) => ({ ...prev, pageTitle: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Тайлбар</Label>
                <Textarea
                  value={content.pageDescription}
                  onChange={(e) =>
                    setContactContent((prev) => ({ ...prev, pageDescription: e.target.value }))
                  }
                  className="mt-1"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Холбоо барих мэдээлэл</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {content.mainInfo.map((info) => (
                  <motion.div
                    key={info.id}
                    layout
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                      {iconMap[info.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="font-medium break-words">{info.value}</div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeContactInfo(info.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Шинэ мэдээлэл нэмэх</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={newInfo.type}
                    onChange={(e) =>
                      setNewInfo({ ...newInfo, type: e.target.value as ContactInfo["type"] })
                    }
                    className="px-3 py-2 border rounded-lg bg-background text-sm"
                  >
                    <option value="phone">Утас</option>
                    <option value="email">И-мэйл</option>
                    <option value="address">Хаяг</option>
                    <option value="hours">Цагийн хуваарь</option>
                  </select>
                  <Input
                    placeholder="Гарчиг"
                    value={newInfo.label || ""}
                    onChange={(e) => setNewInfo({ ...newInfo, label: e.target.value })}
                    className="sm:w-32"
                  />
                  <Input
                    placeholder="Утга"
                    value={newInfo.value || ""}
                    onChange={(e) => setNewInfo({ ...newInfo, value: e.target.value })}
                    className="flex-1"
                  />
                  <Button onClick={addContactInfo} className="bg-primary">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branches" className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={addBranch} className="bg-primary">
              <Plus className="h-4 w-4 mr-2" />
              Салбар нэмэх
            </Button>
          </div>

          <div className="space-y-4">
            {content.branches.map((branch) => (
              <Card key={branch.id}>
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedBranch(expandedBranch === branch.id ? null : branch.id)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {branch.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={branch.image || "/placeholder.svg"}
                            alt={branch.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-primary/60" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-base sm:text-lg truncate">{branch.name}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-1">{branch.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeBranch(branch.id)
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {expandedBranch === branch.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {expandedBranch === branch.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CardContent className="space-y-4 border-t pt-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Салбарын нэр</Label>
                            <Input
                              value={branch.name}
                              onChange={(e) => updateBranch({ ...branch, name: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Хаяг</Label>
                            <Input
                              value={branch.address}
                              onChange={(e) =>
                                updateBranch({ ...branch, address: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Утас</Label>
                            <Input
                              value={branch.phone}
                              onChange={(e) => updateBranch({ ...branch, phone: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>И-мэйл</Label>
                            <Input
                              value={branch.email}
                              onChange={(e) => updateBranch({ ...branch, email: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Ажлын цаг</Label>
                            <Input
                              value={branch.hours}
                              onChange={(e) => updateBranch({ ...branch, hours: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Google Maps холбоос</Label>
                            <Input
                              value={branch.mapUrl}
                              onChange={(e) =>
                                updateBranch({ ...branch, mapUrl: e.target.value })
                              }
                              className="mt-1"
                              placeholder="https://maps.google.com/..."
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Зураг</Label>
                          <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="w-full sm:w-40 h-32 sm:h-24 rounded-lg overflow-hidden bg-muted">
                              {branch.image ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                  src={branch.image || "/placeholder.svg"}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                                  <MapPin className="h-6 w-6 text-primary/40" />
                                </div>
                              )}
                            </div>
                            <label className="cursor-pointer">
                              <Button variant="outline" asChild>
                                <span>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Зураг солих
                                </span>
                              </Button>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleBranchImageUpload(e, branch.id)}
                              />
                            </label>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Сошиал хаягууд</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {content.socialLinks.map((social) => (
                  <motion.div
                    key={social.id}
                    layout
                    className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg group"
                  >
                    <div className="p-3 bg-primary/10 rounded-full text-primary flex-shrink-0">
                      {iconMap[social.icon] || <Globe className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{social.platform}</div>
                      <div className="text-sm text-muted-foreground truncate">{social.url}</div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100"
                        onClick={() => removeSocialLink(social.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Сошиал хаяг нэмэх</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={newSocial.platform}
                    onChange={(e) => {
                      const platform = e.target.value
                      setNewSocial({
                        ...newSocial,
                        platform,
                        icon: platform.toLowerCase(),
                      })
                    }}
                    className="px-3 py-2 border rounded-lg bg-background text-sm"
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Twitter">Twitter</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Website">Website</option>
                  </select>
                  <Input
                    placeholder="https://..."
                    value={newSocial.url || ""}
                    onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                    className="flex-1"
                  />
                  <Button onClick={addSocialLink} className="bg-primary">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Хүсэлтийн формын тохиргоо</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg gap-4">
                <div className="min-w-0">
                  <div className="font-medium">Хүсэлтийн форм идэвхжүүлэх</div>
                  <div className="text-sm text-muted-foreground">
                    Хэрэглэгчид холбоо барих хүсэлт илгээх боломжтой болно
                  </div>
                </div>
                <Button
                  variant={content.formSettings.enabled ? "default" : "outline"}
                  className="flex-shrink-0"
                  onClick={() =>
                    setContactContent((prev) => ({
                      ...prev,
                      formSettings: { ...prev.formSettings, enabled: !prev.formSettings.enabled },
                    }))
                  }
                >
                  {content.formSettings.enabled ? "Идэвхтэй" : "Идэвхгүй"}
                </Button>
              </div>

              <div>
                <Label>Хүлээн авах и-мэйл</Label>
                <Input
                  value={content.formSettings.emailTo}
                  onChange={(e) =>
                    setContactContent((prev) => ({
                      ...prev,
                      formSettings: { ...prev.formSettings, emailTo: e.target.value },
                    }))
                  }
                  className="mt-1"
                  placeholder="info@majorsupply.mn"
                />
              </div>

              <div>
                <Label>Амжилттай илгээсний мессеж</Label>
                <Textarea
                  value={content.formSettings.successMessage}
                  onChange={(e) =>
                    setContactContent((prev) => ({
                      ...prev,
                      formSettings: { ...prev.formSettings, successMessage: e.target.value },
                    }))
                  }
                  className="mt-1"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
