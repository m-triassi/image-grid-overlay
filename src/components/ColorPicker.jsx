import { memo } from "react";

const ColorPicker = memo(({ value, onChange }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-300 mb-1">
      Line Color
    </label>
    <div className="relative">
      <input
        type="color"
        value={value}
        onInput={(e) => onChange(e.target.value)}
        className="p-1 h-10 w-full block bg-gray-600 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  </div>
));

export default ColorPicker;
