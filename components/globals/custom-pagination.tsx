import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type Props = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (val: number) => void;
};

const CustomPagination = (props: Props) => {
  const { itemsPerPage, totalItems, currentPage, onPageChange } = props;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const totalPages = Array(pageCount);

  const pageNumbers = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pageNumbers.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }

  if (totalItems < 1) {
    return null;
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            className={cn(
              " w-10 h-10 p-2 bg-brand-500 text-white rounded-[50%]",
              {
                "bg-gray-100 text-gray-800": currentPage == 1,
              }
            )}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage == 1}
          >
            <ChevronLeftIcon className="h-4 w-4 font-extrabold" />
          </Button>
        </PaginationItem>
        {pageNumbers.map((number, index) => (
          <PaginationItem
            key={index}
            // disabled={number === '...'}
            onClick={() => number !== "..." && onPageChange(number as number)}
            className={cn(
              "p-3 flex w-10 h-10 items-center justify-center text-gray-600 rounded-[50%] cursor-pointer",
              {
                "bg-brand-100 text-brand-700": number == currentPage,
              }
            )}
          >
            {number}
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            className={cn(
              " w-10 h-10 p-2 bg-brand-500 text-white rounded-[50%]",
              {
                "bg-gray-100 text-gray-800": currentPage == totalPages,
              }
            )}
            disabled={currentPage == totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRightIcon className="h-4 w-4 font-extrabold" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
