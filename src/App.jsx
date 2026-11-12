import { useCallback, useEffect, useRef, useState } from "react";
import AlertBanner from "./components/AlertBanner";
import DatabaseLoad from "./components/DatabaseLoad";
import EnvironmentTable from "./components/EnvironmentTable";
import ErrorModal from "./components/ErrorModal";
import FailureHistory from "./components/FailureHistory";
import Header from "./components/Header";
import OverviewCards from "./components/OverviewCards";
import SlowQueries from "./components/SlowQueries";
import {
  ADDITIONAL_PASSING_CHECKS,
  createChecks,
  databaseInfo,
  failureHistory,
  formatChecked,
  formatClock,
  loadByRange,
  slowQueries,
  verticalName,
} from "./data/dashboardData";

const LIVE_SLOW_QUERIES = 0;

async function writeClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

export default function App() {
  const [checks] = useState(createChecks);
  const [now, setNow] = useState(() => new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [retryingId, setRetryingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [range, setRange] = useState("1h");
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState(null);
  const refreshingRef = useRef(false);
  const retryingRef = useRef(false);
  const toastTimer = useRef(null);

  const showNotice = useCallback((nextNotice) => {
    setNotice(nextNotice);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setNotice(null), 4000);
  }, []);

  const refresh = useCallback(() => {
    if (refreshingRef.current) return;
    refreshingRef.current = true;
    setRefreshing(true);

    window.setTimeout(() => {
      setNow(new Date());
      setRefreshing(false);
      refreshingRef.current = false;
      showNotice({
        tone: "success",
        title: "Successfully",
        message: "Health check Refreshed .",
      });
    }, 900);
  }, [showNotice]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const retryCheck = useCallback(
    (id) => {
      if (!id || retryingRef.current) return;
      retryingRef.current = true;
      setRetryingId(id);

      window.setTimeout(() => {
        retryingRef.current = false;
        setRetryingId(null);
        showNotice({
          tone: "warning",
          title: "Warning alert!",
          message: "Retry failed — ECONNREFUSED. Email database is still down.",
        });
      }, 1200);
    },
    [showNotice],
  );

  const copyError = useCallback(
    async (text) => {
      const value = text || "Email DB (unknown) connection failed: ECONNREFUSED";
      await writeClipboard(value);
      showNotice({
        tone: "success",
        title: "Successfully",
        message: "Error copied to clipboard.",
      });
    },
    [showNotice],
  );

  const closeModal = useCallback(() => setModalOpen(false), []);

  const checkedLabel = formatChecked(now);
  const clockLabel = formatClock(now);
  const liveChecks = checks.map((check) => ({ ...check, lastChecked: clockLabel }));

  const failingChecks = liveChecks.filter((check) => check.status === "down");
  const primaryIssue = failingChecks[0] ?? null;
  const tablePassing = checks.length - failingChecks.length;
  const passing = ADDITIONAL_PASSING_CHECKS + tablePassing;
  const failing = failingChecks.length;
  const health = Math.round((passing / Math.max(passing + failing, 1)) * 100);
  const databaseChecks = liveChecks.filter((check) => check.group === "Database");
  const databasesUp = databaseChecks.filter((check) => check.status === "up").length;

  return (
    <div className="min-h-screen bg-[#F3F7F5] text-[#12231E]">
      {refreshing ? (
        <div className="fixed inset-x-0 top-0 z-40 h-0.5 overflow-hidden bg-[#D9F3E8]">
          <div className="refresh-bar h-full w-1/3 bg-[#10A572]" />
        </div>
      ) : null}

      <main
        className={`mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-4 py-5 transition-opacity duration-300 sm:px-6 sm:py-7 ${
          refreshing ? "opacity-90" : "opacity-100"
        }`}
      >
        <Header
          title="Health Check"
          subtitle={`${verticalName} · 1 instance · checked ${checkedLabel}`}
          refreshing={refreshing}
          onRefresh={refresh}
        />

        {primaryIssue ? (
          <AlertBanner
            count={failing}
            description={primaryIssue.summary}
            retrying={retryingId === primaryIssue.id}
            onRetry={() => retryCheck(primaryIssue.id)}
            onViewDetails={() => setModalOpen(true)}
          />
        ) : null}

        <OverviewCards
          health={health}
          passing={passing}
          failing={failing}
          instancesUp={1}
          instancesTotal={1}
          databasesUp={databasesUp}
          databasesTotal={databaseChecks.length}
          slowQueries={LIVE_SLOW_QUERIES}
        />

        <EnvironmentTable
          checks={liveChecks}
          filter={filter}
          onFilter={setFilter}
          retryingId={retryingId}
          onRetry={retryCheck}
          onCopy={copyError}
        />

        <DatabaseLoad
          name={databaseInfo.name}
          host={databaseInfo.host}
          range={range}
          onRange={setRange}
          metrics={loadByRange[range]}
        />

        <SlowQueries queries={slowQueries} liveCount={LIVE_SLOW_QUERIES} />
        <FailureHistory rows={failureHistory} />
      </main>

      <ErrorModal
        open={modalOpen}
        check={primaryIssue}
        retrying={primaryIssue ? retryingId === primaryIssue.id : false}
        onClose={closeModal}
        onRetry={() => primaryIssue && retryCheck(primaryIssue.id)}
        onCopy={() => primaryIssue && copyError(primaryIssue.error)}
      />

      {notice ? (
        <div className="toast-in fixed top-4 right-4 z-[60] w-[min(100%-2rem,24rem)]">
          <div
            className={`p-4 mb-4 text-sm rounded-base ${
              notice.tone === "warning"
                ? "text-fg-warning bg-warning-soft"
                : "text-fg-success-strong bg-success-soft"
            }`}
            role="alert"
          >
            <span className="font-medium">{notice.title}</span> {notice.message}
          </div>
        </div>
      ) : null}
    </div>
  );
}
