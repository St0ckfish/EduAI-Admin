"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import BreadCrumbs from "@/components/BreadCrumbs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetSchedualByIdQuery, useUpdateSchedualMutation } from "@/features/Acadimic/scheduleApi";

type Props = {
  params: {
    eventId: number;
  };
};

const UpdateEvent = ({ params }: Props) => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Events",
      nameAr: "الاحداث",
      nameFr: "événements",
      href: "/educational-affairs/schedule",
    },
    {
      nameEn: `Update Event`,
      nameAr: `événement de mise à jour`,
      nameFr: `تعديل حدث`,
      href: `/educational-affairs/schedule/${params.eventId}`,
    },
  ];

  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  // Define the validation schema
  const schema = z
    .object({
      startTime: z.string().nonempty({ message: "This field is required" }),
      endTime: z.string().nonempty({ message: "This field is required" }),
      day: z.string().nonempty({ message: "This field is required" }),
    })
    .refine(data => new Date(data.startTime) <= new Date(data.endTime), {
      message: "Start Time must be before End Time",
      path: ["startTime"],
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [updateEvent, { isLoading }] = useUpdateSchedualMutation();
  const { data: eventData, isLoading: isEventLoading } = useGetSchedualByIdQuery(
    params.eventId,
  );

  useEffect(() => {
    if (eventData && eventData.data) {
      reset({
        startTime: eventData.data.startDate,
        endTime: eventData.data.endDate,
      });
    }
  }, [eventData, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateEvent({ id: params.eventId, formData: data }).unwrap();
      toast.success("Event updated successfully");
    } catch (err) {
      toast.error("Failed to update event");
    }
  };

  // Function to get error message based on current language
  const getErrorMessage = (message: string) => {
    switch (message) {
      case "This field is required":
        return currentLanguage === "en"
          ? "This field is required"
          : currentLanguage === "ar"
            ? "هذا الحقل مطلوب"
            : currentLanguage === "fr"
              ? "Ce champ est requis"
              : "This field is required";
      case "Start Time must be before End Time":
        return currentLanguage === "en"
          ? "Start Time must be before End Time"
          : currentLanguage === "ar"
            ? "وقت البدء يجب أن يكون قبل وقت الانتهاء"
            : currentLanguage === "fr"
              ? "L'heure de début doit être avant l'heure de fin"
              : "Start Time must be before End Time";
      default:
        return message;
    }
  };

  if (loading || isEventLoading)
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
        } mx-[5px] mt-[40px] grid h-[500px] items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid h-auto items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:h-auto xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <h1 className="font-sans text-[22px] font-semibold">
                {currentLanguage === "en"
                  ? "Event Information"
                  : currentLanguage === "ar"
                    ? "معلومات الحدث"
                    : currentLanguage === "fr"
                      ? "Informations sur l'événement"
                      : "Event Information"}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <div>
          <label>
            {currentLanguage === "ar"
              ? "اليوم"
              : currentLanguage === "fr"
                ? "Jour"
                : "Day"}
          </label>
          <select
            id="day"
            className="w-full rounded border border-borderPrimary bg-bgPrimary px-4 py-2"
            {...register("day")}
          >
            <option value="">
              {currentLanguage === "ar"
                ? "اختر اليوم"
                : currentLanguage === "fr"
                  ? "Sélectionner le jour"
                  : "Select Day"}
            </option>
            <option value="SUNDAY">
              {currentLanguage === "ar"
                ? "الأحد"
                : currentLanguage === "fr"
                  ? "Dimanche"
                  : "Sunday"}
            </option>
            <option value="MONDAY">
              {currentLanguage === "ar"
                ? "الإثنين"
                : currentLanguage === "fr"
                  ? "Lundi"
                  : "Monday"}
            </option>
            <option value="TUESDAY">
              {currentLanguage === "ar"
                ? "الثلاثاء"
                : currentLanguage === "fr"
                  ? "Mardi"
                  : "Tuesday"}
            </option>
            <option value="WEDNESDAY">
              {currentLanguage === "ar"
                ? "الأربعاء"
                : currentLanguage === "fr"
                  ? "Mercredi"
                  : "Wednesday"}
            </option>
            <option value="THURSDAY">
              {currentLanguage === "ar"
                ? "الخميس"
                : currentLanguage === "fr"
                  ? "Jeudi"
                  : "Thursday"}
            </option>
            <option value="FRIDAY">
              {currentLanguage === "ar"
                ? "الجمعة"
                : currentLanguage === "fr"
                  ? "Vendredi"
                  : "Friday"}
            </option>
            <option value="SATURDAY">
              {currentLanguage === "ar"
                ? "السبت"
                : currentLanguage === "fr"
                  ? "Samedi"
                  : "Saturday"}
            </option>
          </select>
          {errors.day && (
            <p className="text-red-500">{errors.day.message?.toString()}</p>
          )}
        </div>
              {/* Title French */}
             
              {/* Start Time */}
              <label
                htmlFor="startTime"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Start Time"
                  : currentLanguage === "ar"
                    ? "وقت البدء"
                    : currentLanguage === "fr"
                      ? "Heure de début"
                      : "Start Time"}
                <input
                  id="startTime"
                  {...register("startTime")}
                  type="datetime-local"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.startTime && (
                  <span className="text-error">
                    {getErrorMessage(errors.startTime.message || "")}
                  </span>
                )}
              </label>
              {/* End Time */}
              <label
                htmlFor="endTime"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "End Time"
                  : currentLanguage === "ar"
                    ? "وقت الانتهاء"
                    : currentLanguage === "fr"
                      ? "Heure de fin"
                      : "End Time"}
                <input
                  id="endTime"
                  {...register("endTime")}
                  type="datetime-local"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.endTime && (
                  <span className="text-error">
                    {getErrorMessage(errors.endTime.message || "")}
                  </span>
                )}
              </label>
              {/* Active */}
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
                    ? "Update Event"
                    : currentLanguage === "ar"
                      ? "تحديث الحدث"
                      : currentLanguage === "fr"
                        ? "Mettre à jour l'événement"
                        : "Update Event"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateEvent;
