const idleTones = {
  danger: "bg-[#FEECEC] text-[#DC2626] hover:bg-[#FCDCDC]",
  success: "bg-[#E7F6EE] text-[#087A56] hover:bg-[#DDF3E8]",
  ghost: "text-[#64746E] hover:bg-[#E7EFEC] hover:text-[#12231E]",
};

export default function TimeFilter({ options, value, onChange, label = "Filter" }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label={label}>
      {options.map((option) => {
        const active = option.value === value;
        const idle = idleTones[option.tone] || idleTones.ghost;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={`rounded-full px-2.5 py-1 text-[12px] font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10A572]/50 ${
              active ? "bg-[#12231E] text-white" : idle
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
