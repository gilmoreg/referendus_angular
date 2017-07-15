/* eslint-disable no-underscore-dangle */
const moment = require('moment');

// http://www.press.uchicago.edu/books/turabian/turabian_citationguide.html
const lastFirst = (author) => {
  let str = `${author.lastName}, ${author.firstName}`;
  if (author.middleName) str += ` ${author.middleName.charAt(0)}`;
  return str;
};

const firstLast = (author) => {
  let str = author.firstName;
  if (author.middleName) str += `${author.middleName.charAt(0)}.`;
  str += ` ${author.lastName}`;
  return str;
};

const authorList = (authors) => {
  if (authors.length < 1) return '';
  if (authors.length === 1) {
    return `${lastFirst(authors[0].author)}.`;
  }
  // Format: Last, First M., and First M. Last.
  let str = `${lastFirst(authors[0].author)},`;
  // Last author has to be preceded by 'and', so count up to penultimate only
  for (let i = 1; i < authors.length - 1; i += 1) {
    str += `${firstLast(authors[i].author)}, `;
  }
  str += `and ${firstLast(authors[authors.length].author)}.`;
  return str;
};

const article = (ref) => {
  let str = authorList(ref.authors);
  str += ` "${ref.title}." <i>${ref.journal}</i> ${ref.volume}, no. ${ref.issue} (${ref.year})`;
  if (ref.pages) str += `: ${ref.pages}.`;
  else str += '.';
  return { data: ref, html: str };
};

const book = (ref) => {
  let str = authorList(ref.authors);
  str += ` <i>${ref.title}</i> (${ref.city}: ${ref.publisher}, ${ref.year})`;
  if (ref.pages) str += `, ${ref.pages}`;
  str += '.';
  return { data: ref, html: str };
};

const website = (ref) => {
  const authors = authorList(ref.authors);
  let str = '';
  if (authors) str += `${authors} `;
  str += `"${ref.title}." ${ref.siteTitle}. `;
  if (ref.pubDate) {
    const pubDate = moment(ref.pubDate).format('MMMM D, YYYY');
    str += `Last modified ${pubDate}. `;
  }
  if (ref.accessDate) {
    const accessDate = moment(ref.accessDate).format('MMMM D, YYYY');
    str += `Accessed ${accessDate}. `;
  }
  str += `${ref.url}.`;
  return { data: ref, html: str };
};

exports.format = (ref) => {
  switch (ref.type.toLowerCase()) {
    case 'article': return article(ref);
    case 'book': return book(ref);
    case 'website': return website(ref);
    default: return Error('Invalid type');
  }
};
