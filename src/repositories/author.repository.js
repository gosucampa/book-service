import {Author} from '../models/index.js';

export const findAuthorById = async (id) => await Author.findByPk(id);

export const addAuthor = async (author) => Author.create
({
  name: author.name,
  birth_date: new Date(author.birthDate)
});