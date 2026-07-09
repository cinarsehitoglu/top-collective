import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { formatPrice, timeAgo } from "@/lib/utils";
import type { ListingItem } from "@/data/mock";

export function ListingCard({ listing }: { listing: ListingItem }) {
  return (
    <Link href={`/ilan/${listing.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={listing.imageUrl || "/placeholder.svg"}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 flex gap-1">
            {listing.isVip && (
              <Badge variant="warning" className="bg-yellow-500 text-white">
                VIP
              </Badge>
            )}
            {listing.isFeatured && (
              <Badge variant="success">
                Öne Çıkan
              </Badge>
            )}
          </div>
        </div>
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-medium">{listing.title}</h3>
          <p className="mt-1 text-lg font-bold text-primary">
            {formatPrice(listing.price, listing.currency)}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {listing.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo(listing.createdAt)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
