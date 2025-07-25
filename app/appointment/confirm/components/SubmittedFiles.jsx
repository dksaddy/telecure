import { useState, useEffect } from "react";

export default function SubmittedFiles({ files }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // cleanup
    }
  }, [selectedFile]);

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
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-24 object-cover rounded"
              />
            ) : file.type === "application/pdf" ? (
              <div className="text-sm text-blue-600">
              📜 {file.name || `PDF ${index + 1}`}
              </div>
            ) : (
              <p className="text-gray-500 text-xs">Unknown file</p>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedFile && previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedFile(null)}
        >
          <div
            className="bg-white p-4 rounded max-w-lg w-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedFile(null)}
            >
              ✖
            </button>

            {selectedFile.type.startsWith("image") ? (
              <img
                src={previewUrl}
                alt={selectedFile.name}
                className="w-full h-auto rounded"
              />
            ) : selectedFile.type === "application/pdf" ? (
              <iframe
                src={previewUrl}
                title="PDF Preview"
                className="w-full h-[500px] rounded mt-4"
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
