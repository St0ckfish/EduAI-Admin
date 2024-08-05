"use client"
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import Card from "@/components/card";

const Course = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const Courses = [
        {
            href: "/course/course-management",
            imgSrc: "/images/Semester.png",
            title: "Course",
            description: "All Courses in School",
        },
        {
            href: "/course/resource",
            imgSrc: "/images/mapping.png",
            title: "Resource",
            description: "Create Course",
        },

    ];
    return (
        <>
            <div className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 ml-7 flex-wrap`}>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Academic</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/course">Course</Link>
            </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center `}>

                <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols2 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                {Courses.map((item, index) => (
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

export default Course;