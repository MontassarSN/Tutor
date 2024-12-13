import fetchCart from "@/api/purchases/cart/fetchCart";

export const cartQuery = {
  queryKey: ["cart", "active"],
  queryFn: async () => await fetchCart(),
};
