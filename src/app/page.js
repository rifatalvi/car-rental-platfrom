export const dynamic = "force-dynamic";
import Banner from "@/component/Banner";
import BookingSteps from "@/component/BookingSteps";
import FeaturCars from "@/component/FeaturCars";
import SpecialOffers from "@/component/SpecialOffers";
import WhyChooseUs from "@/component/WhyChooseUs";


export default function Home() {
  return (
    <div >
       <Banner></Banner>
       <BookingSteps></BookingSteps>
       <FeaturCars></FeaturCars>
       <WhyChooseUs></WhyChooseUs>
       <SpecialOffers></SpecialOffers>
    </div>
  );
}
