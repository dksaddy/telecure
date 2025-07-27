import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Printer,
  Download,
  MapPin,
  Phone,
  User,
  Stethoscope,
  Pill,
  Calendar,
  AlertTriangle,
  Check,
} from "lucide-react";

export default function MedicalPrescription() {
  return (
    <div className=" bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Medical Prescription
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Doctor Information */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-blue-600">
                  Dr. Sarah Johnson
                </h2>
                <p className="text-gray-600">
                  Cardiologist | MBBS, MD Cardiology
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    City Medical Center
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    +1 (555) 123-4567
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Prescription Date</p>
              <p className="font-semibold">March 15, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Patient Symptoms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5" />
              Patient Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Chest pain and discomfort
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Shortness of breath during physical activity
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Fatigue and weakness
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Irregular heartbeat
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Stethoscope className="w-5 h-5" />
              Diagnosis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-blue-600 mb-2">
              Hypertension (High Blood Pressure)
            </h3>
            <p className="text-sm text-gray-600">
              Stage 1 hypertension with mild cardiovascular risk factors.
              Patient shows elevated blood pressure readings consistently above
              140/90 mmHg.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Prescribed Medications */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Pill className="w-5 h-5" />
            Prescribed Medications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lisinopril */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-blue-600">
                Lisinopril
              </h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                ACE Inhibitor
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500">Dosage:</p>
                <p className="font-medium">10mg</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Frequency:</p>
                <p className="font-medium">Once daily</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration:</p>
                <p className="font-medium">30 days</p>
              </div>
            </div>
            <p className="text-sm text-blue-600">
              Take with or without food, preferably at the same time each day.
            </p>
          </div>

          {/* Metoprolol */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-blue-600">
                Metoprolol
              </h3>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Beta Blocker
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500">Dosage:</p>
                <p className="font-medium">25mg</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Frequency:</p>
                <p className="font-medium">Twice daily</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration:</p>
                <p className="font-medium">30 days</p>
              </div>
            </div>
            <p className="text-sm text-blue-600">
              Take with meals. Do not stop suddenly without consulting your
              doctor.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Medical Advice & Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Check className="w-5 h-5" />
              Medical Advice & Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">
                Lifestyle Recommendations
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Reduce sodium intake to less than 2300mg daily
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Engage in 30 minutes of moderate exercise daily
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Maintain a healthy weight (BMI 18.5-24.9)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Limit alcohol consumption
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Warnings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              Important Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Monitor blood pressure daily</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Contact doctor if systolic BP {">"} 180 mmHg</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Report any dizziness or fainting</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Appointment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5" />
            Next Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Follow-up consultation recommended
              </p>
              <h3 className="text-xl font-semibold">April 15, 2025</h3>
              <p className="text-sm text-gray-500">
                2:30 PM - City Medical Center
              </p>
            </div>
            <div className="text-right">
              <Button className="bg-gray-900 hover:bg-gray-800 mb-2">
                Schedule Appointment
              </Button>
              <p className="text-xs text-gray-500">
                Click to book your next visit
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
