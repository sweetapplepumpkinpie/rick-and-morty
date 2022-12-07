import { useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { AppContext } from "../Dashboard";
import { PageItem } from "./PageItem";

interface IProps {
  className: string;
}

export const Pagination: React.FC<IProps> = ({ ...props }) => {
  const store = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const currentPage = +(searchParams.get("page") ?? "1");
  const pages = useMemo(() => {
    return store?.pageInfo?.pages ?? 10;
  }, [store?.pageInfo]);
  const limitCondition = currentPage > 3 && currentPage < pages - 2;

  return (
    <div {...props}>
      <div className="flex justify-end">
        <div className="flex spacing gap-x-1">
          <PageItem prev disabled={currentPage === 1} current={currentPage} />
          <PageItem number={1} active={currentPage === 1} />
          {pages > 2 && (
            <PageItem
              isEmpty={limitCondition && currentPage > 4}
              active={currentPage === 2}
              number={2}
            />
          )}
          {pages > 3 && (
            <PageItem
              number={!limitCondition ? 3 : currentPage - 1}
              active={currentPage === 3}
            />
          )}
          {pages > 4 && (
            <PageItem
              active={limitCondition}
              isEmpty={!limitCondition}
              number={currentPage}
            />
          )}
          {pages > 5 && (
            <PageItem
              number={!limitCondition ? pages - 2 : currentPage + 1}
              active={currentPage === pages - 2}
            />
          )}
          {pages > 6 && (
            <PageItem
              isEmpty={limitCondition && currentPage < pages - 3}
              number={pages - 1}
              active={currentPage === pages - 1}
            />
          )}
          {pages > 1 && (
            <PageItem number={pages} active={currentPage === pages} />
          )}
          <PageItem
            next
            disabled={currentPage === pages}
            current={currentPage}
          />
        </div>
      </div>
    </div>
  );
};
