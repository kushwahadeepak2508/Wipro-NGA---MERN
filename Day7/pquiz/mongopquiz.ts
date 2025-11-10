// Use CommonJS style to avoid module import issues
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("retail_db");

    // ===================================================
    // 1. PRODUCT COLLECTION WITH VALIDATION
    // ===================================================
    await db.createCollection("products", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "category", "price", "stock"],
          properties: {
            name: { bsonType: "string" },
            category: { bsonType: "string" },
            price: { bsonType: "number", minimum: 0 },
            brand: { bsonType: "string" },
            stock: { bsonType: "int", minimum: 0 },
            specifications: { bsonType: "object" },
            createdAt: { bsonType: "date" }
          }
        }
      }
    }).catch(() => {});

    const products = db.collection("products");

    await products.insertMany([
      {
        name: "Samsung Galaxy S23",
        category: "Mobiles",
        price: 69999,
        brand: "Samsung",
        stock: 45,
        specifications: {
          ram: "8GB",
          storage: "256GB",
          camera: "108MP",
          battery: "5000mAh"
        },
        createdAt: new Date()
      },
      {
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 2499,
        brand: "SoundMax",
        stock: 120,
        specifications: {
          color: "Black",
          batteryLife: "20 hours",
          wireless: true
        },
        createdAt: new Date()
      },
      {
        name: "Men's Cotton T-Shirt",
        category: "Clothing",
        price: 499,
        brand: "Zara",
        stock: 200,
        specifications: {
          color: "Blue",
          size: ["S", "M", "L", "XL"],
          material: "100% Cotton"
        },
        createdAt: new Date()
      }
    ]);

    await products.createIndex({ category: 1 });
    await products.createIndex({ price: 1 });
    console.log("🧱 Product indexes created");

    // ===================================================
    // 2. USER COLLECTION WITH VALIDATION
    // ===================================================
    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["username", "email", "passwordHash"],
          properties: {
            username: { bsonType: "string" },
            email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
            passwordHash: { bsonType: "string" },
            role: { bsonType: "string" },
            createdAt: { bsonType: "date" },
            addresses: {
              bsonType: "array",
              items: {
                bsonType: "object",
                required: ["street", "city", "pincode"],
                properties: {
                  street: { bsonType: "string" },
                  city: { bsonType: "string" },
                  pincode: { bsonType: "string" }
                }
              }
            }
          }
        }
      }
    }).catch(() => {});

    const users = db.collection("users");

    const userInsert = await users.insertMany([
      {
        username: "deepakk",
        email: "deepak@example.com",
        passwordHash: "$2a$12$8Kc.xY4FkjQb1d6T...",
        role: "customer",
        createdAt: new Date(),
        addresses: [
          { street: "123 Park Avenue", city: "Mumbai", pincode: "400001" }
        ]
      },
      {
        username: "anita01",
        email: "anita@example.com",
        passwordHash: "$2a$12$xyzabcd123456...",
        role: "customer",
        createdAt: new Date()
      }
    ]);

    await users.createIndex({ email: 1 }, { unique: true });
    console.log("🧱 User index created");

    // ===================================================
    // 3. ORDER COLLECTION WITH VALIDATION
    // ===================================================
    await db.createCollection("orders", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "orderDate", "products", "totalAmount"],
          properties: {
            userId: { bsonType: "objectId" },
            orderDate: { bsonType: "date" },
            status: { bsonType: "string" },
            products: {
              bsonType: "array",
              items: {
                bsonType: "object",
                required: ["productId", "name", "quantity", "price"],
                properties: {
                  productId: { bsonType: "objectId" },
                  name: { bsonType: "string" },
                  quantity: { bsonType: "int", minimum: 1 },
                  price: { bsonType: "number", minimum: 0 }
                }
              }
            },
            totalAmount: { bsonType: "number" },
            paymentMethod: { bsonType: "string" },
            shippingAddress: {
              bsonType: "object",
              properties: {
                street: { bsonType: "string" },
                city: { bsonType: "string" },
                pincode: { bsonType: "string" }
              }
            }
          }
        }
      }
    }).catch(() => {});

    const orders = db.collection("orders");

    const sampleUserId1 = userInsert.insertedIds["0"];
    const sampleUserId2 = userInsert.insertedIds["1"];
    const productDocs = await products.find().toArray();

    // Safely access products with fallback
    const p1 = productDocs[0];
    const p2 = productDocs[1];
    const p3 = productDocs[2];

    if (!p1 || !p2 || !p3) {
      throw new Error("❌ Missing sample products. Ensure products inserted correctly.");
    }

    await orders.insertMany([
      {
        userId: sampleUserId1,
        orderDate: new Date(),
        status: "Delivered",
        products: [
          { productId: p1._id, name: p1.name, quantity: 1, price: p1.price },
          { productId: p2._id, name: p2.name, quantity: 1, price: p2.price }
        ],
        totalAmount: p1.price + p2.price,
        paymentMethod: "Credit Card",
        shippingAddress: {
          street: "12 MG Road",
          city: "Bangalore",
          pincode: "560001"
        }
      },
      {
        userId: sampleUserId2,
        orderDate: new Date(),
        status: "Shipped",
        products: [
          { productId: p3._id, name: p3.name, quantity: 3, price: p3.price }
        ],
        totalAmount: p3.price * 3,
        paymentMethod: "UPI",
        shippingAddress: {
          street: "45 Nehru Street",
          city: "Delhi",
          pincode: "110001"
        }
      }
    ]);

    await orders.createIndex({ userId: 1, orderDate: -1 });
    console.log("🧱 Order indexes created");

    // ===================================================
    // 4. SAMPLE QUERIES
    // ===================================================
    const mobiles = await products.find({ category: "Mobiles" }).toArray();
    console.log("📦 Mobiles:", mobiles);

    const deepakOrders = await orders.find({ userId: sampleUserId1 }).sort({ orderDate: -1 }).toArray();
    console.log("🛒 Deepak's Orders:", deepakOrders);

    const user = await users.findOne({ email: "deepak@example.com" });
    console.log("👤 User Found:", user);

    const midRange = await products.find({ price: { $gte: 1000, $lte: 10000 } }).toArray();
    console.log("💰 Mid-range products:", midRange);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("🔒 MongoDB connection closed");
  }
}

main();
