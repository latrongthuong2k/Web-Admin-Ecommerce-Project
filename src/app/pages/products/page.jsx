import React from 'react';
import Products from "@/app/pages/products/(components)/productsTable";


const Page = ({searchParams})=> {
    return (
        <Products searchParams={searchParams}/>
    );
};

export default Page;
