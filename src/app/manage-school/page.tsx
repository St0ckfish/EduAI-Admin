import Schools from "./components/Schools";
import EmptySchools from "./components/emptySchools";

const ManageSchool = () => {
    const empty = true;
    return (
        <>
            <div className="lg:ml-[270px] mr-[5px]">
                {
                    !empty ?
                    <EmptySchools/>
                    :
                    <Schools/>
                }
            </div>
        </>
    )
}

export default ManageSchool;