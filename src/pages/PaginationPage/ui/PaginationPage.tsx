import { SectionTitle } from "@/shared/ui/SectionTitle";
import { Pagination } from "@/shared/ui/Pagination";
import { useCallback, useState } from "react";
import { PreviewComponents } from "@/widgets/PreviewComponents";

const PaginationPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Pagination</SectionTitle>
        <div className="subsections">
          <PreviewComponents title="Pagination Square" direction="vertical">
            <Pagination
              totalItemsOnPage={10}
              totalItems={200}
              currentPage={currentPage}
              onChange={handleChangePage}
              maxDisplayedPages={5}
              size="small"
              borderRadius="round"
            />
            <Pagination
              totalItemsOnPage={10}
              totalItems={200}
              currentPage={currentPage}
              onChange={handleChangePage}
              maxDisplayedPages={5}
              size="medium"
              borderRadius="round"
            />
          </PreviewComponents>
          <PreviewComponents title="Pagination Round" direction="vertical">
            <Pagination
              totalItemsOnPage={10}
              totalItems={200}
              currentPage={currentPage}
              onChange={handleChangePage}
              maxDisplayedPages={5}
              size="small"
              borderRadius="everywhere"
            />
            <Pagination
              totalItemsOnPage={10}
              totalItems={200}
              currentPage={currentPage}
              onChange={handleChangePage}
              maxDisplayedPages={5}
              size="medium"
              borderRadius="everywhere"
              color="primary"
            />
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default PaginationPage;
