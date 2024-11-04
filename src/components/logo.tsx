import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex gap-[10px]">
        <Image
          src={"/assets/icons/logo-icon.svg"}
          alt="logo image"
          height={30}
          width={30}
        />

        <h2 className="text-[20px] font-[600] max-[500px]:text-[18px] text-white">
          CarePulse
        </h2>
      </Link>
    </div>
  );
};
