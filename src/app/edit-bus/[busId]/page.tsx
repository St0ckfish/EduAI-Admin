"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import {
  useUpdateBussMutation,
  useGetBusByIdQuery,
} from "@/features/Infrastructure/busApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import BreadCrumbs from "@/components/BreadCrumbs";

interface ViewBusProps {
  params: {
    busId: string;
  };
}
const EditBus: React.FC<ViewBusProps> = ({ params }) => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Bus",
      nameAr: "الحافلة",
      nameFr: "Bus",
      href: "/bus",
    },
    {
      nameEn: "Edit Bus",
      nameAr: "تعديل الحافلة",
      nameFr: "Modifier le bus",
      href: `/edit-bus/${params.busId}`,
    },
  ];
  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data, error, isLoading } = useGetBusByIdQuery(params.busId);

  useEffect(() => {
    if (data) {
      setValue("busNumber", data.data.busNumber);
      setValue("busCapacity", data.data.busCapacity);
    }
    if (error) {
    }
  }, [data, error]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [createBus, { isLoading: isCreating }] = useUpdateBussMutation();

  const onSubmit = async (data: any) => {
    try {
      await createBus({ formData: data, id: params.busId }).unwrap();
      toast.success(
        currentLanguage === "ar"
          ? "تم إنشاء الحافلة بنجاح"
          : currentLanguage === "fr"
            ? "Bus créé avec succès"
            : "Bus created successfully",
      );
    } catch (err) {
      toast.error(
        currentLanguage === "ar"
          ? "فشل في إنشاء الحافلة"
          : currentLanguage === "fr"
            ? "Échec de la création du bus"
            : "Failed to create Bus",
      );
    }
  };

  if (loading || isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />

      <div
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        className={`${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[100px]"
              : "lg:mr-[270px]"
            : booleanValue
              ? "lg:ml-[100px]"
              : "lg:ml-[270px]"
        } mx-3 mt-[40px] grid h-[500px] items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid h-[400px] items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:h-[500px] xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <svg
                className="h-6 w-6 font-bold text-secondary group-hover:text-hover"
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
                <line x1="3" y1="21" x2="21" y2="21" />{" "}
                <line x1="3" y1="10" x2="21" y2="10" />{" "}
                <polyline points="5 6 12 3 19 6" />{" "}
                <line x1="4" y1="10" x2="4" y2="21" />{" "}
                <line x1="20" y1="10" x2="20" y2="21" />{" "}
                <line x1="8" y1="14" x2="8" y2="17" />{" "}
                <line x1="12" y1="14" x2="12" y2="17" />{" "}
                <line x1="16" y1="14" x2="16" y2="17" />
              </svg>
              <h1 className="text-[22px] font-semibold">
                {currentLanguage === "ar"
                  ? "معلومات الحافلة"
                  : currentLanguage === "fr"
                    ? "Informations sur le bus"
                    : "Bus Information"}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label htmlFor="name" className="grid text-[18px] font-semibold">
                {currentLanguage === "ar"
                  ? "رقم الحافلة"
                  : currentLanguage === "fr"
                    ? "Numéro du bus"
                    : "Bus Number"}
                <input
                  id="name"
                  {...register("busNumber", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.busNumber && (
                  <span className="text-error">
                    {currentLanguage === "ar"
                      ? "هذا الحقل مطلوب"
                      : currentLanguage === "fr"
                        ? "Ce champ est requis"
                        : "This field is required"}
                  </span>
                )}
              </label>
              <label htmlFor="code" className="grid text-[18px] font-semibold">
                {currentLanguage === "ar"
                  ? "سعة الحافلة"
                  : currentLanguage === "fr"
                    ? "Capacité du bus"
                    : "Bus Capacity"}
                <input
                  id="code"
                  {...register("busCapacity", { required: true })}
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.busCapacity && (
                  <span className="text-error">
                    {currentLanguage === "ar"
                      ? "هذا الحقل مطلوب"
                      : currentLanguage === "fr"
                        ? "Ce champ est requis"
                        : "This field is required"}
                  </span>
                )}
              </label>
            </div>

            <div className="flex justify-center text-center">
              {isCreating ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="w-fit rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
                >
                  {currentLanguage === "ar"
                    ? "تعديل الحافلة"
                    : currentLanguage === "fr"
                      ? "Modifier l'autobus"
                      : "Edit Bus"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBus;
