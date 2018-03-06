const {jsdom} = require('jsdom');

const Video = require('../models/video');

// Create and return a sample Item object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'Shawshank Redemption';
  const description = options.description || 'Prison Escape Movie';
  return {title, description};
};

// Add a sample Item object to mongodb
const seedVideoToDatabase = async (options = {}) => {
  const item = await Item.create(buildVideoObject(options));
  return item;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

const findElementByID = (htmlAsString, element, id) => {
  const field = jsdom(htmlAsString).querySelector(`${element}[id="${id}"]`);
  if (field !== null) {
    return field;
  } else {
    throw new Error(`Form ${element} with ID "${id}" not found in HTML string`);
  }
};

module.exports = {
  buildVideoObject,
  seedVideoToDatabase,
  parseTextFromHTML,
  findElementByID
};