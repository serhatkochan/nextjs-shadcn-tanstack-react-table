"use client"
import React from 'react';
import DataTable from "@/components/dataTable";

import data from "@/data/productData.json";
import {ColumnDef} from "@tanstack/react-table";


type IUser = {
    id: number
    productName: string
    price: string
    count: number
    category: string
}

const columns: ColumnDef<IUser>[] = [
    {
        accessorKey: "id",
        header: "id",
        filterFn: "includesString"
    },
    {
        accessorKey: "productName",
        header: "Product Name",
    },
    {
        accessorKey: "price",
        header: "Price",
        enableSorting: false
    },
    {
        accessorKey: "count",
        header: "Count",
        filterFn: "includesString"
    },
    {
        accessorKey: "category",
        header: "Category",
    },
]

const Product = () => {
    return (
        <DataTable
            selectAll={true}
            data={data}
            columns={columns}
        />
    );
};

export default Product;