"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Clock, 
  MousePointer,
  Home,
  Package,
  FolderOpen,
  Phone,
  Info,
  ArrowUpRight,
  Calendar
} from "lucide-react"
import { motion } from "framer-motion"

interface PageVisit {
  page: string
  icon: React.ReactNode
  visits: number
  percentage: number
  trend: "up" | "down" | "stable"
  trendValue: number
}

interface VisitorData {
  date: string
  visitors: number
  pageViews: number
}

const pageVisits: PageVisit[] = [
  { page: "Нүүр хуудас", icon: <Home className="h-4 w-4" />, visits: 2847, percentage: 35, trend: "up", trendValue: 12 },
  { page: "Бүтээгдэхүүн", icon: <Package className="h-4 w-4" />, visits: 1923, percentage: 24, trend: "up", trendValue: 8 },
  { page: "Төслүүд", icon: <FolderOpen className="h-4 w-4" />, visits: 1456, percentage: 18, trend: "stable", trendValue: 0 },
  { page: "Бидний тухай", icon: <Info className="h-4 w-4" />, visits: 987, percentage: 12, trend: "down", trendValue: 3 },
  { page: "Холбоо барих", icon: <Phone className="h-4 w-4" />, visits: 876, percentage: 11, trend: "up", trendValue: 15 },
]

const weeklyData: VisitorData[] = [
  { date: "Дав", visitors: 420, pageViews: 1250 },
  { date: "Мяг", visitors: 380, pageViews: 1100 },
  { date: "Лха", visitors: 510, pageViews: 1480 },
  { date: "Пүр", visitors: 590, pageViews: 1720 },
  { date: "Баа", visitors: 470, pageViews: 1350 },
  { date: "Бям", visitors: 280, pageViews: 820 },
  { date: "Ням", visitors: 197, pageViews: 580 },
]

const realtimeVisitors = [
  { page: "Нүүр хуудас", count: 12, country: "Монгол" },
  { page: "Бүтээгдэхүүн - Төмөр хоолой", count: 8, country: "Монгол" },
  { page: "Төсөл - Дарханы ус хангамж", count: 5, country: "Монгол" },
  { page: "Холбоо барих", count: 3, country: "Монгол" },
  { page: "Бүтээгдэхүүн - Бетон блок", count: 2, country: "Монгол" },
]

export function AnalyticsSection() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")
  
  const maxVisitors = Math.max(...weeklyData.map(d => d.visitors))
  const totalVisitors = weeklyData.reduce((sum, d) => sum + d.visitors, 0)
  const totalPageViews = weeklyData.reduce((sum, d) => sum + d.pageViews, 0)
  const avgSessionDuration = "3:24"
  const bounceRate = "42%"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Хэрэглэгчийн хандалт</h1>
          <p className="text-muted-foreground">Вэбсайтын трафик болон хэрэглэгчийн үйл ажиллагаа</p>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          {[
            { key: "week", label: "7 хоног" },
            { key: "month", label: "Сар" },
            { key: "year", label: "Жил" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTimeRange(key as "week" | "month" | "year")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            title: "Нийт зочид", 
            value: totalVisitors.toLocaleString(), 
            icon: Users, 
            trend: "up", 
            trendValue: "+12%",
            color: "text-primary"
          },
          { 
            title: "Хуудас үзэлт", 
            value: totalPageViews.toLocaleString(), 
            icon: Eye, 
            trend: "up", 
            trendValue: "+8%",
            color: "text-secondary"
          },
          { 
            title: "Дундаж хугацаа", 
            value: avgSessionDuration, 
            icon: Clock, 
            trend: "up", 
            trendValue: "+5%",
            color: "text-chart-3"
          },
          { 
            title: "Буцалт хувь", 
            value: bounceRate, 
            icon: MousePointer, 
            trend: "down", 
            trendValue: "-3%",
            color: "text-chart-5"
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-500"
                  }`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.trendValue}
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Долоо хоногийн хандалт
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyData.map((day, i) => (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1">
                    <span className="text-xs text-muted-foreground">{day.visitors}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.visitors / maxVisitors) * 120}px` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-md min-h-[4px]"
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{day.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Realtime Visitors */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              Одоо идэвхтэй
              <span className="ml-auto text-2xl font-bold text-foreground">30</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {realtimeVisitors.map((visitor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{visitor.page}</p>
                    <p className="text-xs text-muted-foreground">{visitor.country}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">{visitor.count}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Page Visits Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Eye className="h-5 w-5 text-secondary" />
            Хуудсын хандалт
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pageVisits.map((page, i) => (
              <motion.div
                key={page.page}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {page.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{page.page}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {page.visits.toLocaleString()} хандалт
                      </span>
                      <span className={`text-xs flex items-center gap-0.5 ${
                        page.trend === "up" ? "text-green-600" : 
                        page.trend === "down" ? "text-red-500" : "text-muted-foreground"
                      }`}>
                        {page.trend === "up" && <TrendingUp className="h-3 w-3" />}
                        {page.trend === "down" && <TrendingDown className="h-3 w-3" />}
                        {page.trend !== "stable" && `${page.trendValue}%`}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${page.percentage}%` }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traffic Sources */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Трафикийн эх үүсвэр</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: "Google хайлт", value: 45, color: "bg-primary" },
                { source: "Шууд хандалт", value: 28, color: "bg-secondary" },
                { source: "Facebook", value: 18, color: "bg-chart-3" },
                { source: "Бусад", value: 9, color: "bg-chart-4" },
              ].map((item, i) => (
                <div key={item.source} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.source}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Төхөөрөмжийн төрөл</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { device: "Гар утас", value: 58, color: "bg-primary" },
                { device: "Компьютер", value: 32, color: "bg-secondary" },
                { device: "Таблет", value: 10, color: "bg-chart-3" },
              ].map((item, i) => (
                <div key={item.device} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.device}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
