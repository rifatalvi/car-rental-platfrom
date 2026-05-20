import Banner from "@/component/Banner";
import BookingSteps from "@/component/BookingSteps";
import SpecialOffers from "@/component/SpecialOffers";
import WhyChooseUs from "@/component/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div >
       <Banner></Banner>
       <BookingSteps></BookingSteps>
       <WhyChooseUs></WhyChooseUs>
       <SpecialOffers></SpecialOffers>
    </div>
  );
}
