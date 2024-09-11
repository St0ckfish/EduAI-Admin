"use client";
import { useCreatePostsMutation } from "@/features/communication/postApi";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AiOutlineSave } from "react-icons/ai"; // Save Icon
import BreadCrumbs from "@/components/BreadCrumbs";

const AddNewPost = () => {
  const breadcrumbs = [
    {
      nameEn: "Communication",
      nameAr: "التواصل",
      nameFr: "Communication",
      href: "/",
    },
    {
      nameEn: "Post Management",
      nameAr: "إدارة المشاركات",
      nameFr: "Gestion des publications",
      href: "/post-management",
    },
    {
      nameEn: "Add Post",
      nameAr: "إضافة منشور",
      nameFr: "Ajouter un post",
      href: "/post-management/add-new-post",
    },
  ];
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createPost, { isLoading }] = useCreatePostsMutation();

  const onSubmit = async (data: any) => {
    // Create FormData object
    const formData = new FormData();

    // Append JSON stringified post data
    const postData = {
      title_en: data.title_en,
      title_fr: data.title_fr,
      title_ar: data.title_ar,
      content_en: data.content_en,
      content_fr: data.content_fr,
      content_ar: data.content_ar,
    };
    formData.append("post", JSON.stringify(postData));

    // Append file data
    if (data.files && data.files[0]) {
      formData.append("files", data.files[0]);
    }

    try {
      await createPost(formData).unwrap();
      toast.success("Create post Success");
    } catch (err) {
      console.error("Failed to create post", err);
      toast.error("Failed to create post");
    }
  };

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <div
        className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"} mt-20`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-3 rounded-xl bg-bgSecondary p-10">
            <div className="rounded-xl border border-borderPrimary bg-bgPrimary p-10">
              <div className="mb-10 flex w-full items-center justify-between text-[18px] font-semibold">
                <h1 className="text-[20px]">Title</h1>
                <button className="flex gap-2" type="submit">
                  <AiOutlineSave size={25} />
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 font-semibold max-[614px]:grid-cols-1">
                <label className="grid">
                  Title (English)
                  <input
                    type="text"
                    placeholder="Write Title"
                    {...register("title_en", {
                      required: "Title in English is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.title_en && (
                    <span className="text-red-500">
                      {errors.title_en.message?.toString()}
                    </span>
                  )}
                </label>
                <label className="grid">
                  Title (français)
                  <input
                    type="text"
                    placeholder="Write Title"
                    {...register("title_fr", {
                      required: "Title in French is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.title_fr && (
                    <span className="text-red-500">
                      {errors.title_fr.message?.toString()}
                    </span>
                  )}
                </label>
                <label className="grid">
                  Title (Arabic)
                  <input
                    type="text"
                    placeholder="Write Title"
                    {...register("title_ar", {
                      required: "Title in Arabic is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.title_ar && (
                    <span className="text-red-500">
                      {errors.title_ar.message?.toString()}
                    </span>
                  )}
                </label>
                <label className="grid">
                  Content (English)
                  <input
                    type="text"
                    placeholder="Write Content"
                    {...register("content_en", {
                      required: "Content in English is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.content_en && (
                    <span className="text-red-500">
                      {errors.content_en.message?.toString()}
                    </span>
                  )}
                </label>
                <label className="grid">
                  Content (français)
                  <input
                    type="text"
                    placeholder="Write Content"
                    {...register("content_fr", {
                      required: "Content in French is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.content_fr && (
                    <span className="text-red-500">
                      {errors.content_fr.message?.toString()}
                    </span>
                  )}
                </label>
                <label className="grid">
                  Content (Arabic)
                  <input
                    type="text"
                    placeholder="Write Content"
                    {...register("content_ar", {
                      required: "Content in Arabic is required",
                    })}
                    className="h-[60px] rounded-lg border border-borderPrimary px-3 py-2 outline-none"
                  />
                  {errors.content_ar && (
                    <span className="text-red-500">
                      {errors.content_ar.message?.toString()}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="rounded-xl border border-borderPrimary bg-bgPrimary p-10">
              <div className="mb-10 flex w-full items-center justify-between text-[18px] font-semibold">
                <h1 className="text-[20px]">Images or Videos</h1>
              </div>
              <div className="flex justify-center gap-3 font-semibold">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-bgPrimary hover:bg-bgPrimary"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      {...register("files")}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewPost;
