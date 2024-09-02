/* eslint-disable @next/next/no-img-element */
"use client";
import Modal from "@/components/model";
import Spinner from "@/components/spinner";
import {
  useGetAllBankAcountsQuery,
  useDeleteBankAcountsMutation,
  useCreateBankAcountsMutation,
  useUpdateBankAcountsMutation,
} from "@/features/Financial/bankApi";
import { RootState } from "@/GlobalRedux/store";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Bank = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);

  const [createAcount, { isLoading: isCreating }] =
    useCreateBankAcountsMutation();
  const [UpdateAcount, { isLoading: isUpdating }] =
    useUpdateBankAcountsMutation();
  const [editAcount, setEditAcount] = useState({
    id: "",
    bankName: "",
    bankShortName: "",
    beneficiaryName: "",
    beneficiaryAddress: "",
    beneficiaryAccountNumber: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleOpenModal2 = (bank: Record<string, any>) => {
    setEditAcount({
      id: bank.id,
      bankName: bank.bankName,
      bankShortName: bank.bankShortName,
      beneficiaryName: bank.beneficiaryName,
      beneficiaryAddress: bank.beneficiaryAddress,
      beneficiaryAccountNumber: bank.beneficiaryAccountNumber,
    });
    setValue("bankName", bank.bankName);
    setValue("bankShortName", bank.bankShortName);
    setValue("beneficiaryName", bank.beneficiaryName);
    setValue("beneficiaryAddress", bank.beneficiaryAddress);
    setValue("beneficiaryAccountNumber", bank.beneficiaryAccountNumber);
    setModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  type Bank = Record<string, any>;
  const { data, error, isLoading, refetch } = useGetAllBankAcountsQuery(null);
  const [deleteBankAcount] = useDeleteBankAcountsMutation();
  const handleDelete = async (id: string) => {
    try {
      await deleteBankAcount(id).unwrap();
      toast.success("Delete post Success");
      void refetch();
    } catch (err) {
      toast.error("Can not Delete post");
    }
  };
  const onSubmit = async (data: any) => {
    try {
      await createAcount(data).unwrap();
      void refetch();
      toast.success("Acount created successfully");
    } catch (err) {
      toast.error("Failed to create Acount");
    }
  };

  const onSubmitUpdate = async (data: any) => {
    const { id } = editAcount;
    try {
      await UpdateAcount({ id, formData: data }).unwrap();
      toast.success("Acount Update successfully");
      void refetch();
      setModalOpen2(false);
    } catch (err) {
      toast.error("Failed to Update Acount");
    }
  };
  const [open, setOpen] = useState<number | boolean | null>(false);
  const toggleNavbar = (index: number) => {
    setOpen(open === index ? null : index);
  };
  useEffect(() => {
    if (data) console.log("Response Data:", data);
    if (error) console.log("Error:", error);
  }, [data, error]);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div
        className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} ml-7 mt-12 flex-wrap text-[18px] max-[550px]:text-[15px]`}
      >
        <Link
          className="font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/"
        >
          Administration
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(82, 100, 132, 1)", transform: "", msFilter: "" }}
        >
          <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <Link
          className="font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/financial-management"
        >
          Financial Management
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(82, 100, 132, 1)", transform: "", msFilter: "" }}
        >
          <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
        <Link
          className="font-semibold text-[#526484] hover:text-blue-400 hover:underline"
          href="/financial-management/bank"
        >
          Bank
        </Link>
      </div>
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-10`}
      >
        <div className="flex justify-between text-center max-[502px]:grid max-[502px]:justify-center">
          <div className="mb-3">
            <label htmlFor="icon" className="sr-only">
              Search
            </label>
            <div className="relative min-w-72 md:min-w-80">
              <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-4">
                <svg
                  className="size-4 flex-shrink-0 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                onChange={e => setSearch(e.target.value)}
                type="text"
                id="icon"
                name="icon"
                className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2 ps-11 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleOpenModal}
              className="mb-5 mr-3 whitespace-nowrap rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
            >
              + New Bank Information
            </button>
          </div>
        </div>
        <div className="grid h-full w-full items-center gap-4 rounded-xl bg-white p-9 max-[505px]:p-2">
          {data?.data.content
            .filter((bank: Bank) => {
              return search.toLocaleLowerCase() === ""
                ? bank
                : bank.bankShortName.toLocaleLowerCase().includes(search);
            })
            .map((bank: Bank, index: number) => (
              <>
                <div className="flex items-start justify-end gap-2">
                  {open === index ? (
                    <div className="flex h-[35px] items-center gap-2 rounded-full bg-white px-1.5 py-1">
                      <button onClick={() => handleDelete(bank.id)}>
                        <svg
                          className="h-6 w-6 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      <button onClick={() => handleOpenModal2(bank)}>
                        <svg
                          className="h-6 w-6 text-blue-500"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                          <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="invisible flex h-[35px] w-[100px] gap-2 rounded-full bg-white px-3 py-0.5">
                      <button>
                        <svg
                          className="h-6 w-6 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      <button>
                        <svg
                          className="h-6 w-6 text-blue-500"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                          <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <button onClick={() => toggleNavbar(index)}>
                    <svg
                      className="mt-1.5 h-6 w-6 text-gray-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="12" r="1" />{" "}
                      <circle cx="12" cy="19" r="1" />{" "}
                      <circle cx="12" cy="5" r="1" />
                    </svg>
                  </button>
                </div>
                <div
                  key={index}
                  className="flex w-full items-center justify-between max-[1150px]:grid max-[1150px]:justify-center"
                >
                  <div className="flex justify-center">
                    <div className="relative h-56 w-96 transform rounded-xl bg-red-100 text-white shadow-2xl transition-transform max-[1150px]:mb-4 max-[840px]:w-[340px]">
                      <img
                        className="relative h-full w-full rounded-xl object-cover"
                        src="https://i.imgur.com/kGkSg1v.png"
                        alt="#"
                      />
                      <div className="absolute top-8 w-full px-8">
                        <div className="flex justify-between">
                          <div className="">
                            <h1 className="font-light">Name</h1>
                            <p className="font-medium tracking-widest">
                              Mostapha Taha
                            </p>
                          </div>
                          <img
                            className="h-14 w-14"
                            src="https://i.imgur.com/bbPHJVe.png"
                            alt="#"
                          />
                        </div>
                        <div className="pt-1">
                          <h1 className="font-light">Card Number</h1>
                          <p className="tracking-more-wider font-medium">
                            4642 3489 9867 7632
                          </p>
                        </div>
                        <div className="pr-6 pt-6">
                          <div className="flex justify-between">
                            <div className="">
                              <h1 className="text-xs font-light">Valid</h1>
                              <p className="text-sm font-medium tracking-wider">
                                11/15
                              </p>
                            </div>
                            <div className="">
                              <h1 className="text-xs font-light">Expiry</h1>
                              <p className="text-sm font-medium tracking-wider">
                                03/25
                              </p>
                            </div>

                            <div className="">
                              <h1 className="text-xs font-light">CVV</h1>
                              <p className="tracking-more-wider text-sm font-bold">
                                ···
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 justify-center">
                    <div className="grid gap-5 max-[1150px]:justify-center max-[1150px]:text-center">
                      <div>
                        <h1 className="text-[18px] font-semibold text-[#526484]">
                          Bank Name
                        </h1>
                        <p className="ml-3 font-semibold">
                          {bank.bankShortName}
                        </p>
                      </div>
                      <div>
                        <h1 className="text-[18px] font-semibold text-[#526484]">
                          Beneficiary Name{" "}
                        </h1>
                        <p className="ml-3 font-semibold">
                          {bank.beneficiaryName}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 max-[1150px]:justify-center max-[1150px]:text-center">
                      <div>
                        <h1 className="text-[18px] font-semibold text-[#526484]">
                          Beneficiary Address{" "}
                        </h1>
                        <p className="ml-3 font-semibold">
                          {bank.beneficiaryAddress}
                        </p>
                      </div>
                      <div>
                        <h1 className="text-[18px] font-semibold text-[#526484]">
                          Beneficiary Account Number{" "}
                        </h1>
                        <p className="ml-3 font-semibold">
                          {bank.beneficiaryAccountNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-4 text-xl font-semibold"> Bank Name</h2>
            <div className="mb-4 rounded-sm">
              <input
                type="text"
                placeholder="Bank Name "
                {...register("bankName", { required: true })}
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.bankName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <h2 className="mb-4 text-xl font-semibold">Beneficiary Address</h2>
            <div className="mb-4 rounded-sm">
              <input
                placeholder="Beneficiary Address"
                {...register("beneficiaryAddress", { required: true })}
                type="text"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.beneficiaryAddress && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <h2 className="mb-4 text-xl font-semibold">Beneficiary Name</h2>
            <div className="mb-4 rounded-sm">
              <input
                {...register("beneficiaryName", { required: true })}
                type="text"
                placeholder="Beneficiary Name"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.beneficiaryName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <h2 className="mb-4 text-xl font-semibold">
              Beneficiary Account Number
            </h2>
            <div className="mb-4 rounded-sm">
              <input
                {...register("beneficiaryAccountNumber", { required: true })}
                placeholder="Beneficiary Account"
                type="text"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.beneficiaryAccountNumber && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <h2 className="mb-4 text-xl font-semibold">Bank Short Name</h2>
            <div className="mb-4 rounded-sm">
              <input
                {...register("bankShortName", { required: true })}
                placeholder="Bank Short Name"
                type="text"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.bankShortName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="flex justify-between">
              {isCreating ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                >
                  Add
                </button>
              )}
              <button
                onClick={handleCloseModal}
                className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl border bg-[#ffffff] px-4 py-2 text-[18px] font-semibold text-black duration-300 ease-in hover:shadow-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
        <Modal isOpen={isModalOpen2} onClose={handleCloseModal2}>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <h2 className="mb-4 text-xl font-semibold"> Bank Name</h2>
            <div className="mb-4 rounded-sm">
              <input
                type="text"
                placeholder="Bank Name "
                {...register("bankName", { required: true })}
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.bankName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <h2 className="mb-4 text-xl font-semibold">Beneficiary Address</h2>
            <div className="mb-4 rounded-sm">
              <input
                placeholder="Beneficiary Address"
                {...register("beneficiaryAddress", { required: true })}
                type="text"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.beneficiaryAddress && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <h2 className="mb-4 text-xl font-semibold">Beneficiary Name</h2>
            <div className="mb-4 rounded-sm">
              <input
                {...register("beneficiaryName", { required: true })}
                type="text"
                placeholder="Beneficiary Name"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.beneficiaryName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <h2 className="mb-4 text-xl font-semibold">
              Beneficiary Account Number
            </h2>
            <div className="mb-4 rounded-sm">
              <input
                {...register("beneficiaryAccountNumber", { required: true })}
                placeholder="Beneficiary Account"
                type="text"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.beneficiaryAccountNumber && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <h2 className="mb-4 text-xl font-semibold">Bank Short Name</h2>
            <div className="mb-4 rounded-sm">
              <input
                {...register("bankShortName", { required: true })}
                placeholder="Bank Short Name"
                type="text"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.bankShortName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="flex justify-between">
              {isUpdating ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleCloseModal2}
                className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl border bg-[#ffffff] px-4 py-2 text-[18px] font-semibold text-black duration-300 ease-in hover:shadow-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Bank;
