import React from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";

const DataTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
    } = useTable({ columns, data: data || [] }, useGlobalFilter, usePagination);

    const { globalFilter, pageIndex, pageSize } = state;

    const handleSearchChange = (e) => {
        setGlobalFilter(e.target.value || undefined);
    };

    return (
        <>
            <div>
                <div className="flex justify-start">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={globalFilter || ""}
                        onChange={handleSearchChange}
                        className="px-4 py-2 border mb-3 focus:outline-gray-400 border-gray-500 rounded"
                    />
                </div>

                <table {...getTableProps()} className="min-w-full ">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()} className="border  border-black px-4 py-2">
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} className="border border-black  px-4 py-2">
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="mt-4 flex justify-between">
                    <button
                        className="px-3 py-1 border border-black border-opacity-25 rounded"
                        onClick={() => previousPage()}
                    >
                        Previous
                    </button>
                    <span>
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
                        </strong>
                    </span>
                    <button className="px-3 py-1 border border-black border-opacity-25 rounded" onClick={() => nextPage()}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default DataTable;
