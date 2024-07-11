/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const OrganizationSettings = () => {
    return (
        <>
        <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7">
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Administration</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/organization-setting">Organization Setting</Link>
        </div>
            <div className={`lg:ml-[290px] mt-12 grid justify-center `}>

                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/organization-setting/reports" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                                <img src="/images/reports.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Reports</p>
                        </Link>
                    </div>
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/organization-setting/permissions/department-permission" className="grid items-center justify-center text-center" >
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
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/organization-setting/department" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                                <img src="/images/exams.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Department</p>
                        </Link>
                    </div>
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/organization-setting/position" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                                <img src="/images/user.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Position</p>
                        </Link>
                    </div>
                    
                </div>

            </div>
        </>
    );
}

export default OrganizationSettings;