import BestSeller from "../components/BestSeller/BestSellers";
import Hero from "../components/Hero/Hero";
import LatestProducts from "../components/LatestCollections/LatestProducts";
import NewsLetterBox from "../components/NewsLetterBox/NewsLetterBox";
import OurPolicy from "../components/OurPolicy/OurPolicy";


const Home = () => {
    return (
        <div>
            <Hero/>
            <LatestProducts/>
            <BestSeller/>
            <OurPolicy/>
            <NewsLetterBox/>
        </div>
    );
};

export default Home;