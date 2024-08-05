"use client"
import Card from "@/components/card";
/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const CurriculumManagement = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const curriculums = [
        {
            href: "/curriculum-management/curriculum-planning",
            imgSrc: "/images/planning.png",
            title: "Planning",
            description: "Plan the structure and content of courses offered.",
        },
        {
            href: "/curriculum-management/curriculum-mapping",
            imgSrc: "/images/mapping.png",
            title: "Mapping",
            description: "Map the curriculum to standards and learning objectives.",
        },
        {
            href: "/curriculum-management/syllabus-management",
            imgSrc: "/images/management.png",
            title: "Syllabus",
            description: "Manage detailed outlines of course content and requirements.",
        },
    ];
    return (
        <>
         <div className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 ml-7 flex-wrap`}>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Academic</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/curriculum-management">Curriculum Management</Link>
        </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center `}>

                <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                {curriculums.map((item, index) => (
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

export default CurriculumManagement;