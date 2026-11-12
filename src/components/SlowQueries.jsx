import StatusBadge from "./StatusBadge";

export default function SlowQueries({ queries, liveCount }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#E2EAE6] bg-white shadow-[0_1px_2px_rgba(18,35,30,0.04)]">
      <div className="flex flex-col gap-2 px-4 pt-4 pb-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[#12231E]">RDS slow queries</h2>
          <p className="text-[13px] text-[#64746E]">example data · live count is {liveCount}</p>
        </div>
        <StatusBadge tone={liveCount > 0 ? "danger" : "success"} dot>
          {liveCount} live
        </StatusBadge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-y border-[#EEF3F0] text-[11px] font-semibold tracking-[0.06em] text-[#8B9A94] uppercase">
              <th className="px-5 py-2.5 font-semibold">Database</th>
              <th className="px-3 py-2.5 font-semibold">Query</th>
              <th className="px-3 py-2.5 text-right font-semibold">Calls</th>
              <th className="px-5 py-2.5 text-right font-semibold">Avg (s)</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.id} className="border-b border-[#EEF3F0] last:border-b-0">
                <td className="px-5 py-3 text-[13px] font-semibold text-[#12231E]">{query.database}</td>
                <td className="max-w-[520px] px-3 py-3">
                  <p className="truncate font-mono text-[12px] text-[#3E524C]" title={query.query}>
                    {query.query}
                  </p>
                </td>
                <td className="px-3 py-3 text-right text-[13px] text-[#12231E] tabular-nums">
                  {query.calls.toLocaleString("en-US")}
                </td>
                <td className="px-5 py-3 text-right text-[13px] text-[#12231E] tabular-nums">
                  {query.avgSeconds.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
