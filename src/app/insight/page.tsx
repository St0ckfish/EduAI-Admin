"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  Tooltip,
  Legend,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import BreadCrumbs from "@/components/BreadCrumbs";
import Spinner from "@/components/spinner";
import { useAverageGradesAtSchoolQuery, useAverageAttendanceQuery } from "@/features/Acadimic/scheduleApi";

const chartConfig = {
  desktop: { label: "My school", color: "#e23670" },
  mobile: { label: "Another school", color: "#2560d4" },
};

const chartConfig2 = {
  desktop: { label: "Desktop", color: "#e23670" },
  mobile: { label: "Mobile", color: "#2560d4" },
};

function InsightPage() {
  const {data, isLoading} = useAverageGradesAtSchoolQuery(null);
  const {data: averageAttendance, isLoading: isAverage} = useAverageAttendanceQuery(null);
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

  const chartData = [
    {
      month: `${currentLanguage === "ar" ? "المدرسة الابتدائية" : currentLanguage === "fr" ? "École primaire" : "Primary school"}`,
      desktop: 186,
      mobile: 80,
    },
    {
      month: `${currentLanguage === "ar" ? "الثانوي الإعدادي" : currentLanguage === "fr" ? "Collège" : "Preparatory"}`,
      desktop: 305,
      mobile: 200,
    },
    {
      month: `${currentLanguage === "ar" ? "الثانوي التأهيلي" : currentLanguage === "fr" ? "Lycée" : "high school"}`,
      desktop: 237,
      mobile: 120,
    },
  ];

  // Transform averageAttendance data for the chart
  const transformedAttendanceData = averageAttendance ? Object.keys(averageAttendance[0].MonthsAttendance).map(month => ({
    month,
    KINDERGARTEN: averageAttendance[0].MonthsAttendance[month],
    PRIMARY: averageAttendance[1].MonthsAttendance[month],
    PREPARATORY: averageAttendance[2].MonthsAttendance[month],
    SECONDARY: averageAttendance[3].MonthsAttendance[month],
  })) : [];

  const chartData3 = [
    { name: "Ahmed Mohamed", attendance: 30, grade: 80 },
    { name: "Ahmed Mohamed", attendance: 60, grade: 55 },
    { name: "Ahmed Mohamed", attendance: 45, grade: 70 },
    { name: "Ahmed Mohamed", attendance: 50, grade: 65 },
  ];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const breadcrumbs = [
    {
      nameEn: "Ai Insights",
      nameAr: "تحليلات الذكاء الاصطناعي",
      nameFr: "Analyses IA",
      href: "/",
    },
    {
      nameEn: "School Comparisons",
      nameAr: "مقارنات التقدم",
      nameFr: "Comparaisons des progrès",
      href: "/insight",
    },
  ];

  if (!isMounted) return null;

  if (loading || isLoading || isAverage)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        className={`${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[100px]"
              : "lg:mr-[270px]"
            : booleanValue
              ? "lg:ml-[100px]"
              : "lg:ml-[270px]"
        }`}
      >
        <div className="grid overflow-x-auto">
          <div className="justify-left mb-5 ml-4 mt-10 flex gap-5 overflow-x-auto text-nowrap text-[20px] font-semibold">
            <Link href="/insight" className="text-blue-500 underline">
              {currentLanguage === "en"
                ? "Student Performance"
                : currentLanguage === "ar"
                  ? "تقدم الطلاب"
                  : currentLanguage === "fr"
                    ? "Progression des étudiants"
                    : "Student Performance"}
            </Link>
            <Link href="/insight/school">
              {currentLanguage === "en"
                ? "School Performance"
                : currentLanguage === "ar"
                  ? "تقدم المدرسة"
                  : currentLanguage === "fr"
                    ? "Progression de l'école"
                    : "School Performance"}
            </Link>
            <Link href="/insight/class">
              {currentLanguage === "en"
                ? "Class Performance"
                : currentLanguage === "ar"
                  ? "تقدم الفصل"
                  : currentLanguage === "fr"
                    ? "Progression de la classe"
                    : "Class Performance"}
            </Link>
            <Link href="/insight/ml-exam">
              {currentLanguage === "en"
                ? "ML Exam Performance"
                : currentLanguage === "ar"
                  ? "ML التقدم في امتحان تعلم الالة"
                  : currentLanguage === "fr"
                    ? "Progression à l'examen de ML"
                    : "ML Exam Performance"}
            </Link>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap justify-evenly gap-5 overflow-x-auto">
          <div className="flex items-center justify-center overflow-x-auto">
            <Card className="w-[850px] overflow-x-auto bg-bgPrimary max-[1170px]:w-[550px] max-[605px]:w-[450px]">
              <CardHeader>
                <CardTitle>
                  {currentLanguage === "ar"
                    ? "تقدم الطلاب"
                    : currentLanguage === "fr"
                      ? "Progression des étudiants"
                      : "Student Performance"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={data}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="stage"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value: string) => String(value)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar
                      dataKey="AVGGrade"
                      fill="var(--color-desktop)"
                      radius={5}
                    />
                    <Bar
                      dataKey="AVGAttendance"
                      fill="var(--color-mobile)"
                      radius={5}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-5 overflow-x-auto">
            <Card className="w-[550px] bg-bgPrimary max-[605px]:w-[450px]">
              <CardHeader>
                <CardTitle>
                  {currentLanguage === "ar"
                    ? "مواظبة التلاميذ"
                    : currentLanguage === "fr"
                      ? "Assiduité des élèves"
                      : "Improving Student Attendance"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig2}>
                  <LineChart data={transformedAttendanceData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={value => value.slice(0, 3)}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      dataKey="KINDERGARTEN"
                      type="monotone"
                      stroke="#8884d8"
                      strokeWidth={4}
                      dot={false}
                    />
                    <Line
                      dataKey="PRIMARY"
                      type="monotone"
                      stroke="#82ca9d"
                      strokeWidth={4}
                      dot={false}
                    />
                    <Line
                      dataKey="PREPARATORY"
                      type="monotone"
                      stroke="#ffc658"
                      strokeWidth={4}
                      dot={false}
                    />
                    <Line
                      dataKey="SECONDARY"
                      type="monotone"
                      stroke="#ff7300"
                      strokeWidth={4}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="w-[550px] overflow-x-auto whitespace-nowrap text-nowrap bg-bgPrimary max-[605px]:w-[450px]">
              <CardHeader>
                <CardTitle>
                  {currentLanguage === "ar"
                    ? "الطلاب المتعثرون"
                    : currentLanguage === "fr"
                      ? "Élèves en difficulté"
                      : "Struggling Students"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  className="whitespace-nowrap text-nowrap font-semibold"
                  width={400}
                  height={300}
                  data={chartData3}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="attendance"
                    fill="#e23670"
                    name={`${currentLanguage === "ar" ? "الحضور (متوسط)" : currentLanguage === "fr" ? "(AVG) Présences" : "(AVG) Attendances"}`}
                    barSize={17}
                    radius={10}
                  />
                  <Bar
                    dataKey="grade"
                    fill="#2560d4"
                    name={`${currentLanguage === "ar" ? "النقاط (متوسط)" : currentLanguage === "fr" ? "(AVG) Note" : "(AVG) Grade"}`}
                    barSize={17}
                    radius={10}
                  />
                </BarChart>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default InsightPage;
