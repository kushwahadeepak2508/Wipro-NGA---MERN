"use client"

import { useState } from "react"
import type { NumberItem } from "@/types"
import { NumberList } from "@/components/NumberList"
import { FilterControls } from "@/components/FilterControls"
import { Logger } from "@/components/Logger"
import { HoistingDemo } from "@/components/HoistingDemo"
import { ConstructorDemo } from "@/components/ConstructorDemo"

const INITIAL_NUMBERS: NumberItem[] = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
]

export default function App() {
  const [numbers, setNumbers] = useState<NumberItem[]>(INITIAL_NUMBERS)
  const [filteredNumbers, setFilteredNumbers] = useState<NumberItem[]>(INITIAL_NUMBERS)
  const [mappedNumbers, setMappedNumbers] = useState<NumberItem[]>(INITIAL_NUMBERS)

  const handleFilter = (filtered: NumberItem[]) => {
    setFilteredNumbers(filtered)
    setMappedNumbers(filtered)
  }

  const handleMap = (mapped: NumberItem[]) => {
    setMappedNumbers(mapped)
  }

  return (
    <main style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px" }}>JavaScript Concepts Demo</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2>Array Operations</h2>
        <NumberList numbers={INITIAL_NUMBERS} title="Original Numbers (1-10)" />
        <FilterControls numbers={INITIAL_NUMBERS} onFilter={handleFilter} onMap={handleMap} />
        <NumberList numbers={mappedNumbers} title="Current Display" />
        <Logger numbers={mappedNumbers} />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Hoisting Examples</h2>
        <HoistingDemo />
      </section>

      <section>
        <h2>Constructor & Classes</h2>
        <ConstructorDemo />
      </section>
    </main>
  )
}
