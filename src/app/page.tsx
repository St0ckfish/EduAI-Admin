"use client";
import Dashboard from "./Dashboard/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

export default function Home() {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  return (
    <>
      <div
        className={` ${booleanValue ? "lg:ml-[40px]" : "lg:ml-[290px]"} mt-12`}
      >
        <Dashboard />
      </div>
    </>
  );
}
