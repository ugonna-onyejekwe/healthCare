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
import { cn } from "@/lib/utils";
import { DatePicker } from "./datepicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

type customFiledProps = {
  label?: string;
  name: string;
  placeHolder?: string;
  formControl: Control<any>;
  fieldType: FormFieldType;
  icon?: ReactNode;
  children?: ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
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
        <div
          className={cn(
            "flex  items-center gap-[5px] px-[18px] py-[8px] input-field",
            props.icon || "pl-[9px]"
          )}
        >
          {props.icon && <span className="text-dark-600">{props.icon}</span>}
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

    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={props.placeHolder}
          className="input-field min-h-[120px]"
          {...field}
        />
      );

    case FormFieldType.CHECKBOX:
      return (
        <div className="flex w-full items-center gap-4">
          <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label htmlFor={props.name} className="text-dark-700">
            {props.label}
          </label>
        </div>
      );

    case FormFieldType.DATE_PICKER:
      return <DatePicker date={field.value} setDate={field.onChange} />;

    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="input-field text-dark-700">
            <SelectValue placeholder={props.placeHolder} />
          </SelectTrigger>
          <SelectContent className="input-field bg-dark-300 text-dark-700 cursor-pointer">
            {props.children}
          </SelectContent>
        </Select>
      );

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
  }
};

// Input field container
export const CustomField = (props: customFiledProps) => {
  return (
    <FormField
      control={props.formControl}
      name={props.name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col">
          {props.fieldType !== FormFieldType.CHECKBOX && (
            <FormLabel>{props.label}</FormLabel>
          )}
          <FormControl className="w-full">
            <RenderInput field={field} props={props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
