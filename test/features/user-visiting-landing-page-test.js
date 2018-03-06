const {assert} = require('chai');

describe('User visiting landing page', () => {
    describe('with no existing videos', () => {
        it('shows no videos', () => {
            browser.url('/');
            assert.equal(browser.getText('#videos-container'), '');
        });
    })

    describe('can navigate', () => {
        it('to the create page', () => {
          browser.url('/');
          browser.click('a[href="create.html"]');
          assert.include(browser.getText('body'), 'Save a video');
        });
    })
})