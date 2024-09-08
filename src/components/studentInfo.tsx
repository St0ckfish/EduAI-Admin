/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const StudentInfo = ({ data }: { data: any }) => {
  return (
    <>
      <div className="grid rounded-xl bg-bgPrimary p-5">
        <div className="flex justify-between">
          <h1 className="font-sans font-semibold text-textPrimary">
            Student Information
          </h1>
          <Link href="/student">
            <svg
              className="h-6 w-6 text-textPrimary"
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
          <h1 className="font-sans font-semibold text-textPrimary">
            {data.data.name}
          </h1>
          <p className="font-sans font-semibold text-textPrimary">
            {" "}
            <span className="font-sans font-semibold text-textSecondary">
              Student ID :
            </span>
            {data.data.id}
          </p>
        </div>

        <div className="grid justify-start">
          <h1 className="font-sans text-[22px] font-semibold text-textPrimary">
            Basic Details
          </h1>
          <div className="grid w-[400px] grid-cols-2 max-[485px]:w-[240px]">
            <h3 className="font-sans font-semibold text-textSecondary">
              Date Of Birth:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.birthDate}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">Email:</h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.email}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">Gender:</h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.gender}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              nationality:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.nationality}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">role:</h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.role}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Date Of Birth:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">02/05/2012</p>
            <h3 className="font-sans font-semibold text-textSecondary">Religion:</h3>
            <p className="font-sans font-semibold text-textPrimary">Islam</p>
            <h3 className="font-sans font-semibold text-textSecondary">Address:</h3>
            <p className="font-sans font-semibold text-textPrimary">
              13,street, Zamalk,Cairo
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">Email:</h3>
            <p className="font-sans font-semibold text-textPrimary">
              Ahmed.M.Sayed@gmail.com
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">Mobile:</h3>
            <p className="font-sans font-semibold text-textPrimary">01220145607</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1">
          <p className="font-sans text-[20px] font-semibold text-textPrimary">
            About the student:
          </p>
          <p className="mb-5 font-sans text-[16px] font-semibold text-textSecondary">
            {data.data.about}
          </p>
          <p className="font-sans text-[20px] font-semibold text-textPrimary">
            Certification:
          </p>
          <p className="font-sans text-[16px] font-semibold text-textSecondary">
            2021-2022 <br /> He got first place in the school
          </p>
        </div>
      </div>
    </>
  );
};

export default StudentInfo;
