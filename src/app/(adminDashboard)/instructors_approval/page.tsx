"use client";

import { useNotApprovedInstructors } from "@/queries/instructors/useNotApprovedInstructors";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Check, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import approveInstructor from "@/api/users/instructors/approveInstructor";
import deleteInstructor from "@/api/users/instructors/deleteInstructor";
import { sendMail } from "@/api/sendEmail";

export default function NotApprovedInstructorsPage() {
  const {
    data: notApprovedInstructors,
    isLoading,
    isError,
  } = useNotApprovedInstructors();
  const [selectedInstructor, setSelectedInstructor] = useState<string>("");
  const [action, setAction] = useState<"accept" | "refuse" | "">("");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const handleAction = (
    instructorId: string,
    actionType: "accept" | "refuse" | ""
  ) => {
    setSelectedInstructor(instructorId);
    setAction(actionType);
  };
  const acceptMutation = useMutation({
    mutationFn: async () => {
      const instructor = notApprovedInstructors?.find(
        (instructor) => instructor.user_id === selectedInstructor
      );
      if (!instructor) return;

      await approveInstructor(selectedInstructor);

      await sendMail({
        to: instructor.users?.email ?? "",
        subject: "Congratulations! You are approved as an instructor",
        text: `
          Dear ${instructor.users?.FirstName} ${instructor.users?.LastName},
  
          Congratulations! Your application to become an instructor has been approved. You can now start teaching courses on our platform.
  
          Best regards,
          Your Platform Team
        `,
        html: `
          <p>Dear ${instructor.users?.FirstName} ${instructor.users?.LastName},</p>
          <p>Congratulations! Your application to become an instructor has been approved. You can now start teaching courses on our platform.</p>
          <p>Best regards,<br/>Your Platform Team</p>
        `,
      });
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Approving Instructor successfully",
        description: "Instructor has been approved",
      });
      queryClient.invalidateQueries({
        queryKey: ["instructors", "notApproved"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error approving instructor",
        description: "Check your network connection",
      });
      console.error("Error approving instructor:", error.message);
    },
  });

  const refuseMutation = useMutation({
    mutationFn: async () => {
      const instructor = notApprovedInstructors?.find(
        (instructor) => instructor.user_id === selectedInstructor
      );
      if (!instructor) return;

      await deleteInstructor(selectedInstructor);

      await sendMail({
        to: instructor.users?.email ?? "",
        subject: "Your application to become an instructor has been rejected",
        text: `
          Dear ${instructor.users?.FirstName} ${instructor.users?.LastName},
    
          We regret to inform you that your application to become an instructor has been rejected. Unfortunately, we are unable to offer you an instructor position at this time.
    
          Best regards,
          Your Platform Team
        `,
        html: `
          <p>Dear ${instructor.users?.FirstName} ${instructor.users?.LastName},</p>
          <p>We regret to inform you that your application to become an instructor has been rejected. Unfortunately, we are unable to offer you an instructor position at this time.</p>
          <p>Best regards,<br/>Your Platform Team</p>
        `,
      });
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Refusing Instructor successfully",
        description: "Instructor has been refused",
      });
      queryClient.invalidateQueries({
        queryKey: ["instructors", "notApproved"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error refusing instructor",
        description: "Check your network connection",
      });
      console.error("Error refusing instructor:", error.message);
    },
  });

  const confirmAction = () => {
    if (action === "accept") {
      acceptMutation.mutate();
    } else if (action === "refuse") {
      refuseMutation.mutate();
    }
  };

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (isError)
    return (
      <div className="text-center p-8 text-red-500">
        Error loading instructors
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Not Approved Instructors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notApprovedInstructors?.map((instructor) => (
          <Card key={instructor.user_id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={instructor.users?.pic ?? "/noAvatar.jpg"}
                    alt={instructor.users?.FirstName ?? ""}
                  />
                  <AvatarFallback>
                    {instructor.users?.FirstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>
                    {instructor.users?.FirstName +
                      " " +
                      instructor.users?.LastName}
                  </CardTitle>
                  <CardDescription>{instructor.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{instructor.description}</p>
              <Badge variant="secondary">{instructor.company_name}</Badge>
            </CardContent>
            <CardFooter className="bg-muted/50 flex justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="default"
                    className="w-[45%]"
                    onClick={() => handleAction(instructor.user_id, "accept")}
                  >
                    <Check className="mr-2 h-4 w-4" /> Accept
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will approve{" "}
                      {instructor.users?.FirstName +
                        " " +
                        instructor.users?.LastName}{" "}
                      as an instructor.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmAction}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-[45%]"
                    onClick={() => handleAction(instructor.user_id, "refuse")}
                  >
                    <X className="mr-2 h-4 w-4" /> Refuse
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will refuse{" "}
                      {instructor.users?.FirstName +
                        " " +
                        instructor.users?.LastName}
                      's application to become an instructor.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmAction}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
