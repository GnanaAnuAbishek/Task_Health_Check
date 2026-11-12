import { Activity, RefreshCw } from "lucide-react";

export default function Header({ title, subtitle, refreshing, onRefresh }) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#10A572] text-white shadow-[0_1px_2px_rgba(16,165,114,0.35)]">
          <Activity size={18} strokeWidth={2.4} />
        </div>
        <div className="min-w-0">
          <h1 className="text-[20px] leading-6 font-semibold tracking-[-0.02em] text-[#12231E]">
            {title}
          </h1>
          <p className="mt-0.5 text-[13px] leading-5 text-[#64746E]">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          aria-busy={refreshing}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#10A572] px-3 text-[13px] font-medium text-white transition hover:bg-[#087A56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10A572]/50 active:scale-[0.98] disabled:cursor-wait"
        >
          <RefreshCw size={14} strokeWidth={2.4} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>
    </header>
  );
}
