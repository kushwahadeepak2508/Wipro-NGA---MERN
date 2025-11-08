"use client"

import { useState } from "react"

export function HoistingDemo() {
  const [explanation, setExplanation] = useState("")

  const handleVariableHoisting = () => {
    const code = `
// Variable Hoisting Example
console.log(x); // undefined (hoisted but not initialized)
var x = 5;
console.log(x); // 5

// This is equivalent to:
var x;
console.log(x); // undefined
x = 5;
console.log(x); // 5
    `
    setExplanation(code)
    console.log("Variable Hoisting:", code)
  }

  const handleFunctionHoisting = () => {
    const code = `
// Function Hoisting Example
sayHello(); // "Hello!" (works because function is hoisted)

function sayHello() {
  console.log("Hello!");
}

// Arrow functions are NOT hoisted
// sayHi(); // Error: Cannot access 'sayHi' before initialization
const sayHi = () => console.log("Hi!");
    `
    setExplanation(code)
    console.log("Function Hoisting:", code)
  }

  const handleDemoVariableHoisting = () => {
    console.clear()
    // This demonstrates hoisting
    var y
    console.log("Before declaration, y is:", typeof y) // undefined
    y = 10
    console.log("After declaration, y is:", y) // 10
    alert("Check console to see variable hoisting in action!")
  }

  const handleDemoFunctionHoisting = () => {
    console.clear()
    // This works because functions are hoisted
    function myFunction() {
      console.log("Function was called!")
    }
    myFunction() // "Function was called!"
    alert("Check console - function was called before declaration!")
  }

  return (
    <div style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "15px", borderRadius: "4px" }}>
      <h3>Hoisting Demo</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleVariableHoisting}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6f42c1",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Show Variable Hoisting
          </button>
          <button
            onClick={handleFunctionHoisting}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6f42c1",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Show Function Hoisting
          </button>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleDemoVariableHoisting}
            style={{
              padding: "8px 16px",
              backgroundColor: "#17a2b8",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Demo Variable Hoisting
          </button>
          <button
            onClick={handleDemoFunctionHoisting}
            style={{
              padding: "8px 16px",
              backgroundColor: "#17a2b8",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Demo Function Hoisting
          </button>
        </div>
        {explanation && (
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "12px",
            }}
          >
            {explanation}
          </pre>
        )}
      </div>
    </div>
  )
}
