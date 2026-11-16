import * as bookRepository from '../repositories/book.repository.js';
import { sequelize } from '../config/database.js';

export const findBookAuthors = async (isbn)  => {
  const book = await bookRepository.findBookById(isbn);
  if (!book) {
    throw new Error(`Book with isbn ${isbn} not found`);
  }
  return await book.getAuthors({
    attributes: ['name',
      [sequelize.col('birth_date'), 'birthDate']
    ],
    joinTableAttributes: []
  });
}

export const removeAuthor = async (authorName) => {
  // TODO: Implement removeAuthor service
}