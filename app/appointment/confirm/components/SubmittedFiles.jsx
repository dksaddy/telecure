// components/SubmittedFiles.tsx
import { useState } from "react";

export default function SubmittedFiles({ files }) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-semibold text-purple-700 mb-3">Submitted Files</h2>
      <div className="flex flex-wrap gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="w-32 cursor-pointer text-center bg-white p-2 rounded shadow hover:shadow-md transition"
            onClick={() => setSelectedFile(file)}
          >
            {file.type?.startsWith("image") ? (
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-24 object-cover rounded"
              />
            ) : file.type === "application/pdf" ? (
              <div className="text-sm text-blue-600 underline">📄 {file.name || `PDF ${index + 1}`}</div>
            ) : (
              <p className="text-gray-500 text-xs">Unknown file</p>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedFile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedFile(null)}
        >
          <div
            className="bg-white p-4 rounded max-w-lg w-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedFile(null)}
            >
              ✖
            </button>

            {selectedFile.type?.startsWith("image") ? (
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="w-full h-auto rounded"
              />
            ) : selectedFile.type === "application/pdf" ? (
              <iframe
                src={selectedFile.url}
                title="PDF Preview"
                className="w-full h-[500px] rounded"
              />
            ) : (
              <p className="text-gray-700 text-sm">Cannot preview this file type.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
