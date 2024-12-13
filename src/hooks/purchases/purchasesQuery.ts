import fetchPurchaseInstructor from "@/api/purchases/getPurchases";

export const instructorPuchasesQuery = {
  queryKey: ["purchases", "active"],
  queryFn: async () => await fetchPurchaseInstructor(),
};
