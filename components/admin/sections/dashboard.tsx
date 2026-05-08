"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, FolderTree, Briefcase, Users, TrendingUp, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  {
    title: "Нийт Бүтээгдэхүүн",
    value: "24",
    change: "+3",
    icon: Package,
    color: "bg-secondary",
  },
  {
    title: "Ангиллууд",
    value: "8",
    change: "+1",
    icon: FolderTree,
    color: "bg-primary",
  },
  {
    title: "Төслүүд",
    value: "12",
    change: "+2",
    icon: Briefcase,
    color: "bg-chart-3",
  },
  {
    title: "Хамтрагчид",
    value: "15",
    change: "+4",
    icon: Users,
    color: "bg-chart-4",
  },
]

const recentActivities = [
  { action: "Шинэ бүтээгдэхүүн нэмэгдсэн", item: "Армирован Бетон Дамнуруу", time: "2 цагийн өмнө" },
  { action: "Төсөл шинэчлэгдсэн", item: "Худалдааны Төв Барилга", time: "5 цагийн өмнө" },
  { action: "Шинэ хамтрагч нэмэгдсэн", item: "ABC Барилга ХХК", time: "1 өдрийн өмнө" },
  { action: "Ангилал үүсгэсэн", item: "Цутгамал Бетон", time: "2 өдрийн өмнө" },
]

export function DashboardSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Удирдлагын Самбар</h1>
        <p className="text-muted-foreground">Таны бизнесийн ерөнхий үзүүлэлтүүд</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2 text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>{stat.change} энэ сард</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Сүүлийн Үйл Ажиллагаа</CardTitle>
              <CardDescription>Таны системд хийгдсэн сүүлийн өөрчлөлтүүд</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.item}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Түргэн Үйлдлүүд</CardTitle>
              <CardDescription>Хурдан хандах товчлуурууд</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Бүтээгдэхүүн нэмэх", icon: Package },
                  { label: "Ангилал үүсгэх", icon: FolderTree },
                  { label: "Төсөл нэмэх", icon: Briefcase },
                  { label: "Хамтрагч нэмэх", icon: Users },
                ].map((action, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{action.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
