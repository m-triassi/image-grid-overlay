import React, {
  useState,
  useRef,
  useEffect,
  useTransition,
  useCallback,
} from "react";

import ControlsSidebar from "./components/ControlsSidebar";
import ImageDisplay from "./components/ImageDisplay";

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
