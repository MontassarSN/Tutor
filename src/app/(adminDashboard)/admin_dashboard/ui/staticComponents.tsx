"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import usePurchases from "@/hooks/purchases/useAdminPurchases";
import { useUsers } from "@/queries/useUsers";

export function TopInstructorsChart() {
  const { data: purchases } = usePurchases();
  const { data: users } = useUsers();

  const chartData = useMemo(() => {
    if (!purchases || !users) return [];

    // Create a map of user IDs to user names
    const userMap = new Map(users.map((user) => [user.user_id, user.username]));

    // Calculate revenue by instructor ID and map to user name
    const instructorRevenue: { [key: string]: number } = {};
    purchases.forEach((purchase) => {
      const instructorId = purchase.instructor_id;
      if (instructorId !== null) {
        instructorRevenue[instructorId] =
          (instructorRevenue[instructorId] || 0) + purchase.price;
      }
    });

    // Transform data into an array of objects with instructor name and revenue
    return Object.entries(instructorRevenue)
      .map(([id, revenue]) => ({
        name: userMap.get(id) || "Unknown",
        revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [purchases, users]);

  return (
    <Card className="col-span-2 w-full">
      <CardHeader>
        <CardTitle>Top 5 Instructors by Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`$${value}`, "Revenue"]}
              contentStyle={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
              }}
            />
            <Bar dataKey="revenue" fill="#FF6636" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
export function TotalRevenue() {
  const { data: purchases } = usePurchases();
  const { data: users } = useUsers();

  const totalRevenue = useMemo(() => {
    return purchases?.reduce((sum, purchase) => sum + purchase.price, 0) || 0;
  }, [purchases]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
      </CardContent>
    </Card>
  );
}

export function TotalPurchases() {
  const { data: purchases } = usePurchases();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{purchases?.length || 0}</div>
      </CardContent>
    </Card>
  );
}

export function MonthlyPurchaseDistribution() {
  const { data: purchases } = usePurchases();

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
    const purchasesByMonth: { [key: string]: number } = {};

    purchases.forEach((purchase) => {
      const date = new Date(purchase.created_at);
      const month = monthNames[date.getMonth()];
      purchasesByMonth[month] = (purchasesByMonth[month] || 0) + 1;
    });

    return monthNames.map((month) => ({
      name: month,
      value: purchasesByMonth[month] || 0,
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
    <Card className="col-span-2 ">
      <CardHeader>
        <CardTitle>Monthly Purchase Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={(entry) => entry.name}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value} purchases`,
                props.payload.name,
              ]}
              contentStyle={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
