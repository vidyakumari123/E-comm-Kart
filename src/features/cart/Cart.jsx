import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { deleteItemFromCartAsync, selectItems } from "./cartSlice";
import { updateCartAsync } from "./cartSlice";
import { Navigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0,
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
const handleQuantity =(e,item)=>{
 dispatch(updateCartAsync({...item, quantity:+e.target.value}))
}
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
        {!items.length && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto mt-12 bg-white max-w-4xl px-4 sm:px-6 lg:px-8 shadow-sm rounded-2xl border border-gray-100 overflow-hidden mb-12">
        <div className="px-4 py-8 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8 border-b border-gray-100 pb-4">
            Shopping Cart
          </h2>

          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6 transition-colors hover:bg-gray-50 -mx-4 px-4 rounded-xl">
                  <div className="size-28 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-2">
                    <img
                      alt={item.title}
                      src={item.thumbnail}
                      className="size-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="ml-6 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-semibold text-gray-900 mb-1">
                        <h3>
                          <Link to={`/product-detail/${item.id}`} className="hover:text-indigo-600 transition-colors">
                            {item.title}
                          </Link>
                        </h3>
                        <p className="ml-4 text-lg">${item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 font-medium bg-gray-100 inline-block px-2.5 py-0.5 rounded-full">
                        {item.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm mt-4">
                      <div className="flex items-center gap-3 text-gray-500">
                        <label
                          htmlFor={`quantity-${item.id}`}
                          className="text-sm font-semibold text-gray-900"
                        >
                          Qty
                        </label>
                        <select 
                          id={`quantity-${item.id}`}
                          onChange={(e) => handleQuantity(e, item)} 
                          value={item.quantity}
                          className="block w-20 rounded-lg border-gray-300 py-1.5 pl-3 pr-8 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white shadow-sm"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          onClick={e => handleRemove(e, item.id)}
                          type="button"
                          className="flex items-center gap-1.5 font-medium text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg"
                        >
                          <XMarkIcon className="size-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 px-4 py-8 sm:px-6 bg-gray-50/50">
          <div className="space-y-4">
            <div className="flex justify-between text-base font-semibold text-gray-900">
              <p>Subtotal ({totalItems} items)</p>
              <p className="text-xl">${totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
          
          <div className="mt-8">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:-translate-y-0.5 transition-all duration-200"
            >
              Proceed to Checkout
            </Link>
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
    </>
  );
}
