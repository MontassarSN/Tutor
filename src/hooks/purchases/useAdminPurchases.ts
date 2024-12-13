"use client";
import { useQuery } from "@tanstack/react-query";
import { adminPurchasesQuery } from "./adminPurchasesQuery";

export default function usePurchases() {
  return useQuery(adminPurchasesQuery); 
}
