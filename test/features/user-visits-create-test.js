const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User visits the create page', () => {
    describe('posts a new item', () => {
      it('and is rendered', () => {
        const videoToCreate = buildVideoObject();
        browser.url('create.html');
        browser.setValue('#title-input', videoToCreate.title);
        browser.setValue('#description-input', videoToCreate.description);
        browser.click('#submit-button');
        assert.include(browser.getText('body'), videoToCreate.title);
      });
    });
});
