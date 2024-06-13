/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Attendance = () => {
    return (
        <>
        <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7">
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Operations</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/attendances">Attendances</Link>
        </div>
            <div className={`lg:ml-[290px] mt-12 grid justify-center `}>

            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/driver-attendance" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                                <svg className="h-12 w-12 font-sans text-[#000000] group-hover:text-[#3e5af0]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="6" cy="17" r="2" />  <circle cx="18" cy="17" r="2" />  <path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" />  <polyline points="16 5 17.5 12 22 12" />  <line x1="2" y1="10" x2="17" y2="10" />  <line x1="7" y1="5" x2="7" y2="10" />  <line x1="12" y1="5" x2="12" y2="10" /></svg>
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Driver</p>
                        </Link>
                    </div>
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/employee-attendance" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                                <img src="/images/employee.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Employee</p>
                        </Link>
                    </div>
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/student-attendance" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                            <img src="/images/student.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Student</p>
                        </Link>
                    </div>
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/teacher-attendance" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                            <img src="/images/Teacher.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Teacher</p>
                        </Link>
                    </div>
                    <div className="w-[250px] h-[250px] bg-white rounded-xl shadow-lg grid justify-center items-center">
                        <Link href="/worker-attendance" className="grid items-center justify-center text-center" >
                            <div className="bg-[#FAEFEF] rounded-full h-[87px] w-[87px] grid items-center justify-center ">
                            <img src="/images/Worker.png" alt="#" />
                            </div>
                            <p className="text-[22px] font-semibold mt-2">Worker</p>
                        </Link>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Attendance;