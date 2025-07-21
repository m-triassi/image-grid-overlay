import { memo } from "react";

import ImageView from "./ImageView";
import ImagePlaceholder from "./ImagePlaceholder";

const ImageDisplay = memo(({ image, handleImageUpload, ...props }) => (
  <main className="flex-grow flex items-center justify-center p-4 lg:p-8">
    {image ? (
      <ImageView image={image} {...props} />
    ) : (
      <ImagePlaceholder onUpload={handleImageUpload} />
    )}
  </main>
));

export default ImageDisplay;
