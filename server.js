const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Моковая база данных событий
const events = [
    { id: 1, name: "Basketball Tournament", category: "Sports", location: "Astana", coords: [51.169392, 71.449074] },
    { id: 2, name: "Football Match", category: "Sports", location: "Astana", coords: [51.127224, 71.416274] },
    { id: 3, name: "Psychology Workshop", category: "Psychology", location: "Astana", coords: [51.128763, 71.461044] },
    { id: 4, name: "Education Fair", category: "Education", location: "Astana", coords: [51.101851, 71.412149] },
    { id: 5, name: "Music Festival", category: "Entertainment", location: "Astana", coords: [51.150000, 71.400000] },
];

// Эндпоинт для получения всех событий
app.get('/events', (req, res) => {
    const { search, category } = req.query;

    let filteredEvents = events;

    // Поиск по ключевому слову
    if (search) {
        filteredEvents = filteredEvents.filter(event =>
            event.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Фильтрация по категории
    if (category) {
        filteredEvents = filteredEvents.filter(event => event.category === category);
    }

    res.json(filteredEvents);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


