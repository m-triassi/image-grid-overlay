import React, {
  useState,
  useRef,
  useEffect,
  useTransition,
  memo,
  useCallback,
} from "react";

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

const ImagePlaceholder = memo(({ onUpload }) => (
  <div className="flex items-center justify-center w-full">
    <label
      htmlFor="file-upload"
      className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          className="w-10 h-10 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="mb-2 text-sm text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, or GIF</p>
      </div>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onUpload}
      />
    </label>
  </div>
));

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

const ImageDisplay = memo(({ image, handleImageUpload, ...props }) => (
  <main className="flex-grow flex items-center justify-center p-4 lg:p-8">
    {image ? (
      <ImageView image={image} {...props} />
    ) : (
      <ImagePlaceholder onUpload={handleImageUpload} />
    )}
  </main>
));

const App = () => {
  const [image, setImage] = useState(null);
  const [gridSize, setGridSize] = useState(50);
  const [lineThickness, setLineThickness] = useState(2);
  const [lineColor, setLineColor] = useState("#000000");
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialOffsetRef = useRef({ x: 0, y: 0 });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !img || !canvas) return;

    const ctx = canvas.getContext("2d");

    const drawGrid = () => {
      canvas.width = img.clientWidth;
      canvas.height = img.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineThickness;

      ctx.beginPath();
      for (let x = offsetX % gridSize; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (
        let x = (offsetX % gridSize) - gridSize;
        x >= -gridSize;
        x -= gridSize
      ) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = offsetY % gridSize; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      for (
        let y = (offsetY % gridSize) - gridSize;
        y >= -gridSize;
        y -= gridSize
      ) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();
    };

    if (img.complete) {
      drawGrid();
    } else {
      img.onload = drawGrid;
    }

    window.addEventListener("resize", drawGrid);
    return () => {
      window.removeEventListener("resize", drawGrid);
      if (img) img.onload = null;
    };
  }, [image, gridSize, lineThickness, lineColor, offsetX, offsetY]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setOffsetX(0);
        setOffsetY(0);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragStart = useCallback(
    (e) => {
      e.preventDefault();
      const clientX =
        e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      const clientY =
        e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
      setIsDragging(true);
      dragStartRef.current = { x: clientX, y: clientY };
      initialOffsetRef.current = { x: offsetX, y: offsetY };
    },
    [offsetX, offsetY],
  );

  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - dragStartRef.current.x;
      const deltaY = clientY - dragStartRef.current.y;
      startTransition(() => {
        setOffsetX(initialOffsetRef.current.x + deltaX);
        setOffsetY(initialOffsetRef.current.y + deltaY);
      });
    },
    [isDragging],
  );

  const handleDragEnd = useCallback(() => setIsDragging(false), []);

  const handleDownload = useCallback(() => {
    const img = imageRef.current;
    if (!image || !img) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const scaleX = img.naturalWidth / img.clientWidth;
    const scaleY = img.naturalHeight / img.clientHeight;

    ctx.drawImage(img, 0, 0);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineThickness * Math.min(scaleX, scaleY);
    ctx.beginPath();

    const scaledGridSize = gridSize * scaleX;
    const scaledOffsetX = offsetX * scaleX;
    const scaledOffsetY = offsetY * scaleY;

    for (
      let x = scaledOffsetX % scaledGridSize;
      x < canvas.width;
      x += scaledGridSize
    ) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (
      let x = (scaledOffsetX % scaledGridSize) - scaledGridSize;
      x >= -scaledGridSize;
      x -= scaledGridSize
    ) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (
      let y = scaledOffsetY % scaledGridSize;
      y < canvas.height;
      y += scaledGridSize
    ) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    for (
      let y = (scaledOffsetY % scaledGridSize) - scaledGridSize;
      y >= -scaledGridSize;
      y -= scaledGridSize
    ) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "image-with-grid.png";
    link.click();
  }, [image, lineColor, lineThickness, gridSize, offsetX, offsetY]);

  const controls = {
    image,
    gridSize,
    lineThickness,
    lineColor,
    offsetX,
    offsetY,
    setGridSize,
    setLineThickness,
    setLineColor,
    setOffsetX,
    setOffsetY,
    handleImageUpload,
    handleDownload,
  };

  const dragHandlers = {
    onMouseDown: handleDragStart,
    onMouseMove: handleDragMove,
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
    onTouchStart: handleDragStart,
    onTouchMove: handleDragMove,
    onTouchEnd: handleDragEnd,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row font-sans">
      <ImageDisplay
        image={image}
        handleImageUpload={handleImageUpload}
        imageRef={imageRef}
        canvasRef={canvasRef}
        dragHandlers={dragHandlers}
        isDragging={isDragging}
      />
      <ControlsSidebar controls={controls} />
    </div>
  );
};

export default App;
