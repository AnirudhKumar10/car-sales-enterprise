import { usePagination, useTable } from "react-table";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { Spinner } from "./Spinner";
import { FcSearch } from "react-icons/fc";

export interface SalesTableProps<T extends TableRowData> {
  columns: T;
  data: Array<T>;
}

export type TableRowData = { [key in string]: any };

export const SalesTable = ({ columns, data }: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        data,
        columns,
      },
      usePagination
    );

  const { isLoading } = useAppSelector((state: RootState) => state.sales);

  return (
    <div className="relative">
      {isLoading ? (
        <div className="flex h-96 justify-center items-center">
          <Spinner />
        </div>
      ) : data.length !== 0 ? (
        <>
          <div className="overflow-auto max-h-96">
            <table
              {...getTableProps()}
              className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead className="text-xs text-gray-700 uppercase bg-slate-400 dark:bg-gray-700 dark:text-gray-400">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        className="py-3 px-6 min-w-6"
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell, i) => {
                        return i === 0 ? (
                          <th
                            className={
                              "py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            }
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </th>
                        ) : (
                          <td className={"py-4 px-6"} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between px-12 py-4 items-center">
            <div>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  1-10
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  1000
                </span>
              </span>
            </div>

            <div>
              <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Previous
              </button>

              <button className="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
              </button>
            </div>

            <div>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" flex text-5xl text-center p-24 w-fit mx-auto">
            <FcSearch />
            <span className="p-4 text-3xl">{"NO RECORDS FOUND"}</span>
          </div>
        </>
      )}
    </div>
  );
};
