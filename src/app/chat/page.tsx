"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { useGetAllChatsQuery } from "@/features/chat/chatApi";
import Spinner from "@/components/spinner";

const ChatPage = dynamic(() => import("@/components/chat"), { ssr: false });
const Chat = () => {
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const handleClick = (id: string) => {
    setUserId(id);
  };
  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data, isLoading } = useGetAllChatsQuery(null);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div
      dir={currentLanguage === "ar" ? "rtl" : "ltr"}
      className={` ${
        currentLanguage === "ar"
          ? booleanValue
            ? "lg:mr-[100px]"
            : "lg:mr-[270px]"
          : booleanValue
            ? "lg:ml-[100px]"
            : "lg:ml-[270px]"
      }  mt-10`}
    >
      <div className="flex w-full justify-between gap-10 rounded-lg p-4 max-[1180px]:grid max-[1180px]:justify-center">
        <div className="h-[700px] w-full overflow-y-auto rounded-xl bg-bgPrimary p-5">
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <div className="flex justify-start text-start text-[22px] font-semibold">
                  <h1>Contacts</h1>
                </div>
                <div className="mt-6 grid items-start">
                  <div>
                    <label htmlFor="icon" className="sr-only">
                      Search
                    </label>
                    <div className="relative min-w-48 md:min-w-80">
                      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-4">
                        <svg
                          className="size-4 flex-shrink-0 text-textSecondary"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                      </div>
                      <input
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        id="icon"
                        name="icon"
                        className="block w-full rounded-lg border-2 border-borderPrimary px-4 py-2 ps-11 text-sm outline-none focus:border-primary focus:ring-primary disabled:pointer-events-none disabled:opacity-50"
                        placeholder={
                          currentLanguage === "en"
                            ? "Search"
                            : currentLanguage === "ar"
                              ? "بحث"
                              : "Recherche"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 grid gap-2">
                  {data?.data?.content
                    .filter((chat: any) => {
                      return search.toLocaleLowerCase() === ""
                        ? chat
                        : chat.targetUser.name.toLocaleLowerCase().includes(search);
                    })
                    .map((chat: any) => (
                      <div
                        key={chat.id}
                        onClick={() => handleClick(chat.chatId)}
                        className="flex w-full cursor-pointer items-center border-b border-borderPrimary px-2 py-1 hover:bg-bgSecondary"
                      >
                        <div className={`${chat.numberOfNewMessages > 0 ? "w-[150px]" : ""}`}>
                          {!chat.targetUser.hasPhoto ? (
                            <img
                              src="/images/userr.png"
                              className="mx-2 h-[40px] w-[40px] rounded-lg"
                              alt="#"
                            />
                          ) : (
                            <img
                              src={chat.targetUser.photoLink}
                              className="mx-2 h-[40px] w-[40px] rounded-lg"
                              alt="#"
                            />
                          )}
                        </div>
                        <div className="grid gap-2 w-full">
                          <p className="font-semibold ">
                            {chat.targetUser.name}{" "}
                            <span className="text-[15px] text-secondary">
                              ({chat.targetUser.Role})
                            </span>
                          </p>
                          <p className="font-semibold text-secondary">
                            {chat.lastMessage}
                          </p>
                        </div>
                        {
                          chat.numberOfNewMessages > 0 &&(
                        <div className="flex justify-end items-center text-center w-full text-end text-white">
                          <p className="px-2 rounded-full bg-primary">{chat.numberOfNewMessages}</p>
                        </div>
                          )
                        }
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex w-full rounded-xl bg-bgPrimary">
          {userId == "" ? (
            <div className="flex h-full w-full items-center justify-center">
              <img src="/images/emptyState.png" alt="#" />
            </div>
          ) : (
            <ChatPage userId={userId} />
          )}
        </div>
      </div>
    </div>
  );
  {
    /* <button onClick={handleOpenRegister} className="mr-4 bg-blue-500 text-white p-2 rounded">
    Register
  </button>
  <button
    onClick={handleOpenLogin}
    className="rounded bg-green-500 p-2 text-white"
  >
    Login
  </button>
  <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
    {isRegisterForm ? (
      <RegisterForm onClose={handleCloseModal} />
    ) : (
      <LoginForm onClose={handleCloseModal} />
    )}
  </Modal> */
  }
};

export default Chat;
