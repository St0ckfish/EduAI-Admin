"use client";
import dynamic from 'next/dynamic';
import Modal from "@/components/model"; // تأكد من أن مكون Modal يعمل بشكل صحيح
import { useState } from "react";

// تعطيل SSR لمكونات ChatPage, RegisterForm و LoginForm
const ChatPage = dynamic(() => import('@/components/chat'), { ssr: false });
const RegisterForm = dynamic(() => import('@/components/registerChat'), { ssr: false });
const LoginForm = dynamic(() => import('@/components/loginChat'), { ssr: false });

const Chat = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false); // التبديل بين تسجيل المستخدم وتسجيل الدخول

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

  return (
    <div className="lg:ml-[270px] mt-10">
      {/* <button onClick={handleOpenRegister} className="mr-4 bg-blue-500 text-white p-2 rounded">
        Register
      </button>
      <button onClick={handleOpenLogin} className="bg-green-500 text-white p-2 rounded">
        Login
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isRegisterForm ? (
          <RegisterForm onClose={handleCloseModal} />
        ) : (
          <LoginForm onClose={handleCloseModal} />
        )}
      </Modal> */}
      <div className='rounded-xl'>
        <ChatPage />
      </div>
    </div>
  );
};

export default Chat;
