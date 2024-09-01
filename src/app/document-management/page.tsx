"use client"
import Card from "@/components/card";
/* eslint-disable @next/next/no-img-element */
import { RootState } from "@/GlobalRedux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const DocumentManagement = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const currentLanguage = useSelector((state: RootState) => state.language.language);

    const documents = [
        {
            href: "/document-management/certificate",
            imgSrc: "/images/certificate.png",
            title: currentLanguage === "en"
                ? "Certificate"
                : currentLanguage === "ar"
                ? "شهادة"
                : currentLanguage === "fr"
                ? "Certificat"
                : "Certificate", // Default to English
            description: currentLanguage === "en"
                ? "All certificates: Completion, Achievement, Participation, and Professional Development Certificates"
                : currentLanguage === "ar"
                ? "جميع الشهادات: إتمام، إنجاز، مشاركة، وشهادات التطوير المهني"
                : currentLanguage === "fr"
                ? "Tous les certificats : d'achèvement, d'accomplissement, de participation et de développement professionnel"
                : "All certificates: Completion, Achievement, Participation, and Professional Development Certificates", // Default to English
        },
        {
            href: "/document-management/transcript",
            imgSrc: "/images/file.png",
            title: currentLanguage === "en"
                ? "Transcripts"
                : currentLanguage === "ar"
                ? "السجلات الأكاديمية"
                : currentLanguage === "fr"
                ? "Relevés de notes"
                : "Transcripts", // Default to English
            description: currentLanguage === "en"
                ? "Some information about Course List, List of points and GPA"
                : currentLanguage === "ar"
                ? "بعض المعلومات حول قائمة الدورات، قائمة النقاط والمعدل التراكمي"
                : currentLanguage === "fr"
                ? "Quelques informations sur la liste des cours, la liste des points et le GPA"
                : "Some information about Course List, List of points and GPA", // Default to English
        },
        {
            href: "/document-management/enrollment",
            imgSrc: "/images/management.png",
            title: currentLanguage === "en"
                ? "Enrollment"
                : currentLanguage === "ar"
                ? "التسجيل"
                : currentLanguage === "fr"
                ? "Inscription"
                : "Enrollment", // Default to English
            description: currentLanguage === "en"
                ? "Some information about Admission Forms, Enrollment Status, and Enrollment Dates"
                : currentLanguage === "ar"
                ? "بعض المعلومات حول استمارات القبول، حالة التسجيل، وتواريخ التسجيل"
                : currentLanguage === "fr"
                ? "Quelques informations sur les formulaires d'admission, le statut d'inscription, et les dates d'inscription"
                : "Some information about Admission Forms, Enrollment Status, and Enrollment Dates", // Default to English
        },
        {
            href: "/document-management/attendance",
            imgSrc: "/images/user.png",
            title: currentLanguage === "en"
                ? "Attendance"
                : currentLanguage === "ar"
                ? "الحضور"
                : currentLanguage === "fr"
                ? "Présence"
                : "Attendance", // Default to English
            description: currentLanguage === "en"
                ? "Some Information about Absence Reports and Early Departure Records"
                : currentLanguage === "ar"
                ? "بعض المعلومات حول تقارير الغياب وسجلات المغادرة المبكرة"
                : currentLanguage === "fr"
                ? "Quelques informations sur les rapports d'absence et les enregistrements de départ anticipé"
                : "Some Information about Absence Reports and Early Departure Records", // Default to English
        },
        {
            href: "/document-management/other",
            imgSrc: "/images/other.png",
            title: currentLanguage === "en"
                ? "Other Official Documents"
                : currentLanguage === "ar"
                ? "وثائق رسمية أخرى"
                : currentLanguage === "fr"
                ? "Autres documents officiels"
                : "Other Official Documents", // Default to English
            description: currentLanguage === "en"
                ? "Some information about ID Cards, Medical Records, Disciplinary Records, Financial Aid Documents, Legal Documents"
                : currentLanguage === "ar"
                ? "بعض المعلومات حول بطاقات الهوية، السجلات الطبية، السجلات التأديبية، وثائق المساعدة المالية، الوثائق القانونية"
                : currentLanguage === "fr"
                ? "Quelques informations sur les cartes d'identité, les dossiers médicaux, les dossiers disciplinaires, les documents d'aide financière, les documents légaux"
                : "Some information about ID Cards, Medical Records, Disciplinary Records, Financial Aid Documents, Legal Documents", // Default to English
        },
    ];
    return (
        <>
            <div className={`flex items-center gap-1 ${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 ml-7 flex-wrap`}>
            <Link className="text-[#526484] hover:text-blue-400 hover:underline font-semibold" href="/">
      {currentLanguage === "en"
        ? "Administration"
        : currentLanguage === "ar"
        ? "الإدارة"
        : currentLanguage === "fr"
        ? "Administration"
        : "Administration"} {/* Default to English */}
    </Link>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(82, 100, 132, 1)' }}>
      <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
    </svg>
    <Link className="text-[#526484] hover:text-blue-400 hover:underline font-semibold" href="/document-management">
      {currentLanguage === "en"
        ? "Document Management"
        : currentLanguage === "ar"
        ? "إدارة الوثائق"
        : currentLanguage === "fr"
        ? "Gestion des documents"
        : "Document Management"} {/* Default to English */}
    </Link>
            </div>
            <div className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[290px]"} mt-12 grid justify-center `}>

                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 max-[577px]:grid-cols-1 gap-5">
                {documents.map((item, index) => (
                        <Card
                            key={index}
                            href={item.href}
                            imgSrc={item.imgSrc}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>

            </div>
        </>
    );
}

export default DocumentManagement;