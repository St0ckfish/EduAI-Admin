const Exams = () => {
    return ( 
        <>
            <div className="rounded-xl bg-white p-5 grid w-[500px] max-[1342px]:w-full">
                <div className="flex justify-between mb-5">
                    <h1 className='font-sans text-gray-800 font-semibold'>All Exam Result</h1>
                </div>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                            <tr>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Name School
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Code
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    About
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    view
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    Nahda
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    C45121
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    This is text
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    kdsk
                                </td>
                            </tr>
                            <tr className="bg-white border-b  hover:bg-gray-50">
                                
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    Nahda
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    C45121
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    This is text
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    sdsdd
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
 
export default Exams;