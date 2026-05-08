"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Eye,
  Package,
  FolderOpen,
  ChevronRight,
  ArrowLeft,
  Smartphone,
  Monitor,
  Tablet,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
  Building2,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const mockProducts = [
  {
    id: 1,
    name: "Төмөр бетон хоолой DN400",
    price: "₮450,000",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Бетон блок 200x200x400",
    price: "₮12,000",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Арматур A500C Ø12",
    price: "₮2,800/м",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Бетон худаг DN1000",
    price: "₮850,000",
    image: "/placeholder.svg",
  },
];

const mockProjects = [
  {
    id: 1,
    name: "Төв цэвэрлэх байгууламж",
    location: "Улаанбаатар",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Дарханы ус хангамж",
    location: "Дархан",
    image: "/placeholder.svg",
  },
];

interface Partner {
  id: string;
  name: string;
  logo: string | null;
  description: string;
  projects: string[];
  website: string;
  contactPerson: string;
  phone: string;
  email?: string;
}

const mockPartners: Partner[] = [
  {
    id: "1",
    name: "Монгол Барилга ХХК",
    logo: null,
    description:
      "Барилгын үндсэн түүхий эдээр хангадаг гол түнш. 2015 оноос хамтран ажиллаж байна. Барилгын материалын найдвартай нийлүүлэгч.",
    projects: ["Төв цэвэрлэх байгууламж", "Дархан шинэ хороолол"],
    website: "www.mongolbarillga.mn",
    contactPerson: "Б. Болд",
    phone: "9911-1234",
    email: "info@mongolbarillga.mn",
  },
  {
    id: "2",
    name: "Эрдэнэт Барилга",
    logo: null,
    description:
      "Эрдэнэт хотын барилгын төслүүдийн гүйцэтгэгч. Орон нутгийн хөгжилд чухал үүрэг гүйцэтгэдэг.",
    projects: ["Эрдэнэт ус татуурга", "Орхон голын гүүр"],
    website: "",
    contactPerson: "Д. Дорж",
    phone: "9922-5678",
    email: "erdenet@construction.mn",
  },
  {
    id: "3",
    name: "ABC Construction",
    logo: null,
    description:
      "Олон улсын стандартын барилгын материал нийлүүлдэг компани. ISO 9001 сертификаттай.",
    projects: ["Оюу толгой дэд бүтэц", "Говийн бүс нутаг хөгжил"],
    website: "www.abcconstruction.com",
    contactPerson: "John Smith",
    phone: "9933-9999",
    email: "contact@abcconstruction.com",
  },
  {
    id: "4",
    name: "Дархан Метал ХХК",
    logo: null,
    description:
      "Металл бүтээцийн гол нийлүүлэгч. Өндөр чанартай ган, төмөр бүтээгдэхүүн.",
    projects: ["Дарханы ус хангамж", "Сэлэнгийн гүүр"],
    website: "www.darkhanmetal.mn",
    contactPerson: "С. Сүхбат",
    phone: "9944-1111",
    email: "sales@darkhanmetal.mn",
  },
  {
    id: "5",
    name: "Green Build LLC",
    logo: null,
    description:
      "Байгаль орчинд ээлтэй барилгын материал үйлдвэрлэгч. Тогтвортой хөгжлийн зарчмыг баримталдаг.",
    projects: ["Эко хороолол төсөл"],
    website: "www.greenbuild.mn",
    contactPerson: "А. Амар",
    phone: "9955-2222",
    email: "info@greenbuild.mn",
  },
  {
    id: "6",
    name: "Монголын Төмөр Зам",
    logo: null,
    description:
      "Төмөр замын дэд бүтцийн барилга байгууламжийн гол түнш. Улсын хэмжээний том төслүүдэд хамтран ажилладаг.",
    projects: ["Зүүнбаян-Ханги төмөр зам"],
    website: "www.mtrailway.mn",
    contactPerson: "Г. Ганбаатар",
    phone: "9966-3333",
    email: "info@mtrailway.mn",
  },
];

const heroSlides = [
  {
    id: 1,
    title: "Төмөр бетон эдлэлийн үйлдвэр",
    subtitle: "Чанартай барилгын материал, найдвартай түншлэл",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "15+ жилийн туршлага",
    subtitle: "Монгол улсын дэд бүтцийн хөгжилд хувь нэмэр",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Олон улсын стандарт",
    subtitle: "ISO 9001:2015 сертификаттай үйлдвэрлэл",
    image: "/placeholder.svg",
  },
];

type ViewMode = "desktop" | "tablet" | "mobile";
type PreviewPage = "home" | "products" | "projects" | "about" | "contact" | "partners";

