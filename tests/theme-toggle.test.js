const { JSDOM } = require('jsdom');

// Save real Date to restore later
const RealDate = Date;
function mockDate() {
  global.Date = class extends RealDate {
    constructor(...args) {
      if (args.length === 0) {
        return new RealDate('2024-06-01T12:00:00Z');
      }
      return new RealDate(...args);
    }
    static now() {
      return new RealDate('2024-06-01T12:00:00Z').getTime();
    }
  };
}

describe('theme-toggle click handler', () => {
  let window, document, button;

  beforeEach(() => {
    mockDate();
    const dom = new JSDOM(`<!doctype html><body><button id="theme-toggle"></button></body>`, {
      url: 'http://localhost/'
    });
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
    jest.resetModules();
    require('../scripts/theme-toggle');
    document.dispatchEvent(new window.Event('DOMContentLoaded'));
    button = document.getElementById('theme-toggle');
  });

  afterEach(() => {
    global.Date = RealDate;
    delete global.window;
    delete global.document;
  });

  test('toggling classes on click', () => {
    expect(document.body.classList.contains('light-mode')).toBe(true);
    button.dispatchEvent(new window.Event('click'));
    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(document.body.classList.contains('light-mode')).toBe(false);
    button.dispatchEvent(new window.Event('click'));
    expect(document.body.classList.contains('light-mode')).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });
});
