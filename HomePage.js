const events = [
    { id: 1, name: "Basketball Tournament", category: "Sports", location: "Astana", coords: [51.169392, 71.449074] },
    { id: 2, name: "Football Match", category: "Sports", location: "Astana", coords: [51.127224, 71.416274] },
    { id: 3, name: "Psychology Workshop", category: "Psychology", location: "Astana", coords: [51.128763, 71.461044] },
    { id: 4, name: "Education Fair", category: "Education", location: "Astana", coords: [51.101851, 71.412149] },
    { id: 5, name: "Music Festival", category: "Entertainment", location: "Astana", coords: [51.150000, 71.400000] },
];

window.onload = function() {
    // Play the welcome sound when the page is loaded
    const audio = document.getElementById('welcome-sound');
    audio.play();  // Play the sound
    
    // You can also adjust the volume if needed
    audio.volume = 0.5; // Set volume to 50% (optional)
};

const filterEvents = (search = '', category = '') => {
    let filteredEvents = events;

    if (search) {
        filteredEvents = filteredEvents.filter(event =>
            event.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (category) {
        filteredEvents = filteredEvents.filter(event => event.category === category);
    }

    return filteredEvents;
};

const renderEvents = (events) => {
    const eventList = document.querySelector('.event-list');
    eventList.innerHTML = '<h3>List of events...</h3>';

    if (events.length === 0) {
        eventList.innerHTML += '<p>No events found.</p>';
        return;
    }

    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
            <h4>${event.name}</h4>
            <p>Category: ${event.category}</p>
            <p>Location: ${event.location}</p>
        `;
        eventList.appendChild(eventItem);
    });

    updateMapMarkers(events);
};

const updateMapMarkers = (events) => {
    map.eachLayer((layer) => {
        if (layer instanceof DG.Marker) {
            map.removeLayer(layer);
        }
    });

    events.forEach(event => {
        DG.marker(event.coords).addTo(map).bindPopup(event.name);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Wait for 2GIS API to load
    DG.then(() => {
        const map = DG.map('map', {
            center: [51.169392, 71.449074], // Astana coordinates
            zoom: 12, // Initial zoom level
        });

        // Add a marker to the map
        renderEvents(events);

        const searchInput = document.getElementById('search');
        const categoryButtons = document.querySelectorAll('.category');

        searchInput.addEventListener('input', () => {
            const searchQuery = searchInput.value;
            const filteredEvents = filterEvents(searchQuery, '');
            renderEvents(filteredEvents);
        });
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.textContent;
                const filteredEvents = filterEvents('', category);
                renderEvents(filteredEvents);
            });
        });

    })
});

document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'fb15eea66756cb2032f4ac7e0150ab38'; // Replace with your OpenWeatherMap API key
    const city = 'Astana';

    const fetchWeather = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            const temperature = data.main.temp;

            document.getElementById('temperature').innerText = `${temperature}°C`;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            document.getElementById('temperature').innerText = 'Error fetching data';
        }
    };

    fetchWeather();
});


