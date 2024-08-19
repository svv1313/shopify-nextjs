'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { IProductDetailed } from '../../types/products';

interface IProps {
  product: IProductDetailed;
}

export const ProductSlider = ({ product }: IProps) => {
  SwiperCore.use([Navigation, Pagination]);
  const images = product.images.edges.map((image, i) => (
    <SwiperSlide key={`slide-${i}`}>
      <Image
        src={image.node.url}
        alt={image.node.altText}
        layout="fill"
        objectFit="cover"
      />
    </SwiperSlide>
  ));
  return (
    <div className="relative h-96 w-full">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        className="h-96 rounded-2xl"
        loop={true}
        style={{ "--swiper-navigation-color": "#000", "--swiper-pagination-color": "#000" } as React.CSSProperties}
      >
        {images}
      </Swiper>
    </div>
  );
};
