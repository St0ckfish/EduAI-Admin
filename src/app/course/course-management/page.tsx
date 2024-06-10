/* eslint-disable @next/next/no-img-element */
const CourseManagement = () => {
    return ( 
        <>
            <div className="lg:ml-[290px] mt-12 ">
                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center w-full px-8">
                    <div className="mb-3">
                        <label htmlFor="icon" className="sr-only">Search</label>
                        <div className="relative min-w-72 md:min-w-80">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <input type="text" id="icon" name="icon" className="py-2  outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">+ Add New Course</button>
                    </div>
                </div>
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 p-3">
                    <div className="p-2 bg-white rounded-lg grid gap-2">
                        <div className="flex p-2 bg-[#f4bd0e] items-center justify-center text-center text-[25px] font-bold text-white rounded-xl h-[220px]">
                            <h1>Math 101</h1>
                        </div>
                        <div className="font-semibold grid gap-2">
                            <h1>Calculus I</h1>
                            <p className="text-[12px] text-[#526484]">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt </p>
                        </div>
                        <div className="flex gap-2 items-center">
                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        Mostapha
                        </div>
                        <div className="border-t border-gray-300 p-1 flex justify-evenly">
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="10" y1="16" x2="14" y2="16" /></svg>
                            <p className="text-gray-500 font-semibold">2024</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="11" r="3" />  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg grid gap-2">
                        <div className="flex p-2 bg-[#09c2de] items-center justify-center text-center text-[25px] font-bold text-white rounded-xl h-[220px]">
                            <h1>Math 101</h1>
                        </div>
                        <div className="font-semibold grid gap-2">
                            <h1>Calculus I</h1>
                            <p className="text-[12px] text-[#526484]">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt </p>
                        </div>
                        <div className="flex gap-2 items-center">
                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        Mostapha
                        </div>
                        <div className="border-t border-gray-300 p-1 flex justify-evenly">
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="10" y1="16" x2="14" y2="16" /></svg>
                            <p className="text-gray-500 font-semibold">2024</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="11" r="3" />  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg grid gap-2">
                        <div className="flex p-2 bg-[#e85347] items-center justify-center text-center text-[25px] font-bold text-white rounded-xl h-[220px]">
                            <h1>Math 101</h1>
                        </div>
                        <div className="font-semibold grid gap-2">
                            <h1>Calculus I</h1>
                            <p className="text-[12px] text-[#526484]">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt </p>
                        </div>
                        <div className="flex gap-2 items-center">
                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        Mostapha
                        </div>
                        <div className="border-t border-gray-300 p-1 flex justify-evenly">
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="10" y1="16" x2="14" y2="16" /></svg>
                            <p className="text-gray-500 font-semibold">2024</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="11" r="3" />  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg grid gap-2">
                        <div className="flex p-2 bg-[#09c2de] items-center justify-center text-center text-[25px] font-bold text-white rounded-xl h-[220px]">
                            <h1>Math 101</h1>
                        </div>
                        <div className="font-semibold grid gap-2">
                            <h1>Calculus I</h1>
                            <p className="text-[12px] text-[#526484]">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt </p>
                        </div>
                        <div className="flex gap-2 items-center">
                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        Mostapha
                        </div>
                        <div className="border-t border-gray-300 p-1 flex justify-evenly">
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="10" y1="16" x2="14" y2="16" /></svg>
                            <p className="text-gray-500 font-semibold">2024</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="11" r="3" />  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg grid gap-2">
                        <div className="flex p-2 bg-[#f4bd0e] items-center justify-center text-center text-[25px] font-bold text-white rounded-xl h-[220px]">
                            <h1>Math 101</h1>
                        </div>
                        <div className="font-semibold grid gap-2">
                            <h1>Calculus I</h1>
                            <p className="text-[12px] text-[#526484]">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt </p>
                        </div>
                        <div className="flex gap-2 items-center">
                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        Mostapha
                        </div>
                        <div className="border-t border-gray-300 p-1 flex justify-evenly">
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="10" y1="16" x2="14" y2="16" /></svg>
                            <p className="text-gray-500 font-semibold">2024</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="11" r="3" />  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg grid gap-2">
                        <div className="flex p-2 bg-[#000000] items-center justify-center text-center text-[25px] font-bold text-white rounded-xl h-[220px]">
                            <h1>Math 101</h1>
                        </div>
                        <div className="font-semibold grid gap-2">
                            <h1>Calculus I</h1>
                            <p className="text-[12px] text-[#526484]">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt </p>
                        </div>
                        <div className="flex gap-2 items-center">
                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        Mostapha
                        </div>
                        <div className="border-t border-gray-300 p-1 flex justify-evenly">
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="10" y1="16" x2="14" y2="16" /></svg>
                            <p className="text-gray-500 font-semibold">2024</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="11" r="3" />  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg grid gap-2">
                        <div className="flex p-2 bg-[#1ee0ac] items-center justify-center text-center text-[25px] font-bold text-white rounded-xl h-[220px]">
                            <h1>Math 101</h1>
                        </div>
                        <div className="font-semibold grid gap-2">
                            <h1>Calculus I</h1>
                            <p className="text-[12px] text-[#526484]">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt </p>
                        </div>
                        <div className="flex gap-2 items-center">
                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        Mostapha
                        </div>
                        <div className="border-t border-gray-300 p-1 flex justify-evenly">
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="10" y1="16" x2="14" y2="16" /></svg>
                            <p className="text-gray-500 font-semibold">2024</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="11" r="3" />  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg grid gap-2">
                        <div className="flex p-2 bg-[#e85347] items-center justify-center text-center text-[25px] font-bold text-white rounded-xl h-[220px]">
                            <h1>Math 101</h1>
                        </div>
                        <div className="font-semibold grid gap-2">
                            <h1>Calculus I</h1>
                            <p className="text-[12px] text-[#526484]">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt </p>
                        </div>
                        <div className="flex gap-2 items-center">
                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        Mostapha
                        </div>
                        <div className="border-t border-gray-300 p-1 flex justify-evenly">
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" />  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="10" y1="16" x2="14" y2="16" /></svg>
                            <p className="text-gray-500 font-semibold">2024</p>
                            </div>
                            <div className="flex gap-2 items-center">
                            <svg className="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="11" r="3" />  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" /></svg>
                            <p className="text-gray-500 font-semibold">30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default CourseManagement;