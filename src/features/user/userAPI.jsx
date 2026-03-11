const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchLoggedInUserOrders(userId) {
  const response = await fetch(`${apiUrl}/orders?user=${userId}`, {
    headers: { 'Bypass-Tunnel-Reminder': 'true' }
  });
  const data = await response.json();
  return { data };
}


export async function updateUser(update) {
  const response = await fetch(
    `${apiUrl}/users/${update.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { 
        "content-type": "application/json",
        "Bypass-Tunnel-Reminder": "true"
      },
    }
  );

  const data = await response.json();
  return { data };
}

export async function fetchLoggedInUser(userId) {
  // Changed /user/ to /users/ to match common json-server patterns
  const response = await fetch(`${apiUrl}/users/` + userId, {
    headers: { 'Bypass-Tunnel-Reminder': 'true' }
  });
  const data = await response.json();
  return { data };
}