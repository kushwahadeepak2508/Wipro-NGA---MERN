"use client"

import type { NumberItem } from "@/types"

interface LoggerProps {
  numbers: NumberItem[]
}

export function Logger({ numbers }: LoggerProps) {
  const handleLogNumbers = () => {
    console.clear()
    console.log("=== Logging Numbers with forEach ===")
    numbers.forEach((item, index) => {
      console.log(`Index ${index}: ${item.value}`)
    })
    alert("Check console for logged numbers!")
  }

  const handleLogDoubled = () => {
    console.clear()
    console.log("=== Logging Doubled Numbers ===")
    numbers.forEach((item) => {
      console.log(`Original: ${item.value}, Doubled: ${item.value * 2}`)
    })
    alert("Check console for doubled numbers!")
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Logger (forEach Demo)</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleLogNumbers}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Log Numbers
        </button>
        <button
          onClick={handleLogDoubled}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Log Doubled
        </button>
      </div>
    </div>
  )
}
