import { memo } from "react";

const ImageView = memo(
  ({ image, imageRef, canvasRef, dragHandlers, isDragging }) => (
    // Using inline-block and a wrapper with text-center makes the container shrink to the size of the image.
    <div className="w-full max-w-5xl mx-auto text-center">
      <div
        {...dragHandlers}
        className={`relative inline-block border-2 border-dashed border-gray-600 rounded-lg overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <img
          ref={imageRef}
          src={image}
          alt="Upload"
          className="max-w-full max-h-[80vh] object-contain block pointer-events-none"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>
    </div>
  ),
);

export default ImageView;
