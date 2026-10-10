"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";

/** Quick finder in the hero: pick a destination and stay type, then jump to the filtered list. */
export function HeroSearch() {
  const router = useRouter();
  const id = useId();
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("All");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location !== "all") params.set("location", location);
    if (type !== "All") params.set("type", type);
    const q = params.toString();
    router.push(`/properties${q ? `?${q}` : ""}#stays-list`);
  };

  const field = "w-full appearance-none bg-transparent text-[0.95rem] font-semibold text-navy focus:outline-none";

  return (
    <form
      onSubmit={submit}
      aria-label="Find your stay"
      className="flex flex-col gap-2 rounded-[1.5rem] border border-white bg-white/90 p-2 shadow-[var(--shadow-float)] backdrop-blur sm:flex-row sm:items-center sm:rounded-full"
    >
      <label htmlFor={`${id}-loc`} className="flex flex-1 items-center gap-3 rounded-full px-4 py-2 hover:bg-mist">
        <Icon name="pin" size={18} className="shrink-0 text-violet" />
        <span className="min-w-0 flex-1">
          <span className="block text-[0.72rem] text-slate">Destination</span>
          <select id={`${id}-loc`} value={location} onChange={(e) => setLocation(e.target.value)} className={field}>
            <option value="all">All destinations</option>
            <option value="pune">Pune — Ravet &amp; Hinjewadi</option>
            <option value="lonavala">Lonavala</option>
          </select>
        </span>
      </label>
      <span className="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
      <label htmlFor={`${id}-type`} className="flex flex-1 items-center gap-3 rounded-full px-4 py-2 hover:bg-mist">
        <Icon name="bed" size={18} className="shrink-0 text-violet" />
        <span className="min-w-0 flex-1">
          <span className="block text-[0.72rem] text-slate">Stay type</span>
          <select id={`${id}-type`} value={type} onChange={(e) => setType(e.target.value)} className={field}>
            <option value="All">Any stay</option>
            <option value="Hotel">Hotel rooms</option>
            <option value="Villa">Villas &amp; cottages</option>
          </select>
        </span>
      </label>
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet to-royal px-6 font-semibold text-white shadow-[0_12px_30px_-12px_rgba(53,36,244,0.6)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
      >
        <Icon name="search" size={17} /> Search
      </button>
    </form>
  );
}
