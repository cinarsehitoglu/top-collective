"use client";

import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Heart, Share2, Flag } from "lucide-react";

export default function ListingDetailPage() {
  const params = useParams();
  notFound();
}