export function UserPreview() {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [currentPage, setCurrentPage] = useState<PreviewPage>("home");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const getPreviewWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "max-w-full";
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const renderNavbar = () => (
    <div className="bg-sidebar text-sidebar-foreground p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Major Supply Logo"
          width={40}
          height={40}
          className="rounded"
        />
        <span className="font-bold text-lg hidden sm:block">MAJOR SUPPLY</span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {[
          { key: "home", label: "Нүүр" },
          { key: "products", label: "Бүтээгдэхүүн" },
          { key: "projects", label: "Төслүүд" },
          { key: "partners", label: "Хамтрагчид" },
          { key: "about", label: "Бидний тухай" },
          { key: "contact", label: "Холбоо барих" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setCurrentPage(item.key as PreviewPage)}
            className={`hover:text-secondary transition-colors ${
              currentPage === item.key ? "text-secondary" : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );

  const renderPartnerCard = (partner: Partner) => (
    <motion.div
      key={partner.id}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHoveredPartner(partner.id)}
      onMouseLeave={() => setHoveredPartner(null)}
      onClick={() => setSelectedPartner(partner)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Partner Logo Card */}
      <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-center h-32 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
        {partner.logo ? (
          <Image
            src={partner.logo}
            alt={partner.name}
            width={100}
            height={60}
            className="object-contain max-h-16"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Building2 className="w-10 h-10 text-primary/60" />
            <span className="text-sm font-medium text-foreground text-center line-clamp-2">
              {partner.name}
            </span>
          </div>
        )}
      </div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredPartner === partner.id && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-xl p-4"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
            <h4 className="font-semibold text-foreground mb-1">{partner.name}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {partner.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-secondary">
              <FolderOpen className="w-3 h-3" />
              <span>{partner.projects.length} төсөлд хамтарсан</span>
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <span className="text-xs text-primary flex items-center gap-1">
                Дэлгэрэнгүй харах <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderPartnersSection = () => (
    <div className="py-12 px-4 md:px-8 bg-muted/30">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Манай хамтрагчид</h2>
        <p className="text-muted-foreground">
          Бид олон жилийн турш итгэлтэй түншүүдтэйгээ хамтран ажиллаж байна
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockPartners.map((partner) => renderPartnerCard(partner))}
      </div>
      <div className="text-center mt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentPage("partners")}
          className="gap-2"
        >
          Бүх хамтрагчдыг харах
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderPartnersPage = () => (
    <div className="p-4 md:p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Манай хамтрагчид</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Major Supply нь олон жилийн турш тэргүүлэгч компаниудтай хамтран ажиллаж,
          чанартай бүтээгдэхүүн, үйлчилгээг хүргэж ирсэн.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockPartners.map((partner) => renderPartnerCard(partner))}
      </div>

      {/* Partner Stats */}
      <div className="bg-primary/5 rounded-2xl p-8 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: `${mockPartners.length}+`, label: "Хамтрагч байгууллага" },
            { value: "15+", label: "Жилийн түншлэл" },
            { value: "50+", label: "Хамтарсан төсөл" },
            { value: "100%", label: "Сэтгэл ханамж" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHomePage = () => (
    <div className="space-y-0">
      {/* Hero Slider */}
      <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary to-primary/80 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-center px-4"
          >
            <div className="text-white space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-sm md:text-lg opacity-90">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Button
                onClick={() => setCurrentPage("products")}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                Бүтээгдэхүүн үзэх
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Products Preview */}
      <div className="px-4 md:px-8 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            Онцлох бүтээгдэхүүн
          </h2>
          <button
            onClick={() => setCurrentPage("products")}
            className="text-primary text-sm flex items-center gap-1"
          >
            Бүгдийг харах <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-muted flex items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-foreground line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-secondary font-bold mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      {renderPartnersSection()}

      {/* Stats */}
      <div className="bg-primary py-8 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
          {[
            { value: "15+", label: "Жилийн туршлага" },
            { value: "500+", label: "Төсөл" },
            { value: "100+", label: "Бүтээгдэхүүн" },
            { value: `${mockPartners.length}+`, label: "Хамтрагч" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProductsPage = () => (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Бүтээгдэхүүнүүд</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...mockProducts, ...mockProducts].map((product, i) => (
          <div
            key={i}
            className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square bg-muted flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-foreground line-clamp-2">
                {product.name}
              </h3>
              <p className="text-secondary font-bold mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjectsPage = () => (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Төслүүд</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {[...mockProjects, ...mockProjects].map((project, i) => (
          <div
            key={i}
            className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-muted flex items-center justify-center">
              <FolderOpen className="w-16 h-16 text-muted-foreground" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-foreground">{project.name}</h3>
              <p className="text-sm text-muted-foreground">
                {project.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAboutPage = () => (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Бидний тухай</h1>
      <div className="prose max-w-none text-foreground">
        <p>
          Major Supply LLC нь 2009 онд үүсгэн байгуулагдсан бөгөөд төмөр бетон
          эдлэл үйлдвэрлэлийн салбарт тэргүүлэгч компани юм.
        </p>
        <p>
          Бид чанартай барилгын материал үйлдвэрлэн, Монгол улсын дэд бүтцийн
          хөгжилд хувь нэмрээ оруулж байна.
        </p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Холбоо барих</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground">Хаяг</h3>
            <p className="text-muted-foreground">
              Улаанбаатар хот, Баянзүрх дүүрэг
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Утас</h3>
            <p className="text-muted-foreground">+976 7000 0000</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">И-мэйл</h3>
            <p className="text-muted-foreground">info@majorsupply.mn</p>
          </div>
        </div>
        <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
          <span className="text-muted-foreground">Газрын зураг</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case "products":
        return renderProductsPage();
      case "projects":
        return renderProjectsPage();
      case "partners":
        return renderPartnersPage();
      case "about":
        return renderAboutPage();
      case "contact":
        return renderContactPage();
      default:
        return renderHomePage();
    }
  };

  if (!isPreviewOpen) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Хэрэглэгч шиг харах
            </h2>
            <p className="text-muted-foreground">
              Вэбсайтыг хэрэглэгчийн нүдээр харах
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Eye className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Вэбсайт урьдчилан харах
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Энэ функц нь таны вэбсайтыг энгийн хэрэглэгч хэрхэн харж байгааг
              шалгах боломж олгоно.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => {
                setViewMode("desktop");
                setIsPreviewOpen(true);
              }}
              className="bg-primary hover:bg-primary/90"
            >
              <Monitor className="w-4 h-4 mr-2" />
              Компьютер
            </Button>
            <Button
              onClick={() => {
                setViewMode("tablet");
                setIsPreviewOpen(true);
              }}
              variant="outline"
            >
              <Tablet className="w-4 h-4 mr-2" />
              Таблет
            </Button>
            <Button
              onClick={() => {
                setViewMode("mobile");
                setIsPreviewOpen(true);
              }}
              variant="outline"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Гар утас
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsPreviewOpen(false)}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Буцах
        </Button>
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
          {[
            { mode: "desktop" as ViewMode, icon: Monitor, label: "Компьютер" },
            { mode: "tablet" as ViewMode, icon: Tablet, label: "Таблет" },
            { mode: "mobile" as ViewMode, icon: Smartphone, label: "Гар утас" },
          ].map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`p-2 rounded transition-colors ${
                viewMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
              title={label}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Preview Frame */}
      <div className="bg-muted rounded-xl p-4 flex justify-center">
        <div
          className={`${getPreviewWidth()} w-full bg-background rounded-lg border border-border overflow-hidden shadow-xl transition-all duration-300`}
        >
          {renderNavbar()}
          <div className="h-[600px] overflow-y-auto">{renderContent()}</div>
          {/* Footer */}
          <div className="bg-sidebar text-sidebar-foreground p-4 text-center text-sm">
            <p>&copy; 2024 Major Supply LLC. Бүх эрх хуулиар хамгаалагдсан.</p>
          </div>
        </div>
      </div>

      {/* Partner Detail Modal */}
      <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedPartner?.logo ? (
                <Image
                  src={selectedPartner.logo}
                  alt={selectedPartner.name}
                  width={48}
                  height={48}
                  className="rounded-lg object-contain"
                />
              ) : (
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
              )}
              <span>{selectedPartner?.name}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedPartner && (
            <div className="space-y-6 pt-2">
              {/* Description */}
              <div>
                <p className="text-muted-foreground">{selectedPartner.description}</p>
              </div>

              {/* Projects */}
              {selectedPartner.projects.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-secondary" />
                    Хамтарсан төслүүд
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPartner.projects.map((project, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="border-t border-border pt-4 space-y-3">
                <h4 className="text-sm font-medium text-foreground">Холбоо барих</h4>

                {selectedPartner.contactPerson && (
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedPartner.contactPerson}</span>
                  </div>
                )}

                {selectedPartner.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedPartner.phone}</span>
                  </div>
                )}

                {selectedPartner.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${selectedPartner.email}`}
                      className="text-primary hover:underline"
                    >
                      {selectedPartner.email}
                    </a>
                  </div>
                )}

                {selectedPartner.website && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={
                        selectedPartner.website.startsWith("http")
                          ? selectedPartner.website
                          : `https://${selectedPartner.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {selectedPartner.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
