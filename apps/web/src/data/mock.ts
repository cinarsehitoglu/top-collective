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
  { id: "1", name: "Emlak", slug: "emlak", icon: "building", count: 0 },
  { id: "2", name: "Vasıta", slug: "vasita", icon: "car", count: 0 },
  { id: "3", name: "İkinci El Eşya", slug: "ikinci-el-esya", icon: "sofa", count: 0 },
  { id: "4", name: "Hayvanlar", slug: "hayvanlar", icon: "dog", count: 0 },
  { id: "5", name: "İş İlanları", slug: "is-ilanlari", icon: "briefcase", count: 0 },
  { id: "6", name: "Hizmetler", slug: "hizmetler", icon: "wrench", count: 0 },
  { id: "7", name: "Özel Dersler", slug: "ozel-dersler", icon: "book", count: 0 },
  { id: "8", name: "Toplu Satışlıklar", slug: "toplu-satisliklar", icon: "package", count: 0 },
];
