import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../../app/slices/admin/adminCategorySlice";


const Categories = () => {

    const dispatch = useDispatch()
    const cateogry = useSelector((state)=>state?.Category?.CategoryData)
    console.log("line 10",cateogry)

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    return (
        <div className="px-5">
            <div className="w-full h-36 bg-blue-400 mt-5">
                <img src="" alt="" />
                <h1>category Name</h1>
            </div>
        </div>
    )
}

export default Categories