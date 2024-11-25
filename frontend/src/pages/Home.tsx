import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";
import LatestPackagesCard from "../components/LatestPackagesCard";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Services from "../components/Services";
// import Hero2 from "../components/Hero2";


const Home = () => {
  const { data: hotels, isLoading: hotelsLoading} = useQuery(
    "fetchHotels",
    apiClient.fetchHotels
  );

  const { data: packages, isLoading: packagesLoading} = useQuery(
    "fetchPackages",
    apiClient.fetchPackages
  );

  return (
    <div className="space-y-8">
      {/* Latest Destinations */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold">Latest Destinations</h2>
        <p>Most recent destinations added by our hosts</p>

        {hotelsLoading && <p>Loading destinations...</p>}
        

        {hotels && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {hotels.map((hotel) => (
              <SwiperSlide key={hotel._id}>
                <LatestDestinationCard hotel={hotel} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Latest Packages */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold">Latest Packages</h2>
        <p>Packages Available</p>

        {packagesLoading && <p>Loading packages...</p>}
       
        {packages && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {packages.map((availablePackage) => (
              <SwiperSlide key={availablePackage._id}>
                <LatestPackagesCard packageData={availablePackage} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <Services/>
      {/* <Hero2/> */}
    </div>
  );
};

export default Home;
