import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../app/slices/admin/adminCategorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const cateogry = useSelector((state) => state?.Category?.CategoryData);
  console.log("line 10", cateogry);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const categories = [
    {
      _id: 1,
      name: "Laptops",
      image:
        "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      _id: 2,
      name: "Headphones",
      image:
        "https://cdn.mos.cms.futurecdn.net/kbrdKHwjXBwSp9uiY8hejP-1200-80.jpg.webp",
    },
    {
      _id: 3,
      name: "Speaker",
      image:
        "https://img.freepik.com/premium-photo/loud-speaker-hd-8k-wallpaper-background-stock-photographic-image_915071-21849.jpg?w=2000",
    },
    {
      _id: 4,
      name: "Keyboards",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      _id: 5,
      name: "Mouse",
      image:
        "https://www.reliancedigital.in/wp-content/uploads/2018/10/Cover_image_mice_buying_guide.jpg",
    },
    {
      _id: 6,
      name: "Headphones",
      image:
        "https://cdn.mos.cms.futurecdn.net/kbrdKHwjXBwSp9uiY8hejP-1200-80.jpg.webp",
    },
    {
      _id: 7,
      name: "Laptops",
      image:
        "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="px-4 flex justify-center items-center">
      <div className="flex overflow-x-auto scrollbar space-x-8 py-4 mb-4 ">
        {categories.map((category) => (
          <div key={category._id} className="min-w-max">
            <img
              src={category.image}
              alt={category.name}
              className="w-32 h-32 object-cover rounded-full"
            />
            <span className="block text-center text-sm font-semibold">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
