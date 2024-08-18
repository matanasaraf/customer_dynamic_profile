const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // משרת את קבצי ה-HTML, CSS, ו-JavaScript

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // נתיב לקובץ ה-JSON
    const filePath = path.join(__dirname, 'users.json');

    // קריאת קובץ JSON המכיל את שמות המשתמשים והסיסמאות
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ success: false });
        }

        // פרסוס המידע מה-JSON
        const users = JSON.parse(data);
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

