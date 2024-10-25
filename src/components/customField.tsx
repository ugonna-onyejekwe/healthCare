import { Control, Field } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { FormFieldType } from "@/lib/constants";
import Image from "next/image";
import { ReactNode } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";

type customFiledProps = {
  label?: string;
  name: string;
  placeHolder?: string;
  formControl: Control<any>;
  fieldType: FormFieldType;
  icon?: ReactNode;
};

// render a specific kind of input field
const RenderInput = ({
  field,
  props,
}: {
  field: any;
  props: customFiledProps;
}) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center gap-[5px] px-[18px] py-[8px] border border-dark-500 bg-dark-400 rounded-[5px]">
          <span className="text-dark-600">{props.icon}</span>
          <Input
            placeholder={props.placeHolder}
            {...field}
            className="flex-1 text-dark-700"
          />
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          defaultCountry="NG"
          placeholder={props.placeHolder}
          international
          withCountryCallingCode
          value={field.value as E164Number | undefined}
          onChange={field.onChange}
          className="input-phone"
        />
      );
  }
};

// Input field container
export const CustomField = (props: customFiledProps) => {
  return (
    <FormField
      control={props.formControl}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <RenderInput field={field} props={props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
