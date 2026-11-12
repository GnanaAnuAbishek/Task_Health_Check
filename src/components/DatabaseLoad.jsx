import { useEffect, useState } from "react";
import CircularProgress from "./CircularProgress";
import TimeFilter from "./TimeFilter";

function useWideRings() {
  const [wide, setWide] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 640px)").matches : true,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const onChange = () => setWide(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return wide;
}

function formatPair(left, right) {
  return `${left.toFixed(2)} / ${right.toFixed(2)}`;
}

function RingStat({ value, caption, label, size, stroke }) {
  return (
    <div className="flex flex-col items-center">
      <CircularProgress value={value} size={size} stroke={stroke} label={label}>
        <span className="text-[18px] font-bold tracking-tight text-[#12231E] tabular-nums sm:text-[20px]">
          {value}%
        </span>
      </CircularProgress>
      <p className="mt-2 text-center text-[12px] leading-4 text-[#64746E]">{caption}</p>
    </div>
  );
}

export default function DatabaseLoad({ name, host, range, onRange, metrics }) {
  const wide = useWideRings();
  const size = wide ? 104 : 76;
  const stroke = wide ? 9 : 7;
  const connectionPercent = Math.round((metrics.connections / metrics.connectionLimit) * 100);

  const stats = [
    { label: "Free memory", value: `${metrics.freeMemoryMb.toLocaleString("en-US")} MB` },
    {
      label: "Read / Write IOPS",
      value: formatPair(metrics.readIops, metrics.writeIops),
    },
    {
      label: "Read / Write latency",
      value: `${formatPair(metrics.readLatencyMs, metrics.writeLatencyMs)} ms`,
    },
  ];

  return (
    <section className="rounded-2xl border border-[#E2EAE6] bg-white px-4 py-4 shadow-[0_1px_2px_rgba(18,35,30,0.04)] sm:px-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[#12231E]">Database load</h2>
        <TimeFilter
          label="Database load range"
          value={range}
          onChange={onRange}
          options={[
            { value: "1h", label: "1h" },
            { value: "6h", label: "6h" },
            { value: "24h", label: "24h" },
          ]}
        />
      </div>

      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-[18px] leading-6 font-semibold text-[#12231E]">{name}</h3>
          <p className="text-[13px] text-[#64746E]">{host}</p>

          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-6">
            <RingStat
              value={metrics.cpu}
              caption="CPU"
              label={`CPU ${metrics.cpu} percent`}
              size={size}
              stroke={stroke}
            />
            <RingStat
              value={connectionPercent}
              caption={`Conn. ${metrics.connections}/${metrics.connectionLimit}`}
              label={`${metrics.connections} of ${metrics.connectionLimit} connections, ${connectionPercent} percent`}
              size={size}
              stroke={stroke}
            />
            <RingStat
              value={metrics.freeStoragePercent}
              caption={`Free ${metrics.freeStorageGb} GB`}
              label={`Free storage ${metrics.freeStorageGb} gigabytes, ${metrics.freeStoragePercent} percent`}
              size={size}
              stroke={stroke}
            />
          </div>
        </div>

        <dl className="w-full space-y-3 lg:w-[270px] lg:shrink-0">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline justify-between gap-6">
              <dt className="text-[13px] text-[#64746E]">{stat.label}</dt>
              <dd className="text-[14px] font-semibold whitespace-nowrap text-[#12231E] tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
