import React from "react";
import Categories from "./Categories";
import Hero from "./Hero";
import RegisterBanner from "./RegisterAd";
import SliderCom from "./trending/SliderCom";

export default function Home() {
  return (
    <>
      <Hero />
      <SliderCom />
      <Categories />
      <RegisterBanner />
    </>
  );
}
