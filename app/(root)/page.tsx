import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/banner2.jpg" alt="banner" width={2000} height={1500} className="w-screen h-auto max-h-[80vh]"/>
      <Collections />
      <ProductList />
    </>
  );
}

export const dynamic = "force-dynamic";

