import { api } from "@/services/api";
import { ScheduleDay } from "@/types";
import { Calendar } from "lucide-react";
import ScheduleGrid from "./ScheduleGrid";

export const revalidate = 3600;

export default async function SchedulePage() {
  // Fetch data on the server
  const schedule: ScheduleDay[] = await api.getSchedule();

  return (
    <div className="pb-8 space-y-8 px-4 sm:px-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Calendar className="text-emerald-400 h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Jadwal Rilis Anime
        </h1>
      </div>

      <ScheduleGrid schedule={schedule} />
    </div>
  );
}
