"use client";

import useCart from "@/hooks/purchases/cart/useCart";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteCartItem from "@/api/purchases/cart/deleteItem";
import { useToast } from "@/components/ui/use-toast";
import purchaseItem from "@/api/purchases/purchaseItems";
import purchaseItems from "@/api/purchases/purchaseItems";

export default function Page() {
  const { data: cart } = useCart();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const totalPrice =
    cart?.reduce((total, item) => total + (item?.price ?? 0), 0) || 0;
  const deleteCartItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      await deleteCartItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "active"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error deleting item",
        description: error.message,
      });
    },
  });
  const purchaseMutation = useMutation({
    mutationFn: async () => {
      const sanitizedCart = cart?.map(({ courses, ...rest }) => rest) || [];
      await purchaseItems(sanitizedCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "active"] });
      toast({
        title: "Order Confirmed",
        description: "Your items have been purchased successfully!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error purchasing items",
        description: error.message,
      });
    },
  });

  const handleConfirmOrder = () => {
    purchaseMutation.mutate();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart && cart.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)]">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden">
                      <Image
                        src={item.courses?.pic ?? "/placeholder.svg"}
                        alt={item.courses?.title ?? "Course image"}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">
                        {item.courses?.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        ${item.price?.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCartItemMutation.mutate(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full bg-customText">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Confirm Order
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to place this order? You will be
                      charged ${totalPrice.toFixed(2)}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmOrder}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-[50vh]">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold">Your cart is empty</p>
            <p className="text-muted-foreground">
              Add some courses to get started!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
