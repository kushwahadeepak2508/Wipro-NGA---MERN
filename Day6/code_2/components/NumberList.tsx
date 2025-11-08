"use client"

import type { NumberItem } from "@/types"

interface NumberListProps {
  numbers: NumberItem[]
  title: string
}

export function NumberList({ numbers, title }: NumberListProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {numbers.map((item) => (
          <span
            key={item.value}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f5f5f5",
            }}
          >
            {item.value}
          </span>
        ))}
      </div>
    </div>
  )
}
