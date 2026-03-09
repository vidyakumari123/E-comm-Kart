
export async function fetchLoggedInUserOrders(userId) {
  const response = await fetch(`http://localhost:8000/orders?user=${userId}`);
  const data = await response.json();
  return { data };
}


export async function updateUser(update) {
  const response = await fetch(
    `http://localhost:8000/users/${update.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    }
  );

  const data = await response.json();
  return { data };
}

export async function fetchLoggedInUser(userId) {
  // Changed /user/ to /users/ to match common json-server patterns
  const response = await fetch(`http://localhost:8000/users/` + userId); 
  const data = await response.json();
  return { data };
}