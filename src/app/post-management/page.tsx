/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const PostManagment = () => {
    return (
        <>
        <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7">
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Communications</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/post-management">Post Management</Link>
        </div>
            <div className="lg:ml-[290px] mt-12 pr-5">
                <div className="flex justify-left gap-5 text-[23px] font-bold mb-5 ml-4">
                    <Link href="/post-management" className="text-blue-500 underline">
                        Post
                    </Link>
                    <Link href="/post-management/reviews">
                        Reviews
                    </Link>
                </div>
                <div className="grid w-full h-full">
                    <div className="bg-white rounded-xl p-5 w-full h-full justify-center items-center">
                        <div className="flex justify-center items-center">
                            <div className="border rounded-xl p-6 mb-4">
                                <form>
                                    <div className="flex justify-evenly gap-2 bg-white rounded-lg p-3 w-full h-full">
                                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                        <div className="grid justify-center gap-4 items-center">
                                            <input className="font-semibold text-gray-400 border-none outline-none" placeholder="What’s Happening?" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between gap-2 items-center">
                                        <div className="flex gap-2 items-center mb-2">
                                            <button>
                                                <svg className="h-6 w-6 text-gray-500"
                                                    viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <circle cx="8.5" cy="8.5" r="1.5" />  <polyline points="21 15 16 10 5 21" />
                                                </svg>
                                            </button>

                                            <button>
                                                <svg
                                                    className="h-6 w-6 text-gray-500"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center mt-3">
                                            <button className="px-4 py-1 whitespace-nowrap rounded-2xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[80px] ease-in font-semibold duration-300">Post</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className=" grid justify-evenly  p-3 md:flex gap-4">
                            <div className="grid w-[450px] max-[532px]:w-[350px]  max-[532px]:justify-center">
                                
                                <div className="flex justify-left gap-2 bg-gray-200 items-center rounded-lg p-3 border">
                                    <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                    <div className="grid justify-center  items-center">
                                        <h1 className="font-semibold">Sam Guy  </h1>
                                        <p className="text-gray-700 text-[15px]">Teacher 29-5-2024</p>
                                    </div>
                                </div>
                                <div className="flex justify-left gap-2 bg-white items-center rounded-lg p-3 border">
                                    <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                    <div className="grid justify-center  items-center">
                                        <h1 className="font-semibold">Sam Guy  </h1>
                                        <p className="text-gray-700 text-[15px]">Teacher 29-5-2024</p>
                                    </div>
                                </div>
                                <div className="flex justify-left gap-2 bg-white items-center rounded-lg p-3 border">
                                    <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                    <div className="grid justify-center  items-center">
                                        <h1 className="font-semibold">Sam Guy  </h1>
                                        <p className="text-gray-700 text-[15px]">Teacher 29-5-2024</p>
                                    </div>
                                </div>
                                <div className="flex justify-left gap-2 bg-white items-center rounded-lg p-3 border">
                                    <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                    <div className="grid justify-center  items-center">
                                        <h1 className="font-semibold">Sam Guy  </h1>
                                        <p className="text-gray-700 text-[15px]">Teacher 29-5-2024</p>
                                    </div>
                                </div>
                                <div className="flex justify-left gap-2 bg-white items-center rounded-lg p-3 border">
                                    <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                    <div className="grid justify-center  items-center">
                                        <h1 className="font-semibold">Sam Guy  </h1>
                                        <p className="text-gray-700 text-[15px]">Teacher 29-5-2024</p>
                                    </div>
                                </div>
                                <div className="flex justify-left gap-2 bg-white items-center rounded-lg p-3 border">
                                    <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                    <div className="grid justify-center  items-center">
                                        <h1 className="font-semibold">Sam Guy  </h1>
                                        <p className="text-gray-700 text-[15px]">Teacher 29-5-2024</p>
                                    </div>
                                </div>
                                <div className="flex justify-left gap-2 bg-white items-center rounded-lg p-3 border">
                                    <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                    <div className="grid justify-center  items-center">
                                        <h1 className="font-semibold">Sam Guy  </h1>
                                        <p className="text-gray-700 text-[15px]">Teacher 29-5-2024</p>
                                    </div>
                                </div>
                                <div className="flex justify-left gap-2 bg-white items-center rounded-lg p-3 border">
                                    <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                    <div className="grid justify-center  items-center">
                                        <h1 className="font-semibold">Sam Guy  </h1>
                                        <p className="text-gray-700 text-[15px]">Teacher 29-5-2024</p>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="grid rounded-xl bg-gray-200 p-7 ">
                                <div className="grid rounded-xl bg-white p-7 ">
                                <div className="flex justify-left gap-2 bg-white items-center rounded-lg p-3 w-full">
                                    <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                    <div className="grid justify-center  items-center">
                                        <h1 className="font-semibold">Sam Guy  </h1>
                                        <p className="text-gray-700 text-[15px]">Teacher 29-5-2024</p>
                                    </div>
                                </div>
                                <img src="/images/جدول.png" alt="" />
                                </div>
                                <div className="bg-white p-3 w-full rounded-xl border-t">
                                    <input type="text" className="outline-none rounded-full p-2 w-full mt-2 bg-gray-200 "  placeholder="What’s Happening?"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostManagment;