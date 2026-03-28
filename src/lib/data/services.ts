import {
  Code2,
  Smartphone,
  Globe,
  Database,
  Server,
  Palette,
  Megaphone,
  Building2,
} from "lucide-react";

export type ServiceKey =
  | "software"
  | "mobile"
  | "erp"
  | "web"
  | "infrastructure"
  | "uiux"
  | "marketing"
  | "consulting";

export interface Service {
  key: ServiceKey;
  icon: typeof Code2;
  color: string;
  gradient: string;
}

export const services: Service[] = [
  {
    key: "software",
    icon: Code2,
    color: "text-blue-500",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    key: "mobile",
    icon: Smartphone,
    color: "text-purple-500",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    key: "erp",
    icon: Database,
    color: "text-orange-500",
    gradient: "from-orange-500 to-orange-700",
  },
  {
    key: "web",
    icon: Globe,
    color: "text-emerald-500",
    gradient: "from-emerald-500 to-emerald-700",
  },
  {
    key: "infrastructure",
    icon: Server,
    color: "text-cyan-500",
    gradient: "from-cyan-500 to-cyan-700",
  },
  {
    key: "uiux",
    icon: Palette,
    color: "text-pink-500",
    gradient: "from-pink-500 to-pink-700",
  },
  {
    key: "marketing",
    icon: Megaphone,
    color: "text-amber-500",
    gradient: "from-amber-500 to-amber-700",
  },
  {
    key: "consulting",
    icon: Building2,
    color: "text-teal-500",
    gradient: "from-teal-500 to-teal-700",
  },
];
