/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Notifies = () => {
    return ( 
        <>
        <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7">
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Communications</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/notifies">Notifies</Link>
        </div>
            <div className="lg:ml-[290px] mt-12">
                <div className="grid w-full h-full bg-white rounded-xl justify-center items-center p-5 gap-3">

                    <div className="flex justify-evenly gap-2 bg-white shadow-xl rounded-lg p-3 w-full h-full">
                            <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        <div className="grid justify-center gap-4 items-center">
                            <h1 className="font-semibold">Notification title <span className="text-gray-400 text-[12px]">10 mins ago</span> </h1>
                            <p className="text-gray-700 text-[15px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br/> Lorem Ipsum has been the</p>
                        </div>
                        <div className="">
                            <button className="text-gray-600 text-[20px]">x</button>
                        </div>
                    </div>
                    <div className="flex justify-evenly gap-2 bg-[#edf9ff] shadow-xl rounded-lg p-3 w-full h-full">
                            <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        <div className="grid justify-center gap-4 items-center">
                            <h1 className="font-semibold">Notification title <span className="text-gray-400 text-[12px]">10 mins ago</span> </h1>
                            <p className="text-gray-700 text-[15px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br/> Lorem Ipsum has been the</p>
                        </div>
                        <div className="">
                            <button className="text-gray-600 text-[20px]">x</button>
                        </div>
                    </div>
                    <div className="flex justify-evenly gap-2 bg-[#f7f3ff] shadow-xl rounded-lg p-3 w-full h-full">
                            <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        <div className="grid justify-center gap-4 items-center">
                            <h1 className="font-semibold">Notification title <span className="text-gray-400 text-[12px]">10 mins ago</span> </h1>
                            <p className="text-gray-700 text-[15px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br/> Lorem Ipsum has been the</p>
                        </div>
                        <div className="">
                            <button className="text-gray-600 text-[20px]">x</button>
                        </div>
                    </div>
                    <div className="flex justify-evenly gap-2 bg-[#fff7ed] shadow-xl rounded-lg p-3 w-full h-full">
                            <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        <div className="grid justify-center gap-4 items-center">
                            <h1 className="font-semibold">Notification title <span className="text-gray-400 text-[12px]">10 mins ago</span> </h1>
                            <p className="text-gray-700 text-[15px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br/> Lorem Ipsum has been the</p>
                        </div>
                        <div className="">
                            <button className="text-gray-600 text-[20px]">x</button>
                        </div>
                    </div>
                    <div className="flex justify-evenly gap-2 bg-[#effef5] shadow-xl rounded-lg p-3 w-full h-full">
                            <img src="/images/me.jpg" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                        <div className="grid justify-center gap-4 items-center">
                            <h1 className="font-semibold">Notification title <span className="text-gray-400 text-[12px]">10 mins ago</span> </h1>
                            <p className="text-gray-700 text-[15px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br/> Lorem Ipsum has been the</p>
                        </div>
                        <div className="">
                            <button className="text-gray-600 text-[20px]">x</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
     );
}
 
export default Notifies;