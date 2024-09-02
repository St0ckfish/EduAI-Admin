"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Spinner from "@/components/spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { useCreateInvoicesMutation } from "@/features/Financial/feesApi";

// Define a Zod schema that matches your API's expected data structure
const invoiceSchema = z.object({
  dueDate: z.string().nonempty("Due date is required"),
  paidAmount: z.string().regex(/^\d+$/, "Paid amount must be a number"),
  discountAmount: z.string().regex(/^\d+$/, "Discount amount must be a number"),
  taxAmount: z.string().regex(/^\d+$/, "Tax amount must be a number"),
  billedToId: z
    .number()
    .int()
    .positive("Billed To ID must be a positive number"),
  discountDescription_en: z
    .string()
    .nonempty("Discount description (EN) is required"),
  taxDescription_en: z.string().nonempty("Tax description (EN) is required"),
  discountDescription_ar: z
    .string()
    .nonempty("Discount description (AR) is required"),
  taxDescription_ar: z.string().nonempty("Tax description (AR) is required"),
  discountDescription_fr: z
    .string()
    .nonempty("Discount description (FR) is required"),
  taxDescription_fr: z.string().nonempty("Tax description (FR) is required"),
  invoiceItems: z.array(
    z.object({
      rate: z.number().nonnegative("Rate must be a non-negative number"),
      qty: z.number().nonnegative("Quantity must be a non-negative number"),
      type: z.string().nonempty("Type is required"),
      title_en: z.string().nonempty("Title (EN) is required"),
      title_ar: z.string().nonempty("Title (AR) is required"),
      title_fr: z.string().nonempty("Title (FR) is required"),
      description_en: z.string().nonempty("Description (EN) is required"),
      description_ar: z.string().nonempty("Description (AR) is required"),
      description_fr: z.string().nonempty("Description (FR) is required"),
    }),
  ),
});

