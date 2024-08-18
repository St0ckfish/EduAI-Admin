/* eslint-disable @next/next/no-img-element */
"use client";
import Spinner from "@/components/spinner";
import { useGetAllAllPostsQuery, useDeletePostsMutation, usePutPostLikeMutation } from "@/features/communication/postApi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { toast } from "react-toastify";

const News = () => {
    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    type Post = Record<string, any>;
    const { data, error, isLoading, refetch } = useGetAllAllPostsQuery(null);
    const [deletePosts] = useDeletePostsMutation();
    const [putLike] = usePutPostLikeMutation();

    useEffect(() => {
        if (data) console.log("Response Data:", data);
        if (error) console.log("Error:", error);
    }, [data, error]);
    const [open, setOpen] = useState<number | boolean | null>(false);
    const toggleNavbar = (index: number) => {
        setOpen(open === index ? null : index);
    };
    const [open2, setOpen2] = useState<number | boolean | null>(false);
    const toggleNavbar2 = (index: number) => {
        setOpen2(open2 === index ? null : index);
    };

    const handleDelete = async (id: string) => {
        try {
            await deletePosts(id).unwrap();
            toast.success("Delete post Success");
            void refetch();
        } catch (err) {
            toast.error("Can not Delete post");

        }
    };
    const PutLike = async (id: string) => {
        try {
            await putLike({
                id: id,
                like: "true"
            }).unwrap();
            void refetch();
        } catch (err) {
            console.log(err);
            console.log(id);
        }
    };
    const DeleteLike = async (id: string) => {
        try {
            await putLike({
                id: id,
                like: "false"
            }).unwrap();
            void refetch();
        } catch (err) {
            console.log(err);
            console.log(id);
        }
    };

    const formatTransactionDate = (dateString: string | number | Date) => {
        if (!dateString) return "No transaction date";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
    };

    if (isLoading)
        return (
            <div className="h-screen w-full justify-center items-center flex ">
                <Spinner />
            </div>
        );

    return (
        <div
            className={`${booleanValue ? "lg:ml-[100px]" : "lg:ml-[270px]"
                } `}
        >
            <div className="p-9 max-[505px]:p-2 rounded-xl bg-white grid justify-center items-center w-full h-full gap-4">
                {data?.data.content.map((post: Post, index: number) => (
                    <div key={post.id} className="grid p-4 border border-[#ebebeb] rounded-xl w-[800px] max-[1190px]:w-[600px] max-[710px]:w-[400px] max-[450px]:w-[350px]">
                        <div className="flex justify-between w-full gap-8">
                            <div className="flex gap-1 items-center">
                                {
                                    post.isPublisherPictureExists ?
                                        <img src={post.publisherPicture} className="w-[40px] h-[40px] mr-2 rounded-full" alt="user" /> :
                                        <img src="/images/userr.png" className="w-[40px] h-[40px] mr-2 rounded-full" alt="user" />
                                }
                                <div className="grid font-semibold text-[14px] text-nowrap">
                                    <p className=" text-black">{post.publisherName}</p>
                                    <p className="text-[#65676b]">{formatTransactionDate(post.creationDate)}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-start">
                                {
                                    open === index ? (
                                        <div className="flex bg-white h-[35px] px-1.5 py-1 items-center rounded-full gap-2">
                                            <button onClick={() => handleDelete(post.id)}>
                                                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <Link href={`/post-management/${post.id}`}>
                                                <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="invisible flex bg-white h-[35px] w-[100px] px-3 py-0.5 rounded-full gap-2">
                                            <button>
                                                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <button>
                                                <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                            </button>
                                        </div>
                                    )
                                }
                                <button onClick={() => toggleNavbar(index)}>
                                    <svg className="h-6 w-6 text-gray-500 mt-1.5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 font-semibold ml-2 text-wrap max-[450px]:text-[15px]">
                            <p>{post.content}</p>
                        </div>
                        <div className="flex justify-center mt-2">
                            <div className="flex justify-center gap-2 mt-2 flex-wrap">
                                {post.attachments.map((img: any, index: number) => (
                                    <img className="w-[300px] max-[450px]:w-[250px] rounded-md" src={img.viewLink} alt="#" key={index} />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 items-center font-semibold">
                            <div className="flex items-center">
                                <img src="/images/like.png" className="w-[20px] h-[20px] mr-2 rounded-full" alt="user" />
                                <p className="text-[#65676b]">{post.likesCount}</p>
                            </div>
                            <div className="flex justify-between gap-3 ">
                                <p className="text-[#65676b]">2 Comments</p>
                            </div>
                        </div>
                        <div className=" border-[#65676b] border-y flex gap-10 max-[505px]:gap-8 items-center py-3 font-semibold text-[#65676b] px-2 justify-center">
                            <div className="flex gap-3">
                                <button onClick={() => !post.isLiked ? PutLike(post.id) : DeleteLike(post.id)} className="flex gap-2">
                                    {
                                        post.isLiked ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: '#1e76ff' }}><path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path></svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(101, 103, 107, 1)' }}><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg>
                                    }
                                    Like
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => toggleNavbar2(index)} className="flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'rgba(101, 103, 107, 1)' }}><path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path></svg>
                                    Comment
                                </button>
                            </div>
                        </div>
                        {
                            open2 === index && (
                                <div className="w-full mt-4 flex gap-3 items-center">
                                    <input placeholder="Write Comment" type="text" className="w-full font-semibold outline-none border border-slate-200 rounded-md px-3 py-2" />
                                    <button className="px-3 py-1.5 bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl ease-in duration-300 rounded-lg">
                                    <svg className="h-7 w-7 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                                    </button>
                                </div>
                                )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
