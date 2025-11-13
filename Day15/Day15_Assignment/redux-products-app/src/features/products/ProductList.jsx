import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productsSlice";
import ProductEditor from "./ProductEditor";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === "loading") return <h2>Loading...</h2>;
  if (status === "failed") return <h2>Error: {error}</h2>;

  return (
    <div>
      <h1>Products</h1>
      {items.map((p) => (
        <div key={p.id} style={{ marginBottom: "20px" }}>
          <p>
            <strong>{p.name}</strong> — ${p.price}
          </p>

          <ProductEditor product={p} />
        </div>
      ))}
    </div>
  );
}
