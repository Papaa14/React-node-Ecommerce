import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

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

export async function createNote(title, contents) {
    const [result] = await pool.query('INSERT INTO notes (title, contents) VALUES (?, ?)', [title, contents]);
    return getNoteById(result.insertId);
}
