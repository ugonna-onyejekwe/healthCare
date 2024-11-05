import AppiontmentForm from "@/components/forms/AppiontmentForm";
import { Logo } from "@/components/logo";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

const NewAppointment = async ({ params }: SearchParamProps) => {
  const { userId } = await params;

  const patient = await getPatient(userId);

  return (
    <div className="flex ">
      {/* Form section */}
      <div className="flex-1 mt-[20px] px-[100px] max-[900px]:px-[5%] ">
        <Logo />

        <h1 className="text-light-200 text-[30px] font-[600] mt-[60px] max-[500px]:text-[25px]">
          New Appointment
        </h1>
        <p className="text-[16px] text-dark-700">
          Request a new appointment in 10 seconds.
        </p>

        <div className="mt-[40px]">
          <AppiontmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />
        </div>

        <p className="text-dark-600 text-[15px] text-center mt-[30px]  pb-[30px]">
          &copy;2034 carePulse
        </p>
      </div>

      {/* Image section */}
      <div className="w-[40%] h-[100vh] sticky top-0 max-[900px]:hidden">
        <Image
          src={"/assets/images/appointment-img.png"}
          alt="appointment image"
          width={1000}
          height={1000}
          className="size-full"
        />
      </div>
    </div>
  );
};

export default NewAppointment;
