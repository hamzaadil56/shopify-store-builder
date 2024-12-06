const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

app.post("/api/shop", async (req, res) => {
  const response = await fetch(req.body.storeUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": req.body.token,
    },
    body: JSON.stringify({
      query: `
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
        `,
    }),
  });

  const queryResponse = await response.json();
  const data = queryResponse.data.shop;
  return res.json({
    email: data.email,
    plan: data.plan.displayName,
    myshopifyDomain: data.myshopifyDomain,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
