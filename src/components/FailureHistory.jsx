export default function FailureHistory({ rows }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#E2EAE6] bg-white shadow-[0_1px_2px_rgba(18,35,30,0.04)]">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-5">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[#12231E]">Failure history</h2>
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#FEECEC] px-1.5 text-[11px] font-semibold text-[#DC2626]">
          {rows.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-y border-[#EEF3F0] text-[11px] font-semibold tracking-[0.06em] text-[#8B9A94] uppercase">
              <th className="px-5 py-2.5 font-semibold">Time</th>
              <th className="px-3 py-2.5 font-semibold">Instance</th>
              <th className="px-3 py-2.5 font-semibold">Service</th>
              <th className="px-5 py-2.5 font-semibold">Reason</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-[13px] text-[#64746E]">
                  No failures recorded.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-[#EEF3F0] last:border-b-0">
                  <td className="px-5 py-3 text-[13px] font-medium whitespace-nowrap text-[#12231E]">
                    {row.time}
                  </td>
                  <td className="px-3 py-3 text-[13px] whitespace-nowrap text-[#12231E]">{row.instance}</td>
                  <td className="px-3 py-3 text-[12px] font-semibold tracking-wide whitespace-nowrap text-[#12231E]">
                    {row.service}
                  </td>
                  <td className="px-5 py-3 text-[13px] whitespace-nowrap text-[#12231E]">{row.reason}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
