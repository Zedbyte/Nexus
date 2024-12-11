import mysql from 'mysql2/promise';

class User {
    constructor() {
        this.db = mysql.createPool({
            host: 'localhost',
            user: 'root',  // Replace with your MySQL username
            password: '',  // Replace with your MySQL password
            database: 'nexus'  // Replace with your database name
        });
    }

    async save(data) {
        const sql = `INSERT INTO users (first_name, last_name, username, phone_number, email_address, password, bio, profile_picture)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await this.db.execute(sql, [
            data.first_name,
            data.last_name,
            data.username,
            data.phone_number,
            data.email_address,
            data.password, // Ensure password is hashed in production
            data.bio,
            data.profile_picture // Binary data for LONG BLOB
        ]);
        return result.insertId;
    }

    async getUser(userId) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await this.db.execute(sql, [userId]);
        return rows[0];
    }

    async update(userId, data) {
        const sql = `UPDATE users 
                     SET first_name = ?, last_name = ?, username = ?, phone_number = ?, email_address = ?, password = ?, bio = ?, profile_picture = ?
                     WHERE id = ?`;
        const [result] = await this.db.execute(sql, [
            data.first_name,
            data.last_name,
            data.username,
            data.phone_number,
            data.email_address,
            data.password,
            data.bio,
            data.profile_picture, // Update profile picture
            userId
        ]);
        return result.affectedRows > 0;
    }

    async delete(userId) {
        const sql = 'DELETE FROM users WHERE id = ?';
        const [result] = await this.db.execute(sql, [userId]);
        return result.affectedRows > 0;
    }

    async authenticateUser(usernameOrEmail, password) {
        const sql = 'SELECT * FROM users WHERE username = ? OR email_address = ?';
        const [rows] = await this.db.execute(sql, [usernameOrEmail, usernameOrEmail]);

        const user = rows[0];

        // Check if user exists
        if (!user) {
            throw new Error('User not found');
        }

        // Compare passwords directly (not secure)
        if (user.password !== password) {
            throw new Error('Invalid password');
        }

        // Return user details without password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

export default User;
