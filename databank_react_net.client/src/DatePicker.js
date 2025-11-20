import React from "react";
import { DatePicker as HDatePicker } from "@heroui/react";

export default function DatePicker({ label, value, onChange, ...rest }) {
  // pass value/onChange through; value may be a string or Date depending on what you store
  return (
    <div className="flex-row gap-4">
      <HDatePicker
        showMonthAndYearPickers
        label={label}
        variant="bordered"
        value={value || null}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}