export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export interface ListingItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  createdAt: string;
  imageUrl: string;
  category: string;
  isVip: boolean;
  isFeatured: boolean;
}

export const categories: Category[] = [
  { id: "1", name: "Koleksiyon Ürünleri", slug: "koleksiyon-urunleri", icon: "album", count: 0 },
  { id: "2", name: "Oyuncak & Figür", slug: "oyuncak-figur", icon: "dices", count: 0 },
  { id: "3", name: "Kart & Oyun", slug: "kart-oyun", icon: "gamepad", count: 0 },
  { id: "4", name: "Sanat & Fotoğraf", slug: "sanat-fotograf", icon: "palette", count: 0 },
  { id: "5", name: "Retro Teknoloji", slug: "retro-teknoloji", icon: "radio", count: 0 },
];
