import { memo } from "react";
import ControlSlider from "./ControlSlider";
import ColorPicker from "./ColorPicker";
import DownloadButton from "./DownloadButton";
import FileUpload from "./FileUpload";

const ControlsSidebar = memo(({ controls }) => (
  <aside className="w-full lg:w-80 bg-gray-800 p-6 space-y-6 flex-shrink-0">
    <h2 className="text-2xl font-bold border-b border-gray-600 pb-2">
      Grid Controls
    </h2>
    <FileUpload onUpload={controls.handleImageUpload} />
    <ControlSlider
      label="Grid Size"
      value={controls.gridSize}
      onChange={controls.setGridSize}
      min="10"
      max="200"
    />
    <ControlSlider
      label="Line Thickness"
      value={controls.lineThickness}
      onChange={controls.setLineThickness}
      min="0.1"
      max="20"
      step="0.1"
    />
    <ColorPicker value={controls.lineColor} onChange={controls.setLineColor} />
    <ControlSlider
      label="Horizontal Offset"
      value={controls.offsetX}
      onChange={controls.setOffsetX}
      min={-200}
      max={200}
    />
    <ControlSlider
      label="Vertical Offset"
      value={controls.offsetY}
      onChange={controls.setOffsetY}
      min={-200}
      max={200}
    />
    <DownloadButton
      onDownload={controls.handleDownload}
      disabled={!controls.image}
    />
  </aside>
));

export default ControlsSidebar;
