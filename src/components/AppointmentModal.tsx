"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Appointment } from "../../types/appwrite.types";
import AppiontmentForm from "./forms/AppiontmentForm";

export const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
}: {
  patientId: string;
  userId: string;
  appointment?: Appointment;
  type: "schedule" | "cancel";
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md bg-dark-200 border-none w-[95%] max-w-[500px]:">
        <DialogHeader className="mb-0 space-y-3">
          <DialogTitle className="capitalize text-light-200">
            {type} Appointment
          </DialogTitle>
          <DialogDescription className="text-dark-700">
            Please fill in the following details to {type} appointment
          </DialogDescription>
        </DialogHeader>

        <AppiontmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
