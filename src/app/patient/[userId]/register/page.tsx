import RegistrationForm from "@/components/forms/registrationForm";
import { Logo } from "@/components/logo";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";

const Registration = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <div className="flex ">
      {/* form section */}
      <div className="mt-[30px] px-[100px] max-[900px]:px-[5%] flex-1 ">
        {/* logo component */}
        <Logo />

        <h2 className="text-[35px] font-[700] text-light-200 mt-[60px] max-[500px]:text-[25px] max-[700px]:mt-[50px]">
          Welcome 👋
        </h2>
        <p className="text-dark-700 text-[16px]">Let us know more about you.</p>

        {/* formcontainer */}
        <RegistrationForm user={user} />

        <p className="text-dark-600 text-[15px] text-center mt-[30px]  pb-[30px]">
          &copy;2034 carePulse
        </p>
      </div>

      {/* Image section */}
      <div className="w-[35%] h-[100vh] sticky top-0 max-[900px]:hidden">
        <Image
          src={"/assets/images/register-img.png"}
          alt="appointment bg"
          height={1000}
          width={1000}
          className="size-full"
        />
      </div>
    </div>
  );
};

export default Registration;
