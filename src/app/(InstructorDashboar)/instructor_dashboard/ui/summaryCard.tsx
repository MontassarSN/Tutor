"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useInstructorPurchases from "@/hooks/purchases/usePurchases";
import { useMemo } from "react";

export default function SummaryCards() {
  const { data: purchases } = useInstructorPurchases();

  const { totalRevenue, totalPurchases } = useMemo(() => {
    if (!purchases) return { totalRevenue: 0, totalPurchases: 0 };

    const totalRevenue = purchases.reduce(
      (sum, purchase) => sum + purchase.price,
      0
    );
    const totalPurchases = purchases.length;

    return { totalRevenue, totalPurchases };
  }, [purchases]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPurchases}</div>
        </CardContent>
      </Card>
    </div>
  );
}
