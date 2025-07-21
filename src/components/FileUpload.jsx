import { memo } from "react";

const FileUpload = memo(({ onUpload }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Image File
    </label>
    <input
      type="file"
      accept="image/*"
      onChange={onUpload}
      className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
    />
  </div>
));

export default FileUpload;
