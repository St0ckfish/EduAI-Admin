type PaginationProps = {
    totalElements: number;
    currentPage: number;
    elementsPerPage: number;
    onChangePage: (pageNum: number) => void;
    onChangeElementsPerPage: (num: number) => void;
  };
  
  const Pagination: React.FC<PaginationProps> = ({
    totalElements,
    currentPage,
    elementsPerPage,
    onChangePage,
    onChangeElementsPerPage,
  }) => {
    let totalPages = Math.ceil(totalElements+1 / elementsPerPage);
    if(elementsPerPage > totalElements){
        totalPages =0;
    }
    const prevPage = () => {
      let prevPage = currentPage - 1;
      if (prevPage < 0) prevPage = totalPages;
      onChangePage(prevPage);
    };
  
    const nextPage = () => {
      let nextPage = currentPage + 1;
      if (nextPage > totalPages) nextPage = totalPages;
      onChangePage(nextPage);
    };
  
    const addPageButton = ({
      pageNum,
      activeClass,
    }: {
      pageNum: number;
      activeClass: boolean;
    }) => (
      <button
        key={pageNum}
        style={{
          padding: "0.75rem 1rem",
          fontSize: "14px",
          backgroundColor: activeClass ? "#0077cc" : "transparent",
          color: activeClass ? "#FFFFFF" : "#B2B1B4",
          border: "none",
          cursor: "pointer",
        }}
        className="rounded-lg"
        onClick={() => onChangePage(pageNum)}
      >
        {pageNum+1}
      </button>
    );
  
    const renderPageButton = () => {
      const pagesButtons: React.ReactNode[] = [];
  
      if (totalPages <= 5) {
        for (let i = 0; i <= totalPages; i++) {
          pagesButtons.push(
            addPageButton({ pageNum: i, activeClass: currentPage === i }),
          );
        }
      } else {
        pagesButtons.push(
          addPageButton({ pageNum: 1, activeClass: currentPage === 1 }),
        );
  
        if (currentPage > 3) {
          pagesButtons.push(
            <span key="dots-1" style={{ margin: "0 0.5rem" }}>
              ...
            </span>,
          );
        }
  
        if (currentPage > 2 && currentPage < totalPages - 1) {
          pagesButtons.push(
            addPageButton({ pageNum: currentPage - 1, activeClass: false }),
          );
        }
  
        if (currentPage !== 1 && currentPage !== totalPages) {
          pagesButtons.push(
            addPageButton({ pageNum: currentPage, activeClass: true }),
          );
        }
  
        if (currentPage < totalPages - 1) {
          pagesButtons.push(
            addPageButton({ pageNum: currentPage + 1, activeClass: false }),
          );
        }
  
        if (currentPage < totalPages - 2) {
          pagesButtons.push(
            <span key="dots-2" style={{ margin: "0 0.5rem" }}>
              ...
            </span>,
          );
        }
  
        pagesButtons.push(
          addPageButton({
            pageNum: totalPages,
            activeClass: currentPage === totalPages,
          }),
        );
      }
  
      return pagesButtons;
    };
  
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.5rem",
          borderRadius: "0.125rem",
          padding: "0.5rem 1.5rem",
          color: "#1A202C",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" ,}}>
          <label htmlFor="elementsPerPage" style={{ fontSize: "14px" }} className="font-semibold">
            Show
          </label>
          <select
            id="elementsPerPage"
            className="px-3 py-2 rounded-lg outline-none font-semibold"
            value={elementsPerPage}
            onChange={e => onChangeElementsPerPage(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <label htmlFor="elementsPerPage" style={{ fontSize: "14px" }} className="font-semibold">
            Row
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            style={{
              visibility: currentPage === 0 ? "hidden" : "visible",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
            onClick={prevPage}
          >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#B2B1B4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
          </button>
  
          {renderPageButton()}
  
          <button
            style={{
              visibility: currentPage === totalPages ? "hidden" : "visible",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
            onClick={nextPage}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="#B2B1B4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };
  
  export default Pagination;
  