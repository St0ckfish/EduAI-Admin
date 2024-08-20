"use client"
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useGetAllNotificationsQuery, usePutNotifiReadMutation, useDeleteNotificationMutation } from "@/features/communication/notficationsApi";
import Spinner from "@/components/spinner";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Notifies = () => {

    const formatTransactionDate = (dateString: string | number | Date) => {
        if (!dateString) return "No transaction date";
        const formatter = new Intl.DateTimeFormat("en-EG", {
            timeZone: "Asia/Riyadh",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: false,
        });
        return formatter.format(new Date(dateString));
    };

    const { data, error, isLoading, refetch } = useGetAllNotificationsQuery(null);
    type Notifi = Record<string, any>;
    useEffect(() => {
        if (data) console.log("Response Data:", data);
        if (error) console.log("Error:", error);
    }, [data, error]);

    const [readNotifi] = usePutNotifiReadMutation();


    const handleRead = async (id: string) => {
        try {
          await readNotifi(id).unwrap();
          toast.success(`Notification readed`);
          void refetch();
        } catch (err) {
          toast.error("Failed to Read Notification");
        }
      };
    const [deleteNotifi] = useDeleteNotificationMutation();


    const handleDelete = async (id: string) => {
        try {
          await deleteNotifi(id).unwrap();
          toast.success(`Notification Deleted`);
          void refetch();
        } catch (err) {
          toast.error("Failed to Delete Notification");
        }
      };

    if (isLoading)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
        );

    return (
        <>
            <div className="flex items-center gap-1 lg:ml-[290px] mt-12 ml-7">
                <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/">Communications</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)', transform: '', msFilter: '' }}><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                <Link className="text-[#526484] hover:text-blue-400 hover:underline text-[18px] font-semibold" href="/notifies">Notifies</Link>
            </div>
            <div className="lg:ml-[290px] mt-12">
                <div className="grid w-full h-full bg-white rounded-xl justify-center items-center p-5 gap-3">
                    <div className="flex w-full justify-start mb-5">
                        <h1 className="text-[22px] font-semibold">Notifications</h1>
                    </div>

                    {
                        data?.data.content.map((notifi: Notifi, index: number) => (
                            <div key={index} className={`flex  gap-2 ${notifi.read ? "bg-white" : "bg-[#edf9ff]"} shadow-xl rounded-lg p-3 w-[1000px] max-[1340px]:w-[700px] max-[1040px]:w-[500px] max-[550px]:w-[300px] h-full`}>
                                <div>
                                    {
                                        notifi.picture == null ?
                                            <img src="/images/userr.png" className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                            :
                                            <img src={notifi.picture} className="w-[40px] h-[40px] mr-2 rounded-full" alt="#" />
                                    }
                                </div>
                                <div className="flex w-full justify-between">
                                    <div className="grid justify-center gap-4 items-center">
                                        <h1 className="font-semibold flex items-center gap-2">{notifi.title} <span className="text-gray-400 text-[12px]">{formatTransactionDate(notifi.timestamp)}</span> {notifi.read ? "":<div className="flex ml-1 w-2.5 h-2.5 rounded-full bg-[#3e5af0]"></div>}  </h1>
                                        <p className="text-gray-700 text-[15px] font-semibold">{notifi.description}</p>
                                    </div>
                                    <div className="flex gap-2 items-start">
                                        {
                                            notifi.read ? 
                                            <button className="text-gray-600 text-[20px]"><svg className="h-5 w-5 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"/></svg></button>
                                            :
                                            <button onClick={()=> handleRead(notifi.id)} className="text-gray-600 text-[20px]"><svg className="h-5 w-5 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></button>
                                        }
                                        <button onClick={() => handleDelete(notifi.id)} className="text-gray-600 text-[20px]"><svg className="h-5 w-5 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg></button>
                                    </div>
                                </div>

                            </div>
                        ))
                    }


                </div>
            </div>
        </>
    );
}

export default Notifies;