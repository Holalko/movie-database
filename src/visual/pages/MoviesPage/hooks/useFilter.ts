import { useAppDispatch } from "../../../../redux/hooks";
import { useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { parseQuery } from "../../../../requests/query";
import queryString from "query-string";
import { FetchMoviesFilterType } from "../slice";

const DEFAULT_FILTER: FetchMoviesFilterType = {
  page: 1,
  search: "",
};
export const useFilter = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [queryParams, setQueryParams] = useState(() => {
    const parsed = parseQuery<FetchMoviesFilterType>(history.location.search);
    return {
      ...DEFAULT_FILTER,
      page: parsed.page ? parseInt(parsed.page) : DEFAULT_FILTER.page,
      search: parsed.search,
    };
  });

  useEffect(() => {
    const unListen = history.listen((location) => {
      const parsed = parseQuery<FetchMoviesFilterType>(location.search);
      if (parsed)
        setQueryParams({
          page: parsed.page ? parseInt(parsed.page) : DEFAULT_FILTER.page,
          search: parsed.search || DEFAULT_FILTER.search,
        });
    });

    return () => {
      unListen();
    };
  }, [history, dispatch]);

  const handleMoviesSearch = useCallback(
    (search: string) => {
      history.push({
        search: queryString.stringify({ ...queryParams, search }),
      });
    },
    [history, queryParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      history.push({
        search: queryString.stringify({
          ...queryParams,
          page: Math.max(1, page),
        }),
      });
    },
    [history, queryParams]
  );

  return {
    filter: queryParams,
    actions: {
      handleMoviesSearch,
      handlePageChange,
    },
  };
};
