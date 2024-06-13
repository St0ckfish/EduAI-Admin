/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const CurriculumManagement = () => {
    return (
        <>
         <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7">
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Academic</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/curriculum-management">Curriculum Management</Link>
        </div>
            <div className={`lg:ml-[290px] mt-12 grid justify-center `}>

                <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/curriculum-management/curriculum-planning" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                                <img src="/images/planning.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Planning</p>
                        </Link>
                    </div>
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/curriculum-management/curriculum-mapping" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                                <img src="/images/mapping.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Mapping</p>
                        </Link>
                    </div>
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/curriculum-management/syllabus-management" className="grid items-center justify-center text-center" >
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