import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IOption {
  value: string;
  label: string;
}

interface FomSelectProps {
  id: string;
  label: string;
  control: Control<any>;
  option: IOption[];
  placeholder?: string;
}

const FormSelect: React.FC<FomSelectProps> = ({
  id,
  label,
  control,
  option,
  placeholder,
}) => {
  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>역할</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {option.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
