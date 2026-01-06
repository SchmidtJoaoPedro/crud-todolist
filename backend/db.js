import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Sua senha aqui 
  database: 'todo_app',
  waitForConnections: true,
  connectionLimit: 15
})
