import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectItems } from "../cart/cartSlice";
import { selectLoggedInUser } from "../auth/authSlice";

// const user = {
//   name: "Tom Cook",
//   email: "tom@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// };
const navigation = [
  { name: "Products", link: "/", user: true },
  { name: "Products", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];
const userNavigation = [
  { name: "MY Profile", link: "/profile", user: true, admin: true },
  { name: "My Orders", link: "/orders", user: true },
  { name: "Sign out", link: "/logout", user: true, admin: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-900 sticky top-0 z-50 shadow-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0 flex items-center gap-3 cursor-pointer transition-transform hover:scale-105">
                  <Link to="/" className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                      <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
                        className="size-8"
                      />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight hidden sm:block">ShopKart</span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-2">
                    {navigation.map((item) =>
                      item[user.role] ? (
                        <Link
                          key={item.name}
                          to={item.link}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-indigo-600 text-white shadow-sm"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200",
                            "rounded-lg px-4 py-2 text-sm font-semibold tracking-wide",
                          )}
                        >
                          {item.name}
                        </Link>
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6 gap-2">
                  <Link to="/cart" className="relative">
                    <button
                      type="button"
                      className="relative rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View cart</span>
                      <ShoppingCartIcon aria-hidden="true" className="size-6" />
                    </button>
                    {items.length > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center size-5 text-xs font-bold text-white bg-indigo-500 border-2 border-gray-900 rounded-full translate-x-1 -translate-y-1">
                        {items.length}
                      </span>
                    )}
                  </Link>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-transform hover:scale-105">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt="Profile"
                        src={
                          user?.imageUrl ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        className="size-9 rounded-full object-cover border-2 border-gray-700"
                      />
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 mb-1">
                        <p className="text-sm">Signed in as</p>
                        <p className="truncate text-sm font-semibold text-gray-900" title={user?.email}>{user?.email || "User"}</p>
                      </div>
                      {userNavigation.map((item) => (
                        item[user.role] ? (
                          <MenuItem key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.link}
                                className={classNames(
                                  active ? 'bg-gray-50 text-indigo-600' : 'text-gray-700',
                                  'block px-4 py-2 text-sm font-medium transition-colors'
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </MenuItem>
                        ) : null
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden items-center gap-2">
                <Link to="/cart" className="relative mr-2">
                  <button
                    type="button"
                    className="relative rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <ShoppingCartIcon aria-hidden="true" className="size-6" />
                  </button>
                  {items.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center size-5 text-xs font-bold text-white bg-indigo-500 border-2 border-gray-900 rounded-full translate-x-1 -translate-y-1">
                      {items.length}
                    </span>
                  )}
                </Link>
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden bg-gray-900 absolute w-full z-40 border-t border-gray-800 shadow-xl">
            <div className="space-y-1 px-4 pt-2 pb-3">
              {navigation.map((item) => (
                item[user.role] && (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.link}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-indigo-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white",
                      "block rounded-xl px-4 py-3 text-base font-medium transition-colors"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                )
              ))}
            </div>
            <div className="border-t border-gray-800 pt-4 pb-4">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={user?.imageUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    className="size-10 rounded-full border-2 border-indigo-500/30 p-0.5 object-cover"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-semibold text-white">
                    {user?.name || "User"}
                  </div>
                  <div className="text-sm font-medium text-indigo-300">
                    {user?.email}
                  </div>
                </div>
                <Link to="/cart" className="ml-auto">
                  <button
                    type="button"
                    className="relative shrink-0 rounded-full p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <ShoppingCartIcon aria-hidden="true" className="size-6" />
                    {items.length > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center size-5 text-xs font-bold text-white bg-indigo-500 border-2 border-gray-900 rounded-full">
                        {items.length}
                      </span>
                    )}
                  </button>
                </Link>
              </div>
              <div className="mt-3 space-y-1 px-4">
                {userNavigation.map((item) => (
                  item[user.role] ? (
                    <DisclosureButton
                      key={item.name}
                      as={Link}
                      to={item.link}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      {item.name}
                    </DisclosureButton>
                  ) : null
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="relative bg-white shadow-sm border-b border-gray-100 z-10">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              <span className="text-indigo-600">ShopKart</span>
            </h1>
          </div>
        </header>

        <main className="bg-gray-50 min-h-[calc(100vh-140px)]">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default Navbar;
