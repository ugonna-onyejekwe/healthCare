"use client";

import React, { useState } from "react";
import { CustomField } from "../customField";
import { Form, FormControl } from "../ui/form";
import { Mail, UserRound } from "lucide-react";
import {
  Doctors,
  FormFieldType,
  GenderOptions,
  IdentificationTypes,
} from "@/lib/constants";
import { SubmitButton } from "../submitButton";
import { z } from "zod";
import { RegistrationFromSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import ImageDropBox from "../ImageDropBox";

const RegistrationForm = () => {
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
    //   // transform user email to lowerCase
    //   const userEmail = email.toLowerCase();

    //   const userData = {
    //     fullName,
    //     email: userEmail,
    //     phoneNumber,
    //   };
    //   setIsLoading(true);
    //   // Create new user
    //   try {
    //     const user = await createUser(userData);

    //     if (user) Router.push(`/patient/${user.$id}/register`);
    //   } catch (error) {
    //     console.log(error);
    //   }
    setIsLoading(false);
  }

  return (
    <div className="mt-[40px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[18px] mt-[30px]"
        >
          {/* personal information */}
          <h3 className="text-light-200 text-[20px] font-[500] max-[700px]:text-[18px]">
            Personal Information
          </h3>
          <div className="flex flex-col gap-[18px]">
            <CustomField
              name="fullName"
              label="Full name"
              formControl={form.control}
              placeHolder="John Doe"
              icon={<UserRound />}
              fieldType={FormFieldType.INPUT}
            />

            {/* col 1 */}
            <div className="flex items-center gap-[20px] justify-between max-[900px]:flex-col">
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
            </div>

            {/* col 2 */}
            <div className="flex items-center gap-[20px] justify-between max-[900px]:flex-col">
              <CustomField
                name="dateOfBirth"
                label="Date of birth"
                formControl={form.control}
                fieldType={FormFieldType.DATE_PICKER}
              />

              <CustomField
                name="gender"
                label="Gender"
                formControl={form.control}
                fieldType={FormFieldType.SKELETON}
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className="flex w-full gap-[20px]"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {GenderOptions.map((option, i) => (
                        <div
                          key={option + i}
                          className="flex items-center gap-[10px] border-dashed border-2 border-dark-500 bg-dark-400 py-[16px] flex-1 px-[15px] rounded-[5px]"
                        >
                          <RadioGroupItem value={option} id={option} />
                          <Label
                            htmlFor={option}
                            className="cursor-pointer text-dark-700 text-[15px]"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>

            {/* col 3 */}
            <div className="flex items-center gap-[20px] justify-between max-[900px]:flex-col">
              <CustomField
                name="address"
                label="Address"
                formControl={form.control}
                placeHolder="1 street lekki"
                fieldType={FormFieldType.INPUT}
              />

              <CustomField
                name="occupation"
                label="Occupation"
                formControl={form.control}
                placeHolder="Software enginner"
                fieldType={FormFieldType.INPUT}
              />
            </div>

            {/* col 4 */}
            <div className="flex items-center gap-[20px] justify-between max-[900px]:flex-col">
              <CustomField
                name="Emergency contact name"
                label="EmergencyContactName"
                formControl={form.control}
                placeHolder="Guardian's name"
                fieldType={FormFieldType.INPUT}
              />

              <CustomField
                name="EmergencyContactNumber"
                label="Emergency contact name"
                formControl={form.control}
                placeHolder="08101330834"
                fieldType={FormFieldType.PHONE_INPUT}
              />
            </div>
          </div>

          {/* medical information */}
          <h3 className="text-light-200 text-[20px] font-[500] max-[700px]:text-[18px] mt-[25px]">
            Medical Information
          </h3>

          <div className="flex flex-col gap-[18px]">
            <CustomField
              name="primaryCarePhysician"
              label="Primary care physician"
              formControl={form.control}
              fieldType={FormFieldType.SELECT}
              placeHolder="Select a physician"
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

            {/* col 1 */}
            <div className="flex items-center gap-[20px] justify-between max-[900px]:flex-col">
              <CustomField
                name="insuranceProvider"
                label="Insurance provider"
                formControl={form.control}
                placeHolder="BlueCross"
                fieldType={FormFieldType.INPUT}
              />

              <CustomField
                name="insurancePolicyNumber"
                label="Insurance policy number"
                formControl={form.control}
                placeHolder="AYUE63738383"
                fieldType={FormFieldType.INPUT}
              />
            </div>

            {/* col 2 */}
            <div className="flex items-center gap-[20px] justify-between max-[900px]:flex-col">
              <CustomField
                name="allergies"
                label="Allergies(if any)"
                formControl={form.control}
                placeHolder="Butter, peanut"
                fieldType={FormFieldType.TEXTAREA}
              />

              <CustomField
                name="currentMedications"
                label="Current medications"
                formControl={form.control}
                placeHolder="capsule red"
                fieldType={FormFieldType.TEXTAREA}
              />
            </div>

            {/* col 3 */}
            <div className="flex items-center gap-[20px] justify-between max-[900px]:flex-col">
              <CustomField
                name="familyMedicalHistory"
                label="Family medical history(if relevant)"
                formControl={form.control}
                placeHolder="Enter family medical history"
                fieldType={FormFieldType.TEXTAREA}
              />

              <CustomField
                name="pastMedicalHistory"
                label="Past medical history"
                formControl={form.control}
                placeHolder="Enter past medical history"
                fieldType={FormFieldType.TEXTAREA}
              />
            </div>
          </div>

          {/* Identification information */}
          <h3 className="text-light-200 text-[20px] font-[500] max-[700px]:text-[18px] mt-[25px]">
            Identification and verifcation
          </h3>

          <div className="flex flex-col gap-[18px]">
            <CustomField
              name="identificationType"
              label="Identificaton type"
              formControl={form.control}
              fieldType={FormFieldType.SELECT}
              placeHolder="Select identification type"
            >
              {IdentificationTypes.map((type, i) => (
                <SelectItem
                  key={type + i}
                  value={type}
                  className="cursor-pointer"
                >
                  {type}
                </SelectItem>
              ))}
            </CustomField>

            <CustomField
              name="identificationNumber"
              label="Identificaton number"
              formControl={form.control}
              fieldType={FormFieldType.INPUT}
              placeHolder="28383932"
            />

            <CustomField
              name="identificationDocument"
              label="Scanned copy of identification document"
              formControl={form.control}
              fieldType={FormFieldType.SKELETON}
              renderSkeleton={(field) => (
                <ImageDropBox files={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          {/* Consent and privacy */}
          <h3 className="text-light-200 text-[20px] font-[500] max-[700px]:text-[18px] mt-[25px]">
            Consent and privacy
          </h3>

          <div className="flex flex-col gap-[18px]">
            <CustomField
              name="consentTreatment"
              label="I consent to receive treatment for my health condition."
              formControl={form.control}
              fieldType={FormFieldType.CHECKBOX}
            />
            <CustomField
              name="disclosure"
              label="I consent to the use and disclosure of my health information for treatment purposes."
              formControl={form.control}
              fieldType={FormFieldType.CHECKBOX}
            />
            <CustomField
              name="privacyAndPolicy"
              label="I acknowledge that I have reviewed and agree to the privacy policy"
              formControl={form.control}
              fieldType={FormFieldType.CHECKBOX}
            />
          </div>

          {/* submit btn */}
          <SubmitButton
            className="bg-green-500 w-full hover:bg-green-500 hover:opacity-[0.9] mt-[20px] text-white"
            isLoading={isLoading}
          >
            Submit to continue
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
