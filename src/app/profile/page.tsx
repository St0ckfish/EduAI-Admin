/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Profile = () => {
    return ( 
        <>
            <div className="lg:ml-[270px] mt-7">
                <div className="grid w-full h-full bg-white rounded-xl p-3">
                    <div>
                    <div className="flex justify-left gap-5 text-[18px] font-bold mb-5 ml-4">
                    <Link href="/profile" className="text-blue-500 underline">
                    My Profile
                    </Link>
                    <Link href="/profile/password">
                        Passord
                    </Link>
                </div>
                    </div>
                    <div className="border-2 border-gray-200 text-semibold rounded-xl p-5 flex justify-between w-full h-full">
                    <div className="flex items-center gap-2 text-[15px] text-black text-semibold">
                                        <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                        <span className="grid font-semibold ">
                                            <p>Mostapha Taha</p>
                                            <p>School manager</p>
                                            <p>ID: <span className="text-gray-400">1385</span></p>
                                        </span>
                                    </div>
                                    <div>
                                        <button className="flex gap-1 border border-gray-300 rounded-full px-3 py-1 text-gray-500 font-semibold">
                                            Edit
                                        <svg className="h-6 w-6 text-gray-500"   width="24"  height="24"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                        </button>
                                    </div>
                    </div>
                    <div className="flex items-center gap-2 text-[15px] text-black text-semibold">
                        
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Profile;