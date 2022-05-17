/* eslint-disable max-len */
const format = (value) => {
  return Object.entries(value).map(
    ([property, value]) => property + ':' + value + ';'
  ).join(' ');
};

const stringify = (attributes) => {
  return Object.entries(attributes).map(([key, value]) => {
    const newValue = key === 'style' ? format(value) : value;
    return key + '=' + '"' + newValue + '"';
  }
  ).join(' ');
};

const closing = (tag) => {
  const selfClosingTags = ['img'];
  return selfClosingTags.includes(tag) ? '' : '</' + tag + '>';
};

const html = ([tag, attribute, ...content]) => {
  const formattedAttr = stringify(attribute);
  const newContent = content.map(element => Array.isArray(element) ? html(element) : element).join('');

  return '<' + tag + ' ' + formattedAttr + '>' + newContent + closing(tag);
};

exports.html = html;
