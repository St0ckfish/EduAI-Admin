/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import { useState, useEffect, SetStateAction } from 'react';
import { useGetAllEmployeesQuery, useDeleteEmployeesMutation } from "@/features/User-Management/employeeApi";
import Spinner from "@/components/spinner";
import { useSelector } from 'react-redux';
import { RootState } from "@/GlobalRedux/store";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";

const ArchiveEmployee = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const onPageChange = (page: SetStateAction<number>) => {
        setCurrentPage(page);
    };
    const onElementChange = (ele: SetStateAction<number>) => {
        setRowsPerPage(ele);
        setCurrentPage(0);
    };
    const booleanValue = useSelector((state: RootState) => state.boolean.value);

    type Employee = Record<string, any>;
    const [search, setSearch] = useState("");
    const { data, error, isLoading, refetch } = useGetAllEmployeesQuery({
        archived: "false",
        page: currentPage,
        size: rowsPerPage
    });
    const [selectAll, setSelectAll] = useState(false); 

    useEffect(() => {
        if (data) console.log("Response Data:", data);
        if (error) console.log("Error:", error);
      }, [data, error]);
      const totalRows = data?.data.content.length;

      const [deleteEmployees] = useDeleteEmployeesMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployees({
        id:id,
        lock:"false"
      }).unwrap();
      toast.success(`Employee with ID ${id} unLocked successfully`);
      void refetch();
    } catch (err) {
      toast.error("Failed to unlock the Employee");
    }
  };

    const handleSelectAll = () => {
        setSelectAll(!selectAll); 
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#checkbox-all-search)'); 
        checkboxes.forEach(checkbox => {
            checkbox.checked = !selectAll;
        });
    };

    useEffect(() => {
        const handleOtherCheckboxes = () => {
            const allCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#checkbox-all-search)');
            const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);
            const selectAllCheckbox = document.getElementById('checkbox-all-search') as HTMLInputElement | null;
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                setSelectAll(allChecked);
            }
        };

        const otherCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(#checkbox-all-search)');
        otherCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleOtherCheckboxes);
        });

        return () => {
            otherCheckboxes.forEach(checkbox => {
                checkbox.removeEventListener('change', handleOtherCheckboxes);
            });
        };
    }, []);
    if (isLoading)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
    );

    return ( 
        <>
            <div className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-12 ml-7 text-[18px] max-[550px]:text-[15px]  flex-wrap`}>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/">Administration</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/archive">Archive</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/archive/employee">Employee</Link>
            </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg h-screen`}>
                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
                    <div className="mb-3">
                        <label htmlFor="icon" className="sr-only">Search</label>
                        <div className="relative min-w-72 md:min-w-80">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <input onChange={(e) => setSearch(e.target.value)} type="text" id="icon" name="icon" className="py-2  outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                        </div>
                    </div> 
                    <div className="flex justify-center">
                        <Link href="/add-new-employee" className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[210px] ease-in font-semibold duration-300">+ Add New Employee</Link>
                    </div>
                </div>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        {/* Add event listener for select all checkbox */}
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 -gray-800 focus:ring-2" onChange={handleSelectAll} />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    id
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Nationality
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Email
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Mobile
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    view
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {data?.data.content.filter((employee: Employee) => {
                            return search.toLocaleLowerCase() === '' ? employee : employee.name.toLocaleLowerCase().includes(search);
                        }).map((employee: Employee) => (
                            <tr key={employee.id} className="bg-white border-b  hover:bg-gray-50">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                    </div>
                                </td>
                                <th scope="row" className="px-6 flex items-center py-4 gap-2 font-medium text-gray-900 whitespace-nowrap">
                                    <div className="w-[50px]">
                                        {
                                            employee.picture == null ?
                                            <img src="/images/userr.png" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                            :
                                            <img src={employee.picture} className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                        }
                                    </div>
                                    <p> {employee.name} </p>
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                {employee.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {employee.gender}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {employee.nationality}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {employee.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {employee.number}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={`/employee/view-employee/${employee.id}`} className="font-medium text-blue-600 hover:underline">View</Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={()=> handleDelete(employee.id)} className="px-2 py-1 rounded-lg text-white bg-red-500 font-semibold shadow-lg ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">Unlock</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        (data?.data.content.length == 0 || data == null) && <div className="flex justify-center text-center text-[18px] w-full py-3 font-semibold">There is No Data</div>
                    }
                </div>
                <div className="overflow-auto relative">
                    <Pagination
                    totalElements={totalRows}
                    elementsPerPage={rowsPerPage}
                    onChangeElementsPerPage={onElementChange}
                    currentPage={currentPage}
                    onChangePage={onPageChange}
                />
                </div>
            </div>
        </>
    );
}

export default ArchiveEmployee;
