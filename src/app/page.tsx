import Image from "next/image";
import Link from "next/link";
import Dashboard from './Dashboard/dashboard';

export default function Home() {
  return (
    <>
      <div className="lg:ml-[290px] mt-12">
        <Dashboard/>
      </div>
    </>
  );
}
