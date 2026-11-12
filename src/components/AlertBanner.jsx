export default function AlertBanner({ count, description, retrying, onRetry, onViewDetails }) {
  const title = count === 1 ? "1 issue needs attention" : `${count} issues need attention`;

  return (
    <section
      role="alert"
      className="flex flex-col gap-3 rounded-2xl border border-[#F6D4D4] bg-[#FEECEC] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-2.5 sm:items-center">
        <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[#DC2626] sm:mt-0">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <p className="text-[13.5px] leading-5 text-[#12231E]">
          <span className="font-semibold">{title}</span>
          <span className="text-[#5C6E68]"> · {description}</span>
        </p>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2">
        <button
          type="button"
          onClick={onRetry}
          disabled={retrying}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#F0C1C1] bg-white px-3.5 text-[13px] font-medium text-[#DC2626] transition hover:bg-[#FFF6F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]/30 disabled:cursor-wait disabled:opacity-70"
        >
          {retrying ? (
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#DC2626]/30 border-t-[#DC2626]" />
          ) : null}
          {retrying ? "Retrying" : "Retry"}
        </button>
        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex h-8 items-center rounded-full bg-[#DC2626] px-3.5 text-[13px] font-medium text-white transition hover:bg-[#B91C1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]/40 active:scale-[0.98]"
        >
          View details
        </button>
      </div>
    </section>
  );
}
