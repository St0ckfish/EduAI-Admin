"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useCreateSchedualMutation } from "@/features/Acadimic/scheduleApi";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import BreadCrumbs from "@/components/BreadCrumbs";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/spinner";
const AddSchedule = () => {
  const breadcrumbs = [
    {
      nameEn: "Academic",
      nameAr: "أكاديمي",
      nameFr: "Académique",
      href: "/",
    },
    {
      nameEn: "Educational Affairs",
      nameAr: "الشئون التعليمية",
      nameFr: "Affaires éducatives",
      href: "/educational-affairs",
    },
    {
      nameEn: "Schedule",
      nameAr: "الجدول",
      nameFr: "Emploi du temps",
      href: "/educational-affairs/schedule",
    },
    {
      nameEn: "Add Schedule",
      nameAr: "إضافة جدول",
      nameFr: "Emploi du temps",
      href: "/educational-affairs/schedule/add-schedule",
    },
  ];

  const { register, handleSubmit, reset } = useForm();

  const [createSchedule, { isLoading: isCreating }] =
    useCreateSchedualMutation();

  const onSubmitCreateSchedule: SubmitHandler<FieldValues> = async data => {
    try {
      await createSchedule({
        classroomId: data.classroomId,
        teacherId: data.teacherId,
        courseId: data.courseId,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
      }).unwrap();
      toast.success("Schedule Created Successfully");
      reset();
    } catch (error) {
      toast.error("Error creating schedule");
      console.error("Error creating schedule:", error);
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
      <form
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        onSubmit={handleSubmit(onSubmitCreateSchedule)}
        className="mr-3 mt-5 space-y-4 lg:ml-[270px]"
      >
        <div>
          <label>
            {currentLanguage === "ar"
              ? "معرف الفصل"
              : currentLanguage === "fr"
                ? "ID de la classe"
                : "Classroom ID"}
          </label>
          <input
            {...register("classroomId", { required: true })}
            placeholder={
              currentLanguage === "ar"
                ? "أدخل معرف الفصل"
                : currentLanguage === "fr"
                  ? "Entrez l'ID de la classe"
                  : "Enter Classroom ID"
            }
            className="w-full rounded border border-borderPrimary px-4 py-2"
          />
        </div>
        <div>
          <label>
            {currentLanguage === "ar"
              ? "معرف المعلم"
              : currentLanguage === "fr"
                ? "ID de l'enseignant"
                : "Teacher ID"}
          </label>
          <input
            {...register("teacherId", { required: true })}
            placeholder={
              currentLanguage === "ar"
                ? "أدخل معرف المعلم"
                : currentLanguage === "fr"
                  ? "Entrez l'ID de l'enseignant"
                  : "Enter Teacher ID"
            }
            className="w-full rounded border border-borderPrimary px-4 py-2"
          />
        </div>
        <div>
          <label>
            {currentLanguage === "ar"
              ? "معرف الدورة"
              : currentLanguage === "fr"
                ? "ID du cours"
                : "Course ID"}
          </label>
          <input
            {...register("courseId", { required: true })}
            placeholder={
              currentLanguage === "ar"
                ? "أدخل معرف الدورة"
                : currentLanguage === "fr"
                  ? "Entrez l'ID du cours"
                  : "Enter Course ID"
            }
            className="w-full rounded border border-borderPrimary px-4 py-2"
          />
        </div>
        <div>
          <label>
            {currentLanguage === "ar"
              ? "اليوم"
              : currentLanguage === "fr"
                ? "Jour"
                : "Day"}
          </label>
          <input
            {...register("day", { required: true })}
            placeholder={
              currentLanguage === "ar"
                ? "أدخل اليوم"
                : currentLanguage === "fr"
                  ? "Entrez le jour"
                  : "Enter Day"
            }
            className="w-full rounded border border-borderPrimary px-4 py-2"
          />
        </div>
        <div>
          <label>
            {currentLanguage === "ar"
              ? "وقت البدء"
              : currentLanguage === "fr"
                ? "Heure de début"
                : "Start Time"}
          </label>
          <input
            {...register("startTime", { required: true })}
            placeholder="HH:mm:ss"
            className="w-full rounded border border-borderPrimary px-4 py-2"
            type="time"
          />
        </div>
        <div>
          <label>
            {currentLanguage === "ar"
              ? "وقت الانتهاء"
              : currentLanguage === "fr"
                ? "Heure de fin"
                : "End Time"}
          </label>
          <input
            {...register("endTime", { required: true })}
            placeholder="HH:mm:ss"
            className="w-full rounded border border-borderPrimary px-4 py-2"
            type="time"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`rounded bg-blue-500 px-4 py-2 text-white ${isCreating ? "opacity-50" : ""}`}
            disabled={isCreating}
          >
            {isCreating
              ? currentLanguage === "ar"
                ? "جاري الإرسال..."
                : currentLanguage === "fr"
                  ? "Soumission en cours..."
                  : "Submitting..."
              : currentLanguage === "ar"
                ? "إرسال"
                : currentLanguage === "fr"
                  ? "Soumettre"
                  : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddSchedule;
