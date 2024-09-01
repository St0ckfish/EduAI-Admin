/* eslint-disable @next/next/no-img-element */
"use client"
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

interface CardProps {
    href: string;
    imgSrc?: string;
    icon?: ReactNode;
    title: string;
    description: string;
    number: number;
}
const AttendCard: React.FC<CardProps> = ({ href, imgSrc, icon, title, description, number }) => {
    const currentLanguage = useSelector((state: RootState) => state.language.language);
    return (

        <div className="w-[250px] h-[180px] bg-white rounded-xl shadow-lg grid justify-center items-center px-3 py-2">
            <Link href={href} className="flex items-center justify-center text-center">
                <div className="flex justify-between items-center gap-5">
                    <div className="grid items-center text-start justify-center gap-2">
                        <p className="text-[17px] font-semibold mt-2 text-[#526484]">{title}</p>
                        <p className="font-semibold">{description}</p>
                        <p className="font-semibold">
                            <span className="text-red-700 font-semibold">{number}</span>
                            {currentLanguage === "en"
                                ? " Absence today"
                                : currentLanguage === "ar"
                                    ? " غياب اليوم"
                                    : currentLanguage === "fr"
                                        ? " Absences"
                                        : " Absence today"} {/* Default to English */}
                        </p>
                    </div>
                    <div className="bg-[#FAEFEF] rounded-full h-[50px] w-[50px] grid items-center justify-center">
                        {imgSrc ? <img src={imgSrc} alt={title} /> : icon}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AttendCard;