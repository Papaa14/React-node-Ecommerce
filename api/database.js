import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

export async function getNotes() {
    const [rows] = await pool.query('SELECT * FROM notes');
    return rows;
}

export async function getNoteById(id) {
    const [[note]] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);
    return note;
}
export async function getUser() {
    const [[rows]] = await pool.query('SELECT * FROM users');
    return rows;
}

export async function createNote(title, contents) {
    const [result] = await pool.query('INSERT INTO notes (title, contents) VALUES (?, ?)', [title, contents]);
    return getNoteById(result.insertId);
}

export async function register(name, username, email, phone, password, address) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const [result] = await pool.query('INSERT INTO users (name, username, email, phone, password, address) VALUES (?, ?, ?, ?, ?, ?)', [name, username, email, phone, hashedPassword, address]);   
        const user = await getUser(result.insertId);

        return {
            success: true,
            message: "Signed up successfully",
            user,
        };
    } catch (error) {
        // Handle errors (e.g., unique constraint violations)
        console.error("Error during registration:", error);
        return {
            success: false,
            message: "Registration failed. Please try again.",
        };
    }
}