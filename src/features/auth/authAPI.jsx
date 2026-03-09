export async function createUser(userData) {
  const response = await fetch("http://localhost:8000/users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "content-type": "application/json" },
  });

  const data = await response.json();
  return { data };
}

export async function checkUser(loginInfo) {
  const email = loginInfo.email;
  const password = loginInfo.password;

  const response = await fetch("http://localhost:8000/users?email=" + email);
  const data = await response.json();

  if (data.length) {
    if (password === data[0].password) {
      return { data: data[0] };
    } else {
      throw new Error("wrong credentials");
    }
  } else {
    throw new Error("user not found");
  }
}

export async function signOut() {
  try {
    const response = await fetch('/auth/logout');

    if (response.ok) {
      return { data: 'success' };
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// export async function updateUser(update) {
//   const response = await fetch("http://localhost:8000/users/"+update.id, {
//     method: "PATCH",
//     body: JSON.stringify(update),
//     headers: { "content-type": "application/json" },
//   });

//   const data = await response.json();
//   return { data };
// }

