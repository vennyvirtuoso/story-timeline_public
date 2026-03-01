import React from 'react';


export const MemoryLimitBar = ({
  count,
  limit = 2,
  isPro = false,
  onUpgrade,
}) => {
  const isUnlimited = isPro || limit === Infinity;
  const isOverLimit = !isUnlimited && count > limit;

  const usagePercent = isUnlimited
    ? 0
    : Math.min((count / limit) * 100, 100);

    return (
      <div className="mb-4 max-w-[300px] mx-auto">
        <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm px-3 py-3 transition-all">
    
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">
              {isUnlimited ? "Unlimited Memories 💖" : "Your Memories"}
            </p>
    
            {!isUnlimited && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  isOverLimit
                    ? "bg-rose-50 text-rose-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                Free Plan
              </span>
            )}
          </div>
    
          {/* Count Display */}
          <div className="mb-2">
            <p className="text-lg font-bold text-gray-800">
              {count}
              {!isUnlimited && (
                <span className="text-sm font-medium text-gray-400 ml-1">
                  memories saved
                </span>
              )}
            </p>
    
            {!isUnlimited && (
              <p className="text-[11px] text-gray-400 mt-0.5">
                Free plan allows {limit} active memories
              </p>
            )}
          </div>
    
          {/* Progress Bar */}
          {!isUnlimited && (
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isOverLimit
                    ? "bg-gradient-to-r from-rose-400 to-pink-500"
                    : "bg-gradient-to-r from-rose-300 to-pink-400"
                }`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          )}
    
          {/* Upgrade */}
          {!isUnlimited && isOverLimit && (
            <div className="mt-3 text-center">
              <button
                onClick={onUpgrade}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
              >
                Reactivate Pro to keep adding memories →
              </button>
            </div>
          )}
        </div>
      </div>
    );
};
export default MemoryLimitBar;
