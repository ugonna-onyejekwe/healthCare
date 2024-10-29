import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const ImageDropBox = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 border-dark-500 bg-dark-400 rounded-[5px] flex items-center justify-center h-[200px] max-[500px]:h-[150px] flex-col gap-3"
    >
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <div className="p-[10px] size-full flex items-center justify-center">
          <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt="uploaded image"
            className="h-full w-fit overflow-hidden "
          />
        </div>
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="text-center">
            <p className="text-dark-600">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-dark-600">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageDropBox;
