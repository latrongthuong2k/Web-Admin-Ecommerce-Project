"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import {fetchPageProduct} from "@/services/ProductService";
import AddProductButton from "@/app/pages/products/(components)/AddProdcutButton";
import Search from "@/app/pages/products/(components)/Search";
import PaginationTable from "@/app/pages/products/(components)/PaginationTable";


type Product = {
    id: number;
    productName: string;
    quantity: number;
    createdAt: string; // Sử dụng string cho ngày tháng để đơn giản hóa
    price: number;
    status: number;
};


type ProductsProps = {
    searchParams?: {
        q?: string;
        page?: number;
    };
};

const thRender = (attribute: string) => (
    <th className="whitespace-nowrap p-2 first:rounded-bl-[15px] last:rounded-br-[15px]">
        <div className="p-2">{attribute}</div>
    </th>
);

const tdRender = (attribute: string | number) => (
    <td className="whitespace-nowrap p-5">
        <div className="flex items-center justify-center">
            <div className="font-medium text-gray-800">{attribute}</div>
        </div>
    </td>
);

const statusMappings: { [key: number]: string } = {
    0: "Active",
    1: "Inactive",
    2: "Discontinued",
};

const Products: React.FC<ProductsProps> = ({searchParams}) => {
    const pathName = usePathname();
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPage, setTotalPage] = useState<number>(0);
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    // const page = searchParams?.page || 1
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {totalPage, products} = await fetchPageProduct(q, page, 12);
                if (totalPage && products) {
                    setTotalPage(totalPage);
                    const formattedProducts = products?.map((item: Product) => {
                        // const dateOnly = item.createdAt.substring(0, 7);
                        const dateOnlyUsingSplit = item.createdAt.split('T')[0];
                        const statusText = statusMappings[item.status] || "Unknown";
                        return {
                            ...item,
                            status: statusText,
                            createdAt: dateOnlyUsingSplit,
                        };
                    });
                    setProducts(formattedProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, [page, q]);


    return (
        <div className="container mx-auto mr-14 mt-14">
            <AddProductButton/>
            <Search/>
            {/* Khung table */}
            <div className="overflow-x-auto rounded-[20px] border-4 bg-gray-50 pb-6 shadow-lg">
                {/* Table */}
                <table className="w-full table-auto">
                    <thead>
                    <tr className="mb-[5px] rounded bg-teal-800 text-center text-lg font-semibold uppercase text-white">
                        {thRender("Product Name")}
                        {thRender("Create at")}
                        {thRender("Quantity")}
                        {thRender("Price")}
                        {thRender("Status")}
                        {thRender("Actions")}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                    {products.map((product) => (
                        <tr key={product.id}>
                            {tdRender(product.productName)}
                            {tdRender(product.createdAt)}
                            {tdRender(product.quantity)}
                            {tdRender(product.price)}
                            {tdRender(product.status)}
                            <td className="flex justify-center whitespace-nowrap p-2">
                                <Link
                                    className={"mr-2 rounded-[20px] border-4 px-4 py-2 text-violet-400 hover:border-violet-300 hover:text-violet-600"}
                                    href={`${pathName}/add`}>
                                    <EditNoteTwoToneIcon/>
                                    Edit
                                </Link>
                                <Link
                                    className="rounded-[20px] border-4 px-4 py-2 text-red-400 hover:border-red-300 hover:text-red-600"
                                    href={`${pathName}/delete`}>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={"mt-6 ml-2"}>
                <PaginationTable totalPage={totalPage}/>
            </div>
        </div>
    );
};

export default Products;
