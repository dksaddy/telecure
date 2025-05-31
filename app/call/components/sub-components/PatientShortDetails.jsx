export default function PatientShortDetails({ patient }) {
    return (

        <div className="flex flex-wrap gap-x-40 gap-y-2 text-gray-800">
            <div><strong>Name:</strong> <span>{patient.name}</span></div>
            <div><strong>Age:</strong> <span>{patient.age}</span></div>
            <div><strong>Sex:</strong> <span>{patient.gender}</span></div>
            <div><strong>Weight:</strong> <span>{patient.weight} kg</span></div>
            <div>
                <strong>Height: </strong>
                <span>{patient.heightFeet}' {patient.heightInch}"</span>
            </div>
            <hr className="border-t border-gray-400 w-full" />

        </div>

    );
}