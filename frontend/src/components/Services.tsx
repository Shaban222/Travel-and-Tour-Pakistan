import { FaHotel } from "react-icons/fa";
import { MdTour } from "react-icons/md";

const categories = [
  {
    name: "Hotel Reservation",
    icon: <FaHotel />,
  },
  {
    name: "Tour Package Reservation",
    icon: <MdTour />,
  },
];

const Services = () => {
  return (
    <>
      <div className="lg:px-36 lg:pt-5 lg:pb-[90px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                <span className="text-primary mb-2 block text-lg font-semibold">
                  Our Services
                </span>
                <h2 className="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
                  What We Offer
                </h2>
                <p className="text-body-color text-base">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quaerat reprehenderit autem ea ab repellat eum, quasi modi,
                </p>
              </div>
            </div>
          </div>
          <div className="-mx-4 grid lg:grid-cols-2 gap-8"> {/* Changed to 2 columns */}
            {categories.map((category, index) => (
              <div
                key={index}
                className="mb-8 rounded-[20px] bg-white p-6 shadow-md hover:shadow-lg flex flex-col items-center justify-between" 
                // Added justify-between to space out content inside the card
              >
                <div className="text-black text-5xl mb-6 flex items-center justify-center h-[120px] w-[120px] rounded-2xl bg-gray-100"> 
                  {/* Increased size for better visibility */}
                  {category.icon}
                </div>
                <h4 className="text-dark mb-3 mt-4 text-lg font-semibold text-center">
                  {category.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
