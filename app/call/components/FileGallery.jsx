import React, { useState } from "react";
import FileModal from "./FileModal";

const FileGallery = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!files || files.length === 0) {
    return <p className="text-xs text-gray-500">No files uploaded.</p>;
  }

  return (
    <div className="font-sans">
      <h2 className="text-lg font-semibold text-purple-700 mb-2">Uploaded Files</h2>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1">
        {files.map((file) => {
          const isPDF = file.url.toLowerCase().endsWith(".pdf");

          return (
            <div
              key={file._id?.$oid || file._id}
              className="bg-white border border-gray-200 rounded p-0.5 shadow-sm cursor-pointer hover:border-purple-400 transition"
              onClick={() => setSelectedFile(file)}
            >
              {isPDF ? (
                <div className="w-full h-10 flex items-center justify-center bg-gray-100 rounded">
                  <p className="text-[9px] text-gray-600">📄 PDF</p>
                </div>
              ) : (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-10 object-cover rounded mb-0.5"
                />
              )}
              <p className="text-[9px] text-gray-700 truncate px-0.5">{file.name}</p>
            </div>
          );
        })}
      </div>

      {selectedFile && (
        <FileModal file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
    </div>
  );
};

export default FileGallery;
