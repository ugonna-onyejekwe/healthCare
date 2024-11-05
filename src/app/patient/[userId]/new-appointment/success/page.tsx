import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SuccessPage = async ({ searchParams, params }: SearchParamProps) => {
  const { userId } = await params;
  const { appointmentId } = await searchParams;

  // const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId as string);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className="mt-[30px] px-[5%] w-full max-w-[800px] mx-auto">
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="mt-[40px]">
        <div className="flex justify-center ">
          <Image
            src="/assets/gifs/success.gif"
            height={200}
            width={200}
            alt="success"
          />
        </div>

        <section>
          <h2 className="text-light-200 font-[700] text-[30px] text-center w-full max-w-[700px] mx-auto max-[700px]:text-[25px] mt-[30px] ">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className="text-[15px] text-dark-700 text-center mt-[20px]">
            We&apos;ll be in touch shortly to confirm.
          </p>
        </section>

        <section className="border-t border-dark-500 border-b py-[30px] mt-[50px] text-center">
          <p className="text-dark-700">Requested appointment details: </p>
          <div className="flex items-center gap-3 justify-center  mt-[10px] ">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap text-dark-700">
              Dr. {doctor?.name}
            </p>
          </div>
          <div className="flex gap-2 mt-[10px] justify-center">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p className="text-dark-700">
              {" "}
              {formatDateTime(appointment.schedule)}
            </p>
          </div>
        </section>

        <div className="flex justify-center">
          <Button className="bg-green-500 mt-[20px]  text-white" asChild>
            <Link href={`/patient/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>
        </div>

        <p className="text-dark-600 mt-[20px] text-center">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default SuccessPage;
