"use client";
import Link from "next/link";
import { useGetAllClasssQuery } from "@/features/Infrastructure/classApi";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import Spinner from "@/components/spinner";
import { useEffect, useRef, useState } from "react";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Trash2 } from "lucide-react";
import Modal from "@/components/model";
import { toast } from "react-toastify";
import { useUploadClassroomsMutation } from "@/features/events/eventsApi";

const Infrastructure = () => {
  const breadcrumbs = [
    {
      nameEn: "Dashboard",
      nameAr: "لوحة القيادة",
      nameFr: "Tableau de bord",
      href: "/",
    },
    {
      nameEn: "Infrastructures",
      nameAr: "البنية التحتية",
      nameFr: "Infrastructures",
      href: "/infrastructure",
    },
    {
      nameEn: "Classes",
      nameAr: "الفصل",
      nameFr: "Classe",
      href: "/classes",
    },
  ];

  type Class = Record<string, any>;
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const { data, error, isLoading, refetch } = useGetAllClasssQuery(null);
  const [search, setSearch] = useState("");

  const { language: currentLanguage, loading } = useSelector(
    (state: RootState) => state.language,
  );

    const [isModalOpen, setModalOpen] = useState(false);
    const [uploadEvent, {isLoading: isUploading}] = useUploadClassroomsMutation();
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [sheetNumber, setSheetNumber] = useState("");
  
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    };
  
    const handleFile = (selectedFile: File) => {
      if (selectedFile) {
        setFile(selectedFile);
        // Simulate progress
        setProgress(0);
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      }
    };
  
    const handleDeleteFile = () => {
      setFile(null);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
  
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };
  
    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      setFile(null);
      setProgress(0);
      setSheetNumber("");
    };
  
    const handleUploadEvent = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (!file) {
        toast.error("Please select a file");
        return;
      }
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sheetNumber", sheetNumber);
      
      try {
        await uploadEvent(formData).unwrap();
        toast.success("Event uploaded successfully");
        handleCloseModal();
        void refetch();
      } catch (err: any) {
        toast.error(`${err?.data?.message}`);
      }
    };

  if (loading || isLoading)
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
        className={`flex justify-between ${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[150px]"
              : "lg:mr-[320px]"
            : booleanValue
              ? "lg:ml-[150px]"
              : "lg:ml-[320px]"
        } mt-16 text-center max-[502px]:grid max-[502px]:justify-center lg:mr-[40px]`}
      >
        <div className="mb-3">
          <label htmlFor="icon" className="sr-only">
            Search
          </label>
          <div className="relative min-w-72 md:min-w-80">
            <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-4">
              <svg
                className="size-4 flex-shrink-0 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              onChange={e => setSearch(e.target.value)}
              type="text"
              id="icon"
              name="icon"
              className="block w-full rounded-lg border-2 border-borderPrimary px-4 py-2 ps-11 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
              placeholder={
                currentLanguage === "en"
                  ? "Search"
                  : currentLanguage === "ar"
                    ? "بحث"
                    : "Recherche"
              }
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href="/classes/add-class"
            className="mx-3 mb-5 w-fit whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
          >
            {currentLanguage === "ar"
              ? "+ إضافة فصل"
              : currentLanguage === "fr"
                ? "+ Ajouter une classe"
                : "+ Add Class"}
          </Link>
          <button
              onClick={handleOpenModal}
              className="mx-3 mb-5 w-[190px] flex justify-center whitespace-nowrap rounded-xl bg-bgPrimary px-4 py-2 text-[18px] font-semibold text-primary duration-300 ease-in border border-primary hover:shadow-xl"
            >
              {currentLanguage === "ar"
                ? "إضافة"
                : currentLanguage === "fr"
                  ? "ajouter"
                  : "Upload"}
                  <svg className="h-5 w-5"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="16" y1="9" x2="12" y2="5" />  <line x1="8" y1="9" x2="12" y2="5" /></svg>
            </button>
        </div>
      </div>
      <div
        className={`${
          currentLanguage === "ar"
            ? booleanValue
              ? "lg:mr-[120px]"
              : "lg:mr-[290px]"
            : booleanValue
              ? "lg:ml-[120px]"
              : "lg:ml-[290px]"
        } grid justify-center`}
      >
        <div className="mt-5 grid grid-cols-1 justify-center gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {data?.data.content
            .filter((classItem: Class) => {
              return search.toLocaleLowerCase() === ""
                ? classItem
                : classItem.classroomName.toLocaleLowerCase().includes(search);
            })
            .map((classItem: Class) => (
              <div key={classItem.roomId}>
                <Link href={`/class-detials/${classItem.roomId}`}>
                  <div className="flex h-[130px] w-[200px] items-center justify-center gap-2 rounded-xl bg-bgPrimary p-2 shadow-xl max-[640px]:w-[300px]">
                    <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-info text-center text-[18px] font-bold text-white">
                      {classItem.classroomName}
                    </div>
                    <div className="grid text-[13px] font-semibold">
                      <p className="text-secondary">
                        {currentLanguage === "ar"
                          ? "عدد الطلاب"
                          : currentLanguage === "fr"
                            ? "N. Étudiant"
                            : "Class Capacity"}
                      </p>
                      <p>30</p>
                      <p className="text-secondary">
                        {currentLanguage === "ar"
                          ? "قم الغرفة"
                          : currentLanguage === "fr"
                            ? "Numéro de chambre"
                            : "Room Number"}
                      </p>
                      <p>4</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h1 className="font-semibold text-lg">Upload File</h1>
        <p className="font-light text-secondary mb-4">Please upload files in Excel format and make sure the file size is under 25 MB.</p>
        <form onSubmit={handleUploadEvent} className="space-y-4">
          <div 
            className="border-2 border-dashed border-purple-300 rounded-lg p-6 bg-purple-50"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="text-center">
                <div className="mb-4">Drop file or Browse</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                  className="hidden"
                  accept=".xlsx,.xls"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-hover"
                >
                  Browse
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-600">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-gray-500">
                        Format: {file.type || 'Excel'} file size: {formatFileSize(file.size)}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteFile}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-right text-sm text-gray-500">{progress}%</div>
              </div>
            )}
          </div>
          <input
            placeholder="Sheet Number"
            type="number"
            value={sheetNumber}
            onChange={(e) => setSheetNumber(e.target.value)}
            className="w-full rounded-lg border border-borderPrimary p-2"
            required
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-4 py-2 text-white hover:bg-hover"
            disabled={!file}
          >
            {isUploading? "uploading..." : "Upload"}
            
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Infrastructure;
