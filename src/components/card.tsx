/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
    href: string;
    imgSrc?: string;
    icon?: ReactNode;
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ href, imgSrc, icon, title, description }) => (
    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-end">
        <Link href={href} className="grid items-center justify-center text-center">
            <div className="flex justify-center">
                <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center">
                    {imgSrc ? <img src={imgSrc} alt={title} /> : icon}
                </div>
            </div>
            <p className="text-[22px] font-semibold mt-2">{title}</p>
            <div className="flex items-end mt-4 rounded-xl">
                <div className="flex px-2.5 items-center w-[250px] h-[80px] text-start bg-[#FAEFEF] rounded-b-xl text-[13px] text-[#526484] font-semibold">
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    </div>
);

export default Card;
