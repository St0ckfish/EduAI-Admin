"use client";
import dynamic from "next/dynamic";
import Modal from "@/components/model"; // تأكد من أن مكون Modal يعمل بشكل صحيح
import { useState } from "react";

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
    <div className="mt-10 lg:ml-[270px]">
      {/* مكون ChatPage سيتم تحميله فقط في المتصفح */}
      <ChatPage />

      {/* أزرار فتح المودال لتسجيل المستخدم أو تسجيل الدخول */}
      <button
        onClick={handleOpenRegister}
        className="mr-4 rounded bg-blue-500 p-2 text-white"
      >
        Register
      </button>
      <button
        onClick={handleOpenLogin}
        className="rounded bg-green-500 p-2 text-white"
      >
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
