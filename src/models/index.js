import Book from "./book.model.js"
import Author from "./author.model.js"
import Publisher from "./publidher.model.js"
import {sequelize} from "../config/database.js";
import {DataTypes} from "sequelize";

// Book and Publisher. One-To-Many relationship
Book.belongsTo(Publisher, {
  foreignKey: 'publisher',
  targetKey: 'publisher_name',
  as: 'publisherDetails'
});

Publisher.hasMany(Book, {
  foreignKey: 'publisher',
  targetKey: 'publisher_name',
  as: 'books'
});

// Book and Author, Many-To-Many
// Define the junction table
const BookAuthors = sequelize.define('BooksAuthor',
  {
  isbn: {
    type: DataTypes.STRING,
    references: {
      model: Book,
      key: 'isbn'
    }
  },
    author_name: {
    type: DataTypes.STRING,
      references: {
        model: Author,
        key: 'name'
      }
    }
  }, {
  tableName: 'books_authors',
})

Book.belongsToMany(Author, {
  through: BookAuthors,
  foreignKey: 'isbn',
  otherKey: 'author_name',
  as: 'authors'
})

Author.belongsToMany(Book, {
  through: BookAuthors,
  foreignKey: 'author_name',
  otherKey: 'isbn',
  as: 'books'
})

const syncModels = async () => {
  try {
    await sequelize.sync();
    console.log('Models synced successfully')
  }catch (e) {
    console.error('Error syncing models:', e)
  }
}

export {syncModels, Book, Author, Publisher};