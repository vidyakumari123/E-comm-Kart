const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function addToCart(item) {
  const response = await fetch(`${apiUrl}/cart`, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: { 
      'content-type': 'application/json',
      'Bypass-Tunnel-Reminder': 'true' 
    },
  });

  const data = await response.json();
  return { data };
}

export async function fetchItemsByUserId(userId) {
  const response = await fetch(
    `${apiUrl}/cart?user=${userId}`,
    { headers: { 'Bypass-Tunnel-Reminder': 'true' } }
  );
  const data = await response.json();
  return { data };
}


export async function updateCart(update) {
  const response = await fetch(`${apiUrl}/cart/${update.id}`, {
    method: 'PATCH',
    body: JSON.stringify(update),
    headers: { 
      'content-type': 'application/json',
      'Bypass-Tunnel-Reminder': 'true'
    },
  });

  const data = await response.json();
  return { data };
}

export async function deleteItemFromCart(itemId) {
  await fetch(`${apiUrl}/cart/${itemId}`, {
    method: 'DELETE',
    headers: { 
      'content-type': 'application/json',
      'Bypass-Tunnel-Reminder': 'true'
    },
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