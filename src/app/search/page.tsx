"use client"
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, useEffect, SetStateAction } from 'react';
import {  useGetAllStudentsQuery, useGetStudentByIdQuery } from "@/features/User-Management/studentApi";
import Spinner from "@/components/spinner";
import { useSelector } from 'react-redux';
import { RootState } from "@/GlobalRedux/store";

const Search = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    type Student = Record<string, any>;
    const { data, error, isLoading } = useGetAllStudentsQuery({
        archived: "false",
        page: 0,
        size: 1000000
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  
    useEffect(() => {
        if (data) {
          console.log("Response Data:", data);
          const filtered = data.data.content.filter((student: Student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredStudents(filtered);
        }
        if (error) {
          console.log("Error:", error);
        }
      }, [data, searchTerm, error]);

      const [selectedId, setSelectedId] = useState(null);
    const { data: EmployeeQ, isLoading: isEmployee } = useGetStudentByIdQuery(selectedId, {
        skip: !selectedId,
    });
    const handleClick = (id: SetStateAction<null>) => {
        setSelectedId(id);
    };
    return ( 
        <>
        <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12`}>
            <div className="flex w-full h-full justify-center p-2 overflow-auto">
                <div className="grid bg-white rounded-xl w-full h-full overflow-auto ">
                    <div className="flex gap-2 bg-gray-200 h-[70px] rounded-t-xl items-center pl-3 font-semibold overflow-auto">
                        <Link className="text-blue-500 underline underline-offset-4" href="/search">Student</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/search/teacher">Teacher</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/search/employee">Employee</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/search/worker">Worker</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/search/fees">Fees</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/search/infrastructure">Infrastructure</Link>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-7">
                        <div className="grid p-4">
                            <div className="flex gap-3 md:justify-center">
                                <div>
                                    <label htmlFor="icon" className="sr-only">Search</label>
                                    <div className="relative min-w-48 md:min-w-80">
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                            <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                        </div>
                                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" id="icon" name="icon" className="py-2 outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                                    </div>
                                </div>
                                <div>
                                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-full p-1.5">
                                        <option selected>Search by Name </option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="font-semibold">{filteredStudents.length} Students Found</p>
                            </div>
                            <div className="h-[450px] grid w-full overflow-y-auto">
                                    {
                                        isLoading ? <Spinner /> :
                                            <div className="h-full w-full  overflow-y-auto">
                                                {filteredStudents.length > 0 && searchTerm ? (
                                                    <ul className="mt-12 w-full overflow-y-auto grid gap-2">
                                                        {filteredStudents.map((student) => (
                                                            <div onClick={() => handleClick(student.id)} key={student.id} className="flex hover:bg-gray-200 cursor-pointer items-center border border-[#f5f6f7] rounded-lg px-2 py-1 w-full">
                                                                <div>
                                                                    {
                                                                        student.picture == null ?
                                                                            <img src="/images/userr.png" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                                                            :
                                                                            <img src={student.picture} className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                                                    }
                                                                </div>
                                                                <div className="grid gap-2">
                                                                    <p className="font-semibold">{student.name}</p>
                                                                    <p className="font-semibold text-[#536471]">ID: {student.id}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="h-full flex items-center justify-center">
                                                        <img src="/images/nothing.png" alt="" />
                                                    </div>
                                                )}
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="border rounded-xl h-full w-full grid items-center text-ellipsis overflow-hidden">
                                {
                                    isEmployee ? <Spinner /> :
                                        <div className="grid justify-center items-center mt-16">
                                            {
                                                EmployeeQ ? <div>
                                                    
                                            <div className="justify-end flex">
                                                <Link className=" px-2 py-1 rounded-lg bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white ease-in font-semibold duration-300" href={`/student/view-student/${EmployeeQ.data.id}`}>View</Link>
                                            </div>
                                            <div className="grid justify-center text-center items-center">
                                                {
                                                    EmployeeQ?.data.picture == null ?
                                                        <img src="/images/userr.png" className="w-[120px] h-[120px] mr-2 rounded-full" alt="#" />
                                                        :
                                                        <img src={EmployeeQ?.data.picture} className="w-[120px] h-[120px] mr-2 rounded-full" alt="#" />
                                                }
                                                <h1 className='font-sans text-gray-800 font-semibold'>{EmployeeQ?.data.name}</h1>
                                            </div>

                                            <div className="grid justify-start">
                                                <h1 className='font-sans text-[22px] text-gray-800 font-semibold'>Basic Details</h1>
                                                <div className="grid grid-cols-2 w-[400px] max-[485px]:w-[240px]">
                                                    <h3 className='font-sans text-gray-400 font-semibold'>Email:</h3>
                                                    <p className='font-sans text-gray-800 font-semibold'>{EmployeeQ?.data.email}</p>
                                                    <h3 className='font-sans text-gray-400 font-semibold'>Salary:</h3>
                                                    <p className='font-sans text-gray-800 font-semibold'>{EmployeeQ?.data.salary == null ? `Not specified` : EmployeeQ?.data.salary}</p>
                                                    <h3 className='font-sans text-gray-400 font-semibold'>Age:</h3>
                                                    <p className='font-sans text-gray-800 font-semibold'>{EmployeeQ?.data.birthDate}</p>
                                                    <h3 className='font-sans text-gray-400 font-semibold'>Gender:</h3>
                                                    <p className='font-sans text-gray-800 font-semibold'>{EmployeeQ?.data.gender}</p>
                                                    <h3 className='font-sans text-gray-400 font-semibold'>Position:</h3>
                                                    <p className='font-sans text-gray-800 font-semibold'>{EmployeeQ?.data.role}</p>
                                                    <h3 className='font-sans text-gray-400 font-semibold'>Religion:</h3>
                                                    <p className='font-sans text-gray-800 font-semibold'>{EmployeeQ?.data.religion}</p>
                                                    <h3 className='font-sans text-gray-400 font-semibold'>Address:</h3>
                                                    <p className='font-sans text-gray-800 font-semibold'>{EmployeeQ?.data.nationality}</p>
                                                    <h3 className='font-sans text-gray-400 font-semibold'>Mobile:</h3>
                                                    <p className='font-sans text-gray-800 font-semibold'>{EmployeeQ?.data.phoneNumber}</p>
                                                    <h3 className='font-sans text-gray-400 font-semibold'>About:</h3>
                                                    <p className='font-sans text-gray-800 font-semibold'>{EmployeeQ?.data.about}</p>
                                                </div>
                                            </div>
                                                </div>
                                             : <div></div>
                                            }
                                        </div>
                                }
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Search;