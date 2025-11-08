"use client"

import type { NumberItem } from "@/types"
import { useState } from "react"

interface FilterControlsProps {
  numbers: NumberItem[]
  onFilter: (filtered: NumberItem[]) => void
  onMap: (mapped: NumberItem[]) => void
}

export function FilterControls({ numbers, onFilter, onMap }: FilterControlsProps) {
  const [activeFilter, setActiveFilter] = useState<"even" | "all">("all")

  const handleFilterEven = () => {
    const filtered = numbers.filter((item) => item.value % 2 === 0)
    onFilter(filtered)
    setActiveFilter("even")
  }

  const handleShowAll = () => {
    onFilter(numbers)
    setActiveFilter("all")
  }

  const handleMapDoubled = () => {
    const mapped = numbers.map((item) => ({
      value: item.value * 2,
    }))
    onMap(mapped)
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Filter & Map Controls</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleShowAll}
          style={{
            padding: "8px 16px",
            backgroundColor: activeFilter === "all" ? "#007bff" : "#e9ecef",
            color: activeFilter === "all" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Show All
        </button>
        <button
          onClick={handleFilterEven}
          style={{
            padding: "8px 16px",
            backgroundColor: activeFilter === "even" ? "#007bff" : "#e9ecef",
            color: activeFilter === "even" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Filter Even
        </button>
        <button
          onClick={handleMapDoubled}
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Double Numbers
        </button>
      </div>
    </div>
  )
}
