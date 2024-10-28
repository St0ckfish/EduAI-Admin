"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useCreateSchedualMutation } from "@/features/Acadimic/scheduleApi";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import BreadCrumbs from "@/components/BreadCrumbs";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/spinner";
import { useGetAllClasssQuery } from "@/features/Infrastructure/classApi";
import { useGetAllTeachersQuery } from "@/features/User-Management/teacherApi";
import { useGetAllCoursesQuery } from "@/features/Acadimic/courseApi";
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
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const { register, handleSubmit, reset } = useForm();

  const [createSchedule, { isLoading: isCreating }] =
    useCreateSchedualMutation();
    const { data: classes, isLoading: isClassing } = useGetAllClasssQuery(null);
    const { data: teachers, isLoading: isTeacher } = useGetAllTeachersQuery({
      archived: "false",
      page: 0,
      size: 1000000,
    });
    const { data: courses, isLoading } = useGetAllCoursesQuery(null);
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
    } catch (error :any) {
      toast.error(`${error.data.message}`);
    }
  };
  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  if (loading || isClassing || isLoading)
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
        className={`${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[100px]"
              : "lg:mr-[270px]"
            : booleanValue
              ? "lg:ml-[100px]"
              : "lg:ml-[270px]"
        } mx-3 mt-5 space-y-4`}
      >
        <div>
          <label>
            {currentLanguage === "ar"
              ? "معرف الفصل"
              : currentLanguage === "fr"
                ? "ID de la classe"
                : "Classroom ID"}
          </label>
          <select
              id="classroomId"
              className="w-full rounded border border-borderPrimary px-4 py-2 bg-bgPrimary"
              {...register("classroomId", { required: true })}
            >
              <option value="">Select Class</option>
              {classes?.data.content.map((teacher: any) => (
                <option key={teacher.roomId} value={teacher.roomId}>
                  {teacher.classroomName}
                </option>
              ))}
            </select>
        </div>
        <div>
          <label>
            {currentLanguage === "ar"
              ? "معرف المعلم"
              : currentLanguage === "fr"
                ? "ID de l'enseignant"
                : "Teacher ID"}
          </label>
          <select
              id="teacherCourseRegistrationId"
              className="w-full rounded border border-borderPrimary px-4 py-2 bg-bgPrimary"
              {...register("teacherId", { required: true })}
            >
              <option value="">Select Teacher</option>
              {teachers?.data.content.map((teacher: any) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
        </div>
        <div>
          <label>
            {currentLanguage === "ar"
              ? "معرف الدورة"
              : currentLanguage === "fr"
                ? "ID du cours"
                : "Course ID"}
          </label>
          <select
             id="courseId" 
              className="w-full rounded border border-borderPrimary px-4 py-2  bg-bgPrimary"
              {...register("courseId", { required: true })}
            >
              <option value="">Select Course</option>
              {courses?.data.content.map((teacher: any) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
        </div>
        <div>
          <label>
            {currentLanguage === "ar"
              ? "اليوم"
              : currentLanguage === "fr"
                ? "Jour"
                : "Day"}
          </label>
          <select id="week" 
              className="w-full rounded border border-borderPrimary px-4 py-2  bg-bgPrimary" {...register("day", { required: true })}>
            <option value="">Select day</option>
            <option value="SUNDAY">Sunday</option>
            <option value="MONDAY">Monday</option>
            <option value="TUESDAY">Tuesday</option>
            <option value="WEDNESDAY">Wednesday</option>
            <option value="THURSDAY">Thursday</option>
            <option value="FRIDAY">Friday</option>
            <option value="SATURDAY">Saturday</option>
          </select>
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
            className="w-full rounded border border-borderPrimary px-4 py-2 bg-bgPrimary"
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
            className="w-full rounded border border-borderPrimary px-4 py-2  bg-bgPrimary"
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
