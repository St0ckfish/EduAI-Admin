"use client"
import Card from "@/components/card";
/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const OrganizationSettings = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const settings = [
        {
            href: "/organization-setting/reports",
            imgSrc: "/images/reports.png",
            title: "Reports",
            description: "All user Reports",
        },
        {
            href: "/organization-setting/permissions/department-permission",
            imgSrc: "/images/permetions.png",
            title: "Permission",
            description: "All Permissions ",
        },
        {
            href: "/organization-setting/semester",
            imgSrc: "/images/Semester.png",
            title: "Semester",
            description: "Enter semester information",
        },
        {
            href: "/organization-setting/department",
            imgSrc: "/images/exams.png",
            title: "Department",
            description: "Enter Departments information",
        },
        {
            href: "/organization-setting/position",
            imgSrc: "/images/user.png",
            title: "Position",
            description: "Enter Position information",
        },
        {
            href: "/organization-setting/annual",
            imgSrc: "/images/events.png",
            title: "Annual Leave",
            description: "All Annual Leave",
        },
    ];
    return (
        <>
        <div className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-12 ml-7 text-[18px] max-[550px]:text-[15px]  flex-wrap`}>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Administration</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/organization-setting">Organization Setting</Link>
        </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center `}>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                    {settings.map((item, index) => (
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

export default OrganizationSettings;