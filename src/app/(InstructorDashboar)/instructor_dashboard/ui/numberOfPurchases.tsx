"use client";

import useInstructorPurchases from "@/hooks/purchases/usePurchases";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

export default function NumberOfPurchasesChart() {
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

    const purchaseCountByMonth: { [key: string]: number } = {};

    purchases.forEach((purchase) => {
      const date = new Date(purchase.created_at);
      const month = monthNames[date.getMonth()];
      purchaseCountByMonth[month] = (purchaseCountByMonth[month] || 0) + 1;
    });

    return Object.entries(purchaseCountByMonth).map(([month, count]) => ({
      month,
      count,
    }));
  }, [purchases]);

  const COLORS = [
    "#FF6636", // Main theme color
    "#FF8C66",
    "#FFB299",
    "#FFD9CC",
    "#E65C2E",
    "#CC5229",
    "#B34824",
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="month"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => [
            `${value} purchases`,
            props.payload.month,
          ]}
          contentStyle={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #e9ecef",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
