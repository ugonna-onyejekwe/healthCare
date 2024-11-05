import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx("w-full  px-[25px] py-[30px]  rounded-md bg-dark-400")}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center h-[40px] w-[40px] bg-dark-300 rounded-full">
          <Image
            src={icon}
            height={25}
            width={25}
            alt="appointments"
            className="size-4 w-fit"
          />
        </div>

        <h2 className="text-[25px] font-semibold text-white">{count}</h2>
      </div>

      <p className="text-light-200 text-[16px] mt-[5px]">{label}</p>
    </div>
  );
};
