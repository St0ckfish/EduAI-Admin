import Link from "next/link";

const Search = () => {
    return ( 
        <>
        <div className="lg:ml-[290px] mt-12">
            <div className="flex w-full h-full justify-center p-2 ">
                <div className="grid bg-white rounded-xl w-full h-full">
                    <div className="flex gap-2 bg-gray-200 h-[70px] rounded-t-xl items-center pl-3 font-semibold">
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/">Student</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/">Teacher</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/">Employee</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/">Worker</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/">Fees</Link>
                        <Link className="hover:text-blue-500 hover:underline underline-offset-4" href="/">Infrastructure</Link>
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Search;