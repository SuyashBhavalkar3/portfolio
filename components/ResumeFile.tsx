"use client";

import React from "react";

export default function ResumeFile() {
  return (
    <div className="w-full h-full flex flex-col flex-1 min-h-0">
      <iframe
        src="/resume-v2.1.pdf"
        className="w-full h-full flex-1 border-none bg-ide-sidebar"
        title="Suyash Bhavalkar Resume"
      />
    </div>
  );
}
