import BestSellers from "@/components/homepage/BestSellers";
import Categories from "@/components/homepage/Categories";
import Featured from "@/components/homepage/Featured";
import OnSale from "@/components/homepage/OnSale";

export default function Home() {
  return (
    <div className=" bg-primary text-text px-52 py-16 flex flex-col gap-8">
      <Featured />
      <OnSale />
      <Categories />
      <BestSellers />
    </div>
  );
}
