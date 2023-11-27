import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";

const Banner = () => {
  const slides = [
    {
      image: "https://i.ibb.co/jhHQ99V/eu-modern-european-complex-apartment-600nw-1445600369.webp",
      title: "Your Dream Home Awaits: Discover Stylish Apartments for Rent",
    },
    {
      image: "https://i.ibb.co/WnQfkgh/401-top-Renders-b-7abbbb2796f27c91ef535646dc2c5299.webp",
      title: "Elevate Your Living Experience: Explore Premium Rental Apartments",
    },
    {
      image: "https://i.ibb.co/pdxZBFf/Here-Are-10-Different-Types-Of-Apartments-Bproperty.jpg",
      title: "Find Your Perfect Space: Apartments for Rent with Modern Amenities",
    },
    {
      image: "https://i.ibb.co/PzZ7WVV/homepage-4-1274towson.jpg",
      title: "Home Redefined: Rent Apartments Tailored to Your Lifestyle",
    },
  ];

  return (
    <Carousel
      autoplay={true}
      wrapAround={true}
      autoplayInterval={1500} // Set autoplay interval to 1000 milliseconds (1 second)
      renderCenterLeftControls={({ previousSlide }) => (
        <button className=" uppercase text-white" onClick={previousSlide}>Previous</button>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <button className=" uppercase text-white" onClick={nextSlide}>Next</button>
      )}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="hero h-80 lg:h-96"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-opacity-40"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-7 text-4xl font-bold text-white">
                {slide.title}
              </h1>
              <Link to="/registration">
                <button className="btn btn-primary text-white bg-red-400 border-0">
                  Register Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