const NewInvoice = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      dueDate: "",
      paidAmount: "0",
      discountAmount: "0",
      taxAmount: "1",
      billedToId: 26, // Example default value
      discountDescription_en: "Discount",
      taxDescription_en: "Tax",
      discountDescription_ar: "Discount",
      taxDescription_ar: "Tax",
      discountDescription_fr: "Discount",
      taxDescription_fr: "Tax",
      invoiceItems: [
        {
          rate: 10, // Example default value
          qty: 2, // Example default value
          type: "UNIFORM", // Example default value
          title_en: "Uniform",
          title_ar: "Uniform",
          title_fr: "Uniform",
          description_en: "Uniform",
          description_ar: "Uniform",
          description_fr: "Uniform",
        },
      ],
    },
  });

  const [createInvoice, { isLoading }] = useCreateInvoicesMutation();

  const onSubmit = async (data: any) => {
    try {
      await createInvoice(data).unwrap();
      toast.success("Invoice created successfully");
    } catch (err) {
      toast.error("Failed to create invoice");
    }
  };

  return (
    <div className="mr-[5px] grid h-[850px] items-center justify-center lg:ml-[270px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid items-center justify-center gap-5 rounded-xl bg-white p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
          <div className="flex items-center justify-start gap-2">
            <svg
              className="h-6 w-6 font-bold text-[#526484] group-hover:text-[#3e5af0]"
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
            <h1 className="font-sans text-[22px] font-semibold">
              Invoice Information
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
            {/* Due Date Field */}
            <label
              htmlFor="dueDate"
              className="grid font-sans text-[18px] font-semibold"
            >
              Due Date
              <input
                id="dueDate"
                {...register("dueDate")}
                type="date"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.dueDate && (
                <span className="text-red-600">{errors.dueDate.message}</span>
              )}
            </label>

            {/* Paid Amount Field */}
            <label
              htmlFor="paidAmount"
              className="grid font-sans text-[18px] font-semibold"
            >
              Paid Amount
              <input
                id="paidAmount"
                {...register("paidAmount")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.paidAmount && (
                <span className="text-red-600">
                  {errors.paidAmount.message}
                </span>
              )}
            </label>

            {/* Discount Amount Field */}
            <label
              htmlFor="discountAmount"
              className="grid font-sans text-[18px] font-semibold"
            >
              Discount Amount
              <input
                id="discountAmount"
                {...register("discountAmount")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.discountAmount && (
                <span className="text-red-600">
                  {errors.discountAmount.message}
                </span>
              )}
            </label>

            {/* Tax Amount Field */}
            <label
              htmlFor="taxAmount"
              className="grid font-sans text-[18px] font-semibold"
            >
              Tax Amount
              <input
                id="taxAmount"
                {...register("taxAmount")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.taxAmount && (
                <span className="text-red-600">{errors.taxAmount.message}</span>
              )}
            </label>

            {/* Billed To ID Field */}
            <label
              htmlFor="billedToId"
              className="grid font-sans text-[18px] font-semibold"
            >
              Billed To ID
              <input
                id="billedToId"
                {...register("billedToId", { valueAsNumber: true })}
                type="number"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.billedToId && (
                <span className="text-red-600">
                  {errors.billedToId.message}
                </span>
              )}
            </label>

            {/* Discount Description (EN) Field */}
            <label
              htmlFor="discountDescription_en"
              className="grid font-sans text-[18px] font-semibold"
            >
              Discount Description (EN)
              <input
                id="discountDescription_en"
                {...register("discountDescription_en")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.discountDescription_en && (
                <span className="text-red-600">
                  {errors.discountDescription_en.message}
                </span>
              )}
            </label>

            {/* Tax Description (EN) Field */}
            <label
              htmlFor="taxDescription_en"
              className="grid font-sans text-[18px] font-semibold"
            >
              Tax Description (EN)
              <input
                id="taxDescription_en"
                {...register("taxDescription_en")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.taxDescription_en && (
                <span className="text-red-600">
                  {errors.taxDescription_en.message}
                </span>
              )}
            </label>

            {/* Discount Description (AR) Field */}
            <label
              htmlFor="discountDescription_ar"
              className="grid font-sans text-[18px] font-semibold"
            >
              Discount Description (AR)
              <input
                id="discountDescription_ar"
                {...register("discountDescription_ar")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.discountDescription_ar && (
                <span className="text-red-600">
                  {errors.discountDescription_ar.message}
                </span>
              )}
            </label>

            {/* Tax Description (AR) Field */}
            <label
              htmlFor="taxDescription_ar"
              className="grid font-sans text-[18px] font-semibold"
            >
              Tax Description (AR)
              <input
                id="taxDescription_ar"
                {...register("taxDescription_ar")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.taxDescription_ar && (
                <span className="text-red-600">
                  {errors.taxDescription_ar.message}
                </span>
              )}
            </label>

            {/* Discount Description (FR) Field */}
            <label
              htmlFor="discountDescription_fr"
              className="grid font-sans text-[18px] font-semibold"
            >
              Discount Description (FR)
              <input
                id="discountDescription_fr"
                {...register("discountDescription_fr")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.discountDescription_fr && (
                <span className="text-red-600">
                  {errors.discountDescription_fr.message}
                </span>
              )}
            </label>

            {/* Tax Description (FR) Field */}
            <label
              htmlFor="taxDescription_fr"
              className="grid font-sans text-[18px] font-semibold"
            >
              Tax Description (FR)
              <input
                id="taxDescription_fr"
                {...register("taxDescription_fr")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.taxDescription_fr && (
                <span className="text-red-600">
                  {errors.taxDescription_fr.message}
                </span>
              )}
            </label>

            {/* Invoice Items - assuming a single item for simplicity */}
            <label
              htmlFor="rate"
              className="grid font-sans text-[18px] font-semibold"
            >
              Item Rate
              <input
                id="rate"
                {...register("invoiceItems.0.rate", { valueAsNumber: true })}
                type="number"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.invoiceItems?.[0]?.rate && (
                <span className="text-red-600">
                  {errors.invoiceItems[0].rate.message}
                </span>
              )}
            </label>

            <label
              htmlFor="qty"
              className="grid font-sans text-[18px] font-semibold"
            >
              Item Quantity
              <input
                id="qty"
                {...register("invoiceItems.0.qty", { valueAsNumber: true })}
                type="number"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.invoiceItems?.[0]?.qty && (
                <span className="text-red-600">
                  {errors.invoiceItems[0].qty.message}
                </span>
              )}
            </label>

            <label
              htmlFor="type"
              className="grid font-sans text-[18px] font-semibold"
            >
              Item Type
              <input
                id="type"
                {...register("invoiceItems.0.type")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.invoiceItems?.[0]?.type &&
                typeof errors.invoiceItems[0].type !== "string" && (
                  <span className="text-red-600">
                    {errors.invoiceItems[0].type.message}
                  </span>
                )}
            </label>

            <label
              htmlFor="title_en"
              className="grid font-sans text-[18px] font-semibold"
            >
              Item Title (EN)
              <input
                id="title_en"
                {...register("invoiceItems.0.title_en")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.invoiceItems?.[0]?.title_en && (
                <span className="text-red-600">
                  {errors.invoiceItems[0].title_en.message}
                </span>
              )}
            </label>

            <label
              htmlFor="title_ar"
              className="grid font-sans text-[18px] font-semibold"
            >
              Item Title (AR)
              <input
                id="title_ar"
                {...register("invoiceItems.0.title_ar")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.invoiceItems?.[0]?.title_ar && (
                <span className="text-red-600">
                  {errors.invoiceItems[0].title_ar.message}
                </span>
              )}
            </label>

            <label
              htmlFor="title_fr"
              className="grid font-sans text-[18px] font-semibold"
            >
              Item Title (FR)
              <input
                id="title_fr"
                {...register("invoiceItems.0.title_fr")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.invoiceItems?.[0]?.title_fr && (
                <span className="text-red-600">
                  {errors.invoiceItems[0].title_fr.message}
                </span>
              )}
            </label>

            <label
              htmlFor="description_en"
              className="grid font-sans text-[18px] font-semibold"
            >
              Item Description (EN)
              <input
                id="description_en"
                {...register("invoiceItems.0.description_en")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.invoiceItems?.[0]?.description_en && (
                <span className="text-red-600">
                  {errors.invoiceItems[0].description_en.message}
                </span>
              )}
            </label>

            <label
              htmlFor="description_ar"
              className="grid font-sans text-[18px] font-semibold"
            >
              Item Description (AR)
              <input
                id="description_ar"
                {...register("invoiceItems.0.description_ar")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.invoiceItems?.[0]?.description_ar && (
                <span className="text-red-600">
                  {errors.invoiceItems[0].description_ar.message}
                </span>
              )}
            </label>

            <label
              htmlFor="description_fr"
              className="grid font-sans text-[18px] font-semibold"
            >
              Item Description (FR)
              <input
                id="description_fr"
                {...register("invoiceItems.0.description_fr")}
                type="text"
                className="w-[400px] rounded-xl border border-zinc-300 px-4 py-3 outline-none max-[471px]:w-[350px]"
              />
              {errors.invoiceItems?.[0]?.description_fr && (
                <span className="text-red-600">
                  {errors.invoiceItems[0].description_fr.message}
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
                className="w-[140px] rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl"
              >
                Add Invoice
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewInvoice;
