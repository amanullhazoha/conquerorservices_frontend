import { ErrorMessage } from "formik";
import React, { useState } from "react";
import CloudIcon from "../../assets/icons/CloudIcon";

const DragAndDrop = ({
    touched,
    errors,
    name,
    label,
    required=true,
    handleSelectFile,
}) => {
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
      handleSelectFile(files)
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setDroppedFiles(files);
    handleSelectFile(files);
  };

  return (
    <div>
        <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
            {label} {required && <span className="text-[#F04438]">*</span>}
        </label>

        <div className="flex flex-col items-center justify-center mt-0.5">
            <div
                className={`w-full h-[190px] flex items-center justify-center border-2 ${
                isDragging ? "border-blue-500 bg-blue-100" : "border-[#E2E8F0]"
                } border-dashed rounded-lg p-4 transition-all ${touched[name] && errors[name] ? "border-red-500" : ""}`}
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
                <div className="flex items-center flex-col gap-4">
                    <CloudIcon />

                    <p className="text-[#718096]">Drop image here or</p>

                    <label className="cursor-pointer bg-[#DCF1FE] px-1.5 py-1 text-center rounded text-[#1278BC] w-fit">
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                        Upload file
                    </label>
                </div>
                )}
            </div>
        </div>

        <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );
};

export default DragAndDrop;