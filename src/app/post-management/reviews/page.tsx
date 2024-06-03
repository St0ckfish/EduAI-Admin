/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const Reviews = () => {
    return ( 
        <>
            <div className="lg:ml-[290px] mt-12 pr-5">
                <div className="flex justify-left gap-5 text-[23px] font-bold mb-5 ml-4">
                    <Link href="/post-management">
                        Post
                    </Link>
                    <Link href="/post-management/reviews" className="text-blue-500 underline">
                    Reviews
                    </Link>
                </div>
                <div className="grid w-full h-full">
                    
                </div>
            </div>
        </>
     );
}
 
export default Reviews;