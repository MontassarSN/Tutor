"use client";

import useInstructorPurchases from "@/hooks/purchases/usePurchases";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

export default function RevenueChart() {
  const { data: purchases } = useInstructorPurchases();
  const chartData = useMemo(() => {
    if (!purchases) return [];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const revenueByMonth: { [key: string]: number } = {};

    purchases.forEach((purchase) => {
      const date = new Date(purchase.created_at);
      const month = monthNames[date.getMonth()];
      revenueByMonth[month] = (revenueByMonth[month] || 0) + purchase.price;
    });

    return Object.entries(revenueByMonth).map(([month, revenue]) => ({
      month,
      revenue,
    }));
  }, [purchases]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #e9ecef",
          }}
          formatter={(value) => [`$${value}`, "Revenue"]}
        />
        <Bar dataKey="revenue" fill="#FF6636" />
      </BarChart>
    </ResponsiveContainer>
  );
}
