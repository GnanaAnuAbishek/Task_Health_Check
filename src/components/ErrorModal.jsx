import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import StatusBadge from "./StatusBadge";

function Fact({ label, value }) {
  if (!value) return null;
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-semibold tracking-[0.06em] text-[#8B9A94] uppercase">{label}</dt>
      <dd className="mt-1 text-[13px] break-words text-[#12231E]">{value}</dd>
    </div>
  );
}

export default function ErrorModal({ open, check, retrying, onClose, onRetry, onCopy }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open || !check) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-[#12231E]/45" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="error-modal-title"
        className="modal-in relative w-full max-w-[520px] rounded-2xl border border-[#E2EAE6] bg-white p-5 shadow-[0_24px_60px_rgba(18,35,30,0.18)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 id="error-modal-title" className="text-[18px] font-semibold tracking-[-0.02em] text-[#12231E]">
                {check.name}
              </h2>
              <StatusBadge tone="danger" dot>
                Down
              </StatusBadge>
            </div>
            <p className="mt-1 text-[13px] text-[#64746E]">{check.detail}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#64746E] transition hover:bg-[#F3F7F5] hover:text-[#12231E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10A572]/40"
          >
            <X size={16} />
          </button>
        </div>

        <p className="mt-4 text-[13px] leading-5 text-[#3E524C]">
          The health check could not open a connection to this database. The host refused the
          connection.
        </p>

        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Fact label="Host" value={check.host} />
          <Fact label="Service" value={check.service} />
          <Fact label="Instance" value={check.instance} />
          <Fact label="Group" value={check.group} />
          <Fact label="Failed at" value={check.failedAt} />
          <Fact label="Uptime" value={check.uptime} />
          <Fact label="Last checked" value={check.lastChecked} />
          <Fact label="Latency" value={check.latency || "—"} />
        </dl>

        <div className="mt-4 rounded-xl bg-[#FEECEC] px-3 py-3">
          <p className="text-[11px] font-semibold tracking-[0.06em] text-[#DC2626] uppercase">Error</p>
          <p className="mt-1 font-mono text-[12.5px] leading-5 text-[#B42318]">{check.error}</p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium text-[#64746E] transition hover:bg-[#F3F7F5] hover:text-[#12231E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10A572]/40"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex h-8 items-center rounded-full border border-[#E2EAE6] bg-white px-3.5 text-[13px] font-medium text-[#12231E] transition hover:bg-[#F7FBFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10A572]/40"
          >
            Copy error
          </button>
          <button
            type="button"
            onClick={onRetry}
            disabled={retrying}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#DC2626] px-3.5 text-[13px] font-medium text-white transition hover:bg-[#B91C1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]/40 disabled:cursor-wait disabled:opacity-70"
          >
            {retrying ? (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : null}
            {retrying ? "Retrying" : "Retry"}
          </button>
        </div>
      </div>
    </div>
  );
}
