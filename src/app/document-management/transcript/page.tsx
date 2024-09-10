import Soon from "@/components/soon";
import BreadCrumbs from "@/components/BreadCrumbs";

const Transcript = () => {
  const breadcrumbs = [
    {
      nameEn: "Administration",
      nameAr: "الإدارة",
      nameFr: "Administration",
      href: "/",
    },
    {
      nameEn: "Document Management",
      nameAr: "إدارة المستندات",
      nameFr: "Gestion des documents",
      href: "/document-management",
    },
    {
      nameEn: "Transcript",
      nameAr: "سجل الدرجات",
      nameFr: "Relevé de notes",
      href: "/document-management/transcript",
    },
  ];
  return (
    <>
      <Soon />

      <BreadCrumbs breadcrumbs={breadcrumbs} />

    </>
  );
};

export default Transcript;
