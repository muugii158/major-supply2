"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Facebook, 
  MessageCircle, 
  Link2, 
  Check, 
  ExternalLink, 
  Send,
  Clock,
  Users,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bell,
  Settings,
  Zap,
  Eye,
  AlertCircle
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  sender: string
  avatar: string
  message: string
  time: string
  isRead: boolean
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Болд Батсүх",
    avatar: "ББ",
    message: "Сайн байна уу? Төмөр бетон хоолойны үнийн санал авч болох уу?",
    time: "5 мин",
    isRead: false
  },
  {
    id: "2",
    sender: "Оюунтуяа Д.",
    avatar: "ОД",
    message: "Захиалга өгөхийг хүсч байна. Холбогдож болох уу?",
    time: "15 мин",
    isRead: false
  },
  {
    id: "3",
    sender: "Түмэн Групп ХХК",
    avatar: "ТГ",
    message: "Таны компанитай хамтран ажиллах боломжийн талаар...",
    time: "1 цаг",
    isRead: true
  },
  {
    id: "4",
    sender: "Эрдэнэ Б.",
    avatar: "ЭБ",
    message: "Бетон блокны хүргэлтийн талаар мэдээлэл авъя",
    time: "2 цаг",
    isRead: true
  },
]

export function FacebookSection() {
  const [isConnected, setIsConnected] = useState(false)
  const [pageUrl, setPageUrl] = useState("")
  const [chatEnabled, setChatEnabled] = useState(true)
  const [autoReply, setAutoReply] = useState(true)
  const [autoReplyMessage, setAutoReplyMessage] = useState(
    "Сайн байна уу! Бидэнтэй холбогдсонд баярлалаа. Бид таны мессэжийг аль болох хурдан хариулах болно. Яаралтай бол 7000-0000 дугаарт залгана уу."
  )
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState("")
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [showConnectDialog, setShowConnectDialog] = useState(false)

  const handleConnect = () => {
    if (pageUrl.includes("facebook.com")) {
      setIsConnected(true)
      setShowConnectDialog(false)
    }
  }

  const handleSendReply = () => {
    if (replyText.trim() && selectedMessage) {
      // Mark message as read
      setMessages(messages.map(m => 
        m.id === selectedMessage.id ? { ...m, isRead: true } : m
      ))
      setReplyText("")
      setSelectedMessage(null)
    }
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Facebook интеграци</h1>
          <p className="text-muted-foreground">Facebook Page холбох, Messenger чат удирдах</p>
        </div>
        {isConnected && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm">
            <Check className="h-4 w-4" />
            Холбогдсон
          </div>
        )}
      </div>

      {/* Connection Status */}
      {!isConnected ? (
        <Card className="border-2 border-dashed">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Facebook className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Facebook Page холбох
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Таны Facebook Page-г холбосноор хэрэглэгчдийн мессэжийг шууд админ 
              самбараас хариулах, автомат хариулт тохируулах боломжтой.
            </p>
            <Button 
              onClick={() => setShowConnectDialog(true)}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
            >
              <Link2 className="h-4 w-4" />
              Facebook Page холбох
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Page Likes", value: "2,847", icon: ThumbsUp, color: "text-blue-600" },
              { label: "Шинэ мессэж", value: unreadCount.toString(), icon: MessageSquare, color: "text-secondary" },
              { label: "Хариулалт", value: "95%", icon: Send, color: "text-green-600" },
              { label: "Дундаж хугацаа", value: "12 мин", icon: Clock, color: "text-primary" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Messages */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Messenger мессэжүүд
                  {unreadCount > 0 && (
                    <span className="ml-auto px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
                      {unreadCount} шинэ
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <AnimatePresence>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedMessage(msg)}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          !msg.isRead ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-muted"
                        } ${selectedMessage?.id === msg.id ? "ring-2 ring-primary" : ""}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                          !msg.isRead ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"
                        }`}>
                          {msg.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-medium text-foreground ${!msg.isRead ? "font-semibold" : ""}`}>
                              {msg.sender}
                            </span>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">{msg.message}</p>
                        </div>
                        {!msg.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Reply Box */}
                {selectedMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-muted rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        Хариу: {selectedMessage.sender}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedMessage(null)}
                      >
                        Цуцлах
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Хариу бичих..."
                        onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
                      />
                      <Button onClick={handleSendReply} className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Settings */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    Тохиргоо
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Чат Widget</Label>
                      <p className="text-xs text-muted-foreground">
                        Вэбсайтад Messenger чат харуулах
                      </p>
                    </div>
                    <Switch 
                      checked={chatEnabled} 
                      onCheckedChange={setChatEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Автомат хариу</Label>
                      <p className="text-xs text-muted-foreground">
                        Шинэ мессэжид автомат хариулт
                      </p>
                    </div>
                    <Switch 
                      checked={autoReply} 
                      onCheckedChange={setAutoReply}
                    />
                  </div>
                </CardContent>
              </Card>

              {autoReply && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Zap className="h-5 w-5 text-secondary" />
                        Автомат хариулт
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={autoReplyMessage}
                        onChange={(e) => setAutoReplyMessage(e.target.value)}
                        rows={4}
                        className="text-sm"
                      />
                      <Button 
                        size="sm" 
                        className="mt-3 w-full bg-primary hover:bg-primary/90"
                      >
                        Хадгалах
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Чат Widget Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Major Supply LLC</p>
                        <p className="text-xs text-green-600">Идэвхтэй</p>
                      </div>
                    </div>
                    <div className="bg-card rounded-lg p-3 text-sm text-muted-foreground">
                      Сайн байна уу! Бидэнд юу хэрэгтэй вэ?
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Connect Dialog */}
      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Facebook className="h-5 w-5 text-blue-600" />
              Facebook Page холбох
            </DialogTitle>
            <DialogDescription>
              Таны Facebook Page-н URL оруулна уу
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="pageUrl">Facebook Page URL</Label>
              <Input
                id="pageUrl"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
                placeholder="https://www.facebook.com/majorsupply"
              />
            </div>
            <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 inline mr-2" />
              Та Facebook Page-н админ эрхтэй байх шаардлагатай
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowConnectDialog(false)}>
                Цуцлах
              </Button>
              <Button 
                onClick={handleConnect}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!pageUrl.includes("facebook.com")}
              >
                Холбох
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
