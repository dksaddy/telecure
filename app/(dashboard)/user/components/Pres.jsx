import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Eye } from "lucide-react";

const Pres = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Prescriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">Prescription - Jan 20, 2024</h3>
                  <p className="text-gray-600">Dr. Sarah Johnson</p>
                </div>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Diagnosis: </span>
                  <span>Common Cold, Fever</span>
                </div>
                <div>
                  <span className="font-medium">Medications: </span>
                  <span>A-Cold Syrup 4 mg/5 ml, Paracetamol 500mg</span>
                </div>
                <div>
                  <span className="font-medium">Investigations: </span>
                  <span>ECG, Blood Test</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">Prescription - Jan 15, 2024</h3>
                  <p className="text-gray-600">Dr. Mike Wilson</p>
                </div>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Diagnosis: </span>
                  <span>Hypertension</span>
                </div>
                <div>
                  <span className="font-medium">Medications: </span>
                  <span>Amlodipine 5mg, Losartan 50mg</span>
                </div>
                <div>
                  <span className="font-medium">Investigations: </span>
                  <span>Blood Pressure Monitoring</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};

export default Pres;
