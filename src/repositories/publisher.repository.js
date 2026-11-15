import { Publisher } from '../models/index.js';

export const findPublisherById = async (id) => await Publisher.findByPk(id);

export const addPublisher = async (publisher) => Publisher.create
({
  publisher_name: publisherName
  }
);