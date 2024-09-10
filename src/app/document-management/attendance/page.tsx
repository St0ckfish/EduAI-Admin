import Soon from "@/components/soon";
import BreadCrumbs from "@/components/BreadCrumbs";

const Attendance = () => {
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
      nameEn: "Attendance",
      nameAr: "الحضور",
      nameFr: "Présence",
      href: "/document-management/attendance",
    },
  ];

  return (
    <>
      <Soon />
      <BreadCrumbs breadcrumbs={breadcrumbs} />
    </>
  );
};

export default Attendance;
