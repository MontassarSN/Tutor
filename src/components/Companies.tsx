import React from "react";
const Companies: React.FC = () => {
  return (
    <div className="flex flex-row gap-5 w-3/4 items-center m-auto mt-12 pb-10">
      <div className="flex flex-col gap-4 w-2/5 justify-center m-auto">
        <h1 className="text-2xl font-semibold m-auto">
          We Just keep growing with 6.3k Companies
        </h1>
        <div className="text-xs text-gray-500 m-auto">
          Nullam egestas tellus at enim ornare tristique. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra.
        </div>
      </div>
      <div className="flex flex-col gap-5 w-1/6 justify-center">
        <div className="m-auto w-[180px] bg-white shadow-sm">
          <img src="/companies/C1.png" alt="C1" className="h-[80px] m-auto" />
        </div>

        <div className="m-auto w-[180px] bg-white shadow-sm">
          <img
            src="/companies/C2.png"
            alt="C2"
            className="h-[80px] w-[80px] m-auto"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-1/6 justify-center">
        <div className="m-auto w-[180px] bg-white shadow-sm">
          <img
            src="/companies/C3.png"
            alt="C3"
            className="h-[80px] w-[80px] m-auto"
          />
        </div>

        <div className="m-auto w-[180px] bg-white shadow-sm">
          <img
            src="/companies/C4.png"
            alt="C4"
            className="h-[80px] w-[80px] m-auto"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-1/6 justify-center">
        <div className="m-auto w-[180px] bg-white shadow-sm">
          <img
            src="/companies/C5.png"
            alt="C1"
            className="h-[80px] w-[80px] m-auto"
          />
        </div>

        <div className="m-auto w-[180px] bg-white shadow-sm">
          <img
            src="/companies/C6.png"
            alt="C1"
            className="h-[80px] w-[80px] m-auto"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-1/6 justify-center">
        <div className="m-auto w-[180px] bg-white shadow-sm">
          <img
            src="/companies/C7.png"
            alt="C1"
            className="h-[80px] w-[80px] m-auto"
          />
        </div>

        <div className="m-auto w-[180px] bg-white shadow-sm">
          <img
            src="/companies/C8.png"
            alt="C1"
            className="h-[80px] w-[80px] m-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Companies;
