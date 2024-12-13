const { shopifyGraphQLRequest } = require("../utils/shopifyFetch");

const getShopInfo = async (req, res) => {
  try {
    const { storeUrl, token } = req.body;

    if (!storeUrl || !token) {
      return res.status(400).json({
        error: "Missing storeUrl or token in the request body.",
      });
    }

    const query = `
      query {
        shop {
          name
          email
          plan {
            displayName
          }
          myshopifyDomain
          createdAt
          updatedAt
        }
      }
    `;

    const queryResponse = await shopifyGraphQLRequest(storeUrl, token, query);
    const data = queryResponse.data?.shop;
    console.log(queryResponse, "queryResponse");

    if (!data) {
      return res.status(500).json({
        error: "Missing shop data in the API response.",
      });
    }

    return res.json({
      email: data.email,
      plan: data.plan?.displayName,
      myshopifyDomain: data.myshopifyDomain,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  } catch (error) {
    console.error("Error in getShopInfo:", error);
    return res.status(500).json({
      error: "An unexpected error occurred.",
      details: error.message,
    });
  }
};

const createTheme = async (req, res) => {
  const { storeUrl, accessToken, niche, colorScheme } = req.body;
  try {
    const query = `
      mutation themeCreate($source: URL!, $name: String!) {
        themeCreate(source: $source, name: $name) {
          theme {
            name
            role
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // You might want to dynamically generate the theme source URL based on niche/color scheme
    const variables = {
      source:
        "https://github.com/hamzaadil56/zipfile/raw/refs/heads/main/store%20generator%20black%20(1).zip", // Replace with actual theme source
      name: `${niche}-${colorScheme}-Theme`,
    };

    const response = await shopifyGraphQLRequest(
      storeUrl,
      accessToken,
      query,
      variables
    );

    res.status(200).json({
      message: "Theme created successfully",
      theme: response.data.themeCreate.theme,
    });
  } catch (error) {
    console.error("Error creating theme:", error);
    res.status(500).json({
      error: "Failed to create theme",
      details: error.message,
    });
  }
};

const publishTheme = async (req, res) => {
  const { storeUrl, accessToken, themeId } = req.body;
  try {
    const query = `
      mutation themePublish($id: ID!) {
      themePublish(id: $id) {
    theme {
      id
    }
    userErrors {
      code
      field
      message
    }
  }
}
    `;

    const variables = {
      id: themeId,
    };

    const response = await shopifyGraphQLRequest(
      storeUrl,
      accessToken,
      query,
      variables
    );

    res.status(200).json({
      message: "Theme published successfully",
      theme: response.data.themePublish.theme,
      success: true,
    });
  } catch (error) {
    console.error("Error publishing theme:", error);
    res.status(500).json({
      error: "Failed to publish theme",
      details: error.message,
      success: false,
    });
  }
};

const addProducts = async (req, res) => {
  const { storeUrl, accessToken, products } = req.body;
  try {
    const query = `
      mutation productCreate($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: products,
    };

    const response = await shopifyGraphQLRequest(
      storeUrl,
      accessToken,
      query,
      variables
    );

    res.status(200).json({
      message: "Products added successfully",
      products: response.data.productCreate.products,
    });
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({
      error: "Failed to add products",
      details: error.message,
    });
  }
};

module.exports = {
  getShopInfo,
  createTheme,
  publishTheme,
};
