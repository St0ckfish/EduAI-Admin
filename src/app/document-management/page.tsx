"use client"
import Card from "@/components/card";
/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const DocumentManagement = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const documents = [
        {
            href: "/document-management/certificate",
            imgSrc: "/images/certificate.png",
            title: "Certificate",
            description: "All certificates Completion ,Achievement , Participation and Professional Development Certificates ",
        },
        {
            href: "/document-management/transcript",
            imgSrc: "/images/file.png",
            title: "Transcripts",
            description: "Some information about Course List, List of points and GPA ",
        },
        {
            href: "/document-management/enrollment",
            imgSrc: "/images/management.png",
            title: "Enrollment",
            description: "Some information about Admission Forms ,Enrollment Status and Enrollment Dates",
        },
        {
            href: "/document-management/attendance",
            imgSrc: "/images/user.png",
            title: "Attendance",
            description: "Some Information about Absence Reports and Early Departure Records",
        },
        {
            href: "/document-management/other",
            imgSrc: "/images/other.png",
            title: "Other Official Documents",
            description: "Some information about ID Cards , Medical Records , Disciplinary Records, Financial Aid Documents, Legal Documents",
        },
    ];
    return (
        <>
            <div className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 ml-7 flex-wrap`}>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/">Administration</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/document-management">Document Management</Link>
            </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center `}>

                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                {documents.map((item, index) => (
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

export default DocumentManagement;