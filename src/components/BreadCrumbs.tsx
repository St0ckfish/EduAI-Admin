"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { MdNavigateNext } from "react-icons/md";

// Define the type for the breadcrumb items
interface BreadcrumbItem {
  nameEn: string;
  nameAr: string;
  nameFr: string;
  href: string;
}

// Define the props type for the BreadCrumbs component
interface BreadCrumbsProps {
  breadcrumbs: BreadcrumbItem[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ breadcrumbs }) => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );

  return (
    <div
      className={`flex items-center gap-1 ${
        booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"
      } ml-7 mt-12 flex-wrap text-[18px] max-[550px]:text-[15px]`}
    >
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <Link
            className="font-semibold text-secondary hover:text-primary hover:underline"
            href={crumb.href}
          >
            {currentLanguage === "en"
              ? crumb.nameEn
              : currentLanguage === "ar"
                ? crumb.nameAr
                : crumb.nameFr}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <MdNavigateNext size={25} className="text-secondary" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumbs;
