import CircularProgress from "./CircularProgress";
import StatusBadge from "./StatusBadge";

export default function HealthProgress({ value, passing, failing }) {
  return (
    <div className="flex items-center gap-4">
      <CircularProgress
        value={value}
        size={78}
        stroke={7}
        label={`Overall health ${value} percent`}
      >
        <span className="text-[20px] font-bold tracking-tight text-[#12231E]">{value}%</span>
      </CircularProgress>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold tracking-[0.08em] text-[#64746E] uppercase">
          Overall health
        </p>
        <div className="mt-2 flex flex-col items-start gap-1.5">
          <StatusBadge tone="success">{passing} passing</StatusBadge>
          {failing > 0 ? (
            <StatusBadge tone="danger">{failing} failing</StatusBadge>
          ) : (
            <StatusBadge tone="success">All clear</StatusBadge>
          )}
        </div>
      </div>
    </div>
  );
}
