import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Book } from './Book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async findAll(rating?: number, date?: Date): Promise<Book[]> {
    let query = 'SELECT * FROM books';
    if (rating) {
      query += ` WHERE rating >= ${rating}`;
    }
    if (date) {
      query += rating ? ' AND' : ' WHERE';
      query += ` date_written <= '${date.toISOString()}'`;
    }
    return this.connection.query(query);
  }

  async findOne(id: string): Promise<Book> {
    const result = await this.connection.query(
      `SELECT * FROM books WHERE id = '${id}'`,
    );
    return result[0];
  }

  async create(book: Book): Promise<Book> {
    await this.connection.query(
      `INSERT INTO books (id, date_written, date_added, author, description, rating) 
       VALUES ('${
         book.id
       }', '${book.date_written.toISOString()}', '${book.date_added.toISOString()}', 
               '${book.author}', '${book.description}', ${book.rating})`,
    );
    return this.findOne(book.id);
  }

  async update(id: string, book: Book): Promise<Book> {
    const result = await this.connection.query(
      `UPDATE books SET 
       date_written = '${book.date_written.toISOString()}', 
       date_added = '${book.date_added.toISOString()}', 
       author = '${book.author}', 
       description = '${book.description}', 
       rating = ${book.rating} 
       WHERE id = '${id}'`,
    );
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.connection.query(`DELETE FROM books WHERE id = '${id}'`);
  }
}
