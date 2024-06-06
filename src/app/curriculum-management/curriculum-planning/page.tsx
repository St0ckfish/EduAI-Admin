const CurriculumPlanning = () => {
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
                        <button className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">6-Jun-2024</button>
                    </div>
                </div>
                <div className="flex h-full w-full justify-center items-center p-5 overflow-hidden">
                    <div className="grid bg-white rounded-xl h-full w-full">
                        <div className="w-full bg-[#DCEBFB] flex justify-evenly p-2 pl-8 items-center h-[60px] rounded-t-xl">
                            <div className="w-full text-start">
                                <p className="font-semibold">Course Title:</p>
                            </div>
                            <div className="w-full text-center">
                                <p className="font-semibold">Course Number:</p>
                            </div>
                        </div>
                        <div className="pl-8">
                            <p className="font-semibold">Course Description:</p>
                        </div>
                        <div className="overflow-auto">
                        <div className="overflow-auto relative ">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead>
                            <tr className="bg-white  hover:bg-gray-50 text-black font-semibold">
                                
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-2 border-[#dcebfb] ">
                                
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap border-2 border-[#dcebfb]">
                                Educational Delivery Methodologies
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-2 border-[#dcebfb]">
                                Evidence Of Mastery
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-2 border-[#dcebfb]">
                                Comments
                                </td>
                            </tr>
                        </thead>
                        
                        <tbody className="text-xs text-gray-700 uppercase bg-[#ebeef2] ">
                            <tr>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap border-2 border-[#dcebfb]">
                                Standard :
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap border-2 border-[#dcebfb]">
                                
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap border-2 border-[#dcebfb]">
                                
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap border-2 border-[#dcebfb] ">
                                
                                </th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className="bg-white  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-2 border-[#dcebfb]">
                                Cluster 1 :
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap border-2 border-[#dcebfb]">
                                    
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-2 border-[#dcebfb]">
                                    
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-2 border-[#dcebfb]">
                                    
                                </td>
                            </tr>
                            <tr className="bg-white  hover:bg-gray-50">
                                
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-2 border-[#dcebfb] ">
                                Cluster 2 :
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap border-2 border-[#dcebfb]">
                                    
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-2 border-[#dcebfb]">

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-2 border-[#dcebfb]">
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CurriculumPlanning;