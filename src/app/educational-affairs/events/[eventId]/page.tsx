"use client"
import { useGetEventByIdQuery, useUpdateEventsMutation } from "@/features/events/eventsApi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import BreadCrumbs from "@/components/BreadCrumbs";

type Props = {
 params:{
  eventId: number;
 }
}
const UpdateEvent = ({params}: Props) => {
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
      href: "/educational-affairs/events",
    },
    {
      nameEn: `${params.eventId}`,
      nameAr: `${params.eventId}`,
      nameFr: `${params.eventId}`,
      href: `/educational-affairs/events/${params.eventId}`,
    },
  ];

  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [updateEvent, { isLoading }] = useUpdateEventsMutation();
  const { data: eventData, isLoading: isEventLoading } = useGetEventByIdQuery(params.eventId);

  useEffect(() => {
    if (eventData && eventData.data) {
      reset({
        title_en: eventData.data.title,
        title_ar: eventData.data.title,
        title_fr: eventData.data.title,
        description_en: eventData.data.description,
        description_ar: eventData.data.description,
        description_fr: eventData.data.description,
        startTime: eventData.data.startDate,
        endTime: eventData.data.endDate,
        active: eventData.data.isAttendee ? 1 : 0,
      });
    }
  }, [eventData, reset]);

  const onSubmit = async (data: any) => {
    try {
      await updateEvent({ id: params.eventId, formData: data }).unwrap();
      toast.success("Event updated successfully");
    } catch (err) {
      toast.error("Failed to update event");
    }
  };

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

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
                      : "Event Information"} {/* default */}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              <label
                htmlFor="title_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Event Title (English)"
                  : currentLanguage === "ar"
                    ? "عنوان الحدث (بالإنجليزية)"
                    : currentLanguage === "fr"
                      ? "Titre de l'événement (Anglais)"
                      : "Event Title (English)"} {/* default */}
                <input
                  id="title_en"
                  {...register("title_en", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.title_en && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"} {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="title_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Event Title (Arabic)"
                  : currentLanguage === "ar"
                    ? "عنوان الحدث (بالعربية)"
                    : currentLanguage === "fr"
                      ? "Titre de l'événement (Arabe)"
                      : "Event Title (Arabic)"} {/* default */}
                <input
                  id="title_ar"
                  {...register("title_ar", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.title_ar && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"} {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="title_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Event Title (French)"
                  : currentLanguage === "ar"
                    ? "عنوان الحدث (بالفرنسية)"
                    : currentLanguage === "fr"
                      ? "Titre de l'événement (Français)"
                      : "Event Title (French)"} {/* default */}
                <input
                  id="title_fr"
                  {...register("title_fr", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.title_fr && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"} {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="description_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Event Description (English)"
                  : currentLanguage === "ar"
                    ? "وصف الحدث (بالإنجليزية)"
                    : currentLanguage === "fr"
                      ? "Description de l'événement (Anglais)"
                      : "Event Description (English)"} {/* default */}
                <input
                  id="description_en"
                  {...register("description_en", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.description_en && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"} {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="description_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Event Description (Arabic)"
                  : currentLanguage === "ar"
                    ? "وصف الحدث (بالعربية)"
                    : currentLanguage === "fr"
                      ? "Description de l'événement (Arabe)"
                      : "Event Description (Arabic)"} {/* default */}
                <input
                  id="description_ar"
                  {...register("description_ar", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.description_ar && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"} {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="description_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Event Description (French)"
                  : currentLanguage === "ar"
                    ? "وصف الحدث (بالفرنسية)"
                    : currentLanguage === "fr"
                      ? "Description de l'événement (Français)"
                      : "Event Description (French)"} {/* default */}
                <input
                  id="description_fr"
                  {...register("description_fr", { required: true })}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.description_fr && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"} {/* default */}
                  </span>
                )}
              </label>
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
                      : "Start Time"} {/* default */}
                <input
                  id="startTime"
                  {...register("startTime", { required: true })}
                  type="datetime-local"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.startTime && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"} {/* default */}
                  </span>
                )}
              </label>
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
                      : "End Time"} {/* default */}
                <input
                  id="endTime"
                  {...register("endTime", { required: true })}
                  type="datetime-local"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.endTime && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"} {/* default */}
                  </span>
                )}
              </label>
              <label
                htmlFor="active"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Active"
                  : currentLanguage === "ar"
                    ? "نشط"
                    : currentLanguage === "fr"
                      ? "Actif"
                      : "Active"} {/* default */}
                <select
                  id="active"
                  {...register("active", { required: true })}
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                >
                  <option value={1}>{currentLanguage === "en" ? "Yes" : currentLanguage === "ar" ? "نعم" : currentLanguage === "fr" ? "Oui" : "Yes"}</option>
                  <option value={0}>{currentLanguage === "en" ? "No" : currentLanguage === "ar" ? "لا" : currentLanguage === "fr" ? "Non" : "No"}</option>
                </select>
                {errors.active && (
                  <span className="text-error">
                    {currentLanguage === "en"
                      ? "This field is required"
                      : currentLanguage === "ar"
                        ? "هذا الحقل مطلوب"
                        : currentLanguage === "fr"
                          ? "Ce champ est requis"
                          : "This field is required"} {/* default */}
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
                    ? "Update Event"
                    : currentLanguage === "ar"
                      ? "تحديث الحدث"
                      : currentLanguage === "fr"
                        ? "Mettre à jour l'événement"
                        : "Update Event"} {/* default */}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateEvent;
