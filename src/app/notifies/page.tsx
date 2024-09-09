"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  useGetAllNotificationsQuery,
  usePutNotifiReadMutation,
  useDeleteNotificationMutation,
} from "@/features/communication/notficationsApi";
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
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="ml-7 mt-12 flex items-center gap-1 lg:ml-[290px]">
        <Link
          className="text-[18px] font-semibold text-secondary hover:text-blue-400 hover:underline"
          href="/"
        >
          Communications
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(82, 100, 132, 1)", transform: "", msFilter: "" }}
        >
          <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <Link
          className="text-[18px] font-semibold text-secondary hover:text-blue-400 hover:underline"
          href="/notifies"
        >
          Notifies
        </Link>
      </div>
      <div className="mt-12 lg:ml-[290px]">
        <div className="flex justify-end">
          <Link
            href="/notifies/send-notifications"
            className="mb-5 mr-3 flex items-center gap-2 whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
          >
            {" "}
            <svg
              className="h-7 w-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Send Notifications
          </Link>
        </div>
        <div className="grid h-full w-full items-center justify-center gap-3 rounded-xl bg-bgPrimary p-5">
          <div className="mb-5 flex w-full justify-start">
            <h1 className="text-[22px] font-semibold">Notifications</h1>
          </div>

          {data?.data.content.map((notifi: Notifi, index: number) => (
            <div
              key={index}
              className={`flex gap-2 ${notifi.read ? "bg-bgPrimary" : "bg-bgSecondary"} h-full w-[1000px] rounded-lg p-3 shadow-xl max-[1340px]:w-[700px] max-[1040px]:w-[500px] max-[550px]:w-[300px]`}
            >
              <div>
                {notifi.picture == null ? (
                  <img
                    src="/images/userr.png"
                    className="mr-2 h-[40px] w-[40px] rounded-full"
                    alt="#"
                  />
                ) : (
                  <img
                    src={notifi.picture}
                    className="mr-2 h-[40px] w-[40px] rounded-full"
                    alt="#"
                  />
                )}
              </div>
              <div className="flex w-full justify-between">
                <div className="grid items-center justify-center gap-4">
                  <h1 className="flex items-center gap-2 font-semibold">
                    {notifi.title}{" "}
                    <span className="text-[12px] text-gray-400">
                      {formatTransactionDate(notifi.timestamp)}
                    </span>{" "}
                    {notifi.read ? (
                      ""
                    ) : (
                      <div className="bg-b ml-1 flex h-2.5 w-2.5 rounded-full"></div>
                    )}{" "}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: notifi.description }}
                  />
                </div>
                <div className="flex items-start gap-2">
                  {notifi.read ? (
                    <button className="text-[20px] text-gray-600">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRead(notifi.id)}
                      className="text-[20px] text-gray-600"
                    >
                      <svg
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notifi.id)}
                    className="text-[20px] text-gray-600"
                  >
                    <svg
                      className="h-5 w-5 text-gray-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <line x1="18" y1="6" x2="6" y2="18" />{" "}
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifies;
