"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import Spinner from "@/components/spinner";
import { useGetInvoiceByIdQuery } from "@/features/Financial/feesApi";
import { RootState } from "@/GlobalRedux/store";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useSelector } from "react-redux";

interface ViewInvoiceProps {
  params: {
    invoiceId: string;
  };
}
const ViewInvoice: React.FC<ViewInvoiceProps> = ({ params }) => {
  const formatTransactionDate = (dateString: string): string => {
    if (!dateString) return "No Date";
    const formatter = new Intl.DateTimeFormat("en-EG", {
      timeZone: "Asia/Riyadh",
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      hour12: true,
    });
    return formatter.format(new Date(dateString));
  };

  const { theme } = useTheme();
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Fees Management",
      nameAr: "إدارة المستندات",
      nameFr: "Gestion des documents",
      href: "/fees-management",
    },
    {
      nameEn: `${params.invoiceId}`,
      nameAr: `${params.invoiceId}`,
      nameFr: `${params.invoiceId}`,
      href: `/fees-management/${params.invoiceId}`,
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data, isLoading: isItemsLoading } = useGetInvoiceByIdQuery(
    params.invoiceId,
  );

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );
  if (loading || isItemsLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div>
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
        } mt-4 rounded-xl bg-bgPrimary px-8 py-4`}
      >
        <div className="flex w-full justify-between">
          <Image
            src="/images/logo.png"
            width={150}
            height={150}
            alt="logo"
          ></Image>
          <button className="flex items-center gap-1 rounded-lg border border-borderPrimary px-2 py-1 text-primary">
            <svg
              className="h-6 w-6 text-primary"
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
              <line x1="12" y1="5" x2="12" y2="19" />{" "}
              <line x1="16" y1="15" x2="12" y2="19" />{" "}
              <line x1="8" y1="15" x2="12" y2="19" />
            </svg>
            Export
          </button>
        </div>
        <div className="flex justify-between mt-10 max-[1235px]:grid">
          <div className="grid gap-2">
            <h1 className="font-semibold text-secondary text-[20px] flex gap-1 items-center">Billed To: <p className={`text-[17px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{data.data.studentBasicInfo.name}</p></h1>
            <h1 className="font-semibold text-secondary text-[20px] flex gap-1 items-center">ID: <p className={`text-[17px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{data.data.studentBasicInfo.id}</p></h1>
            <h1 className="font-semibold text-secondary text-[20px] flex gap-1 items-center">Email: <p className={`text-[17px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{data.data.studentBasicInfo.email}</p></h1>
            <h1 className="font-semibold text-secondary text-[20px] flex gap-1 items-center">Phone: <p className={`text-[17px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{data.data.studentBasicInfo.phone == null ? "_" : data.data.studentBasicInfo.phone}</p></h1>
          </div>
          <div className="grid gap-2">
            <h1 className="font-semibold text-secondary text-[20px] flex gap-1 items-center">Ivoice Date: <p className={`text-[17px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{formatTransactionDate(data.data.creationDate)}</p></h1>
            <h1 className="font-semibold text-secondary text-[20px] flex gap-1 items-center">Due Date: <p className={`text-[17px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{formatTransactionDate(data.data.dueDate)}</p></h1>
            <h1 className="font-semibold text-secondary text-[20px] flex gap-1 items-center">Status: <p className={`text-[17px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{data.data.paymentStatus.toLowerCase().split("_").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</p></h1>
          </div>
          <div className="grid gap-2">
            <h1 className="font-semibold text-secondary text-[20px] flex gap-1 items-center">Total Amount: <p className={`text-[17px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{data.data.totalAmount}</p></h1>
          </div>
        </div>
        <div className="grid gap-2 mt-10">
          <h1 className="font-semibold text-secondary text-[25px]">Line Item</h1>
          <div className="relative overflow-auto sm:rounded-lg">
          <table className="w-full overflow-x-auto text-left text-sm text-gray-500 rtl:text-right">
            <thead className="bg-thead text-xs uppercase text-textPrimary">
              <tr>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "بند السطر"
                    : currentLanguage === "fr"
                    ? "Ligne d'article"
                      : "Line Item"}
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "المعدل"
                    : currentLanguage === "fr"
                    ? "taux"
                    : "rate"}
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "الكمية"
                    : currentLanguage === "fr"
                    ? "Quantité"
                    : "Qty"}
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  {currentLanguage === "ar"
                    ? "النوع"
                    : currentLanguage === "fr"
                    ? "taper"
                    : "type"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-borderPrimary bg-bgPrimary hover:bg-bgSecondary">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-textSecondary"
                >
                  {data.data.invoiceItem.id}
                </th>
                <td className="whitespace-nowrap px-6 py-4">{data.data.invoiceItem.rate}</td>
                <td className="whitespace-nowrap px-6 py-4">{data.data.invoiceItem.qty}</td>
                <td className="whitespace-nowrap px-6 py-4">{data.data.invoiceItem.type}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        <div className="flex w-full justify-end">
          <div className="grid mt-14 rounded-xl border border-borderPrimary p-3">
            <p className="font-semibold text-secondary border-b border-borderPrimary text-[18px] flex gap-1 items-center">Paid Amount: <p className={`text-[18px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{data.data.paidAmount}</p></p>
            <p className="font-semibold text-secondary border-b border-borderPrimary text-[18px] flex gap-1 items-center">Discount Amount: <p className={`text-[18px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{data.data.discountAmount}</p></p>
            <p className="font-semibold text-secondary border-b border-borderPrimary text-[18px] flex gap-1 items-center">Tax Amount: <p className={`text-[18px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{data.data.taxAmount}</p></p>
            <p className="font-semibold text-secondary text-[18px] flex gap-1 items-center">Due Amount: <p className={`text-[18px] ${theme == "dark" ? "text-white" :"text-black"} text-black`}>{data.data.dueAmount}</p></p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoice;
