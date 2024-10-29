"use client";

import { Doctors, FormFieldType } from "@/lib/constants";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { CustomField } from "../customField";
import { Form } from "../ui/form";
import { SubmitButton } from "../submitButton";
import { getAppointmentSchema, RegistrationFromSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createAppointment } from "@/lib/actions/appointment.actions";

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
    console.log("am here 2 ");

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
        console.log("am here ");

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patient/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[15px] mt-[40px]"
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

        <SubmitButton
          className="bg-green-500 w-full hover:bg-green-500 hover:opacity-[0.9] mt-[20px] text-white"
          isLoading={isLoading}
        >
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppiontmentForm;
