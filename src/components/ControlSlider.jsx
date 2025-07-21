import { memo } from "react";

// A memoized slider component to prevent re-renders during value changes.
const ControlSlider = memo(({ label, value, onChange, min, max, step = 1 }) => {
  // Format the displayed value to one decimal place if the step is a float.
  const displayValue = Number.isInteger(step) ? value : value.toFixed(1);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-1">{`${label}: ${displayValue}`}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
});

export default ControlSlider;
