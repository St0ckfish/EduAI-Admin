"use client";

import Modal from "@/components/model";
import Spinner from "@/components/spinner";
import Timeline from "@/components/timeLine";
import {
  useGetAllEventsQuery,
  useCreateEventsMutation,
} from "@/features/events/eventsApi";
import { RootState } from "@/GlobalRedux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const eventSchema = z.object({
  creatorId: z.string().optional(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  title_en: z.string().optional(),
  title_ar: z.string().optional(),
  title_fr: z.string().optional(),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
  description_fr: z.string().optional(),
  file: z.any().optional(), // Include file in schema to handle it
});

const Events = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data, error, isLoading, refetch } = useGetAllEventsQuery(null);
  const [createEvent] = useCreateEventsMutation();
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const onSubmit = async (formData: any) => {
    try {
      const formDataToSend = new FormData();
      // Create JSON object for request key
      const requestData = {
        creatorId: formData.creatorId,
        startTime: formData.startTime,
        endTime: formData.endTime,
        title_en: formData.title_en,
        title_ar: formData.title_ar,
        title_fr: formData.title_fr,
        description_en: formData.description_en,
        description_ar: formData.description_ar,
        description_fr: formData.description_fr,
      };
      toast.success("Event created success");
      // Append the JSON data as a string to FormData
      formDataToSend.append("request", JSON.stringify(requestData));

      // Append the file if it exists
      const file = formData.file?.[0];
      if (file) {
        formDataToSend.append("file", file); // Append the file correctly
      }

      const result = await createEvent(formDataToSend).unwrap();
      console.log("Event created:", result);
      handleCloseModal();
      refetch(); // Optionally refetch events
    } catch (error) {
      toast.error("Fiald Create Event");
      console.error("Failed to create event:", error);
    }
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
        className={` ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-7`}
      >
        <div className="flex justify-end">
          <button
            onClick={handleOpenModal}
            className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
          >
            + Add Event
          </button>
        </div>
        <Timeline meetings={data?.data.content} />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="mb-4 text-xl font-light">Create Event</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-5"
            encType="multipart/form-data"
          >
            {/* Creator ID */}
            <div className="mb-4">
              <input
                type="number"
                {...register("creatorId")}
                placeholder="Creator ID"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.creatorId && (
                <p className="text-red-500">
                  {errors.creatorId.message as string}
                </p>
              )}
            </div>

            {/* Start Time */}
            <div className="mb-4">
              <input
                type="datetime-local"
                {...register("startTime")}
                placeholder="Start Time"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.startTime && (
                <p className="text-red-500">
                  {errors.startTime.message as string}
                </p>
              )}
            </div>

            {/* End Time */}
            <div className="mb-4">
              <input
                type="datetime-local"
                {...register("endTime")}
                placeholder="End Time"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.endTime && (
                <p className="text-red-500">
                  {errors.endTime.message as string}
                </p>
              )}
            </div>

            {/* Title in English */}
            <div className="mb-4">
              <input
                type="text"
                {...register("title_en")}
                placeholder="Title (English)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title_en && (
                <p className="text-red-500">
                  {errors.title_en.message as string}
                </p>
              )}
            </div>

            {/* Title in Arabic */}
            <div className="mb-4">
              <input
                type="text"
                {...register("title_ar")}
                placeholder="Title (Arabic)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title_ar && (
                <p className="text-red-500">
                  {errors.title_ar.message as string}
                </p>
              )}
            </div>

            {/* Title in French */}
            <div className="mb-4">
              <input
                type="text"
                {...register("title_fr")}
                placeholder="Title (French)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title_fr && (
                <p className="text-red-500">
                  {errors.title_fr.message as string}
                </p>
              )}
            </div>

            {/* Description in English */}
            <div className="mb-4">
              <input
                {...register("description_en")}
                placeholder="Description (English)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description_en && (
                <p className="text-red-500">
                  {errors.description_en.message as string}
                </p>
              )}
            </div>

            {/* Description in Arabic */}
            <div className="mb-4">
              <input
                {...register("description_ar")}
                placeholder="Description (Arabic)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description_ar && (
                <p className="text-red-500">
                  {errors.description_ar.message as string}
                </p>
              )}
            </div>

            {/* Description in French */}
            <div className="mb-4">
              <input
                {...register("description_fr")}
                placeholder="Description (French)"
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description_fr && (
                <p className="text-red-500">
                  {errors.description_fr.message as string}
                </p>
              )}
            </div>

            {/* File Input */}
            <div className="mb-4">
              <input
                type="file"
                {...register("file")}
                className="w-full rounded-xl border border-[#436789] bg-[#ffffff] px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.file && (
                <p className="text-red-500">{errors.file.message as string}</p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
              >
                Add
              </button>
              <button
                onClick={handleCloseModal}
                className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-[#e44949] px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#af4747] hover:shadow-xl"
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

export default Events;
