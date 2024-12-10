import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import other modules as needed
import User from './src/models/User.js';

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Handle preflight requests
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(204).end();
});

// Middleware
app.use(bodyParser.json());

const userModel = new User();

// Routes
app.post('/api/users', async (req, res) => {
    try {
        const userId = await userModel.save(req.body);
        res.status(201).json({ success: true, userId });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/users/:id', getUserHandler);

// Modularized route handler
async function getUserHandler(req, res) {
    const userId = req.params.id;

    // Validate input
    if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await userModel.getUser(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user data in JSON format
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


app.put('/api/users/:id', async (req, res) => {
    try {
        const updated = await userModel.update(req.params.id, req.body);
        if (updated) {
            res.json({ success: true, message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const deleted = await userModel.delete(req.params.id);
        if (deleted) {
            res.json({ success: true, message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
