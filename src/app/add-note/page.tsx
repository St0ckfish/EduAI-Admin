"use client";
import { useState } from "react";
import Spinner from "@/components/spinner";
import TextEditor from "@/components/textEditor";
import { useCreateNoteMutation } from "@/features/dashboard/dashboardApi";
import { toast } from "react-toastify";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createNotification, { isLoading }] = useCreateNoteMutation();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill in all fields and select at least one role.");
      return;
    }
    try {
      // Send the title and description as an object
      await createNotification({
        title, 
        description
      }).unwrap();
      
      toast.success("Notification sent successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to send notification. Please try again.");
    }
  };

  return (
    <div className="flex lg:ml-[270px] mt-5 mr-3">
      <div className="grid h-full w-full items-center gap-3 rounded-xl bg-bgPrimary p-5">
        <div className="mb-5 flex w-full justify-start">
          <h1 className="text-[22px] font-semibold">Create Note</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid h-full w-full gap-6">
            <label className="grid gap-2 text-[18px] font-semibold" htmlFor="title">
              Title
              <input
                className="rounded-xl border border-borderPrimary px-4 py-2 outline-none"
                placeholder="Write title...."
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="grid gap-2 text-[18px] font-semibold" htmlFor="description">
              Description
              <div className="mb-5 bg-bgPrimary">
                <TextEditor
                  value={description}
                  onChange={setDescription}
                  placeholder="Enter your content here..."
                />
              </div>
            </label>
            <div>
              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="mb-5 mr-3 flex items-center gap-2 whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-hover hover:shadow-xl"
                >
                  <svg
                    className="h-7 w-7 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  Send
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;