"use client";

import { RegistrationFromSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { CustomField } from "../customField";
import { FormFieldType } from "@/lib/constants";
import { Mail, UserRound } from "lucide-react";
import { SubmitButton } from "../submitButton";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Login = () => {
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof RegistrationFromSchema>>({
    resolver: zodResolver(RegistrationFromSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  async function onSubmit({
    fullName,
    email,
    phoneNumber,
  }: z.infer<typeof RegistrationFromSchema>) {
    // transform user email to lowerCase
    const userEmail = email.toLowerCase();

    const userData = {
      fullName,
      email: userEmail,
      phoneNumber,
    };
    setIsLoading(true);
    // Create new user
    try {
      const user = await createUser(userData);

      if (user) Router.push(`/patient/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[15px] mt-[30px]"
      >
        <CustomField
          name="fullName"
          label="Full name"
          formControl={form.control}
          placeHolder="John Doe"
          icon={<UserRound />}
          fieldType={FormFieldType.INPUT}
        />

        <CustomField
          name="email"
          label="Email"
          formControl={form.control}
          placeHolder="johndoe@gmail.com"
          icon={<Mail />}
          fieldType={FormFieldType.INPUT}
        />

        <CustomField
          name="phoneNumber"
          label="Phone Number"
          formControl={form.control}
          placeHolder="08101330834"
          fieldType={FormFieldType.PHONE_INPUT}
        />

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
