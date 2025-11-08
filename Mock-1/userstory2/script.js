// Fetch events from JSON file
const fetchEvents = async () => {
  try {
    const response = await fetch("events.json")
    const data = await response.json()
    return data.events
  } catch (error) {
    console.log("Error fetching events:", error)
    return []
  }
}

// Create HTML for one event card
const createEventCard = (event) => {
  return `
    <div class="event-card">
      <span class="category-badge">${event.category}</span>
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p>${event.description}</p>
    </div>
  `
}

// Show all events in the container
const displayEvents = (events) => {
  const container = document.getElementById("eventsContainer")
  const loadingDiv = document.getElementById("loadingContainer")

  loadingDiv.style.display = "none"

  if (events.length === 0) {
    container.innerHTML = '<div class="no-events">No events found</div>'
    return
  }

  // Create HTML for all events
  let html = ""
  for (const event of events) {
    html += createEventCard(event)
  }

  container.innerHTML = html
}

// Get unique categories from events
const getCategories = (events) => {
  const categories = []
  for (const event of events) {
    if (!categories.includes(event.category)) {
      categories.push(event.category)
    }
  }
  return categories
}

// Fill dropdown with categories
const fillCategoryDropdown = (categories) => {
  const select = document.getElementById("categoryFilter")
  for (const category of categories) {
    const option = document.createElement("option")
    option.value = category
    option.textContent = category
    select.appendChild(option)
  }
}

// Filter events by category
const filterEvents = (events, category) => {
  if (category === "") {
    return events
  }
  const filtered = []
  for (const event of events) {
    if (event.category === category) {
      filtered.push(event)
    }
  }
  return filtered
}

// Store all events
let allEvents = []

// Start the app
const startApp = async () => {
  allEvents = await fetchEvents()

  if (allEvents.length > 0) {
    const categories = getCategories(allEvents)
    fillCategoryDropdown(categories)
    displayEvents(allEvents)
  }
}

// Filter button change event
document.getElementById("categoryFilter").addEventListener("change", (e) => {
  const selectedCategory = e.target.value
  const filtered = filterEvents(allEvents, selectedCategory)
  displayEvents(filtered)
})

// Reset button click event
document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("categoryFilter").value = ""
  displayEvents(allEvents)
})

// Load events when page starts
startApp()
