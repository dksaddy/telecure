import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
const Medicine = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Medicines Lookup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search medicines..." className="pl-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">A-Cold Syrup</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Generic: </span>
                    <span>Acetaminophen</span>
                  </div>
                  <div>
                    <span className="font-medium">Dosage: </span>
                    <span>4 mg/5 ml</span>
                  </div>
                  <div>
                    <span className="font-medium">Manufacturer: </span>
                    <span>ABC Pharma</span>
                  </div>
                  <div>
                    <span className="font-medium">Price: </span>
                    <span className="text-blue-600 font-semibold">$12.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Paracetamol</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Generic: </span>
                    <span>Acetaminophen</span>
                  </div>
                  <div>
                    <span className="font-medium">Dosage: </span>
                    <span>500mg</span>
                  </div>
                  <div>
                    <span className="font-medium">Manufacturer: </span>
                    <span>XYZ Pharma</span>
                  </div>
                  <div>
                    <span className="font-medium">Price: </span>
                    <span className="text-blue-600 font-semibold">$8.75</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Medicine;
