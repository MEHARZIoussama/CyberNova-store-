const PRODUCTS_DATA = {
  laptops: {
    title: "LAPTOPS",
    items: [
      { name: "MacBook Pro M3", brand: "APPLE — 2024", price: "1,999$", old: "", rev: "412", rating: "5", icon: "fas fa-laptop" },
      { name: "ROG Zephyrus G14", brand: "ASUS — 2024", price: "1,549$", old: "1,799$", rev: "289", rating: "4", icon: "fas fa-laptop-code" },
      { name: "Dell XPS 15", brand: "DELL — 2025", price: "1,799$", old: "", rev: "356", rating: "4.5", icon: "fas fa-laptop" },
      { name: "ThinkPad X1 Carbon", brand: "LENOVO — 2024", price: "1,349$", old: "1,599$", rev: "201", rating: "3", icon: "fas fa-briefcase" },
      { name: "Surface Laptop 6", brand: "MICROSOFT — 2025", price: "1,299$", old: "", rev: "178", rating: "4", icon: "fas fa-laptop" }
    ]
  },
  monitors: {
    title: "MONITORS",
    items: [
      { name: "ProArt 4K Display", brand: "ASUS — 2024", price: "799$", old: "", rev: "234", rating: "5", icon: "fas fa-desktop" },
      { name: "UltraSharp U2723", brand: "DELL — 2024", price: "549$", old: "649$", rev: "312", rating: "4.5", icon: "fas fa-desktop" },
      { name: "Odyssey G7", brand: "SAMSUNG — 2025", price: "699$", old: "", rev: "189", rating: "4", icon: "fas fa-tv" },
      { name: "ViewSonic VP2768", brand: "VIEWSONIC — 2023", price: "399$", old: "459$", rev: "98", rating: "3", icon: "fas fa-desktop" },
      { name: "LG UltraGear", brand: "LG — 2024", price: "449$", old: "", rev: "267", rating: "4", icon: "fas fa-tv" }
    ]
  },
  ram: {
    title: "RAM",
    items: [
      { name: "Trident Z5 32GB", brand: "G.SKILL — 2024", price: "129$", old: "", rev: "198", rating: "5", icon: "fas fa-memory" },
      { name: "Vengeance 16GB", brand: "CORSAIR — 2023", price: "59$", old: "79$", rev: "421", rating: "4.5", icon: "fas fa-memory" },
      { name: "Ripjaws V 32GB", brand: "G.SKILL — 2024", price: "99$", old: "", rev: "156", rating: "4", icon: "fas fa-memory" },
      { name: "Fury Beast 16GB", brand: "KINGSTON — 2023", price: "49$", old: "65$", rev: "289", rating: "3", icon: "fas fa-memory" },
      { name: "Dominator 64GB", brand: "CORSAIR — 2025", price: "249$", old: "", rev: "87", rating: "4.5", icon: "fas fa-memory" }
    ]
  },
  headphones: {
    title: "HEADPHONES",
    items: [
      { name: "WH-1000XM5", brand: "SONY — 2024", price: "349$", old: "", rev: "512", rating: "5", icon: "fas fa-headphones" },
      { name: "AirPods Pro 3", brand: "APPLE — 2025", price: "299$", old: "", rev: "678", rating: "4.5", icon: "fas fa-headphones" },
      { name: "QuietComfort Ultra", brand: "BOSE — 2024", price: "329$", old: "379$", rev: "345", rating: "4", icon: "fas fa-headphones" },
      { name: "HD 660S2", brand: "SENNHEISER — 2023", price: "599$", old: "", rev: "112", rating: "4.5", icon: "fas fa-headphones" },
      { name: "Arctis Nova Pro", brand: "STEELSERIES — 2024", price: "349$", old: "399$", rev: "203", rating: "3", icon: "fas fa-headphones" }
    ]
  },
  mouse: {
    title: "MOUSE",
    items: [
      { name: "MX Master 3S", brand: "LOGITECH — 2024", price: "99$", old: "", rev: "892", rating: "5", icon: "fas fa-computer-mouse" },
      { name: "DeathAdder V3", brand: "RAZER — 2023", price: "69$", old: "89$", rev: "456", rating: "4.5", icon: "fas fa-computer-mouse" },
      { name: "G Pro X Superlight", brand: "LOGITECH — 2024", price: "159$", old: "", rev: "334", rating: "4", icon: "fas fa-computer-mouse" },
      { name: "Basilisk V3", brand: "RAZER — 2023", price: "59$", old: "79$", rev: "201", rating: "3", icon: "fas fa-computer-mouse" },
      { name: "MX Anywhere 3", brand: "LOGITECH — 2024", price: "79$", old: "", rev: "267", rating: "4", icon: "fas fa-computer-mouse" }
    ]
  },
  keyboard: {
    title: "KEYBOARD",
    items: [
      { name: "K100 RGB", brand: "CORSAIR — 2024", price: "229$", old: "", rev: "298", rating: "5", icon: "fas fa-keyboard" },
      { name: "Huntsman V3", brand: "RAZER — 2024", price: "199$", old: "229$", rev: "187", rating: "4.5", icon: "fas fa-keyboard" },
      { name: "MX Keys S", brand: "LOGITECH — 2023", price: "109$", old: "", rev: "423", rating: "4", icon: "fas fa-keyboard" },
      { name: "Apex Pro Mini", brand: "STEELSERIES — 2024", price: "189$", old: "219$", rev: "145", rating: "3", icon: "fas fa-keyboard" },
      { name: "G915 TKL", brand: "LOGITECH — 2023", price: "179$", old: "", rev: "256", rating: "4.5", icon: "fas fa-keyboard" }
    ]
  },
  smartphones: {
    title: "SMARTPHONES",
    items: [
      { name: "iPhone 15 Pro Max", brand: "APPLE — 2024", price: "1,199$", old: "", rev: "892", rating: "5", icon: "fas fa-mobile-alt" },
      { name: "Galaxy S25 Ultra", brand: "SAMSUNG — 2025", price: "1,099$", old: "1,299$", rev: "634", rating: "4.5", icon: "fas fa-mobile-alt" },
      { name: "Pixel 9 Pro", brand: "GOOGLE — 2024", price: "999$", old: "", rev: "412", rating: "4", icon: "fas fa-mobile-alt" },
      { name: "OnePlus 13", brand: "ONEPLUS — 2025", price: "799$", old: "899$", rev: "289", rating: "3", icon: "fas fa-mobile-alt" },
      { name: "Xiaomi 15 Pro", brand: "XIAOMI — 2025", price: "749$", old: "", rev: "201", rating: "4", icon: "fas fa-mobile-alt" }
    ]
  },
  earbuds: {
    title: "EARBUDS",
    items: [
      { name: "AirPods Pro 2", brand: "APPLE — 2024", price: "249$", old: "", rev: "1203", rating: "5", icon: "fas fa-headphones" },
      { name: "Galaxy Buds 3 Pro", brand: "SAMSUNG — 2024", price: "199$", old: "229$", rev: "567", rating: "4.5", icon: "fas fa-headphones" },
      { name: "QuietComfort Earbuds", brand: "BOSE — 2024", price: "279$", old: "", rev: "389", rating: "4", icon: "fas fa-headphones" },
      { name: "FreeBuds Pro 3", brand: "HUAWEI — 2024", price: "149$", old: "179$", rev: "234", rating: "3", icon: "fas fa-headphones" },
      { name: "WF-1000XM5", brand: "SONY — 2024", price: "279$", old: "", rev: "445", rating: "4.5", icon: "fas fa-headphones" }
    ]
  },
  powerbanks: {
    title: "POWER BANKS",
    items: [
      { name: "MagSafe Battery 20K", brand: "ANKER — 2024", price: "79$", old: "", rev: "567", rating: "5", icon: "fas fa-battery-full" },
      { name: "PowerCore 26800", brand: "ANKER — 2023", price: "59$", old: "79$", rev: "892", rating: "4.5", icon: "fas fa-battery-full" },
      { name: "Zendure 20000", brand: "ZENDURE — 2024", price: "69$", old: "", rev: "234", rating: "4", icon: "fas fa-battery-full" },
      { name: "Baseus 10000", brand: "BASEUS — 2023", price: "29$", old: "39$", rev: "1203", rating: "3", icon: "fas fa-battery-full" },
      { name: "Mophie Powerstation", brand: "MOPHIE — 2024", price: "49$", old: "", rev: "345", rating: "4", icon: "fas fa-battery-full" }
    ]
  },
  chargers: {
    title: "CHARGERS",
    items: [
      { name: "GaNPrime 120W", brand: "ANKER — 2024", price: "49$", old: "", rev: "678", rating: "5", icon: "fas fa-plug" },
      { name: "65W USB-C Charger", brand: "BASEUS — 2023", price: "29$", old: "39$", rev: "892", rating: "4.5", icon: "fas fa-plug" },
      { name: "MagSafe Charger", brand: "APPLE — 2024", price: "39$", old: "", rev: "1203", rating: "4", icon: "fas fa-plug" },
      { name: "45W Super Charge", brand: "HUAWEI — 2024", price: "25$", old: "35$", rev: "456", rating: "3", icon: "fas fa-plug" },
      { name: "Pixel Stand 2nd Gen", brand: "GOOGLE — 2023", price: "79$", old: "", rev: "234", rating: "4", icon: "fas fa-plug" }
    ]
  },
  cases: {
    title: "PHONE CASES",
    items: [
      { name: "iPhone 15 Pro Case", brand: "APPLE — 2024", price: "49$", old: "", rev: "2341", rating: "5", icon: "fas fa-shield-alt" },
      { name: "Otterbox Defender", brand: "OTTERBOX — 2024", price: "59$", old: "69$", rev: "1892", rating: "4.5", icon: "fas fa-shield-alt" },
      { name: "Spigen Ultra Hybrid", brand: "SPIGEN — 2024", price: "19$", old: "", rev: "3421", rating: "4", icon: "fas fa-shield-alt" },
      { name: "UAG Monarch Pro", brand: "UAG — 2024", price: "79$", old: "89$", rev: "567", rating: "3", icon: "fas fa-shield-alt" },
      { name: "Peak Design Case", brand: "PEAK DESIGN — 2024", price: "69$", old: "", rev: "789", rating: "4.5", icon: "fas fa-shield-alt" }
    ]
  },
  cameras: {
    title: "CAMERAS",
    items: [
      { name: "Sony ZV-E10 II", brand: "SONY — 2024", price: "799$", old: "", rev: "345", rating: "5", icon: "fas fa-camera" },
      { name: "GoPro Hero 13", brand: "GOPRO — 2024", price: "399$", old: "449$", rev: "892", rating: "4.5", icon: "fas fa-camera" },
      { name: "DJI Osmo Action 5", brand: "DJI — 2025", price: "349$", old: "", rev: "234", rating: "4", icon: "fas fa-camera" },
      { name: "Insta360 X4", brand: "INSTA360 — 2024", price: "499$", old: "549$", rev: "178", rating: "3", icon: "fas fa-camera" },
      { name: "Fujifilm X100VI", brand: "FUJIFILM — 2024", price: "1,599$", old: "", rev: "567", rating: "4.5", icon: "fas fa-camera" }
    ]
  }
};
window.PRODUCTS_DATA = PRODUCTS_DATA;