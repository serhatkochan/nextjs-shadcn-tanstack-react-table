"use client"
import React from 'react';
import DataTable from "@/components/dataTable";

import data from "@/data/userData.json";
import {ColumnDef} from "@tanstack/react-table";


type IUser = {
    id: number
    firstName: string
    lastName: string
    email: string
    gender: string
    ipAddress: string
}

const columns: ColumnDef<IUser>[] = [
    {
        accessorKey: "id",
        header: "id",
        filterFn: "includesString"
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
        enableSorting: false
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "ipAddress",
        header: "Ip Address",
    },
]

const User = () => {
    return (
        <DataTable
            selectAll={true}
            data={data}
            columns={columns}
        />
    );
};

export default User;