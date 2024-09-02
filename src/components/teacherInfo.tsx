/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

const TeacherInfo = ({ data }: { data: any }) => {
  return (
    <>
      <div className="grid rounded-xl bg-white p-5">
        <div className="flex justify-between">
          <h1 className="font-sans font-semibold text-gray-800">
            Teacher Information
          </h1>
          <Link href={`/edit-teacher/${data.data.id}`}>
            <svg
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Link>
        </div>

        <div className="grid items-center justify-center text-center">
          {data.data.picture == null ? (
            <img
              src="/images/userr.png"
              className="mr-2 h-[120px] w-[120px] rounded-full"
              alt="#"
            />
          ) : (
            <img
              src={data.data.picture}
              className="mr-2 h-[120px] w-[120px] rounded-full"
              alt="#"
            />
          )}
          <h1 className="font-sans font-semibold text-gray-800">
            {data.data.name}
          </h1>
          <p className="font-sans font-semibold text-gray-800">
            {" "}
            <span className="font-sans font-semibold text-gray-400">
              Teacher ID :
            </span>
            {data.data.id}
          </p>
        </div>

        <div className="grid justify-start">
          <h1 className="font-sans text-[22px] font-semibold text-gray-800">
            Basic Details
          </h1>
          <div className="grid w-[400px] grid-cols-2 max-[485px]:w-[240px]">
            <h3 className="font-sans font-semibold text-gray-400">Email:</h3>
            <p className="font-sans font-semibold text-gray-800">
              {data.data.email}
            </p>
            <h3 className="font-sans font-semibold text-gray-400">Salary:</h3>
            <p className="font-sans font-semibold text-gray-800">
              {data.data.salary == null ? `Not specified` : data.data.salary}
            </p>
            <h3 className="font-sans font-semibold text-gray-400">
              Date Of Birth:
            </h3>
            <p className="font-sans font-semibold text-gray-800">
              {data.data.birthDate}
            </p>
            <h3 className="font-sans font-semibold text-gray-400">Gender:</h3>
            <p className="font-sans font-semibold text-gray-800">
              {data.data.gender}
            </p>
            <h3 className="font-sans font-semibold text-gray-400">
              nationality:
            </h3>
            <p className="font-sans font-semibold text-gray-800">
              {data.data.nationality}
            </p>
            <h3 className="font-sans font-semibold text-gray-400">Gender:</h3>
            <p className="font-sans font-semibold text-gray-800">
              {data.data.gender}
            </p>
            <h3 className="font-sans font-semibold text-gray-400">
              Qualification:
            </h3>
            <p className="font-sans font-semibold text-gray-800">
              {data.data.qualification}
            </p>
            <h3 className="font-sans font-semibold text-gray-400">Religion:</h3>
            <p className="font-sans font-semibold text-gray-800">
              {data.data.religion}
            </p>
            <h3 className="font-sans font-semibold text-gray-400">Address:</h3>
            <p className="font-sans font-semibold text-gray-800">
              13,street, Zamalk,Cairo
            </p>
            <h3 className="font-sans font-semibold text-gray-400">Mobile:</h3>
            <p className="font-sans font-semibold text-gray-800">
              {data.data.number}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1">
          <p className="font-sans text-[20px] font-semibold text-gray-800">
            About the Teacher:
          </p>
          <p className="mb-5 font-sans text-[16px] font-semibold text-gray-400">
            {data.data.about}
          </p>
        </div>
      </div>
    </>
  );
};

export default TeacherInfo;
