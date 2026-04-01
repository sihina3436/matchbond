import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useGetBannersQuery } from "../redux/image/imageAPI";

const ImageSlider: React.FC = () => {
  const { data, isLoading, isError } = useGetBannersQuery();

  // 🔹 Filter only "slide" banners
  const slideBanners =
    data?.banners?.filter((b: any) => b.type === "slide") || [];

  if (isLoading) {
    return <p className="text-center">Loading slider...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load slider</p>;
  }

  if (slideBanners.length === 0) {
    return <p className="text-center">No slide banners found</p>;
  }

  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      loop={true}
      className="h-[220px] sm:h-[300px] md:h-[420px] w-full"
    >
      {slideBanners.map((banner: any) => (
        <SwiperSlide key={banner._id}>
          <img
            src={banner.bannerImageUrl}
            alt={banner.bannerTitle}
            className="w-full h-full rounded-4xl object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;