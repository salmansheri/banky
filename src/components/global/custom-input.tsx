"use client";

import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { SignInFormSchema } from "@/lib/validation/sign-in";
import { z } from "zod";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  TIME_PICKER = "timePicker",
  PASSWORD = "password",
}

interface CustomInputProps {
  control: Control<z.infer<typeof SignInFormSchema>>;
  name: FieldPath<z.infer<typeof SignInFormSchema>>;

  label?: string;
  placeholder?: string;
  fieldType: FormFieldType;
}

interface RenderInputProps {
  field: ControllerRenderProps<any, string>;
  props: CustomInputProps;
}

const RenderInput: React.FC<RenderInputProps> = ({ field, props }) => {
  const [showPassword, setShowPassword] = useState(false);
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={props.placeholder} {...field} />
        </FormControl>
      );
      break;
    case FormFieldType.PASSWORD:
      return (
        <FormControl>
          <div className="relative transition duration-300">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your password"
              {...field}
            />
            {showPassword ? (
              <EyeOffIcon
                className="absolute top-2 right-2 z-50 hover:cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeIcon
                className="absolute top-2 right-2 z-50 hover:cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </FormControl>
      );
    default:
      break;
  }
};
export const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <RenderInput field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
