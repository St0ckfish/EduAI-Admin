"use client"
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link"
import { useSelector } from "react-redux";

const ProfessionalDevelopment = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);

    return ( 
        <>
        <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7 text-[18px] max-[550px]:text-[15px]  flex-wrap">
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/">Administration</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/document-management">Document Management</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/document-management/certificate">Certificate</Link>
            </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg h-screen`}>
                <div className="flex justify-left gap-5 text-[20px] font-semibold mb-[80px] mt-[50px] ml-4">
                    <Link href="/document-management/certificate">
                        Completion
                    </Link>
                    <Link href="/document-management/certificate/achievement" >
                        Achievement
                    </Link>
                    <Link href="/document-management/certificate/participation">
                        Participation
                    </Link>
                    <Link href="/document-management/certificate/professional-development" className="text-blue-500 underline">
                        Professional Development
                    </Link>
                </div>
            </div>
        </>
     );
}
 
export default ProfessionalDevelopment;