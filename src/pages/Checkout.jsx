import { XMarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
} from "../features/cart/cartSlice";
import { useState } from "react";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { updateCartAsync } from "../features/cart/cartSlice";
import {
  updateUserAsync
} from "../features/auth/authSlice";
import { selectUserInfo } from "../features/user/userSlice";

function Checkout() {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0,
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const currentOrder = useSelector(selectCurrentOrder);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  // const handleOrder = (e) => {
  //   e.preventDefault();

  //   if (selectedAddress && paymentMethod) {
  //     const order = {
  //       items,
  //       totalAmount,
  //       totalItems,
  //       user: user.id,
  //       paymentMethod,
  //       selectedAddress,
  //       status: "pending",
  //     };

  //     dispatch(createOrderAsync(order));
  //   } else {
  //     alert("Enter Address and Payment method");
  //   }
  // };
  const handleOrder = (e) => {
    e.preventDefault();
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user: user.id,
        paymentMethod,
        selectedAddress,
        status: "pending", // other status can be delivered, received.
      };
      dispatch(createOrderAsync(order));
      // need to redirect from here to a new page of order success.
    } else {
      alert("Enter Address and Payment method");
    }
  };
  console.log("currentOrder:", currentOrder);
  console.log("USER:", user);
  return (
    <>
      {currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 bg-gray-50 min-h-screen py-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="bg-white px-8 py-10 shadow-sm rounded-2xl border border-gray-100"
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...(user.addresses || []), data],
                  }),
                );
                reset();
              })}
            >
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Use a permanent address where you can receive mail safely.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        {...register("name", { required: "name is required" })}
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "email is required",
                        })}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "phone is required",
                        })}
                        type="tel"
                        autoComplete="phone"
                        className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        id="street"
                        {...register("street", {
                          required: "Street is required",
                        })}
                        type="text"
                        autoComplete="street"
                        className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        {...register("city", { required: "city is required" })}
                        type="text"
                        autoComplete="city"
                        className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        id="state"
                        {...register("state", {
                          required: "State is required",
                        })}
                        type="text"
                        autoComplete="state"
                        className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        id="pinCode"
                        {...register("pinCode", {
                          required: "pinCode is required",
                        })}
                        type="text"
                        autoComplete="postal-code"
                        className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-4 mb-8">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                  onClick={() => reset()}
                >
                  Clear Fields
                </button>
                <button
                  type="submit"
                  className="rounded-xl border border-transparent bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Address
                </button>
              </div>

              <div className="border-t border-gray-100 pt-10 pb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Saved Addresses
                </h2>
                <p className="mt-1 text-sm text-gray-500 mb-6">
                  Select an address for delivery
                </p>
                <ul role="list" className="space-y-4">
                  {user.addresses.map((address, index) => (
                    <li
                      key={index}
                      className={`flex justify-between gap-x-6 px-5 py-5 rounded-xl border-2 transition-all cursor-pointer ${selectedAddress === address ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200 hover:border-indigo-300'}`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex min-w-0 gap-x-4 items-start">
                        <input
                          onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={index}
                          checked={selectedAddress === address}
                          className="mt-1 relative size-5 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-base font-bold text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-600 font-medium">
                            {address.street}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 sm:hidden">
                            {address.city}, {address.state} {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end text-sm text-gray-600">
                        <p className="font-medium text-gray-900">
                          {address.phone}
                        </p>
                        <p className="mt-1">
                          {address.city}, {address.state}
                        </p>
                        <p className="mt-1">
                          {address.pinCode}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 space-y-8">
                  <fieldset>
                    <legend className="text-xl font-bold text-gray-900 mb-2">
                      Payment Method
                    </legend>
                    <p className="mt-1 text-sm text-gray-500 mb-6">Choose how you'd like to pay</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label 
                        className={`flex items-center gap-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "cash" ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200 hover:border-indigo-300'}`}
                      >
                        <input
                          id="cash"
                          name="payments"
                          onChange={handlePayment}
                          value="cash"
                          checked={paymentMethod === "cash"}
                          type="radio"
                          className="relative size-5 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                        <span className="block text-sm font-bold text-gray-900">
                          Cash on Delivery
                        </span>
                      </label>
                      
                      <label 
                        className={`flex items-center gap-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "card" ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200 hover:border-indigo-300'}`}
                      >
                        <input
                          id="card"
                          onChange={handlePayment}
                          value="card"
                          name="payments"
                          checked={paymentMethod === "card"}
                          type="radio"
                          className="relative size-5 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                        <span className="block text-sm font-bold text-gray-900">
                          Card Payment
                        </span>
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden sticky top-24">
              <div className="px-4 py-8 sm:px-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6 border-b border-gray-100 pb-4">
                  Order Summary
                </h2>

                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-100">
                    {items.map((item) => (
                      <li key={item.id} className="flex py-6 transition-colors hover:bg-gray-50 -mx-4 px-4 rounded-xl">
                        <div className="size-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-1.5">
                          <img
                            alt={item.title}
                            src={item.thumbnail}
                            className="size-full object-contain mix-blend-multiply"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-semibold text-gray-900 mb-1">
                              <h3>
                                <Link to={`/product-detail/${item.id}`} className="hover:text-indigo-600 transition-colors">
                                  {item.title}
                                </Link>
                              </h3>
                              <p className="ml-4 text-base">${item.price}</p>
                            </div>
                            <p className="text-xs text-gray-500 font-medium bg-gray-100 inline-block px-2 py-0.5 rounded-full">
                              {item.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm mt-3">
                            <div className="flex items-center gap-2 text-gray-500">
                              <label
                                htmlFor={`quantity-${item.id}`}
                                className="text-xs font-semibold text-gray-900"
                              >
                                Qty
                              </label>
                              <select
                                id={`quantity-${item.id}`}
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                                className="block w-16 rounded-md border-gray-300 py-1 pl-2 pr-6 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white shadow-sm"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                              </select>
                            </div>

                            <button
                              onClick={(e) => handleRemove(e, item.id)}
                              type="button"
                              className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md"
                            >
                              <XMarkIcon className="size-3" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-100 px-4 py-6 sm:px-6 bg-gray-50/50">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium text-gray-600">
                    <p>Total Items</p>
                    <p>{totalItems} items</p>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <p>Subtotal</p>
                    <p className="text-xl">${totalAmount}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                
                <div className="mt-8">
                  <button
                    onClick={handleOrder}
                    disabled={!selectedAddress || !paymentMethod}
                    className={`flex w-full cursor-pointer items-center justify-center rounded-xl border border-transparent px-6 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 ${!selectedAddress || !paymentMethod ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-indigo-600 shadow-indigo-600/30 hover:bg-indigo-500 hover:-translate-y-0.5'}`}
                  >
                    Place Order Now
                  </button>
                    {(!selectedAddress || !paymentMethod) && (
                      <p className="text-center text-xs mt-3 text-red-500 font-medium">Please select an address and payment method in order to proceed.</p>
                    )}
                </div>
                <div className="mt-6 flex justify-center text-center text-sm font-medium text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
                      <button
                        type="button"
                        className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors inline-flex items-center gap-1"
                      >
                        Continue Shopping
                        <span aria-hidden="true">&rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
