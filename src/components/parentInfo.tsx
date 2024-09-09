/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

const ParentInfo = ({ data }: { data: any }) => {
  return (
    <>
      <div className="grid h-[700px] rounded-xl bg-bgPrimary p-5">
        <div className="flex justify-between">
          <h1 className="font-sans font-semibold text-textPrimary">
            Parent Information
          </h1>
          <Link href={`/parent`}>
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
        </div>

        <div className="grid justify-start">
          <h1 className="font-sans text-[22px] font-semibold text-textPrimary">
            Basic Details
          </h1>
          <div className="grid w-[400px] grid-cols-2 max-[485px]:w-[240px]">
            <h3 className="font-sans font-semibold text-textSecondary">
              Email:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.email}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Gender:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.gender}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Occupation:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.occupation}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Religion:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.religion}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Nationality:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.nationality}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              Mobile:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.number}
            </p>
            <h3 className="font-sans font-semibold text-textSecondary">
              About:
            </h3>
            <p className="font-sans font-semibold text-textPrimary">
              {data.data.about}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentInfo;
