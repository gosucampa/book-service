import * as bookRepository from '../repositories/book.repository.js';
import { sequelize } from '../config/database.js';
import * as authorRepository from '../repositories/author.repository.js';
import {Author} from '../models/index.js';

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
  const t = await sequelize.transaction();
  try {
    const author = await authorRepository.findAuthorById(authorName, {
      attributes: ['name',
        [sequelize.col('birth_date'), 'birthDate']
      ],transaction: t
    });
    if (!author) {
      throw new Error(`Author with name ${authorName} not found`);
    }
    const books = await author.getBooks({
      joinTableAttributes: [],
      include: [
        {
          model: Author,
          as: 'authors',
          through: {attributes: []},
        }
      ], transaction: t
    });
    for (const book of books) {
      if (book.authors.length === 1) {
        await book.destroy({transaction: t});
      }
    }
    await author.destroy({transaction: t});
    await t.commit();
    return author;
  }catch (e) {
    await t.rollback();
    console.log('Error removing author:', e);
    throw e;
  }
}