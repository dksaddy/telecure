"use client";

import { useState, useEffect } from "react";
import TextInput from "./textInput";
import { claculateAge } from "../utils/calculateAge";
import { useFormStore } from "@/app/store/formstore";
import { useRouter } from "next/navigation";

export default function PatienDetails({ appointmentDetails, selectedInterval }) {
    const setFormDataGlobal = useFormStore((state) => state.setFormData);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: appointmentDetails?.patientName || "",
        phone: "",
        age: claculateAge(appointmentDetails?.patientDOB),
        gender: "",
        weight: "",
        heightFeet: "",
        heightInch: "",
        files: [],
        date: "",
        interval: "",
        timeRange: "",
        docId: appointmentDetails?.doctorId || "",
        patientId: appointmentDetails?.patientId || "",
        status: "pending",
        paymentStatus: false,
        docDetails: appointmentDetails?.docDetails || {},
    });

    const [fileError, setFileError] = useState("");

    useEffect(() => {
        if (appointmentDetails) {
            setFormData((prev) => ({
                ...prev,
                date: appointmentDetails.date || prev.date,
                interval: appointmentDetails.interval || prev.interval,
                timeRange: appointmentDetails.timeRange || prev.timeRange,
            }));
        }
    }, [appointmentDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalSize = files.reduce((sum, file) => sum + file.size, 0);

        if (totalSize > 2 * 1024 * 1024) {
            setFileError("Total file size must not exceed 2MB.");
            return;
        }

        setFileError("");
        setFormData((prev) => ({ ...prev, files }));
    };

    const removeFile = (index) => {
        const updatedFiles = formData.files.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, files: updatedFiles }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormDataGlobal(formData);
        router.push("/appointment/confirm");
        console.log("Submitting data:", formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-full mx-auto space-y-6 p-6 bg-white shadow rounded">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                />
                <TextInput
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    required
                />
                <TextInput
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    required
                />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Gender (Radio) */}
                <div className="flex flex-col">
                    <label className="mb-4 font-semibold">Gender</label>
                    <div className="flex gap-4">
                        {["male", "female", "other"].map((g) => (
                            <label key={g} className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={g}
                                    checked={formData.gender === g}
                                    onChange={handleInputChange}
                                    required
                                />
                                {g.charAt(0).toUpperCase() + g.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                <TextInput
                    label="Weight (kg)"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Weight"
                    required
                />

                <div className="flex flex-col">
                    <label className="mb-1 font-semibold">Height</label>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <input
                                type="number"
                                name="heightFeet"
                                placeholder="ft"
                                value={formData.heightFeet}
                                onChange={handleInputChange}
                                className="p-2 border rounded w-full"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                name="heightInch"
                                placeholder="in"
                                value={formData.heightInch}
                                onChange={handleInputChange}
                                className="p-2 border rounded w-full"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* File Upload */}
            <div>
                <label className="block mb-1 font-semibold">Attach Files (JPG/PDF, max 2MB total):</label>
                <label className="inline-block bg-purple-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-700">
                    Choose Files
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.pdf"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
                {fileError && <p className="text-red-600 text-sm mt-1">{fileError}</p>}
                <ul className="mt-2 space-y-1">
                    {formData.files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                            <span className="text-sm">{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-600 text-sm ml-4"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                type="submit"
                className="w-full md:w-[30%] md:ml-[70%] bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                disabled={!selectedInterval}
            >
                Proceed
            </button>
        </form>
    );
}
