import { FaCartPlus, FaRegHeart } from "react-icons/fa";

const categoryData = {
  name: "Laptops & Pre-Builts",
  banner: "https://w.forfun.com/fetch/e5/e53950024986c0ef8514fbad58070fad.jpeg",
  subcategories: [
    { name: "Pre-Builts", link: "#pre-builts" },
    { name: "Pre-Owned", link: "#pre-owned" },
    { name: "Laptops", link: "#laptops" },
    // ...add more subcategories if needed
  ],
  products: [
    {
      id: 1,
      name: "Akashi Build",
      price: "QAR 3,999.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },
    {
      id: 2,
      name: "Minsc Build",
      price: "QAR 7,499.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },
    {
      id: 1,
      name: "Akashi Build",
      price: "QAR 3,999.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },
    {
      id: 2,
      name: "Minsc Build",
      price: "QAR 7,499.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },

    {
      id: 1,
      name: "Akashi Build",
      price: "QAR 3,999.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },
    {
      id: 2,
      name: "Minsc Build",
      price: "QAR 7,499.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },

    {
      id: 1,
      name: "Akashi Build",
      price: "QAR 3,999.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },
    {
      id: 2,
      name: "Minsc Build",
      price: "QAR 7,499.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },

    {
      id: 1,
      name: "Akashi Build",
      price: "QAR 3,999.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },
    {
      id: 2,
      name: "Minsc Build",
      price: "QAR 7,499.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },

    {
      id: 1,
      name: "Akashi Build",
      price: "QAR 3,999.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },
    {
      id: 2,
      name: "Minsc Build",
      price: "QAR 7,499.00",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg", // Replace with actual image path
    },

    // ...more products
  ],
};

const CategoryComponent = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-5 gap-2">
      {/* Category and Subcategory Section */}
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold mb-4">{categoryData.name}</h2>
        <ul className="flex lg:flex-col flex-row gap-4">
          {categoryData.subcategories.map((subcategory) => (
            <li key={subcategory.name}>
              <a
                href={subcategory.link}
                className="text-lg text-blue-500 hover:underline"
              >
                {subcategory.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Category Banner Image */}
      <div className="md:col-span-1 md:flex">
        <img
          src={categoryData.banner}
          alt={`${categoryData.name} Banner`}
          className="w-full mb-4 md:mb-8 rounded-lg shadow-lg"
        />
      </div>

      {/* Products Display */}
      <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {categoryData.products.slice(0, 8).map((product) => (
          <div
            key={product.id}
            className="bg-white p-4  flex flex-col items-center rounded-lg shadow hover:shadow-2xl transition duration-300"
          >
            <img
              src={product.imageSrc}
              alt={product.name}
              className="w-44 h-44 object-cover mb-2 rounded-lg"
            />
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-red-500">{product.price}</p>
            <div className="flex justify-between items-center w-full pt-2">
              <button
                className="flex items-center justify-center text-gray-600 hover:text-yellow-700 transition duration-300"
                onClick={() => {
                  /* function to handle adding to cart */
                }}
              >
                <FaCartPlus size="1.5em" />
              </button>
              <button
                className="flex items-center justify-center text-gray-600 hover:text-pink-500 transition duration-300"
                onClick={() => {
                  /* function to handle adding to wish list */
                }}
              >
                <FaRegHeart size="1.5em" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryComponent;
