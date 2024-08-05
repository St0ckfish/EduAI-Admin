"use client"
import Card from "@/components/card";
/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const EducationalAffairs = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const Educations = [
        {
            href: "/educational-affairs/events",
            imgSrc: "/images/events.png",
            title: "Events",
            description: "All school events and you can add new event ",
        },
        {
            href: "/educational-affairs/exams",
            imgSrc: "/images/exams.png",
            title: "Exams",
            description: "All exams in  all subjects ",
        },
        {
            href: "/educational-affairs/grads",
            imgSrc: "/images/grads.png",
            title: "Grades",
            description: "Grades in all  exams",
        },
        {
            href: "/educational-affairs/schedule",
            imgSrc: "/images/schedual.png",
            title: "Schedule",
            description: "All Schedules to both teachers and classes",
        },
    ];
    return (
        <>
            <div className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 ml-7 flex-wrap`}>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Academic</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/educational-affairs">Educational Affairs</Link>
            </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center `}>

                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                {Educations.map((item, index) => (
                        <Card
                            key={index}
                            href={item.href}
                            imgSrc={item.imgSrc}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>

            </div>
        </>
    );
}

export default EducationalAffairs;