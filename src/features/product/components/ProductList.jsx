import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../common/Pagination";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectCategories,
  selectBrands,
  selectTotalItems,
} from "../productSlice";
import { ITEMS_PER_PAGE } from "../../../app/constant";
// import { fetchCategories } from "./productAPI";
const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectAllProducts) || [];
  const [filter, setFilter] = useState({});
  const totalItems = useSelector(selectTotalItems)
  const [page, setPage] = useState(1);
  const brands = useSelector(selectBrands)
  const categories = useSelector(selectCategories)

  const filters = [
  {
    id: "brand",
    name: "Brands",
    options: brands
  },
  {
    id: "category",
    name: "Category",
    options: categories
  },
];


  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value,
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (page) => {
    console.log("PAGE CLICKED:", page);
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);


 useEffect(() => {
    dispatch(fetchBrandsAsync())
     dispatch(fetchCategoriesAsync())
  }, [dispatch]);

  return (
    <div className="bg-white">
      <div className="bg-gray-50 pb-20">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            handleFilter={handleFilter}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
          ></MobileFilter>

          {/* Premium Hero Section */}
          <div className="bg-white border-b border-gray-100">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                Explore Products
              </h1>
              <p className="text-lg text-gray-500 max-w-2xl">
                Discover our curated collection of premium items, designed to elevate your everyday experience.
              </p>
            </div>
          </div>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex items-baseline justify-between border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Filters & Sorting
              </h2>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="group inline-flex items-center justify-center rounded-lg bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-200">
                    Sort by
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-2 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <p
                            onClick={(e) => handleSort(e, option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden",
                            )}
                          >
                            {option.name}
                          </p>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-indigo-600 transition-colors sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-indigo-600 transition-colors sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <DesktopFilter handleFilter={handleFilter} filters={filters}></DesktopFilter>
                {/* Product grid */}
                <div className="lg:col-span-3">
                  <ProductGrid products={products}></ProductGrid>
                </div>
              </div>
            </section>
            {/* section of product and filter end here */}
            {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"> */}
            <Pagination
              page={page}
              setPage={setPage}
              handlePage={handlePage}
              totalItems={totalItems}
            ></Pagination>
            {/* </div> */}
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({ mobileFiltersOpen, setMobileFiltersOpen,filters}) {
  return (
    <Dialog
      open={mobileFiltersOpen}
      onClose={setMobileFiltersOpen}
      className="relative z-40 "
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            {filters.map((section) => (
              <Disclosure
                key={section.id}
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon
                        aria-hidden="true"
                        className="size-5 group-data-open:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="size-5 group-not-data-open:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex gap-3">
                        <div className="flex h-5 shrink-0 items-center">
                          <div className="group grid size-4 grid-cols-1">
                            <input
                              defaultValue={option.value}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                            />
                            <svg
                              fill="none"
                              viewBox="0 0 14 14"
                              className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            >
                              <path
                                d="M3 8L6 11L11 3.5"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-checked:opacity-100"
                              />
                              <path
                                d="M3 7H11"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-indeterminate:opacity-100"
                              />
                            </svg>
                          </div>
                        </div>
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="min-w-0 flex-1 text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function DesktopFilter({ handleFilter,filters }) {
  return (
    <form className="hidden lg:block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Adjust Filters</h3>
      {filters.map((section) => (
        <Disclosure
          key={section.id}
          as="div"
          className="border-b border-gray-100 py-6 last:border-0 last:pb-0"
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-indigo-600 transition-colors">
              <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="size-5 group-data-open:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="size-5 group-not-data-open:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-3">
                  <div className="flex h-5 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultValue={option.value}
                        defaultChecked={option.checked}
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        onChange={(e) => handleFilter(e, section, option)}
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  );
}



function ProductGrid({ products }) {
  return (
    <div className="lg:col-span-3">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {Array.isArray(products) &&
            products.map((product) => (
              <Link to={`/product-detail/${product.id}`} key={product.id} className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer flex flex-col overflow-hidden h-full">
                <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-50 sm:aspect-none sm:h-60">
                  <img
                    alt={product.imageAlt}
                    src={product.thumbnail}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.deleted && (
                    <div className="absolute top-2 left-2 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200 shadow-sm z-10">
                      Deleted
                    </div>
                  )}
                  {product.stock <= 0 && (
                    <div className="absolute top-2 right-2 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200 shadow-sm z-10">
                      Out of Stock
                    </div>
                  )}
                </div>
                  
                <div className="flex flex-col flex-1 p-5 justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                      <StarIcon className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                    </div>
                  </div>
                    
                  <div className="mt-4 flex flex-col justify-end">
                    <p className="text-2xl font-bold text-gray-900">
                      ${Math.round(product.price * (1 - product.discountPercentage / 100))}
                    </p>
                    <p className="text-sm line-through font-medium text-gray-400 mt-0.5">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
