export default function BrokenProductCard({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error("ProductCard crashed intentionally!");
  }

  return (
    <div style={{ padding: 10 }}>
      <h4>Product Card</h4>
      <p>Everything is fine 👍</p>
    </div>
  );
}
