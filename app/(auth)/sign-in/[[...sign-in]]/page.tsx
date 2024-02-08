import { bebas } from "@/constants/fonts";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black">
      <div className="flex flex-col items-center justify-center w-full mt-12">
        <h1
          className={`text-[#22C55E] text-7xl font-semibold ${bebas.className}`}
        >
          Pete's Social Arena
        </h1>
      </div>
      <div className="grid md:grid-cols-2 mt-12 h-full ">
        <div className="md:flex flex-col items-center justify-center hidden">
          <Image
            src="/sign_in.svg"
            alt="Logo"
            sizes="80vw"
            style={{
              width: "80%",
              height: "auto",
            }}
            width={500}
            height={300}
            className="p-20"
          />
        </div>
        <div className="flex items-center justify-center ">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
