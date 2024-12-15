const { shopifyGraphQLRequest } = require("../utils/shopifyFetch");
const fs = require("fs");
const path = require("path");

const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        return reject(`Error reading file: ${err}`);
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData); // Resolve with the parsed JSON data
      } catch (parseErr) {
        reject(`Error parsing JSON: ${parseErr}`);
      }
    });
  });
};

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
    let variables = {
      source: "", // Replace with actual theme source
      name: `${niche}-${colorScheme}-Theme`,
    };

    if (colorScheme === "red") {
      variables.source =
        "https://github.com/hamzaadil56/zipfile/raw/refs/heads/main/store%20generator%20red.zip";
    } else if (colorScheme === "green") {
      variables.source =
        "https://github.com/hamzaadil56/zipfile/raw/refs/heads/main/store%20generator%20green.zip";
    } else {
      variables.source =
        "https://github.com/hamzaadil56/zipfile/raw/refs/heads/main/store%20generator%20black%20(1).zip";
    }

    const response = await shopifyGraphQLRequest(
      storeUrl,
      accessToken,
      query,
      variables
    );
    if (response.data.themeCreate.userErrors.length > 0) {
      return res.status(500).json({
        error: "Failed to create theme",
        details: response.data.themeCreate.userErrors[0].message,
      });
    }

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
    if (response.data.themePublish.userErrors.length > 0) {
      return res.status(500).json({
        error: "Failed to publishTheme theme",
        details: response.data.themePublish.userErrors[0].message,
      });
    }

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
  const { storeUrl, accessToken, collectionId, niche } = req.body;
  if (!collectionId || !niche) {
    res.status(500).json({
      error: "Missing collectionId or niche in the request body",
    });
  }

  const filePath = path.join(__dirname, "../niches.json");
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

    const niches = await readJsonFile(filePath);
    const selectedNicheData = niches?.filter((item) => item?.niche === niche);
    let promises = [];

    // Create promises for all items in selectedNicheData
    if (selectedNicheData && selectedNicheData.length > 0) {
      promises = selectedNicheData.map((item, index) => {
        const variables = {
          input: {
            title: item?.title,
            descriptionHtml: item?.descriptionHtml,
            collectionsToJoin: [collectionId],
            handle: `${item?.handle}-${item?.id}`,
          },
          media: item?.images?.map((image) => ({
            originalSource: image,
            alt: item?.title,
            mediaContentType: "IMAGE",
          })),
        };

        // Return the promise for shopifyGraphQLRequest
        return shopifyGraphQLRequest(storeUrl, accessToken, query, variables);
      });
    }

    const results = await Promise.all(promises);
    console.log(results[0], "results");

    const productIds = results.map((response) => {
      const product = response.data?.productCreate?.product;
      if (response.data?.productCreate?.userErrors?.length > 0) {
        return response.data?.productCreate?.userErrors[0]?.message;
      }

      return product?.id;
    });

    res.status(200).json({
      message: "Products added successfully",
      productIds,
    });
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({
      error: "Failed to add products",
      details: error?.message,
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
