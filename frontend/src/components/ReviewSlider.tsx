import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { useGetBannersQuery } from "../redux/image/imageAPI";

const ReviewSlider: React.FC = () => {
  const { data, isLoading, isError } = useGetBannersQuery();

  // 🔹 Filter review banners
  const reviewBanners =
    data?.banners?.filter((b: any) => b.type === "review") || [];

  if (isLoading) {
    return <p className="text-center">Loading reviews...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load reviews</p>;
  }

  if (reviewBanners.length === 0) {
    return <p className="text-center">No review banners found</p>;
  }

  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      spaceBetween={16}
      speed={2000}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      breakpoints={{
        0: { slidesPerView: 1.2 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {reviewBanners.map((banner: any) => (
        <SwiperSlide key={banner._id}>
          <div className="p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            <img
              src={banner.bannerImageUrl}
              alt={banner.bannerTitle}
              className="w-full h-[200px] sm:h-[260px] md:h-[300px] object-cover rounded-2xl"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewSlider;