import {Book} from '../models/index.js'

export const addBook = async (book) => Book.create(book);

export const findBookById = async (id) => Book.findByPk(id);

export const removeBook = async (book) => book.destroy();

export const updateBookTitle = async (book, title) => book.update({title});
