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
  const { shop, accessToken, niche, colorScheme } = req.body;
  try {
    const query = `
      mutation themeCreate($source: URL!, $name: String!) {
        themeCreate(source: $source, name: $name) {
          theme {
            name
            role
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
      source: "https://example.com/theme-source-url", // Replace with actual theme source
      name: `${niche}-${colorScheme}-Theme`,
    };

    const response = await shopifyGraphQLRequest(
      shop,
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

module.exports = {
  getShopInfo,
  createTheme,
};
