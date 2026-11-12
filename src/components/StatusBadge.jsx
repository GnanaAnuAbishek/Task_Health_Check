const tones = {
  success: "bg-[#E7F6EE] text-[#087A56]",
  danger: "bg-[#FEECEC] text-[#DC2626]",
  neutral: "bg-[#F3F7F5] text-[#64746E]",
};

const dots = {
  success: "bg-[#10A572]",
  danger: "bg-[#DC2626]",
  neutral: "bg-[#64746E]",
};

export default function StatusBadge({ tone = "success", dot = false, children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-5 ${tones[tone]} ${className}`}
    >
      {dot ? <span className={`h-1.5 w-1.5 rounded-full ${dots[tone]}`} /> : null}
      {children}
    </span>
  );
}
