"use client";

import React from "react";

import ResearchForCourses from "@/components/ResearchForCourses";
import CompanyInfo from "./components/CompanyInfo";
import ContactForm from "./components/ContactForm";
import { SearchProvider, useSearch } from "@/Contexts/SearchContext";
export default function Page() {
  const address = (
    <div className="flex flex-col gap-2">
      <div>1702 Olympic Boulevard</div>
      <div>Santa Monica, CA 90404</div>
    </div>
  );

  const phoneNumbers = (
    <div className="flex flex-col gap-2">
      <div>(480) 555-0103</div>
      <div>(219) 555-0114</div>
    </div>
  );

  const email = (
    <div className="flex flex-col gap-2">
      <div>help.eduguard@gmail.com</div>
      <div>career.eduguard@gmail.com</div>
    </div>
  );
  const { searchQuery } = useSearch();
  return (
    <div className="bg-white shadow-sm text-black">
      {searchQuery ? (
        <ResearchForCourses />
      ) : (
        <div className="flex flex-col">
          <div className="bg-gray-50 flex flex-col gap-5 py-20 px-40">
            <h1 className="text-4xl font-bold m-auto">Conatct Us</h1>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-5 w-[35%]">
                <div className="text-xl">
                  Will you be in Los Angeles or any other branches any time
                  soon? Stop by the office! We'd love to meet.
                </div>
                <CompanyInfo
                  Address={address}
                  PhoneNumbers={phoneNumbers}
                  Email={email}
                />
              </div>
              <div className="bg-white shadow-sm w-[40%] p-10">
                <ContactForm />
              </div>
            </div>
          </div>
          <iframe
            className="h-[20rem]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70220.4299791944!2d-77.08607222476563!3d38.93919998555421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b62764ce4687%3A0x9a075d72958e3fd0!2sCath%C3%A9drale%20nationale%20de%20Washington!5e0!3m2!1sfr!2stn!4v1719937114505!5m2!1sfr!2stn"
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
}
