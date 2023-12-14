import React from "react";
import Loader from "@/components/common/Loader";

import { primaryColor } from "@/constants/colors";

const LoaderFull = () => {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[50vh]">
      <Loader color={primaryColor} size={20} />
    </div>
  );
};

export default LoaderFull;
