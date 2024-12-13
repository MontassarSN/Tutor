"use client";

import addToCart from "@/api/purchases/cart/addToCart";
import { useToast } from "@/components/ui/use-toast";
import { TablesInsert } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (args: TablesInsert<"cart">) => {
      return await addToCart(args);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Adding to cart successfully",
        description: "Item has been added to cart",
      });
      queryClient.invalidateQueries({
        queryKey: ["cart", "active"],
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error adding to cart",
        description: error.message,
      });
    },
  });
}
