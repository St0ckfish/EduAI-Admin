"use client"
const Dashboard = () => {
    return ( 
        <>
            <div className="grid gap-8 mt-5 pr-8 max-[1024px]:pl-8">
                <div className="grid text-start">
                    <h1 className="font-bold text-[28px] font-sans text-[#041631]">Dashboard</h1>
                    <p className="text-[#526484] font-sans text-[20px] max-[490px]:text-[18px]">Welcome to Learning Management Dashboard.</p>
                </div>
                <div className="grid grid-cols-4 gap-4 max-[843px]:grid-cols-2 max-[525px]:grid-cols-1">
                    <div className="grid p-4 bg-white rounded-lg">
                        <p className="text-[#526484] font-sans text-[18px] font-semibold">Total School</p>
                        <h3 className="font-bold text-[20px] font-sans text-[#041631]">10</h3>
                        <span className="flex gap-2 items-center">
                            <svg className="h-5 w-5 text-emerald-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />  <polyline points="17 6 23 6 23 12" /></svg>
                            <p className="text-emerald-500">2</p>
                            <p className="text-[#526484] font-sans text-[16px] whitespace-nowrap"> vs. last month</p>
                        </span>
                    </div>
                    <div className="grid p-4 bg-white rounded-lg">
                        <p className="text-[#526484] font-sans text-[18px] font-semibold">Demo</p>
                        <h3 className="font-bold text-[20px] font-sans text-[#041631]">2</h3>
                        <span className="flex gap-2 items-center">
                            <svg className="h-5 w-5 text-orange-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="3 7 9 13 13 9 21 17" />  <polyline points="21 10 21 17 14 17" /></svg>
                            <p className="text-orange-500">2</p>
                            <p className="text-[#526484] font-sans text-[16px] whitespace-nowrap"> vs. last month</p>
                        </span>
                    </div>
                    <div className="grid p-4 bg-white rounded-lg">
                        <p className="text-[#526484] font-sans text-[18px] font-semibold">Subscription</p>
                        <h3 className="font-bold text-[20px] font-sans text-[#041631]">6</h3>
                        <span className="flex gap-2 items-center">
                            <svg className="h-5 w-5 text-orange-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="3 7 9 13 13 9 21 17" />  <polyline points="21 10 21 17 14 17" /></svg>
                            <p className="text-orange-500">2</p>
                            <p className="text-[#526484] font-sans text-[16px] whitespace-nowrap"> vs. last month</p>
                        </span>
                    </div>
                    <div className="grid p-4 bg-white rounded-lg">
                        <p className="text-[#526484] font-sans text-[18px] whitespace-nowrap font-semibold">No Action</p>
                        <h3 className="font-bold text-[20px] font-sans text-[#041631]">2</h3>
                        
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 max-[1599px]:grid-cols-1 max-[630px]:overflow-x-auto">
                    <div className="grid bg-white rounded-lg p-4 gap-6 max-[630px]:w-[630px]">
                        <h1 className="font-bold text-[20px] font-sans text-[#041631]">Feedback</h1>
                        <div className="grid grid-cols-5 items-center">
                            <p className="text-[#041631] font-sans text-[18px] whitespace-nowrap font-semibold">School</p>
                            <p className="text-[#041631] font-sans text-[18px] whitespace-nowrap font-semibold">Feedback</p>
                            <span className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-[#1ee0ac] mr-1"></div>
                                <p className="text-[#041631] font-sans text-[18px] font-semibold">Solved</p>
                            </span>
                            <span className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-[#f4bd0e] mr-1"></div>
                                <p className="text-[#041631] font-sans text-[18px] font-semibold">Unsolved</p>
                            </span>
                            <span className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-[#09c2de] mr-1"></div>
                                <p className="text-[#041631] font-sans text-[18px] font-semibold">Discussion</p>
                            </span>
                        </div>
                        <div className="grid grid-cols-5 gap-9 max-[630px]:w-[630px]">
                            <p className="text-[#526484] font-sans text-[16px]">Nahda</p>
                            <p className="text-[#526484] font-sans text-[16px] ml-8">10</p>
                            <p className="text-[#526484] font-sans text-[16px] ml-5">6</p>
                            <p className="text-[#526484] font-sans text-[16px]">3</p>
                            <p className="text-[#526484] font-sans text-[16px]">1</p>
                        </div>
                    </div>
                    <div className="grid bg-white rounded-lg p-4 gap-6 max-[630px]:w-[630px]">
                        <h1 className="font-bold text-[20px] font-sans text-[#041631]">Expired</h1>
                        <p className="text-[#526484] font-sans text-[16px] whitespace-nowrap">About to expire</p>
                        <div className="grid grid-cols-4 items-center">
                            <p className="text-[#041631] font-sans text-[18px] whitespace-nowrap font-semibold">School</p>
                            <p className="text-[#041631] font-sans text-[18px] whitespace-nowrap font-semibold">Expiration Date</p>
                            <p className="text-[#041631] font-sans text-[18px] font-semibold">Days</p>
                            <p className="text-[#041631] font-sans text-[18px] font-semibold">Status</p>
                        </div>
                        <div className="grid grid-cols-4 max-[630px]:w-[630px]">
                            <p className="text-[#526484] font-sans text-[16px]">Nahda</p>
                            <p className="text-[#526484] font-sans text-[16px] ml-8">09/06/2024</p>
                            <p className="text-[#526484] font-sans text-[16px] ml-5">6</p>
                            <span className=" text-center text-[#ffffff] font-sans text-[16px] px-2 rounded-2xl bg-[#f4bd0e] w-[60px]">
                                <p className="">Dimo</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Dashboard;