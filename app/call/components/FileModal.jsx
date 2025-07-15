import React from "react";

const FileModal = ({ file, onClose }) => {
  if (!file) return null;

  const isPDF = file.url.toLowerCase().endsWith(".pdf");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white max-w-3xl w-full rounded-lg shadow-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-3">{file.name}</h2>

        <div className="w-full h-[500px] overflow-hidden rounded-md border">
          {isPDF ? (
            <iframe src={file.url} className="w-full h-full" title={file.name} />
          ) : (
            <img src={file.url} alt={file.name} className="w-full h-full object-contain" />
          )}
        </div>

        <div className="mt-4 text-center">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            Open in new tab
          </a>
        </div>
      </div>
    </div>
  );
};

export default FileModal;
