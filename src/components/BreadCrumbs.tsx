"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { MdNavigateNext } from "react-icons/md";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  nameEn: string;
  nameAr: string;
  nameFr: string;
  href: string;
}

interface BreadCrumbsProps {
  breadcrumbs: BreadcrumbItem[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ breadcrumbs }) => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center gap-2 ${
        booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"
      } ml-5 mt-10 flex-wrap text-[18px] max-[550px]:text-[15px]`}
    >
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <Link
            className={`font-semibold transition-all duration-300 ease-in-out ${
              pathname === crumb.href
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary hover:shadow-md"
            } px-2 py-1 rounded-lg`}
            href={crumb.href}
            style={{ margin: "0 5px"}} // Padding for better spacing
          >
            {currentLanguage === "en"
              ? crumb.nameEn
              : currentLanguage === "ar"
                ? crumb.nameAr
                : crumb.nameFr}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <MdNavigateNext size={25} className="text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumbs;
