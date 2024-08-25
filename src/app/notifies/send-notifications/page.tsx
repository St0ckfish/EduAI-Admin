"use client"
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useCreateNotificationsMutation } from "@/features/communication/notficationsApi";
import Spinner from "@/components/spinner";
import {  useState } from "react";
import { toast } from "react-toastify";
import TextEditor from "@/components/textEditor";
// 


const SendNotifications = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [roles, setRoles] = useState<string[]>([]);
    const [createNotification, { isLoading }] = useCreateNotificationsMutation();

    const roleOptions = ["SUPER_ADMIN", "ADMIN", "TEACHER", "STUDENT", "PARENT", "EMPLOYEE"];

    const handleCheckboxChange = (role: string) => {
        setRoles(prevRoles =>
            prevRoles.includes(role) ? prevRoles.filter(r => r !== role) : [...prevRoles, role]
        );
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!title || !description || roles.length === 0) {
            toast.error("Please fill in all fields and select at least one role.");
            return;
        }
        try {
            await createNotification({ title, description, roles }).unwrap();
            toast.success("Notification sent successfully!");
            setTitle("");
            setDescription("");
            setRoles([]);
        } catch (error) {
            toast.error("Failed to send notification. Please try again.");
        }
    };

    return (
        <>
            <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7 flex-wrap">
                <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Communications</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/notifies">Notifies</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/send-notifications">Send Notifications</Link>
            </div>
            <div className="lg:ml-[290px] mt-12 flex max-[1500px]:grid gap-10">
                <div className="grid w-full h-full bg-white rounded-xl items-center p-5 gap-3">
                    {roleOptions.map(role => (
                        <label key={role} htmlFor={role} className="flex gap-2 font-semibold text-[18px] items-center">
                            <input 
                                type="checkbox" 
                                name={role} 
                                id={role} 
                                checked={roles.includes(role)} 
                                onChange={() => handleCheckboxChange(role)} 
                            />
                            {role === "SUPER_ADMIN" || role === "ADMIN" ? (
                                <span>{role.replace("_", " ")}</span>
                            ) : (
                                <>
                                    <div className="bg-[#dbdada] rounded-full h-[60px] w-[60px] grid items-center justify-center">
                                        <img src={`/images/${role.toLowerCase()}.png`} alt={role} />
                                    </div>
                                    {role.charAt(0) + role.slice(1).toLowerCase()}
                                </>
                            )}
                        </label>
                    ))}
                </div>
                <div className="grid w-full h-full bg-white rounded-xl items-center p-5 gap-3">
                    <div className="flex w-full justify-start mb-5">
                        <h1 className="text-[22px] font-semibold">Send Notifications</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full h-full gap-6">
                            <label className="grid gap-2 font-semibold text-[18px]" htmlFor="title">
                                Title
                                <input 
                                    className="border border-gray-200 outline-none px-4 py-2 rounded-xl" 
                                    placeholder="Write title...." 
                                    name="title" 
                                    id="title" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <label className="grid gap-2 font-semibold text-[18px]" htmlFor="description">
                                Description
                                <div className="mb-5 bg-[#ffffff] ">
                                <TextEditor
                                    value={description}
                                    onChange={setDescription}
                                    placeholder="Enter your content here..."
                                />
                                </div>
                            </label>
                            <div>
                            {isLoading ? <Spinner /> : <button 
                                    type="submit" 
                                    className="flex gap-2 items-center px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] ease-in font-semibold duration-300"
                                >                                                    
                                    <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  
                                        <polygon points="3 11 22 2 13 21 11 13 3 11" />
                                    </svg>
                                    Send Notifications
                                </button>}

                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SendNotifications;
