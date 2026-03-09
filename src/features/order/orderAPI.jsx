export async function createOrder(order) {
  const response = await fetch('http://localhost:8000/orders', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'content-type': 'application/json' },
  });

  const data = await response.json();
  return { data };
}

export async function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  const response = await fetch("http://localhost:8000/orders?" + queryString);

  const data = await response.json();
  const totalOrders = response.headers.get("X-Total-Count");

  return { data: { orders: data, totalOrders: +totalOrders } };
}

export async function updateOrder(order) {
  const response = await fetch('http://localhost:8000/orders/'+order.id, {
    method: 'PATCH',
    body: JSON.stringify(order),
    headers: { 'content-type': 'application/json' },
  });

  const data = await response.json();
  return { data }
}