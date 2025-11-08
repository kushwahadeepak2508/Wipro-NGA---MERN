"use client"

import { useState } from "react"

// Constructor Example
class Calculator {
  private value: number

  constructor(initialValue: number) {
    this.value = initialValue
  }

  add(num: number): number {
    this.value += num
    return this.value
  }

  subtract(num: number): number {
    this.value -= num
    return this.value
  }

  multiply(num: number): number {
    this.value *= num
    return this.value
  }

  getValue(): number {
    return this.value
  }

  reset(): void {
    this.value = 0
  }
}

export function ConstructorDemo() {
  const [result, setResult] = useState(0)
  const [calculator] = useState(() => new Calculator(0))

  const handleAdd = () => {
    const res = calculator.add(5)
    setResult(res)
    console.log("Added 5, result:", res)
  }

  const handleSubtract = () => {
    const res = calculator.subtract(3)
    setResult(res)
    console.log("Subtracted 3, result:", res)
  }

  const handleMultiply = () => {
    const res = calculator.multiply(2)
    setResult(res)
    console.log("Multiplied by 2, result:", res)
  }

  const handleReset = () => {
    calculator.reset()
    setResult(0)
    console.log("Calculator reset")
  }

  return (
    <div style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "15px", borderRadius: "4px" }}>
      <h3>Constructor Demo (Calculator Class)</h3>
      <div style={{ marginBottom: "15px" }}>
        <p>
          Current Result: <strong style={{ fontSize: "20px" }}>{result}</strong>
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <button
          onClick={handleAdd}
          style={{
            padding: "8px 16px",
            backgroundColor: "#fd7e14",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add 5
        </button>
        <button
          onClick={handleSubtract}
          style={{
            padding: "8px 16px",
            backgroundColor: "#fd7e14",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Subtract 3
        </button>
        <button
          onClick={handleMultiply}
          style={{
            padding: "8px 16px",
            backgroundColor: "#fd7e14",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Multiply by 2
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
      <p style={{ fontSize: "12px", marginTop: "10px", color: "#666" }}>
        The Calculator class demonstrates how constructors initialize object state, and methods operate on that state.
      </p>
    </div>
  )
}
