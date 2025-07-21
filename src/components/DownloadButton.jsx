import { memo } from "react";

const DownloadButton = memo(({ onDownload, disabled }) => (
  <div className="pt-4 border-t border-gray-600">
    <button
      onClick={onDownload}
      disabled={disabled}
      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      Download Image
    </button>
  </div>
));

export default DownloadButton;
