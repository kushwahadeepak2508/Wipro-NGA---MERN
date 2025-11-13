import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  productUpdatedLocally,
  updateProduct
} from "./productsSlice";

export default function ProductEditor({ product }) {
  const [form, setForm] = useState(product);
  const dispatch = useDispatch();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    dispatch(productUpdatedLocally(form)); // optimistic UI
    dispatch(updateProduct(form));
  };

  return (
    <div>
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        style={{ marginRight: 10 }}
      />

      <input
        name="price"
        value={form.price}
        onChange={onChange}
        style={{ marginRight: 10 }}
      />

      <button onClick={save}>Save</button>
    </div>
  );
}
