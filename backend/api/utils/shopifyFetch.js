async function shopifyGraphQLRequest(shop, accessToken, query, variables = {}) {
  try {
    const response = await fetch(shop, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: JSON.stringify({ query,variables }),
    });

    if (!response?.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data?.errors) {
      throw new Error(JSON.stringify(data.errors));
    }

    return data;
  } catch (error) {
    console.error("Shopify GraphQL Request Error:", error);
    throw error;
  }
}

module.exports = { shopifyGraphQLRequest };
