import Image from "next/image";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  className?: string;
  children: string;
  isLoading: boolean;
};

export const SubmitButton = ({
  className,
  children,
  isLoading,
}: SubmitButtonProps) => {
  return (
    <Button disabled={isLoading} className={className}>
      {isLoading ? (
        <div className="flex items-center justify-center gap-[5px] text-light-200">
          <Image
            src="/assets/icons/loader.svg"
            alt="loading image"
            height={20}
            width={20}
            className="animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
