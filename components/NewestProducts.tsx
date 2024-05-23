import prisma from "@/lib/db"
import Link from "next/link";
import { ProductCard } from "./ProductCard";

async function getData() {
    const data = await prisma.product.findMany({
        select: {
            price: true,
            smallDescription: true,
            category: true,
            name: true,
            id: true,
            images: true,
        },
        take: 4,
        orderBy: {
            createdAt: "desc"
        }
    });
    return data
}

const NewestProducts = async () => {
    const data = await getData()
  return (
    <section className="mt-12">
        <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tighter">Newest Products</h2>
            <Link href="#" className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block">
                All Products <span>&rarr;</span>
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 mt-4 gap-10">
            {data.map((product) => (
                <ProductCard key={product.id} images={product.images} id={product.id} name={product.name} smallDescription={product.smallDescription} price={product.price}/>
            ))}
        </div>
    </section>
  )
}

export default NewestProducts