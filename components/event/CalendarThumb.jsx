import { format } from "date-fns";

export default function CalendarThumb({ date }) {
  return (
    <div className="w-20 h-20 rounded-xl shadow-md bg-white overflow-hidden text-center">
      <p className="text-sm font-bold uppercase bg-red-600 text-red-100">
        {format(date, "MMM")}
      </p>
      <p className="text-3xl">{format(date, "dd")}</p>
      <p className="bg-gray-50 text-gray-500">{format(date, "eee")}</p>
    </div>
  );
}
