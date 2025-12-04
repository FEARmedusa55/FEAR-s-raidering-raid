const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory storage for markers (optional: save to file)
let markers = [];

// Endpoint to receive marker
app.post('/marker', (req, res) => {
    const { x, y, resolution } = req.body;
    if (x === undefined || y === undefined || !resolution) {
        return res.status(400).send("Invalid data");
    }

    const marker = { x, y, resolution, timestamp: new Date().toISOString() };
    markers.push(marker);

    // Optional: save to file
    fs.writeFileSync('markers.json', JSON.stringify(markers, null, 2));

    console.log('Marker received:', marker);
    res.send('Marker received');
});

// Optional endpoint to view all markers
app.get('/markers', (req, res) => {
    res.json(markers);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
