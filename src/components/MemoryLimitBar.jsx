import React from 'react';

export const MemoryLimitBar = ({
  count,
  limit = 2,
  isPro = false,
  onUpgrade,
}) => {
  const isUnlimited = isPro || limit === Infinity;
  const isOverLimit = !isUnlimited && count >= limit;

  const usagePercent = isUnlimited
    ? 0
    : Math.min((count / limit) * 100, 100);

  return (
    <div className="mb-6 max-w-xs mx-auto">
      <div className="bg-surface backdrop-blur-md border border-border-theme rounded-2xl shadow-theme-sm px-4 py-3.5 transition-all">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-sub font-bold uppercase tracking-widest text-dark/65">
            {isUnlimited ? 'Unlimited Memories 💖' : 'Memory Allowance'}
          </p>
          {!isUnlimited && (
            <span
              className={`text-[9px] font-sub font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isOverLimit
                  ? 'bg-rose-safarnama/15 text-rose-safarnama'
                  : 'bg-primary/10 text-primary'
              }`}
            >
              Free Plan
            </span>
          )}
        </div>

        <div className="flex items-baseline justify-between mb-2">
          <p className="text-xl font-heading font-bold text-primary leading-none tabular-nums">
            {count}
            {!isUnlimited && (
              <span className="text-xs font-sans font-medium text-dark/50 ml-1.5">
                / {limit} memories saved
              </span>
            )}
          </p>
        </div>

        {!isUnlimited && (
          <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOverLimit
                  ? 'bg-gradient-to-r from-rose-safarnama to-accent'
                  : 'bg-gradient-to-r from-primary to-accent'
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        )}

        {!isUnlimited && isOverLimit && (
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={onUpgrade}
              className="text-[11px] font-sub font-bold uppercase tracking-wider text-rose-safarnama hover:text-primary transition-colors"
            >
              Upgrade to Pro for unlimited →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryLimitBar;
