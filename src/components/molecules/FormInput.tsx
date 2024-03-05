import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FormInputProps {
  id: string;
  control: Control<any>;
  type?: "text" | "email" | "password";
  label: string;
  placeholder?: string;
}

const FormInput: React.FC<
  FormInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ id, type = "text", control, label, placeholder, ...inputProps }) => {
  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              {...inputProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
