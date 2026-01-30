"use client";

import { api } from "@/services/api";
import Link from "next/link";
import { ScheduleDay } from "@/types";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";

// Client component wrapper for fetching data (since we want interactivity)
// Or we can keep it server and use a client component for the item.
// Let's use a Client Component for the whole page interaction for simplicity in this refactor,
// but fetch in a server component would be better. For now, let's keep it clean.
import { getScheduleData } from "./actions"; // We'll create a server action or just use useEffect?
// Actually, let's keep the page server-side and make the Card client-side.

export default function SchedulePage() {
  return (
    <div className="pb-8 space-y-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="text-emerald-400" />
        Jadwal Rilis Anime
      </h1>
      <ScheduleList />
    </div>
  );
}

function ScheduleList() {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch on client to avoid blocking navigation if API is slow
    fetch("/api/schedule-proxy")
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Wait, simpler approach: Server Component passes data to Client Component.
  // I can't restart the server component easily here.
  // Let's stick to the previous pattern: Server Page -> Client Component not needed for Accordion strictly if we use <details>?
  // No, <details> is ugly.

  // Let's just make the Page use a helper Client Component for the list.
  return <p className="text-red-500">Please Wait...</p>; // Placeholder, I will overwrite this file in a moment with the proper split.
}
