import React, { ReactNode } from 'react';

interface CompanyInfoProps {
  Address: ReactNode;
  PhoneNumbers: ReactNode;
  Email: ReactNode;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ Address, PhoneNumbers, Email }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <div className="text-customText text-lg w-[45%]">ADDRESS</div>
        <div className="text-sm w-[45%]">{Address}</div>
      </div>
      <hr className="text-gray-500"/>
      <div className="flex flex-row justify-between">
        <div className="text-customText text-lg w-[45%]">PHONE NUMBER</div>
        <div className="text-sm w-[45%]">{PhoneNumbers}</div>
      </div>
      <hr className="text-gray-500"/>
      <div className="flex flex-row justify-between">
        <div className="text-customText text-lg w-[45%]">EMAIL ADDRESS</div>
        <div className="text-sm w-[45%]">{Email}</div>
      </div>
    </div>
  );
}

export default CompanyInfo;
