import React, { useState } from "react";

const DragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // You can customize to allow different types of drops.
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setDroppedFiles(files);
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setDroppedFiles(files);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        className={`w-96 h-48 flex items-center justify-center border-2 ${
          isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
        } border-dashed rounded-lg p-4 transition-all`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {droppedFiles ? (
          <div>
            <p className="text-center text-gray-700">
              {Array.from(droppedFiles).map((file) => file.name).join(", ")}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setDroppedFiles(null)}
            >
              Remove Files
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">Drag and drop files here</p>
            <p className="text-gray-400">or</p>
            <label className="cursor-pointer text-blue-500 hover:underline">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                multiple
              />
              Browse Files
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;