"use client"
import ChatPage from "@/components/chat";
import Modal from "@/components/model"; // Make sure your Modal component is working
import { useState } from "react";
import RegisterForm from "@/components/registerChat"; // Create this component
import LoginForm from "@/components/loginChat"; // Create this component

const Chat = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false); // Toggle between Register and Login

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
      <ChatPage />

      {/* Buttons to open Register or Login Modal */}
      <button onClick={handleOpenRegister} className="mr-4 bg-blue-500 text-white p-2 rounded">
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
      </Modal>
    </div>
  );
};

export default Chat;
