"use client";

import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {
  size: number;
  color: string;
}

function Loader({ size, color }: LoaderProps) {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={true}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
