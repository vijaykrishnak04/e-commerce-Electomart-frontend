import { Carousal } from "../../components/users/Carousal";
import Categories from "../../components/users/Categories";
import CategoryComponent from "../../components/users/CategoryComponent";
import Footer from "../../components/users/Footer";
import NewArrivals from "../../components/users/NewArrivals";

const HomePage = () => {
  return (
    <div className="">
      <Carousal/>
      <Categories />
      <NewArrivals />
      <CategoryComponent/>
      <Footer/>
    </div>
  );
};

export default HomePage;
