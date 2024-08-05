"use client"
import Card from "@/components/card";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const Attendance = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const UserManagments = [
        {
            href: "/driver-attendance",
            icon: (
                <svg className="h-12 w-12 font-sans text-[#000000] group-hover:text-[#3e5af0]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="6" cy="17" r="2" />  <circle cx="18" cy="17" r="2" />  <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />  <polyline points="16 5 17.5 12 22 12" />  <line x1="2" y1="10" x2="17" y2="10" />  <line x1="7" y1="5" x2="7" y2="10" />  <line x1="12" y1="5" x2="12" y2="10" /></svg>
            ),
            title: "Driver",
            description: "Number Of Drivers Attendance",
        },
        {
            href: "/employee-attendance",
            imgSrc: "/images/employee.png",
            title: "Employee",
            description: "Number of Employee Attendance",
        },
        {
            href: "/student-attendance",
            imgSrc: "/images/student.png",
            title: "Student",
            description: "Number of Students Attendance",
        },
        {
            href: "/teacher-attendance",
            imgSrc: "/images/Teacher.png",
            title: "Teacher",
            description: "All Teachers Attendance",
        },
        {
            href: "/worker-attendance",
            imgSrc: "/images/Worker.png",
            title: "Worker",
            description: "All Workers Attendance",
        },
    ];
    return (
        <>
        <div className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 ml-7 flex-wrap`}>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Operations</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/attendances">Attendances</Link>
        </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center `}>

            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
            {UserManagments.map((item, index) => (
                        <Card
                            key={index}
                            href={item.href}
                            imgSrc={item.imgSrc}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>

            </div>
        </>
    );
}

export default Attendance;