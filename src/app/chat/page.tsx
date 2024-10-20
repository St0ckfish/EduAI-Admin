"use client";
import dynamic from "next/dynamic";
import Modal from "@/components/model"; // تأكد من أن مكون Modal يعمل بشكل صحيح
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { useGetAllTeachersChatQuery } from "@/features/User-Management/teacherApi";
import Spinner from "@/components/spinner";

// تعطيل SSR لمكونات ChatPage, RegisterForm و LoginForm
const ChatPage = dynamic(() => import("@/components/chat"), { ssr: false });
const RegisterForm = dynamic(() => import("@/components/registerChat"), {
  ssr: false,
});
const LoginForm = dynamic(() => import("@/components/loginChat"), {
  ssr: false,
});

const Chat = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false); // التبديل بين تسجيل المستخدم وتسجيل الدخول
  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );
  const { data, error, isLoading, refetch } = useGetAllTeachersChatQuery(null);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenRegister = () => {
    setIsRegisterForm(true);
    setModalOpen(true);
  };

  const handleOpenLogin = () => {
    setIsRegisterForm(false);
    setModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="mt-10 lg:ml-[270px] mr-4">
      <div className="flex w-full rounded-lg p-4 justify-between gap-10">
        <div className="rounded-xl w-full bg-bgPrimary p-5">
          {
            isLoading ? <Spinner /> : 
          <><div className="flex justify-start text-start font-semibold text-[22px]">
                <h1>Contacts</h1>
              </div><div className="grid items-start mt-6">
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
                        type="text"
                        id="icon"
                        name="icon"
                        className="block w-full rounded-lg border-2 border-borderPrimary px-4 py-2 ps-11 text-sm outline-none focus:border-primary focus:ring-primary disabled:pointer-events-none disabled:opacity-50"
                        placeholder={currentLanguage === "en"
                          ? "Search"
                          : currentLanguage === "ar"
                            ? "بحث"
                            : "Recherche"} />
                    </div>
                  </div>
                </div></>
          }
        </div>
        <div className="flex rounded-xl w-full">
          <ChatPage />
        </div>
      </div>
    </div>
  );
  {/* <button onClick={handleOpenRegister} className="mr-4 bg-blue-500 text-white p-2 rounded">
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
  </Modal> */}
};

export default Chat;
