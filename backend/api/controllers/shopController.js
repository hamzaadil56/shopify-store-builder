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

const getCollection = async (req, res) => {
  const { storeUrl, accessToken } = req.body;
  try {
    const query = `
      query {
  collections(first: 1) {
    edges {
      node {
        id
        title
        handle
        updatedAt
        sortOrder
      }
    }
  }
}
    `;

    const response = await shopifyGraphQLRequest(storeUrl, accessToken, query);

    res.status(200).json({
      message: "Collection created successfully",
      collectionId: response.data.collections.edges[0].node.id,
    });
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({
      error: "Failed to create collection",
      details: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  const { storeUrl, accessToken, collectionId } = req.body;
  try {
    const query = `
      mutation CreateProductWithNewMedia($input: ProductInput!, $media: [CreateMediaInput!]) {
  productCreate(input: $input, media: $media) {
    product {
      id
      title
      media(first: 10) {
        nodes {
          alt
          mediaContentType
          preview {
            status
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
    `;

    const variables = {
      input: {
        title: "Multi-purpose eyebrow trimmer",
      },
      media: [
        {
          originalSource:
            "https://cdn.shopify.com/s/files/1/0690/8398/8265/files/12eeb80a-5e97-4c19-8d80-5aaa41216d87_800x800_f7e4b7fd-f771-451f-991a-6c24da523c27.jpg",
          alt: "Eye brow trimmer",
          mediaContentType: "IMAGE",
        },
      ],
      product: {
        collectionsToJoin: [collectionId],
      },
    };

    const response = await shopifyGraphQLRequest(
      storeUrl,
      accessToken,
      query,
      variables
    );

    res.status(200).json({
      message: "Products added successfully",
      productId: response.data.productCreate.product.id,
    });
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({
      error: "Failed to add products",
      details: error.message,
    });
  }
};

const getPublicationOfOnlineStore = async (req, res) => {
  const { storeUrl, accessToken } = req.body;
  try {
    const query = `
      query {
  publications(first: 1) {
    edges {
      node {
        id
        name
      }
    }
  }
}

    `;

    const response = await shopifyGraphQLRequest(storeUrl, accessToken, query);

    res.status(200).json({
      message: "Collection created successfully",
      publicationId: response.data.publications.edges[0].node.id,
    });
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({
      error: "Failed to create collection",
      details: error.message,
    });
  }
};

const publishProduct = async (req, res) => {
  const { storeUrl, accessToken, productId, publicationId } = req.body;
  try {
    const query = `
      mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
  publishablePublish(id: $id, input: $input) {
    
    shop {
      publicationCount
    }
    userErrors {
      field
      message
    }
  }
}
    `;

    const variables = {
      id: productId,
      input: {
        publicationId: publicationId,
      },
    };
    const response = await shopifyGraphQLRequest(
      storeUrl,
      accessToken,
      query,
      variables
    );

    res.status(200).json({
      message: "Product published successfully",
    });
  } catch (error) {
    console.error("Error publishing product:", error);
    res.status(500).json({
      error: "Failed to publish product",
      details: error.message,
    });
  }
};

module.exports = {
  getShopInfo,
  createTheme,
  publishTheme,
  getCollection,
  createProduct,
  getPublicationOfOnlineStore,
  publishProduct,
};
