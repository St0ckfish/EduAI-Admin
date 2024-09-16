"use client";
import Modal from "@/components/model"; // تأكد من أن مكون Modal يعمل بشكل صحيح
import { useState } from "react";
import RegisterForm from "@/components/registerChat"; // تأكد من إنشاء هذا المكون
import LoginForm from "@/components/loginChat"; // تأكد من إنشاء هذا المكون
import dynamic from 'next/dynamic';

// تعطيل SSR لمكون ChatPage
const ChatPage = dynamic(() => import('@/components/chat'), { ssr: false });

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
      {/* مكون ChatPage سيتم تحميله فقط في المتصفح */}
      <ChatPage />

      {/* أزرار فتح المودال لتسجيل المستخدم أو تسجيل الدخول */}
      <button onClick={handleOpenRegister} className="mr-4 bg-blue-500 text-white p-2 rounded">
        Register
      </button>
      <button onClick={handleOpenLogin} className="bg-green-500 text-white p-2 rounded">
        Login
      </button>

      {/* مكون المودال */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isRegisterForm ? (
          <RegisterForm onClose={handleCloseModal} />
        ) : (
          <LoginForm onClose={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};

export default Chat;
