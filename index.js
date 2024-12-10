import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

// Import other modules as needed
import User from './src/models/User.js';
import Blog from './src/models/Blog.js';

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
const blogModel = new Blog();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory as Buffer

app.post('/api/users', upload.single('profile_picture'), async (req, res) => {
    try {
        const { first_name, last_name, username, phone_number, email_address, password, bio } = req.body;
        const profile_picture = req.file ? req.file.buffer : null; // Get the binary data

        const userId = await userModel.save({
            first_name,
            last_name,
            username,
            phone_number,
            email_address,
            password,
            bio,
            profile_picture, // Pass binary data to the model
        });

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

app.post('/api/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        const user = await userModel.authenticateUser(usernameOrEmail, password);
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error during authentication:', error.message);
        res.status(401).json({ success: false, error: error.message });
    }
});


// Add a new blog
app.post('/api/blogs', async (req, res) => {
    try {
        const {
            title, category, content, image, privacy, status, user_id
        } = req.body;

        const blogId = await blogModel.addBlog({
            title,
            category,
            content,
            image: Buffer.from(image, 'base64'), // Convert base64 to binary
            privacy,
            status,
            user_id
        });

        res.status(201).json({ success: true, blogId });
    } catch (error) {
        console.error('Error adding blog:', error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Fetch all blogs with optional filters
app.get('/api/blogs', async (req, res) => {
    try {
        const filters = {
            privacy: req.query.privacy,
            user_id: req.query.user_id
        };

        const blogs = await blogModel.fetchBlogs(filters);
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Fetch a single blog by ID
app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogModel.fetchBlogById(blogId);

        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Update a blog
app.put('/api/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const {
            title, category, content, image, privacy, status
        } = req.body;

        const isUpdated = await blogModel.updateBlog(blogId, {
            title,
            category,
            content,
            image: Buffer.from(image, 'base64'), // Convert base64 to binary
            privacy,
            status
        });

        if (!isUpdated) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }

        res.status(200).json({ success: true, message: 'Blog updated successfully' });
    } catch (error) {
        console.error('Error updating blog:', error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Delete a blog
app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;

        const isDeleted = await blogModel.deleteBlog(blogId);

        if (!isDeleted) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }

        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
