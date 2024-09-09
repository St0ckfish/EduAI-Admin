/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const ExpirePage = () => {
  return (
    <div
      className="flex flex-col w-screen items-center h-screen bg-cover bg-center fixed z-[120] bg-[url('/images/Expired.jpg')]"
    >
      <img
        src="/images/logo.png"
        alt="Logo"
        className="w-[353px] h-[108px] relative top-[110px]"
      />

      <h2 className="font-sora text-[36px] font-semibold leading-[44px] relative top-[160px] text-black">
        You have been disconnected
      </h2>

      <p className="font-sora text-[28px] font-semibold leading-[36px] relative top-[200px] text-[#4f5c72]">
        The page has expired!
      </p>

      <Link href="/login" className="flex items-center justify-center w-[144px] h-[44px] text-[18px] font-semibold text-center relative top-[250px] bg-blue-500 text-white rounded-lg">
        Sign in
      </Link>
      
      <img
        src="/images/eximage.png"
        alt="#"
        className="w-[709px] h-[450px] relative top-[250px] mt-8"
      />
    </div>
  );
}

export default ExpirePage;
