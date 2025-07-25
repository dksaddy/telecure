"use client";

import Find from "./components/Find";
import Appointments from "./components/Appointments";
import Pres from "./components/Pres";
import Medicine from "./components/Medicine";

export default function page() {
  return (
    <>
      <Find />
      <Appointments />
      <Pres />
    </>
  );
}
