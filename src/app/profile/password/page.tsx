/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Password = () => {
    return ( 
        <>
            <div className="lg:ml-[270px] mt-7">
                <div className="grid w-full h-full bg-white rounded-xl p-7">
                    <div>
                    <div className="flex justify-left gap-5 text-[18px] font-semibold mb-5 ml-4">
                    <Link href="/profile" >
                    My Profile
                    </Link>
                    <Link href="/profile/password" className="text-blue-500 underline">
                        Password
                    </Link>
                </div>
                    </div>
                    <div className="border-2 border-gray-200 text-semibold rounded-xl p-5 flex w-full h-full mt-5">
                        <div className="grid gap-2 w-full">
                            <div className="grid justify-center">
                            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                            <label htmlFor="name" className="grid text-[18px] font-sans font-semibold">
                            Current Password
                                <input id="name" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                            </label>
                            <label htmlFor="about" className="grid text-[18px] font-sans font-semibold">
                            New Password
                                <input id="about" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                            </label>
                            <label htmlFor="code" className="grid text-[18px] font-sans font-semibold">
                            Confirm Password 
                                <input id="code" type="text" className="w-[400px] py-3 px-4 rounded-xl border border-zinc-300 outline-none max-[471px]:w-[350px]" />
                            </label>
                        </div>
                        <div className="flex justify-between mt-7">
                        <button className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">Save</button>
                        <button className="px-4 py-2 whitespace-nowrap rounded-xl text-[#3E5AF0] border border-[#3E5AF0] hover:shadow-xl mb-5 mr-3 text-[18px] w-[180px] ease-in font-semibold duration-300">Cancel</button>
                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Password;