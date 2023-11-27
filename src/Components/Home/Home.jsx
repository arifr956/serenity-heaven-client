import About from "./About";
import Banner from "./Banner";
import Coupon from "./Coupon";
import Location from "./Location";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Coupon></Coupon>
            <About></About>
            <Location></Location>
        </div>
    );
};

export default Home;