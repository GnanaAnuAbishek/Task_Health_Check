import { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";
import TimeFilter from "./TimeFilter";

const cardClass =
  "overflow-hidden rounded-2xl border border-[#E2EAE6] bg-white shadow-[0_1px_2px_rgba(18,35,30,0.04)]";

export default function EnvironmentTable({ checks, filter, onFilter, retryingId, onRetry, onCopy }) {
  const [copiedId, setCopiedId] = useState(null);
  const failingCount = checks.filter((check) => check.status === "down").length;
  const healthyCount = checks.filter((check) => check.status === "up").length;

  const visible = checks.filter((check) => {
    if (filter === "failing") return check.status === "down";
    if (filter === "healthy") return check.status === "up";
    return true;
  });

  useEffect(() => {
    if (!copiedId) return undefined;
    const timer = window.setTimeout(() => setCopiedId(null), 1500);
    return () => window.clearTimeout(timer);
  }, [copiedId]);

  async function handleCopy(check) {
    await onCopy(check.error);
    setCopiedId(check.id);
  }

  return (
    <section className={cardClass}>
      <div className="flex flex-col gap-3 px-4 pt-4 pb-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[#12231E]">
            Environment & Databases
          </h2>
          <p className="text-[13px] text-[#64746E]">{checks.length} checks</p>
        </div>
        <TimeFilter
          label="Environment checks"
          value={filter}
          onChange={onFilter}
          options={[
            { value: "all", label: `All ${checks.length}` },
            { value: "failing", label: `Failing ${failingCount}`, tone: "danger" },
            { value: "healthy", label: `Healthy ${healthyCount}`, tone: "success" },
          ]}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr className="border-y border-[#EEF3F0] text-[11px] font-semibold tracking-[0.06em] text-[#8B9A94] uppercase">
              <th className="px-5 py-2.5 font-semibold">Status</th>
              <th className="px-3 py-2.5 font-semibold">Check</th>
              <th className="px-3 py-2.5 font-semibold">Group</th>
              <th className="px-3 py-2.5 font-semibold">Latency</th>
              <th className="px-3 py-2.5 font-semibold">Uptime</th>
              <th className="px-3 py-2.5 font-semibold">Last checked</th>
              <th className="px-5 py-2.5 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-[13px] text-[#64746E]">
                  No checks in this view.
                </td>
              </tr>
            ) : (
              visible.map((check) => {
                const down = check.status === "down";
                const retrying = retryingId === check.id;
                const rowTone = down ? "bg-[#FEECEC]" : "bg-white";

                return (
                  <tr key={check.id} className="border-b border-[#EEF3F0] last:border-b-0" aria-busy={retrying}>
                    <td className={`px-5 py-3 ${rowTone}`}>
                      <StatusBadge tone={down ? "danger" : "success"} dot>
                        {down ? "Down" : "Up"}
                      </StatusBadge>
                    </td>
                    <td className={`px-3 py-3 ${rowTone}`}>
                      <p className="text-[13px] font-semibold text-[#12231E]">{check.name}</p>
                      {check.detail ? (
                        <p className="mt-0.5 text-[12px] text-[#D15B5B]">{check.detail}</p>
                      ) : null}
                    </td>
                    <td className={`px-3 py-3 text-[13px] text-[#12231E] ${rowTone}`}>{check.group}</td>
                    <td className={`px-3 py-3 ${rowTone}`}>
                      {check.latency ? (
                        <span className="inline-flex rounded-full bg-[#E7F6EE] px-2 py-0.5 text-[12px] font-medium text-[#087A56]">
                          {check.latency}
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#B7C4BE]">—</span>
                      )}
                    </td>
                    <td
                      className={`px-3 py-3 text-[13px] ${rowTone} ${
                        down ? "font-medium text-[#DC2626]" : "text-[#12231E]"
                      }`}
                    >
                      {check.uptime}
                    </td>
                    <td className={`px-3 py-3 text-[13px] text-[#64746E] whitespace-nowrap ${rowTone}`}>
                      {check.lastChecked}
                    </td>
                    <td className={`px-5 py-3 ${rowTone}`}>
                      {down ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(check)}
                            className="inline-flex h-7 items-center rounded-full border border-[#E2EAE6] bg-white px-3 text-[12px] font-medium text-[#12231E] transition hover:border-[#C9D7D1] hover:bg-[#F7FBFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10A572]/40"
                          >
                            {copiedId === check.id ? "Copied" : "Copy error"}
                          </button>
                          <button
                            type="button"
                            onClick={() => onRetry(check.id)}
                            disabled={Boolean(retryingId)}
                            className="inline-flex h-7 items-center gap-1.5 rounded-full bg-[#DC2626] px-3 text-[12px] font-medium text-white transition hover:bg-[#B91C1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]/40 disabled:cursor-wait disabled:opacity-70"
                          >
                            {retrying ? (
                              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            ) : null}
                            {retrying ? "Retrying" : "Retry"}
                          </button>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="px-5 pt-3 pb-4 text-[12px] text-[#8B9A94]">Latency and uptime are sample values.</p>
    </section>
  );
}
