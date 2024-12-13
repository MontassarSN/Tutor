"use client";

import { useInstructors } from "@/queries/useInstructors";
import { useUsers } from "@/queries/useUsers";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, UserCog } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePurchases from "@/hooks/purchases/useAdminPurchases";
import {
  TotalRevenue,
  TotalPurchases,
  TopInstructorsChart,
  MonthlyPurchaseDistribution,
} from "./ui/staticComponents";

export default function Page() {
  const { data: instructors, isLoading: isLoadingInstructors } =
    useInstructors();
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: purchases, isLoading: isLoadingPurchases } = usePurchases();

  const instructorCount = instructors?.data?.length || 0;
  const userCount = users?.length || 0;
  const instructorPercentage =
    userCount > 0 ? (instructorCount / userCount) * 100 : 0;

  return (
    <div className="container w-[60rem] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TotalRevenue />
        <TotalPurchases />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Instructors
            </CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingInstructors ? "Loading..." : instructorCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingUsers ? "Loading..." : userCount}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Instructor to User Ratio</CardTitle>
            <CardDescription>
              Percentage of instructors compared to total users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={instructorPercentage} className="w-full" />
            <div className="mt-2 text-sm text-muted-foreground">
              {instructorPercentage.toFixed(1)}% are instructors
            </div>
          </CardContent>
        </Card>
        <MonthlyPurchaseDistribution />
        <div className="col-span-2 lg:col-span-4 flex justify-center w-full">

              <TopInstructorsChart />

        </div>
        <Card className="col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Instructor List</CardTitle>
            <CardDescription>
              Overview of our current instructors
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingInstructors ? (
              <div>Loading instructor data...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Specialty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instructors?.data?.slice(0, 5).map((instructor) => (
                    <TableRow key={instructor.user_id}>
                      <TableCell>
                        {instructor?.users?.FirstName +
                          " " +
                          instructor.users?.LastName}
                      </TableCell>
                      <TableCell>{instructor?.users?.email}</TableCell>
                      <TableCell>{instructor.title}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
