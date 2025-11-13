import React, { useState, Suspense, lazy, memo } from "react";

import StatsCard from "./components/StatsCard";
import ErrorBoundary from "./components/ErrorBoundary";
import BrokenProductCard from "./components/BrokenProductCard";
import Modal from "./components/Modal";

// Lazy loaded components
const CourseDetails = lazy(() => import("./components/CourseDetails"));
const InstructorProfile = lazy(() => import("./components/InstructorProfile"));

function Loader() {
  return <div>Loading...</div>;
}

export default function App() {
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [stats, setStats] = useState([
    { id: 1, title: "Users", value: 1200, lastUpdated: new Date().toLocaleTimeString() },
    { id: 2, title: "Courses", value: 32, lastUpdated: new Date().toLocaleTimeString() },
    { id: 3, title: "Revenue", value: "$9,100", lastUpdated: new Date().toLocaleTimeString() },
  ]);

  const [broken, setBroken] = useState(false);

  function simulateUpdate(cardId) {
    setStats(cards =>
      cards.map(card =>
        card.id === cardId
          ? { ...card, value: card.value + "*", lastUpdated: new Date().toLocaleTimeString() }
          : card
      )
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>React Advanced Concepts — Full Project</h1>

      {/* ------------------------------ */}
      {/* Challenge 1 — Lazy Loading     */}
      {/* ------------------------------ */}
      <h2>1. Lazy Loading</h2>

      <button onClick={() => setShowCourseDetails(s => !s)}>
        {showCourseDetails ? "Hide" : "Show"} Course Details
      </button>

      <button onClick={() => setShowInstructor(s => !s)}>
        {showInstructor ? "Hide" : "Show"} Instructor Profile
      </button>

      <Suspense fallback={<Loader />}>
        {showCourseDetails && <CourseDetails />}
        {showInstructor && <InstructorProfile />}
      </Suspense>

      <hr />

      {/* ------------------------------ */}
      {/* Challenge 2 — Pure Components  */}
      {/* ------------------------------ */}
      <h2>2. Pure Components</h2>

      {stats.map(card => (
        <div key={card.id} style={{ marginBottom: 10 }}>
          <StatsCard {...card} />
          <button onClick={() => simulateUpdate(card.id)}>Simulate Update</button>
        </div>
      ))}

      <hr />

      {/* ------------------------------ */}
      {/* Challenge 3 — Error Boundary    */}
      {/* ------------------------------ */}
      <h2>3. Error Boundary</h2>

      <button onClick={() => setBroken(b => !b)}>
        {broken ? "Fix Component" : "Break Component"}
      </button>

      <ErrorBoundary>
        <BrokenProductCard shouldThrow={broken} />
      </ErrorBoundary>

      <hr />

      {/* ------------------------------ */}
      {/* Challenge 4 — Portals           */}
      {/* ------------------------------ */}
      <h2>4. Portal Modal</h2>

      <button onClick={() => setModalOpen(true)}>Open Modal</button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h3>This is a Portal Modal</h3>
        <p>Rendered outside the React root using ReactDOM.createPortal.</p>
      </Modal>
    </div>
  );
}
