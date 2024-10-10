"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { useUpdateExamMutation } from "@/features/Acadimic/examsApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import BreadCrumbs from "@/components/BreadCrumbs";

interface ParamsType {
  params: {
    examId: number;
  };
}

const EditExam = ({ params }: ParamsType) => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Infrastructure",
      nameAr: "الدورات والموارد",
      nameFr: "Cours et Ressources",
      href: "/infrastructure",
    },
    {
      nameEn: "Exams",
      nameAr: "الامتحانات",
      nameFr: "Examens",
      href: "/exams",
    },
    {
      nameEn: "Edit Exam",
      nameAr: "إضافة امتحان جديد",
      nameFr: "Ajouter un nouvel examen",
      href: `/educational-affairs/exams/${params.examId}`,
    },
  ];

  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createExam, { isLoading }] = useUpdateExamMutation();

  const onSubmit = async (data: any) => {
    try {
      await createExam({ formData: data, id: params.examId }).unwrap();
      toast.success("Exam edited successfully");
    } catch {
      toast.error("Failed to edite Exam");
    }
  };

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  if (loading)
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
        } mr-[5px] mt-[40px] grid h-[850px] items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid h-[900px] items-center justify-center rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:h-[800px] xl:w-[1000px]">
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="examDate"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Exam Date"
                  : currentLanguage === "ar"
                    ? "تاريخ الامتحان"
                    : currentLanguage === "fr"
                      ? "Date de l'examen"
                      : "Exam Date"}{" "}
                <input
                  id="examDate"
                  {...register("examDate", { required: true })}
                  type="date"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.examDate && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                  </span>
                )}
              </label>
              <label
                htmlFor="examBeginning"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Exam Beginning"
                  : currentLanguage === "ar"
                    ? "بداية الامتحان"
                    : currentLanguage === "fr"
                      ? "Début de l'examen"
                      : "Exam Beginning"}{" "}
                <input
                  id="examBeginning"
                  {...register("examBeginning", { required: true })}
                  type="time"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.examBeginning && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                  </span>
                )}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="examEnding"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Exam Ending"
                  : currentLanguage === "ar"
                    ? "نهاية الامتحان"
                    : currentLanguage === "fr"
                      ? "Fin de l'examen"
                      : "Exam Ending"}{" "}
                <input
                  id="examEnding"
                  {...register("examEnding", { required: true })}
                  type="time"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.examEnding && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                  </span>
                )}
              </label>
              <label
                htmlFor="period"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Period"
                  : currentLanguage === "ar"
                    ? "معرف نوع الامتحان"
                    : currentLanguage === "fr"
                      ? "ID du type d'examen"
                      : "Exam Type ID"}{" "}
                <input
                  id="period"
                  {...register("period", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.period && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"}{" "}
                  </span>
                )}
              </label>
            </div>

            <div className="flex justify-center text-center">
              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="w-[140px] rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                >
                  {currentLanguage === "en"
                    ? "Edit Exam"
                    : currentLanguage === "ar"
                      ? "إضافة امتحان"
                      : currentLanguage === "fr"
                        ? "Ajouter un examen"
                        : "Add Exam"}{" "}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditExam;
