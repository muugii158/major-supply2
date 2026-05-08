"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Mail, Phone, MapPin, ImagePlus, X, Check, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useSiteData } from "@/lib/site-data-context"

export function SettingsSection() {
  const { data, setCompanyInfo } = useSiteData()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Local edit buffer so users can revert / batch save
  const [draft, setDraft] = useState(data.companyInfo)

  // Keep draft in sync if external changes happen (e.g. hydration)
  useEffect(() => {
    setDraft(data.companyInfo)
  }, [data.companyInfo])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDraft((prev) => ({ ...prev, logo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setCompanyInfo(draft)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsSaving(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Тохиргоо</h1>
        <p className="text-muted-foreground">Компанийн мэдээлэл болон систем тохиргоо</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="company">Компанийн мэдээлэл</TabsTrigger>
          <TabsTrigger value="logo">Лого</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Компанийн мэдээлэл
                </CardTitle>
                <CardDescription>
                  Вэб сайтад харагдах компанийн үндсэн мэдээлэл
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      Компанийн нэр
                    </Label>
                    <Input
                      id="companyName"
                      value={draft.name}
                      onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                      placeholder="Major Supply LLC"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Утасны дугаар
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={draft.phone}
                      onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                      placeholder="+976 9999-8888"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Имэйл хаяг
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={draft.email}
                      onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                      placeholder="info@majorsupply.mn"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Хаяг
                    </Label>
                    <Textarea
                      id="address"
                      value={draft.address}
                      onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                      placeholder="Компанийн хаяг"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Хадгалж байна...
                      </>
                    ) : showSuccess ? (
                      <>
                        <Check className="h-4 w-4" />
                        Хадгалагдлаа!
                      </>
                    ) : (
                      "Хадгалах"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="logo">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImagePlus className="h-5 w-5 text-primary" />
                  Компанийн лого
                </CardTitle>
                <CardDescription>
                  PNG, JPG эсвэл SVG форматтай зураг оруулна уу
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="space-y-2">
                    <Label>Одоогийн лого</Label>
                    <div className="w-48 h-48 border rounded-lg flex items-center justify-center bg-muted/50 overflow-hidden">
                      {draft.logo ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={draft.logo || "/placeholder.svg"}
                          alt="Company Logo"
                          className="object-contain max-w-[180px] max-h-[180px]"
                        />
                      ) : (
                        <Building2 className="h-16 w-16 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 w-full">
                    <Label>Шинэ лого оруулах</Label>
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImagePlus className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        Зураг оруулахын тулд дарна уу
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, SVG (max. 2MB)</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </div>

                    {draft.logo && draft.logo !== "/logo.png" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => setDraft({ ...draft, logo: "/logo.png" })}
                      >
                        <X className="h-4 w-4" />
                        Анхдагч лого руу буцах
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Хадгалж байна...
                      </>
                    ) : showSuccess ? (
                      <>
                        <Check className="h-4 w-4" />
                        Хадгалагдлаа!
                      </>
                    ) : (
                      "Лого хадгалах"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
