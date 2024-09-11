import Soon from "@/components/soon";
import BreadCrumbs from "@/components/BreadCrumbs";

const Enrollment = () => {
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
      nameEn: "Enrollment",
      nameAr: "التسجيل",
      nameFr: "Inscription",
      href: "/document-management/enrollment",
    },
  ];
  return (
    <>
      <Soon />

      <BreadCrumbs breadcrumbs={breadcrumbs} />
    </>
  );
};

export default Enrollment;
