// import { ErrorMessage } from "formik";
// import React, { useState } from "react";
// import CloudIcon from "../../assets/icons/CloudIcon";

// const DragAndDrop = ({
//     touched,
//     errors,
//     name,
//     label,
//     value,
//     required=true,
//     handleSelectFile,
// }) => {
//   const [fileError, setFileError] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [droppedFiles, setDroppedFiles] = useState(null);

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     setFileError(null);

//     const files = e.dataTransfer.files;
//     if (files && files.length > 0) {
//       const validFiles = Array.from(files).filter(file =>
//         ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)
//       );

//        if (validFiles.length > 0) {
//           setDroppedFiles(validFiles);
//           handleSelectFile(validFiles);
//         } else {
//           setFileError("Only JPEG, PNG, and WebP images are allowed!");
//         }
//     }
//   };

//   const handleFileUpload = (e) => {
//     const files = e.target.files;
//     setDroppedFiles(files);
//     handleSelectFile(files);
//     setFileError(null);
//   };

//   return (
//     <div>
//         <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
//             {label} {required && <span className="text-[#F04438]">*</span>}
//         </label>

//         <div className="flex flex-col items-center justify-center mt-0.5">
//             <button
//                 type="button"
//                 className={`w-full h-[190px] flex items-center justify-center border-2 ${
//                 isDragging ? "border-blue-500 bg-blue-100" : "border-[#E2E8F0]"
//                 } border-dashed rounded-lg p-4 transition-all ${touched[name] && errors[name] ? "border-red-500" : ""}`}
//                 onDragEnter={handleDragEnter}
//                 onDragLeave={handleDragLeave}
//                 onDragOver={handleDragOver}
//                 onDrop={handleDrop}
//             >
//                 {droppedFiles || value ? (
//                 <div className="flex flex-col justify-center items-center">
//                     {droppedFiles ? (
//                       <p className="text-center text-gray-700">
//                           {Array.from(droppedFiles).map((file) => file.name).join(", ")}
//                       </p>
//                     ) : (
//                       <p className="text-center text-gray-700">
//                           {value}
//                       </p>
//                     )}

//                     <button
//                     className="w-fit mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     onClick={() => {
//                       setDroppedFiles(null);
//                       handleSelectFile("");
//                     }}
//                     >
//                       Remove Files
//                     </button>
//                 </div>
//                 ) : (
//                 <div className="flex items-center flex-col gap-4">
//                     <CloudIcon />

//                     <p className="text-[#718096]">Drop image here or</p>

//                     <label className="cursor-pointer bg-[#DCF1FE] px-1.5 py-1 text-center rounded text-[#1278BC] w-fit">
//                     <input
//                         type="file"
//                         accept="image/png, image/jpeg, image/jpg, image/webp"
//                         className="hidden"
//                         onChange={handleFileUpload}
//                     />
//                         Upload file
//                     </label>
//                 </div>
//                 )}
//             </button>
//         </div>

//         {!fileError && <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />}
        
//         {fileError && <div className="text-red-500 text-xs mt-1">{fileError}</div>}
//     </div>
//   );
// };

// export default DragAndDrop;

import { ErrorMessage } from "formik";
import React, { useState } from "react";
import CloudIcon from "../../assets/icons/CloudIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";

const DragAndDrop = ({
  touched,
  errors,
  name,
  label,
  value, // This can be a server URL or a file path
  required = true,
  handleSelectFile,
}) => {
  const [fileError, setFileError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

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
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setFileError(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter((file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)
      );

      if (validFiles.length > 0) {
        setDroppedFiles(validFiles);
        handleSelectFile(validFiles);
        setPreviewURL(URL.createObjectURL(validFiles[0])); // Create a preview URL for the dropped file
      } else {
        setFileError("Only JPEG, PNG, and WebP images are allowed!");
      }
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setDroppedFiles(files);
    handleSelectFile(files);
    setFileError(null);
    setPreviewURL(URL.createObjectURL(files[0])); // Create a preview URL for the uploaded file
  };

  console.log(value)

  return (
    <div>
      <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
        {label} {required && <span className="text-[#F04438]">*</span>}
      </label>

      <div className="flex flex-col items-center justify-center mt-0.5">
        <div
          className={`w-full h-[190px] flex items-center justify-center border-2 ${
            isDragging ? "border-blue-500 bg-blue-100" : "border-[#E2E8F0]"
          } border-dashed rounded-lg transition-all ${
            touched[name] && errors[name] ? "border-red-500" : ""
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {previewURL || value ? (
            <div className="flex flex-col justify-center items-center w-full relative">
              <img
                src={previewURL ? previewURL : `${process.env.REACT_APP_BACKEND_BASE_URL}/uploads/${value}`}
                alt="Preview"
                className="w-full h-[190px] rounded-lg object-cover"
              />

              <button
                className="w-fit mt-2 mr-2 rounded hover:bg-red-300 absolute top-0 right-0"
                onClick={() => {
                  setDroppedFiles(null);
                  setPreviewURL(null);
                  handleSelectFile("");
                }}
              >
                <DeleteIcon className="w-8 h-8 text-red-500" />
              </button>
            </div>
          ) : (
            <div className="flex items-center flex-col gap-4">
              <CloudIcon />
              <p className="text-[#718096]">Drop image here or</p>
              <label className="cursor-pointer bg-[#DCF1FE] px-1.5 py-1 text-center rounded text-[#1278BC] w-fit">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                Upload file
              </label>
            </div>
          )}
        </div>
      </div>

      {!fileError && <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />}
      {fileError && <div className="text-red-500 text-xs mt-1">{fileError}</div>}
    </div>
  );
};

export default DragAndDrop;
