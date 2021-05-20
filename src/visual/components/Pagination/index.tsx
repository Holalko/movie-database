import React from "react";
import { Button } from "react-bootstrap";

type PaginationProps = {
  page: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  onPageChange,
  page,
  resultsPerPage,
  totalResults,
}: PaginationProps) => {
  return (
    <>
      <Button
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <Button
        size="sm"
        disabled={totalResults < resultsPerPage * page}
        onClick={() => onPageChange(page + 1)}
        className={"float-right"}
      >
        Next
      </Button>
    </>
  );
};

export default Pagination;
