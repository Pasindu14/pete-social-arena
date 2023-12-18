"use client";

import SkewLoader from "react-spinners/SkewLoader";

interface LoaderProps {
  size: number;
  color: string;
}

export function LoaderFull({ size, color }: LoaderProps) {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[50vh]">
      <div className="sweet-loading">
        <SkewLoader
          color={color}
          loading={true}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export function Loader({ size, color }: LoaderProps) {
  return (
    <div className="sweet-loading">
      <SkewLoader
        color={color}
        loading={true}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
