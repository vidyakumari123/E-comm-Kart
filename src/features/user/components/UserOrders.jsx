import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectUserOrders } from "../userSlice";
import { selectUserInfo } from "../userSlice";

function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserOrderAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div>
      {orders?.map((order) => (
        <div key={order.id}>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h2 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Order # :{order.id}
              </h2>
              <h1 className="text-4xl my-5 font-bold tracking-tight text-red-900">
                Order Status :{order.status}
              </h1>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt={item.title}
                          src={item.thumbnail}
                          className="size-full object-cover"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.title}</a>
                            </h3>
                            <p className="ml-4">${item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.brand}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label className="inline mr-5 text-sm font-medium text-gray-900">
                              Qty:{item.quantity}
                            </label>
                          </div>

                          <div className="flex"></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.totalAmount}</p>
              </div>

              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items in cart</p>
                <p>${order.totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout
              </p>

              <div className="mt-6 border border-gray-200 rounded-md p-4 flex justify-between items-center">
                {/* Left Side: Name, Street, and Phone */}
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold text-gray-900">
                    {order.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-xs text-gray-500">
                    {order.selectedAddress.street}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Phone:{order.selectedAddress.phone}
                  </p>
                </div>

                {/* Right Side: PinCode and City (Removed 'hidden' class) */}
                <div className="shrink-0 flex flex-col items-end">
                  <p className="text-sm font-medium text-gray-900">
                    {order.selectedAddress.pinCode}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {order.selectedAddress.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;
