"use client";
import { useState } from "react";
import ToggleBtn, { RecruitStatus } from "@/components/common/button/ToggleBtn";

export default function Home() {
  const [status, setStatus] = useState<RecruitStatus>("completed");

  return (
    <>
      <ToggleBtn value={status} onChange={setStatus} />
    </>
  );
}
