import React from "react";
import Form from "./components/LogForm";
import SmallNav from "../../components/SmallNav";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col bg-white shadow-sm text-gray-900">
      <SmallNav>
        <div className="flex flex-row items-center gap-3">
          <div>Don’t have account?</div>
          <Link href="/CreateAccount">
            <button className="bg-customBg text-customText hover:text-texthover2 hover:bg-hoverbutton2 py-2 px-4">
              Create Account
            </button>
          </Link>
        </div>
      </SmallNav>
      <div className="flex flex-row ">
        <div className="w-[45%] bg-purple-100 flex justify-center">
          <Image
            src="/saly0.png"
            alt="saly"
            className="w-full h-auto bottom-0"
            height={1000}
            width={1000}
          />
        </div>
        <div className="p-24 w-[55%]">
          <div className="w-[80%]">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
