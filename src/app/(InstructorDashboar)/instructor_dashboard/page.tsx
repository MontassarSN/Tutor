"use client";

import React from "react";
import RevenueChart from "./ui/rechart";
import NumberOfPurchasesChart from "./ui/numberOfPurchases";
import AveragePurchaseValueChart from "./ui/averagePurchase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SummaryCards from "./ui/summaryCard";

export default function Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Revenue Overview</h1>
      <SummaryCards />
      <Tabs defaultValue="revenue" className="w-[50rem] space-y-6 mt-6">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="average">Average Value</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Number of Purchases Per Month</CardTitle>
            </CardHeader>
            <CardContent>
              <NumberOfPurchasesChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="average">
          <Card>
            <CardHeader>
              <CardTitle>Average Purchase Value Per Month</CardTitle>
            </CardHeader>
            <CardContent>
              <AveragePurchaseValueChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
