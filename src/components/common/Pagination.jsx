/** @format */

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getVisiblePages = () => {
    let start = Math.max(currentPage - 1, 1);

    let end = Math.min(start + 2, totalPages);

    if (end - start < 2) {
      start = Math.max(end - 2, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-blue-900 text-white disabled:opacity-50"
      >
        Previous
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-blue-900 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-blue-900 text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
