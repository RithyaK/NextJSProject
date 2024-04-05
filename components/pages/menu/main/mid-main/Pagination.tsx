import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
type PaginationProps = {
  pages: number[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const Pagination = ({
  pages,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  function handleClickPrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleClickNextPage() {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <PaginationStyled>
      <FaArrowLeft onClick={handleClickPrevPage} />
      {pages.map((page) => (
        <span
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </span>
      ))}
      <FaArrowRight onClick={handleClickNextPage} />
    </PaginationStyled>
  );
};

export default Pagination;

const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    padding: 10px;
    margin: 5px 10px;
    border: 1px solid black;
    border-radius: 50%;
  }
  > *:hover {
    cursor: pointer;
    border: 1px solid white;
  }

  .active {
    color: white;
    border: 1px solid white;
  }
`;
