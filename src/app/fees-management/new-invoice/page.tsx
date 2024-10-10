"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Spinner from "@/components/spinner";
import { toast } from "react-toastify";
import { useCreateInvoicesMutation } from "@/features/Financial/feesApi";
import BreadCrumbs from "@/components/BreadCrumbs";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
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
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Financial Management",
      nameAr: "الإدارة المالية",
      nameFr: "Gestion financière",
      href: "/financial-management",
    },
    {
      nameEn: "Fees Management",
      nameAr: "إدارة المستندات",
      nameFr: "Gestion des documents",
      href: "/fees-management",
    },
    {
      nameEn: "Scholarship",
      nameAr: "منحة دراسية",
      nameFr: "Bourse d'étude",
      href: "/fees-management/scholarship",
    },
    {
      nameEn: "Add Invoices",
      nameAr: "إضافة الفواتير",
      nameFr: "Ajouter des factures",
      href: "/fees-management/new-invoice",
    },
  ];

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
        } mx-3 mt-[40px] grid h-[850px] items-center justify-center`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid items-center justify-center gap-5 rounded-xl bg-bgPrimary p-10 sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[1000px]">
            <div className="flex items-center justify-start gap-2">
              <svg
                className="h-6 w-6 font-bold text-secondary group-hover:text-primary"
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
                {currentLanguage === "en"
                  ? "Invoice Information"
                  : currentLanguage === "ar"
                    ? "معلومات الفاتورة"
                    : "Informations sur la facture"}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
              {/* Due Date Field */}
              {/* Due Date Field */}
              <label
                htmlFor="dueDate"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Due Date"
                  : currentLanguage === "ar"
                    ? "تاريخ الاستحقاق"
                    : "Date d'échéance"}
                <input
                  id="dueDate"
                  {...register("dueDate")}
                  type="date"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.dueDate && (
                  <span className="text-error">{errors.dueDate.message}</span>
                )}
              </label>

              {/* Paid Amount Field */}
              <label
                htmlFor="paidAmount"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Paid Amount"
                  : currentLanguage === "ar"
                    ? "المبلغ المدفوع"
                    : "Montant payé"}
                <input
                  id="paidAmount"
                  {...register("paidAmount")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.paidAmount && (
                  <span className="text-error">
                    {errors.paidAmount.message}
                  </span>
                )}
              </label>

              {/* Discount Amount Field */}
              <label
                htmlFor="discountAmount"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Discount Amount"
                  : currentLanguage === "ar"
                    ? "مقدار الخصم"
                    : "Montant de la réduction"}
                <input
                  id="discountAmount"
                  {...register("discountAmount")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.discountAmount && (
                  <span className="text-error">
                    {errors.discountAmount.message}
                  </span>
                )}
              </label>

              {/* Tax Amount Field */}
              <label
                htmlFor="taxAmount"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Tax Amount"
                  : currentLanguage === "ar"
                    ? "مقدار الضريبة"
                    : "Montant de la taxe"}
                <input
                  id="taxAmount"
                  {...register("taxAmount")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.taxAmount && (
                  <span className="text-error">{errors.taxAmount.message}</span>
                )}
              </label>

              {/* Billed To ID Field */}
              <label
                htmlFor="billedToId"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Billed To ID"
                  : currentLanguage === "ar"
                    ? "رقم الفاتورة إلى"
                    : "ID facturé à"}
                <input
                  id="billedToId"
                  {...register("billedToId", { valueAsNumber: true })}
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.billedToId && (
                  <span className="text-error">
                    {errors.billedToId.message}
                  </span>
                )}
              </label>

              {/* Discount Description (EN) Field */}
              <label
                htmlFor="discountDescription_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Discount Description (EN)"
                  : currentLanguage === "ar"
                    ? "وصف الخصم (EN)"
                    : "Description de la réduction (EN)"}
                <input
                  id="discountDescription_en"
                  {...register("discountDescription_en")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.discountDescription_en && (
                  <span className="text-error">
                    {errors.discountDescription_en.message}
                  </span>
                )}
              </label>

              {/* Tax Description (EN) Field */}
              {/* Tax Description (EN) Field */}
              <label
                htmlFor="taxDescription_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Tax Description (EN)"
                  : currentLanguage === "ar"
                    ? "وصف الضريبة (EN)"
                    : "Description de la taxe (EN)"}
                <input
                  id="taxDescription_en"
                  {...register("taxDescription_en")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.taxDescription_en && (
                  <span className="text-error">
                    {errors.taxDescription_en.message}
                  </span>
                )}
              </label>

              {/* Discount Description (AR) Field */}
              <label
                htmlFor="discountDescription_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Discount Description (AR)"
                  : currentLanguage === "ar"
                    ? "وصف الخصم (AR)"
                    : "Description de la réduction (AR)"}
                <input
                  id="discountDescription_ar"
                  {...register("discountDescription_ar")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.discountDescription_ar && (
                  <span className="text-error">
                    {errors.discountDescription_ar.message}
                  </span>
                )}
              </label>

              {/* Tax Description (AR) Field */}
              <label
                htmlFor="taxDescription_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Tax Description (AR)"
                  : currentLanguage === "ar"
                    ? "وصف الضريبة (AR)"
                    : "Description de la taxe (AR)"}
                <input
                  id="taxDescription_ar"
                  {...register("taxDescription_ar")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.taxDescription_ar && (
                  <span className="text-error">
                    {errors.taxDescription_ar.message}
                  </span>
                )}
              </label>

              {/* Discount Description (FR) Field */}
              <label
                htmlFor="discountDescription_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Discount Description (FR)"
                  : currentLanguage === "ar"
                    ? "وصف الخصم (FR)"
                    : "Description de la réduction (FR)"}
                <input
                  id="discountDescription_fr"
                  {...register("discountDescription_fr")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.discountDescription_fr && (
                  <span className="text-error">
                    {errors.discountDescription_fr.message}
                  </span>
                )}
              </label>

              {/* Tax Description (FR) Field */}
              <label
                htmlFor="taxDescription_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Tax Description (FR)"
                  : currentLanguage === "ar"
                    ? "وصف الضريبة (FR)"
                    : "Description de la taxe (FR)"}
                <input
                  id="taxDescription_fr"
                  {...register("taxDescription_fr")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.taxDescription_fr && (
                  <span className="text-error">
                    {errors.taxDescription_fr.message}
                  </span>
                )}
              </label>

              {/* Item Rate Field */}
              <label
                htmlFor="rate"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Item Rate"
                  : currentLanguage === "ar"
                    ? "سعر العنصر"
                    : "Tarif de l'article"}
                <input
                  id="rate"
                  {...register("invoiceItems.0.rate", { valueAsNumber: true })}
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.invoiceItems?.[0]?.rate && (
                  <span className="text-error">
                    {errors.invoiceItems[0].rate.message}
                  </span>
                )}
              </label>

              {/* Item Quantity Field */}
              <label
                htmlFor="qty"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Item Quantity"
                  : currentLanguage === "ar"
                    ? "كمية العنصر"
                    : "Quantité de l'article"}
                <input
                  id="qty"
                  {...register("invoiceItems.0.qty", { valueAsNumber: true })}
                  type="number"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.invoiceItems?.[0]?.qty && (
                  <span className="text-error">
                    {errors.invoiceItems[0].qty.message}
                  </span>
                )}
              </label>

              {/* Item Type Field */}
              <label
                htmlFor="type"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Item Type"
                  : currentLanguage === "ar"
                    ? "نوع العنصر"
                    : "Type d'article"}
                <input
                  id="type"
                  {...register("invoiceItems.0.type")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.invoiceItems?.[0]?.type &&
                  typeof errors.invoiceItems[0].type !== "string" && (
                    <span className="text-error">
                      {errors.invoiceItems[0].type.message}
                    </span>
                  )}
              </label>

              {/* Item Title (EN) Field */}
              <label
                htmlFor="title_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Item Title (EN)"
                  : currentLanguage === "ar"
                    ? "عنوان العنصر (EN)"
                    : "Titre de l'article (EN)"}
                <input
                  id="title_en"
                  {...register("invoiceItems.0.title_en")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.invoiceItems?.[0]?.title_en && (
                  <span className="text-error">
                    {errors.invoiceItems[0].title_en.message}
                  </span>
                )}
              </label>

              {/* Item Title (AR) Field */}
              <label
                htmlFor="title_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Item Title (AR)"
                  : currentLanguage === "ar"
                    ? "عنوان العنصر (AR)"
                    : "Titre de l'article (AR)"}
                <input
                  id="title_ar"
                  {...register("invoiceItems.0.title_ar")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.invoiceItems?.[0]?.title_ar && (
                  <span className="text-error">
                    {errors.invoiceItems[0].title_ar.message}
                  </span>
                )}
              </label>

              {/* Item Title (FR) Field */}
              <label
                htmlFor="title_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Item Title (FR)"
                  : currentLanguage === "ar"
                    ? "عنوان العنصر (FR)"
                    : "Titre de l'article (FR)"}
                <input
                  id="title_fr"
                  {...register("invoiceItems.0.title_fr")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.invoiceItems?.[0]?.title_fr && (
                  <span className="text-error">
                    {errors.invoiceItems[0].title_fr.message}
                  </span>
                )}
              </label>

              {/* Item Description (EN) Field */}
              <label
                htmlFor="description_en"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Item Description (EN)"
                  : currentLanguage === "ar"
                    ? "وصف العنصر (EN)"
                    : "Description de l'article (EN)"}
                <input
                  id="description_en"
                  {...register("invoiceItems.0.description_en")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.invoiceItems?.[0]?.description_en && (
                  <span className="text-error">
                    {errors.invoiceItems[0].description_en.message}
                  </span>
                )}
              </label>

              {/* Item Description (AR) Field */}
              <label
                htmlFor="description_ar"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Item Description (AR)"
                  : currentLanguage === "ar"
                    ? "وصف العنصر (AR)"
                    : "Description de l'article (AR)"}
                <input
                  id="description_ar"
                  {...register("invoiceItems.0.description_ar")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.invoiceItems?.[0]?.description_ar && (
                  <span className="text-error">
                    {errors.invoiceItems[0].description_ar.message}
                  </span>
                )}
              </label>

              {/* Item Description (FR) Field */}
              <label
                htmlFor="description_fr"
                className="grid font-sans text-[18px] font-semibold"
              >
                {currentLanguage === "en"
                  ? "Item Description (FR)"
                  : currentLanguage === "ar"
                    ? "وصف العنصر (FR)"
                    : "Description de l'article (FR)"}
                <input
                  id="description_fr"
                  {...register("invoiceItems.0.description_fr")}
                  type="text"
                  className="w-[400px] rounded-xl border border-borderPrimary px-4 py-3 outline-none max-[471px]:w-[350px]"
                />
                {errors.invoiceItems?.[0]?.description_fr && (
                  <span className="text-error">
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
                  className="w-fit rounded-xl bg-primary px-4 py-2 text-[18px] text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                >
                  {currentLanguage === "en"
                    ? "Add Invoice"
                    : currentLanguage === "ar"
                      ? "إضافة فاتورة"
                      : "Ajouter une facture"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewInvoice;
