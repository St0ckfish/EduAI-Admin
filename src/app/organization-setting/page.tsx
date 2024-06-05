/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const OrganizationSettings = () => {
    return (
        <>
            <div className={`lg:ml-[290px] mt-12 grid justify-center `}>

                <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/organization-setting/reports" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                                <img src="/images/reports.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Reports</p>
                        </Link>
                    </div>
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/organization-setting/permissions" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                                <img src="/images/permetions.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Permission</p>
                        </Link>
                    </div>
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/organization-setting/semester" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                                <img src="/images/Semester.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Semester</p>
                        </Link>
                    </div>
                    
                </div>

            </div>
        </>
    );
}

export default OrganizationSettings;