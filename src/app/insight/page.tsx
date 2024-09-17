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

// Common chart data
const chartData = [
  { month: "Primary school", desktop: 186, mobile: 80 },
  { month: "Preparatory ", desktop: 305, mobile: 200 },
  { month: "high school", desktop: 237, mobile: 120 },
];

const chartData2 = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartData3 = [
  { name: "Ahmed Mohamed", attendance: 30, grade: 80 },
  { name: "Ahmed Mohamed", attendance: 60, grade: 55 },
  { name: "Ahmed Mohamed", attendance: 45, grade: 70 },
  { name: "Ahmed Mohamed", attendance: 50, grade: 65 },
];

const chartConfig = {
  desktop: { label: "My school", color: "#e23670" },
  mobile: { label: "Another school", color: "#2560d4" },
};

const chartConfig2 = {
  desktop: { label: "Desktop", color: "#e23670" },
  mobile: { label: "Mobile", color: "#2560d4" },
};

function InsightPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const breadcrumbs = [
    {
      nameEn: "Ai Insights",
      nameAr: "رؤى الذكاء الاصطناعي",
      nameFr: "Perspectives de l'IA",
      href: "/",
    },
    {
      nameEn: "School Comparisons",
      nameAr: "مقارنات المدارس",
      nameFr: "Comparaisons des écoles",
      href: "/insight",
    },
  ];
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  if (!isMounted) return null;

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="lg:ml-[270px]">
        <div className="justify-left mb-5 ml-4 mt-10 flex gap-5 text-[20px] font-semibold">
          <Link href="/insight" className="text-blue-500 underline">
            {currentLanguage === "en"
              ? "Student Performance"
              : currentLanguage === "ar"
                ? "أداء الطالب"
                : currentLanguage === "fr"
                  ? "Performance de l'étudiant"
                  : "Student Performance"}
          </Link>
          <Link href="/insight/school">
            {currentLanguage === "en"
              ? "School Performance"
              : currentLanguage === "ar"
                ? "أداء المدرسة"
                : currentLanguage === "fr"
                  ? "Performance de l'école"
                  : "School Performance"}
          </Link>
          <Link href="/insight/class">
            {currentLanguage === "en"
              ? "Class Performance"
              : currentLanguage === "ar"
                ? "أداء الفصل"
                : currentLanguage === "fr"
                  ? "Performance de la classe"
                  : "Class Performance"}
          </Link>
          <Link href="/insight/ml-exam">
            {currentLanguage === "en"
              ? "ML Exam Performance"
              : currentLanguage === "ar"
                ? "أداء اختبار تعلم الآلة"
                : currentLanguage === "fr"
                  ? "Performance de l'examen ML"
                  : "ML Exam Performance"}
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap justify-evenly gap-5 overflow-x-auto">
          {/* Student Performance Bar Chart */}
          <div className="flex items-center justify-center">
            <Card className="w-[850px] max-[1170px]:w-[550px] max-[605px]:w-[450px]  bg-bgPrimary">
              <CardHeader>
                <CardTitle>
                  {currentLanguage === "ar"
                    ? "أداء الطلاب"
                    : currentLanguage === "fr"
                      ? "Performance des étudiants"
                      : "Student Performance"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
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
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={5}
                    />
                    <Bar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      radius={5}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-5 overflow-x-auto">
            <Card className="w-[550px] max-[605px]:w-[450px] bg-bgPrimary">
              <CardHeader>
                <CardTitle>
                  {currentLanguage === "ar"
                    ? "تحسين حضور الطلاب"
                    : currentLanguage === "fr"
                      ? "Améliorer la présence des étudiants"
                      : "Improving Student Attendance"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig2}>
                  <LineChart data={chartData2} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={value => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Line
                      dataKey="desktop"
                      type="monotone"
                      stroke="var(--color-desktop)"
                      strokeWidth={4}
                      dot={false}
                    />
                    <Line
                      dataKey="mobile"
                      type="monotone"
                      stroke="var(--color-mobile)"
                      strokeWidth={4}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Low Achievers Bar Chart */}
            <Card className="w-[550px] overflow-x-auto max-[605px]:w-[450px]  bg-bgPrimary">
              <CardHeader>
                <CardTitle>
                  {currentLanguage === "ar"
                    ? "المحققون الضعيفون"
                    : currentLanguage === "fr"
                      ? "Faibles réalisateurs"
                      : "Low Achievers"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  className="font-semibold"
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
                    name="(AVG) Attendances"
                    barSize={17}
                    radius={10}
                  />
                  <Bar
                    dataKey="grade"
                    fill="#2560d4"
                    name="(AVG) Grade"
                    barSize={17}
                    radius={10}
                  />
                </BarChart>
              </CardContent>
            </Card>
          </div>
          {/* Improving Student Attendance Line Chart */}
        </div>
      </div>
    </>
  );
}

export default InsightPage;
