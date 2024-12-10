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
        const sql = `INSERT INTO users (first_name, last_name, username, phone_number, email_address, password, bio)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await this.db.execute(sql, [
            data.first_name,
            data.last_name,
            data.username,
            data.phone_number,
            data.email_address,
            data.password, // Ensure password is hashed in production
            data.bio
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
                     SET first_name = ?, last_name = ?, username = ?, phone_number = ?, email_address = ?, bio = ?
                     WHERE id = ?`;
        const [result] = await this.db.execute(sql, [
            data.first_name,
            data.last_name,
            data.username,
            data.phone_number,
            data.email_address,
            data.bio,
            userId
        ]);
        return result.affectedRows > 0;
    }

    async delete(userId) {
        const sql = 'DELETE FROM users WHERE id = ?';
        const [result] = await this.db.execute(sql, [userId]);
        return result.affectedRows > 0;
    }
}

// Export the User class as the default export
export default User;
