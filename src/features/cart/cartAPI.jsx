export async function addToCart(item) {
  const response = await fetch('http://localhost:8000/cart', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: { 'content-type': 'application/json' },
  });

  const data = await response.json();
  return { data };
}

export async function fetchItemsByUserId(userId) {
  const response = await fetch(
    `http://localhost:8000/cart?user=${userId}`
  );
  const data = await response.json();
  return { data };
}


export async function updateCart(update) {
  const response = await fetch(`http://localhost:8000/cart/${update.id}`, {
    method: 'PATCH',
    body: JSON.stringify(update),
    headers: { 'content-type': 'application/json' },
  });

  const data = await response.json();
  return { data };
}

export async function deleteItemFromCart(itemId) {
  await fetch(`http://localhost:8000/cart/${itemId}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
  });

  return { data: { id: itemId } };
}



export async function resetCart(userId) {
  // get all items of user's cart - and then delete each
  const response = await fetchItemsByUserId(userId);
  const items = response.data;

  for (let item of items) {
    await deleteItemFromCart(item.id);
  }

  return { status: "success" };
}

// export async function resetCart() {
//   const response = await fetchItemsByUserId();
//   const items = response.data;

//   for (let item of items) {
//     await deleteItemFromCart(item.id);
//   }

//   return { status: 'success' };
// }