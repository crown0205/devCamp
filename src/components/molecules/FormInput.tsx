import clsx from "clsx";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import ErrorText from "../atom/text/ErrorText";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormInputProps {
  id: string;
  type?: "text" | "email" | "password";
  label: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegister<any>;
}

const FormInput: React.FC<
  FormInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  id,
  type = "text",
  label,
  placeholder,
  error,
  register,
  ...inputProps
}) => {
  return (
    <div className="flex flex-col space-y-1.5 gap-1">
      <Label className={clsx(error && "text-red-500")} htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        {...inputProps}
      />
      {error && (
        <ErrorText className="text-red-500 font-semibold">
          {error?.message}
        </ErrorText>
      )}
    </div>
  );
};

export default FormInput;
