/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const EducationalAffairs = () => {
    return ( 
        <>
        <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7">
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Academic</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/educational-affairs">Educational Affairs</Link>
        </div>
            <div className={`lg:ml-[290px] mt-12 grid justify-center `}>

<div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
        <Link href="/educational-affairs/events" className="grid items-center justify-center text-center" >
            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
            <img src="/images/events.png" alt="#" />
            </div>
            <p className="text-[22px] font-semibold mt-2">Events</p>
        </Link>
    </div>
    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
        <Link href="/educational-affairs/exams" className="grid items-center justify-center text-center" >
            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                <img src="/images/exams.png" alt="#" />
            </div>
            <p className="text-[22px] font-semibold mt-2">Exams</p>
        </Link>
    </div>
    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
        <Link href="/educational-affairs/grads" className="grid items-center justify-center text-center" >
            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                <img src="/images/grads.png" alt="#" />
            </div>
            <p className="text-[22px] font-semibold mt-2">Grades</p>
        </Link>
    </div>
    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
        <Link href="/educational-affairs/schedule" className="grid items-center justify-center text-center" >
            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                <img src="/images/schedual.png" alt="#" />
            </div>
            <p className="text-[22px] font-semibold mt-2">Schedule</p>
        </Link>
    </div>
</div>

</div>
        </>
     );
}
 
export default EducationalAffairs;