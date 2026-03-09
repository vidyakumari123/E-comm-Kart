import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../app/constant";

export default function Pagination({ page, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-10 rounded-lg shadow-sm">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handlePage(page > 1 ? page - 1 : page)}
          disabled={page === 1}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors ${
            page === 1 ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:bg-gray-50"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePage(page < totalPages ? page + 1 : page)}
          disabled={page >= totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors ${
            page >= totalPages ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:bg-gray-50"
          }`}
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-semibold text-gray-900">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
            <span className="font-semibold text-gray-900">{Math.min(page * ITEMS_PER_PAGE, totalItems)}</span> of{" "}
            <span className="font-semibold text-gray-900">{totalItems}</span> results
          </p>
        </div>

        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              disabled={page === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 transition-colors ${
                page === 1 ? "bg-gray-50 opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePage(index + 1)}
                aria-current={page === index + 1 ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all ${
                  page === index + 1
                    ? "z-10 bg-indigo-600 text-white ring-indigo-600 rounded-md scale-105 shadow-md"
                    : "text-gray-900 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePage(page < totalPages ? page + 1 : page)}
              disabled={page >= totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 transition-colors ${
                page >= totalPages ? "bg-gray-50 opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}