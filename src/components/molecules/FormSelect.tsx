import React from "react";
import { Label } from "../ui/label";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ErrorText from "../atom/text/ErrorText";
import clsx from "clsx";

interface IOption {
  value: string;
  label: string;
}

interface FomSelectProps {
  id: string;
  label: string;
  control: Control<any>;
  option: IOption[];
  error?: FieldError;
  placeholder?: string;
}

const FormSelect: React.FC<FomSelectProps> = ({
  id,
  label,
  control,
  option,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-1.5 gap-1">
      <Label className={clsx(error && "text-red-500")} htmlFor={id}>
        {label}
      </Label>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger id={id} ref={field.ref}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {option.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && (
        <ErrorText className="text-red-500 font-semibold">
          {error.message}
        </ErrorText>
      )}
    </div>
  );
};

export default FormSelect;
