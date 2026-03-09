import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import {
  fetchAllOrdersAsync,
  selectTotalOrders,
  selectOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, EyeIcon , ArrowUpIcon,
  ArrowDownIcon, } from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
 const [sort, setSort] = useState({});
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
    console.log("Edit order:", order);
  };

  const handleShow = (order) => {
    console.log("Show order:", order);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handlePage = (page) => {
    setPage(page);
    
  };
  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    
    dispatch(fetchAllOrdersAsync({ sort,pagination}));
  }, [dispatch,sort, page]);
  return (
    <div className="overflow-x-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="font-sans overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manage Orders</h1>
          </div>
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden mb-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold leading-normal border-b border-gray-200">
                  <th className="py-3 px-6 text-left cursor-pointer" onClick={()=>
                  handleSort({sort :'id',
                    order:sort._order ===
                    'asc'?'desc':'asc'})}>
                        
                    Order#{''}
                        {sort._sort === 'id' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                    
                    </th>
                  <th className="py-3 px-6 text-left">Items</th>
<th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={() =>
                      handleSort({
                        sort: 'totalAmount',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Total Amount{' '}
                    {sort._sort === 'totalAmount' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <img
                            className="w-6 h-6"
                            src="https://img.icons8.com/color/48/000000/php.png"
                          />
                        </div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items?.map((item) => (
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.thumbnail}
                            />
                          </div>
                          <span>
                            {item.title}-#{item.quantity}-${item.price}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="text-sm leading-5">
                        <div className="font-semibold text-blue-700">
                          {order.selectedAddress.name}
                        </div>

                        <div className="text-gray-600">
                          {order.selectedAddress.street},{" "}
                          {order.selectedAddress.city}
                        </div>

                        <div className="text-indigo-600 text-xs">
                          {order.selectedAddress.state} -{" "}
                          {order.selectedAddress.pinCode}
                        </div>

                        <div className="text-green-600 text-xs font-medium">
                          {order.selectedAddress.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select 
                          onChange={(e) => handleOrderStatus(e, order)}
                          className="border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 py-1.5 pl-3 pr-8"
                        >
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status,
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center gap-3">
                        <button 
                          className="w-5 h-5 text-gray-400 hover:text-indigo-600 transition-colors"
                          title="View Order"
                        >
                          <EyeIcon
                            onClick={() => handleShow(order)}
                          ></EyeIcon>
                        </button>
                        <button 
                          className="w-5 h-5 text-gray-400 hover:text-indigo-600 transition-colors"
                          title="Edit Order"
                        >
                          <PencilIcon
                            onClick={() => handleEdit(order)}
                          ></PencilIcon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
