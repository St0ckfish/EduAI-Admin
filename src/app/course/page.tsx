import Link from "next/link";
import Image from 'next/image';

const Course = () => {
    return ( 
        <>
            <div className={`lg:ml-[290px] mt-12 grid justify-center `}>

<div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols2 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
        <Link href="/course/course-management" className="grid items-center justify-center text-center" >
            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                <Image src="/images/Semester.png" width={400} height={300} layout="responsive" alt="#" />
            </div>
            <p className="text-[22px] font-semibold mt-2">Course</p>
        </Link>
    </div>
    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
        <Link href="/course/resource" className="grid items-center justify-center text-center" >
            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                <Image src="/images/mapping.png" width={400} height={300} layout="responsive" alt="#" />
            </div>
            <p className="text-[22px] font-semibold mt-2">Resource</p>
        </Link>
    </div>
    
</div>

</div>
        </>
     );
}
 
export default Course;