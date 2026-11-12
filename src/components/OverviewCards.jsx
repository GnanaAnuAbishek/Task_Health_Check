import HealthProgress from "./HealthProgress";
import StatusBadge from "./StatusBadge";

function StatCard({ label, value, badge }) {
  return (
    <article className="flex min-h-[118px] flex-col justify-center rounded-2xl border border-[#E2EAE6] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(18,35,30,0.04)]">
      <p className="text-[11px] font-semibold tracking-[0.08em] text-[#64746E] uppercase">{label}</p>
      <p className="mt-2 text-[32px] leading-none font-bold tracking-[-0.03em] text-[#12231E] tabular-nums">
        {value}
      </p>
      <div className="mt-3">{badge}</div>
    </article>
  );
}

function Fraction({ current, total }) {
  return (
    <>
      {current}
      <span className="px-1 text-[26px] font-semibold text-[#8EA099]">/</span>
      {total}
    </>
  );
}

export default function OverviewCards({
  health,
  passing,
  failing,
  instancesUp,
  instancesTotal,
  databasesUp,
  databasesTotal,
  slowQueries,
}) {
  const databasesDown = databasesTotal - databasesUp;
  const instancesHealthy = instancesUp === instancesTotal;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article className="flex min-h-[118px] items-center rounded-2xl border border-[#E2EAE6] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(18,35,30,0.04)]">
        <HealthProgress value={health} passing={passing} failing={failing} />
      </article>

      <StatCard
        label="Instances"
        value={<Fraction current={instancesUp} total={instancesTotal} />}
        badge={
          <StatusBadge tone={instancesHealthy ? "success" : "danger"}>
            {instancesHealthy ? "All reachable" : "Unreachable"}
          </StatusBadge>
        }
      />

      <StatCard
        label="Databases"
        value={<Fraction current={databasesUp} total={databasesTotal} />}
        badge={
          <StatusBadge tone={databasesDown > 0 ? "danger" : "success"}>
            {databasesDown > 0 ? `${databasesDown} down` : "All healthy"}
          </StatusBadge>
        }
      />

      <StatCard
        label="Slow queries"
        value={slowQueries}
        badge={
          <StatusBadge tone={slowQueries > 0 ? "danger" : "success"}>
            {slowQueries > 0 ? "Flagged" : "None flagged"}
          </StatusBadge>
        }
      />
    </section>
  );
}
