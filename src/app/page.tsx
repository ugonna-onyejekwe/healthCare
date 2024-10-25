import { RegistrationForm } from "@/components/forms/registrationForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-[100vh]  w-full bg-dark-200  max-[900px]:h-full max-[900px]:min-h-[100vh] max-[900px]:pb-[40px]">
      {/* FormSection */}
      <div className="flex-1 min-w-[50%] px-[100px] pt-[30px]  max-[900px]:px-[5%]">
        <div className="flex gap-[10px]">
          <Image
            src={"/assets/icons/logo-icon.svg"}
            alt="logo image"
            height={30}
            width={30}
          />

          <h2 className="text-[20px] font-[600] max-[500px]:text-[18px] text-white">
            CarePulse
          </h2>
        </div>

        <h1 className="text-[25px] text-light-200 mt-[70px] font-[700] max-[500px]:text-[25px]">
          Hi there 👋
        </h1>

        <p className="text-dark-700 text-[15px] mt-[10px]">
          Get started with appointments.
        </p>

        {/* form section */}
        <RegistrationForm />

        <div className="flex justify-between mt-[40px]">
          <p className="text-dark-600 text-[15px]">&copy; 2024 CarePulse</p>

          <Link
            href={"/admin"}
            className="text-green-500 font-[500] text-[16px] hover:underline "
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Image section */}
      <div className="flex-1 min-w-[50%] max-[900px]:hidden">
        <Image
          src={"/assets/images/onboarding-img.png"}
          alt={"login image"}
          height={1000}
          width={1000}
          className="h-[100vh]"
        />
      </div>
    </div>
  );
}
