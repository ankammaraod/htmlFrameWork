/* eslint-disable max-len */
const assert = require('assert');
const lib = require('../src/generateTag.js');
const { stringify } = lib;
const { closing } = lib;
const { html } = lib;

describe('closing', () => {
  it('Should generate closing tag', () => {
    assert.deepStrictEqual(closing('div'), '</div>');
  });

  it('Should generate self closing tag', () => {
    assert.deepStrictEqual(closing('div'), '</div>');
  });

});

describe('stringify', () => {
  it('Should stringify the id attributes ', () => {
    const actual = stringify({ id: '1' });
    const expected = 'id="1"';
    assert.deepStrictEqual(actual, expected);
  });

  it('Should stringify the class attributes ', () => {
    const actual = stringify({ class: 'closure' });
    const expected = 'class="closure"';
    assert.deepStrictEqual(actual, expected);
  });

  it('Should stringify the style attributes ', () => {
    const actual = stringify({ style: { 'height': '30px' } });
    const expected = 'style="height:30px;"';
    assert.deepStrictEqual(actual, expected);
  });

  it('Should stringify more than one attributes ', () => {
    const actual = stringify({
      id: '1',
      class: 'closure',
      style: { 'height': '30px' }
    });
    const expected = 'id="1" class="closure" style="height:30px;"';
    assert.deepStrictEqual(actual, expected);
  });
});

describe('html', () => {
  it('Should html generate tag with content', () => {
    assert.deepStrictEqual(html(['div', {}, 'content']), '<div >content</div>');
  });

  it('Should html generate tag with content and attribute ', () => {
    const actual = html(['div', { class: 'closure' }, 'content']);
    const expected = '<div class="closure">content</div>';
    assert.deepStrictEqual(actual, expected);
  });

  it('Should html generate tag with only attribute ', () => {
    const actual = html(['div', { class: 'closure' }]);
    const expected = '<div class="closure"></div>';
    assert.deepStrictEqual(actual, expected);
  });

  it('Should html generate nested tags', () => {
    const actual = html(['div', { class: 'closure' }, ['p', {}, 'content']]);

    const expected = '<div class="closure"><p >content</p></div>';
    assert.deepStrictEqual(actual, expected);
  });

  it('Should html generate sibling tags in nested', () => {
    const actual = html(
      ['div', { class: 'closure' },
        ['p', {}, 'content1'],
        ['p', {}, 'content2']
      ]
    );

    const expected = '<div class="closure"><p >content1</p><p >content2</p></div>';
    assert.deepStrictEqual(actual, expected);
  });

});
