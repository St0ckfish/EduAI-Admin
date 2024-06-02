/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const CurriculumManagement = () => {
    return ( 
        <>
            <div className={`lg:ml-[290px] mt-12 grid justify-center `}>

<div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
        <Link href="/curriculum-planning" className="grid items-center justify-center text-center" >
            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
            <img src="/images/planning.png" alt="#" />
            </div>
            <p className="text-[22px] font-semibold mt-2">Planning</p>
        </Link>
    </div>
    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
        <Link href="/curriculum-mapping" className="grid items-center justify-center text-center" >
            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                <img src="/images/mapping.png" alt="#" />
            </div>
            <p className="text-[22px] font-semibold mt-2">Mapping</p>
        </Link>
    </div>
    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
        <Link href="/syllabus-management" className="grid items-center justify-center text-center" >
            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                <img src="/images/management.png" alt="#" />
            </div>
            <p className="text-[22px] font-semibold mt-2">Syllabus</p>
        </Link>
    </div>
</div>

</div>
        </>
     );
}
 
export default CurriculumManagement;