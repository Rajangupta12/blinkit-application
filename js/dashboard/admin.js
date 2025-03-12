// Fetch User Location
function fetchUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getLocationName(latitude, longitude); // Convert coordinates to address
            },
            (error) => {
                console.error("Error fetching location:", error);
                document.getElementById('user-location').textContent = "Location access denied";
            }
        );
    } else {
        document.getElementById('user-location').textContent = "Geolocation not supported";
    }
}

// Convert Coordinates to Location Name using Google Maps API
function getLocationName(latitude, longitude) {
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your Google Maps API key
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.results && data.results[0]) {
                const locationName = data.results[0].formatted_address;
                document.getElementById('user-location').textContent = locationName;
            } else {
                document.getElementById('user-location').textContent = "Location not found";
            }
        })
        .catch((error) => {
            console.error("Error fetching location name:", error);
            document.getElementById('user-location').textContent = "Error fetching location";
        });
}

// Toggle Slide-in Menu
function setupSlideInMenu() {
    const slideInBtn = document.querySelector('.slide-in-btn');
    const slideInMenu = document.querySelector('.slide-in-menu');
    const closeBtn = document.querySelector('.close-btn');

    // Toggle menu visibility
    slideInBtn.addEventListener('click', () => {
        slideInMenu.classList.toggle('hidden');
    });

    // Close menu when close button is clicked
    closeBtn.addEventListener('click', () => {
        slideInMenu.classList.add('hidden');
    });

    // Close menu when clicking outside
    window.addEventListener('click', (event) => {
        if (!event.target.matches('.slide-in-btn') && !event.target.closest('.slide-in-menu')) {
            slideInMenu.classList.add('hidden');
        }
    });
}

// Handle Search Input Functionality
function setupSearchInput() {
    const searchInput = document.getElementById('search-input');
    const searchOptions = document.getElementById('search-options');

    searchInput.addEventListener('input', function () {
        if (this.value.trim() === '') {
            searchOptions.classList.add('hidden'); // Hide dropdown if input is empty
        } else {
            searchOptions.classList.remove('hidden'); // Show dropdown if input has text
        }
    });

    // Add click event to search options
    searchOptions.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () => {
            searchInput.value = option.textContent; // Set input value to selected option
            searchOptions.classList.add('hidden'); // Hide dropdown after selection
        });
    });
}

// Initialize all functionalities
function initialize() {
    fetchUserLocation(); // Fetch and display user location
    setupSlideInMenu(); // Set up slide-in menu functionality
    setupSearchInput(); // Set up search input functionality
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initialize);