import {
  BarChart3,
  Bot,
  Compass,
  Gauge,
  Luggage,
  Map,
  Settings,
  Sparkles,
  UserRound
} from "lucide-react";

export const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Trips", href: "/trips", icon: Map },
  { label: "Budget", href: "/budget", icon: BarChart3 },
  { label: "Recommendations", href: "/recommendations", icon: Compass },
  { label: "Assistant", href: "/chat", icon: Bot },
  { label: "Profile", href: "/profile", icon: UserRound },
  { label: "Admin", href: "/admin", icon: Settings }
];

export const landingHighlights = [
  { label: "AI itineraries", icon: Sparkles },
  { label: "Smart packing", icon: Luggage },
  { label: "Budget control", icon: BarChart3 }
];
