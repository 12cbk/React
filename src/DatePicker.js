import {DateRangePicker} from "@heroui/react";

export default function DatePicker() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DateRangePicker showMonthAndYearPickers label="Birth Date" variant="bordered" />
    </div>
  );
}
