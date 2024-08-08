/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import { useState, useEffect } from 'react';

const Legal = () => {
    const [selectAll, setSelectAll] = useState(false);

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

    return ( 
        <>
        <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7 text-[18px] max-[550px]:text-[15px]  flex-wrap">
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/">Administration</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/document-management">Document Management</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline  font-semibold" href="/document-management/other">Other</Link>
            </div>
            <div className="lg:ml-[270px] mr-[5px] relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg h-screen">
                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
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
                        <Link href="/" className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">+ Add Invoices</Link>
                    </div>
                </div>
                <div className="flex justify-left gap-5 text-[20px] max-[725px]:text-[15px] flex-wrap font-semibold mb-[80px] mt-[50px] ml-4">
                    <Link href="/document-management/other">
                    ID Cards
                    </Link>
                    <Link href="/document-management/other/medical" >
                    Medical Records
                    </Link>
                    <Link href="/document-management/other/disciplinary" >
                    Disciplinary Records
                    </Link>
                    <Link href="/document-management/other/financial">
                    Financial Aid
                    </Link>
                    <Link href="/document-management/other/legal"  className="text-blue-500 underline">
                    Legal Documents
                    </Link>
                </div>
                <div className="overflow-auto relative px-10">
                    <div className="flex gap-8">
                        <Link className="grid gap-4 justify-center text-center font-semibold" href="/document-management/other/legal">
                        <img src="/images/folder.png" alt="#" />
                        <p>Contract contracts</p>
                        </Link>
                        
                        <Link className="grid gap-4 justify-center text-center font-semibold" href="/document-management/other/legal">
                        <img src="/images/folder.png" alt="#" />
                        <p>Purchase contracts</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Legal;
