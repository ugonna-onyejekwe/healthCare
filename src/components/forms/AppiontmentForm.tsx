"use client";

import { Doctors, FormFieldType } from "@/lib/constants";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { CustomField } from "../customField";
import { Form } from "../ui/form";
import { SubmitButton } from "../submitButton";
import { getAppointmentSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { cn } from "@/lib/utils";

const AppiontmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  console.log("type1:", type);

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    console.log(values);
    setIsLoading(true);

    let status;

    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    console.log("type:", type);

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patients: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patient/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  // Assigning button label
  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[15px] "
      >
        <CustomField
          name="primaryPhysician"
          label="Doctor"
          formControl={form.control}
          fieldType={FormFieldType.SELECT}
          placeHolder="Select a doctor"
        >
          {Doctors.map((doctor, i) => (
            <SelectItem key={doctor.name + i} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt="doctor"
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomField>

        <CustomField
          name="schedule"
          label="Expected appointment date"
          formControl={form.control}
          fieldType={FormFieldType.DATE_PICKER}
        />

        {/* col 2 */}
        {type !== "cancel" && (
          <div className="flex items-center gap-[20px] justify-between max-[900px]:flex-col">
            <CustomField
              name="reason"
              label="Appointment reasons"
              formControl={form.control}
              placeHolder="Annual monthly check-up"
              fieldType={FormFieldType.TEXTAREA}
            />

            <CustomField
              name="note"
              label="Comments/notes"
              formControl={form.control}
              placeHolder="capsule red"
              fieldType={FormFieldType.TEXTAREA}
            />
          </div>
        )}
        {type === "cancel" && (
          <CustomField
            name="cancellationReason"
            label="Cancellation reason"
            formControl={form.control}
            placeHolder="here is my reason"
            fieldType={FormFieldType.TEXTAREA}
          />
        )}

        <SubmitButton
          className={cn(
            " w-full hover:bg-green-500 hover:opacity-[0.9] mt-[20px] text-white",
            type === "cancel" ? "bg-red-700 hover:bg-red-700" : "bg-green-500"
          )}
          isLoading={isLoading}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppiontmentForm;
