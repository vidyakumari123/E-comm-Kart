const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchAllProducts() {
  const response = await fetch(`${apiUrl}/products`);
  const data = await response.json();
  return data;
}

// export async function fetchProductsByFilters(filter) {
//   let queryString = "";

//   if (filter) {
//     const params = new URLSearchParams(filter);
//     queryString = "?" + params.toString();
//   }

//   const response = await fetch(
//     `http://localhost:8000/products${queryString}`
//   );

//   const data = await response.json();
//   return data;
// }


export async function fetchCategories() {
  const response = await fetch(`${apiUrl}/categories`);
  const data = await response.json();
  return data;
}

export async function fetchBrands() {
  const response = await fetch(`${apiUrl}/brands`);
  const data = await response.json();
  return data;
}
export async function fetchProductById(id) {
  const response = await fetch(`${apiUrl}/products/`+id);
  const data = await response.json();
  return data;
}

export async function createProduct(product) {
  const response = await fetch(`${apiUrl}/products/`,
    {
       method: 'POST',
        body: JSON.stringify(product),
        headers: { 'content-type': 'application/json' },
    }
  );
  const data = await response.json();
  return data;
}

export async function updateProduct(update) {
  const response = await fetch(`${apiUrl}/products/`+ update.id,
    {
       method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
    }
  );
  const data = await response.json();
  return data;
}










export function fetchProductsByFilters(filter = {}, sort = {}, pagination = {}) {
  let queryString = '';

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues?.length) {
      categoryValues.forEach((value) => {
        queryString += `${key}=${value}&`;
      });
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise((resolve) => {
    fetch(`${apiUrl}/products?` + queryString)
      .then((response) => {
        const totalItems = response.headers.get('X-Total-Count');
        return response.json().then((data) => ({
          data,
          totalItems,
        }));
      })
      .then(({ data, totalItems }) => {
        resolve({
          data: {
            products: data,
            totalItems: +totalItems,
          },
        });
      });
  });
}