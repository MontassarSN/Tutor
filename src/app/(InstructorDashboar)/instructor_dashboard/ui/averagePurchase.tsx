"use client";

import useInstructorPurchases from "@/hooks/purchases/usePurchases";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

export default function AveragePurchaseValueChart() {
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

    const purchaseValueData: {
      [key: string]: { total: number; count: number };
    } = {};

    purchases.forEach((purchase) => {
      const date = new Date(purchase.created_at);
      const month = monthNames[date.getMonth()];

      if (!purchaseValueData[month]) {
        purchaseValueData[month] = { total: 0, count: 0 };
      }

      purchaseValueData[month].total += purchase.price;
      purchaseValueData[month].count += 1;
    });

    return Object.entries(purchaseValueData).map(([month, data]) => ({
      month,
      average: Number((data.total / data.count).toFixed(2)),
    }));
  }, [purchases]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`$${value}`, "Average Purchase Value"]}
          contentStyle={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #e9ecef",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="average"
          stroke="#FF6636"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
