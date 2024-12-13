import fetchPurchases from "@/api/purchases/getPurchasesAdmin";

export const adminPurchasesQuery = {
  queryKey: ["purchases", "active"],
  queryFn: async () => await fetchPurchases(),
};
