/* eslint-disable @next/next/no-img-element */
"use client"
import Pagination from "@/components/pagination";
import Spinner from "@/components/spinner";
import { useDeleteWorkersMutation, useGetAllWorkersQuery } from "@/features/User-Management/workerApi";
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useState, useEffect, SetStateAction } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const WorkerAttendance = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);

    type Worker = Record<string, any>;
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedStates, setSelectedStates] = useState<string[]>([]);

    const handleSelect = (label: string, index: string | number | undefined) => {
        setSelectedStates((prevStates: any) => {
            const newStates = [...prevStates];
            if (typeof index === 'number') {
                newStates[index] = newStates[index] === label ? '' : label; // Toggle selection
            }
            return newStates;
        });
    };
    const { data, error, isLoading, refetch } = useGetAllWorkersQuery({
        archived: "false",
        page: currentPage,
        size: rowsPerPage
    });
    const [selectAll, setSelectAll] = useState(false); 

    useEffect(() => {
        if (data) console.log("Response Data:", data);
        if (error) console.log("Error:", error);
      }, [data, error]);

    
    const onPageChange = (page: SetStateAction<number>) => {
        setCurrentPage(page);
    };
    const onElementChange = (ele: SetStateAction<number>) => {
        setRowsPerPage(ele);
        setCurrentPage(0);
    };
      const [deleteWorker] = useDeleteWorkersMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteWorker({
        id:id,
        lock:"true"
      }).unwrap();
      toast.success(`Worker with ID ${id} Locked successfully`);
      void refetch();
    } catch (err) {
      toast.error("Failed to lock the Worker");
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
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Operations</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'rgba(82, 100, 132, 1)',transform: '',msFilter: ''}}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/attendances">Attendances</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/worker-attendance">Worker</Link>
            </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mr-[5px] relative mt-10 overflow-x-auto bg-transstudent sm:rounded-lg h-screen`}>
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
                </div>
                <div className="flex gap-4 flex-wrap">
                        {data?.data.content
                .filter((worker: Worker) => {
                    return search.toLocaleLowerCase() === '' ? worker : worker.name.toLocaleLowerCase().includes(search);
                })
                .map((worker: Worker, index: number) => (
                    <div key={index} className="grid bg-white rounded-xl shadow-lg justify-center items-center w-[300px] h-[320px]">
                        <div className="px-6 grid items-center py-4 justify-center gap-2 font-medium text-gray-900 whitespace-nowrap">
                            <div className="w-[120px] grid justify-center items-center text-center">
                                <div className="flex justify-center">
                                    {worker.picture == null ? (
                                        <img src="/images/userr.png" className="w-[100px] h-[100px] rounded-full" alt="#" />
                                    ) : (
                                        <img src={worker.picture} className="w-[100px] h-[100px] rounded-full" alt="#" />
                                    )}
                                </div>
                                <p className="mt-4 text-[22px]"> {worker.name} </p>
                                <p className="whitespace-nowrap font-semibold text-[#526484]">Driver: {worker.id}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 justify-center items-center text-center">
                            {['P', 'A', 'L'].map((label) => (
                                <label
                                    key={label}
                                    className={`p-5 w-[55px] h-[55px] text-center rounded-full border flex items-center justify-center text-[24px] font-semibold cursor-pointer
                                        ${selectedStates[index] === label
                                            ? label === 'P'
                                                ? 'bg-green-300 text-white'
                                                : label === 'A'
                                                ? 'bg-red-500 text-white'
                                                : 'bg-yellow-300 text-white'
                                            : 'bg-white'
                                        }
                                    `}
                                >
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedStates[index] === label}
                                        onChange={() => handleSelect(label, index)}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                    {
                        (data?.data.content.length == 0 || data == null) && <div className="flex justify-center text-center text-[18px] w-full py-3 font-semibold">There is No Data</div>
                    }
                </div>
                <div className="overflow-auto relative">
                    <Pagination
                    totalPages={data?.data.totalPages}
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

export default WorkerAttendance;
