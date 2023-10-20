"use client"

import React, {useMemo} from 'react';
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox"
import {Input} from "@/components/ui/input"
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    ColumnFiltersState,
    flexRender,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {DataTablePagination} from "@/components/dataTable/DataTablePagination";
import {DataTableViewOptions} from "@/components/dataTable/DataTableViewOptions";
import {ArrowUpDown} from "lucide-react";
// @ts-ignore
import {HeaderContext} from "@tanstack/table-core/src/core/headers";
// @ts-ignore
import {StringOrTemplateHeader} from "@tanstack/table-core/src/types";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    selectAll: boolean
}

const selectAllComponent = <TData, TValue>(): ColumnDef<TData, TValue> => {
    return {
        id: "select",
        enableSorting: false,
        enableHiding: false,
        header: ({table}) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    };
}

const getFilterComponent = <TData, TValue>({table, header}: HeaderContext<TData, TValue>) => {
    console.log(header)
    return <Input
        key={header.id}
        placeholder={`Filter ${header.column.columnDef.header}...`}
        value={(table.getColumn(header.id)?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
            table.getColumn(header.id)?.setFilterValue(event.target.value)
        }}
        className="w-max"
    />
}

const getSortComponent = ({column}: HeaderContext) => {
    return <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
        {column.columnDef.header}
        <ArrowUpDown className="ml-2 h-4 w-4"/>
    </Button>
}


const DataTable = <TData, TValue>({columns, data, selectAll = false}: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const newColumns: ColumnDef<TData, TValue>[] = useMemo(() => selectAll ? [selectAllComponent(), ...columns] : columns, []);
    const table = useReactTable({
        data,
        columns: newColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div>
            <div className="flex items-center py-4">
                <DataTableViewOptions table={table}/>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header: StringOrTemplateHeader) => {
                                    console.log(header);
                                    return (
                                        <TableHead key={header.id}>
                                            {/*{header.isPlaceholder*/}
                                            {/*    ? null*/}
                                            {/*    : flexRender(*/}
                                            {/*        () => (*/}
                                            {/*            <div className="flex flex-1">*/}
                                            {/*                {header.column.getCanSort() ? getSortComponent(header.getContext()) : header.column.columnDef.header }*/}
                                            {/*                {header.column.getCanFilter() && getFilterComponent(header.getContext())}*/}
                                            {/*            </div>*/}
                                            {/*        ),*/}
                                            {/*        header.getContext()*/}
                                            {/*    )}*/}
                                            <div className="flex flex-1">
                                                {header.column.getCanSort() ? getSortComponent(header.getContext()) : (
                                                    <div className="flex items-center mr-3">
                                                        {header.column.columnDef.header}
                                                    </div>
                                                )}
                                                {header.column.getCanFilter() && getFilterComponent(header.getContext())}
                                            </div>
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table}/>
            </div>
        </div>
    );
};

export default DataTable;