import { bebas } from "@/constants/fonts";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="grid md:grid-cols-2">
        <div className="flex items-center justify-center h-screen">
          <SignUp />
        </div>
        <div className="md:flex flex-col items-center justify-center hidden">
          <h1 className={`text-white text-7xl font-bold ${bebas.className}`}>
            {/*             Join With */}
          </h1>
          <h1
            className={`text-[#22C55E] text-3xl font-semibold ${bebas.className}`}
          >
            {/*         Pete's Social Arena */}
          </h1>
          <Image
            src="/sign_up.svg"
            alt="Logo"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={300}
            className="p-20"
          />
        </div>
      </div>
      ;
    </>
  );
}
