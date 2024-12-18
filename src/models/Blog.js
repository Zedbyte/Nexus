import mysql from 'mysql2/promise';

class Blog {
    constructor() {
        this.db = mysql.createPool({
            host: 'localhost',
            user: 'root', // Replace with your MySQL username
            password: '', // Replace with your MySQL password
            database: 'nexus' // Replace with your database name
        });
    }

    // Add a new blog
    async addBlog(data) {
        const sql = `
            INSERT INTO blogs (title, category, content, image, privacy, status, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await this.db.execute(sql, [
            data.title,
            data.category,
            data.content,
            data.image, // Pass binary data for LONG BLOB
            data.privacy,
            data.status,
            data.user_id
        ]);
        return result.insertId; // Return the ID of the newly created blog
    }

    // Fetch all blogs with optional filters (e.g., privacy, user_id)
    async fetchAllPublicBlogs() {
        const sql = `
            SELECT 
                blogs.*, 
                CONCAT(users.first_name, ' ', users.last_name) AS author
            FROM blogs
            INNER JOIN users ON blogs.user_id = users.id
            WHERE blogs.privacy = 'public'
            ORDER BY blogs.created_at DESC
        `;
        const [rows] = await this.db.execute(sql);
        return rows;
    }

    async fetchPublicBlogsForLoggedInUser(userId) {
        const sql = `
            SELECT 
                blogs.*, 
                CONCAT(users.first_name, ' ', users.last_name) AS author
            FROM blogs
            INNER JOIN users ON blogs.user_id = users.id
            WHERE blogs.privacy = 'public'
            AND blogs.user_id != ?
            ORDER BY blogs.created_at DESC
        `;
        const [rows] = await this.db.execute(sql, [userId]);
        return rows;
    }
    
    async fetchUserBlogs(userId) {
        const sql = `
            SELECT 
                blogs.*, 
                CONCAT(users.first_name, ' ', users.last_name) AS author
            FROM blogs
            INNER JOIN users ON blogs.user_id = users.id
            WHERE blogs.user_id = ?
            ORDER BY blogs.created_at DESC
        `;
        const [rows] = await this.db.execute(sql, [userId]);
        return rows;
    }
    
    

    // Fetch a single blog by ID
    async fetchBlogById(blogId) {
        const sql = `SELECT * FROM blogs WHERE id = ?`;
        const [rows] = await this.db.execute(sql, [blogId]);
        return rows[0]; // Return the first row or undefined if not found
    }

    // Update a blog
    async updateBlog(blogId, data) {
        const sql = `
            UPDATE blogs
            SET title = ?, category = ?, content = ?, image = ?, privacy = ?, status = ?, updated_at = CURRENT_TIMESTAMP()
            WHERE id = ?
        `;
        const [result] = await this.db.execute(sql, [
            data.title,
            data.category,
            data.content,
            data.image, // Pass binary data for LONG BLOB
            data.privacy,
            data.status,
            blogId
        ]);
        return result.affectedRows > 0; // Return true if the update was successful
    }

    // Delete a blog
    async deleteBlog(blogId) {
        const sql = `DELETE FROM blogs WHERE id = ?`;
        const [result] = await this.db.execute(sql, [blogId]);
        return result.affectedRows > 0; // Return true if the deletion was successful
    }
}

export default Blog;
