/* eslint-disable no-underscore-dangle */
const moment = require('moment');

/*
Author. Title. Title of container (self contained if book),
Other contributors (translators or editors),
Version (edition), Number (vol. and/or no.), Publisher, Publication Date,
Location (pages, paragraphs URL or DOI).
2nd container’s title, Other contributors, Version, Number, Publisher,
Publication date, Location, Date of Access (if applicable).
*/
const authorName = (author) => {
  let str = `${author.lastName}, ${author.firstName}`;
  if (author.middleName) str += ` ${author.middleName.charAt(0)}`;
  return str;
};

// If there are three or more authors, list only the first author followed by the phrase et al.
const authorList = (authors) => {
  if (authors.length < 1) return '';
  if (authors.length === 1) {
    return `${authorName(authors[0].author)}.`;
  } else if (authors.length === 2) {
    return `${authorName(authors[0].author)}, and ${authorName(authors[1].author)}.`;
  }
  return `${authorName(authors[0].author)}, et al.`;
};

const article = (ref) => {
  let str = authorList(ref.authors);
  str += ` "${ref.title}." <i>${ref.journal}</i>, ${ref.volume}, ${ref.issue}, ${ref.year}`;
  if (ref.pages) str += `. ${ref.pages}`;
  str += '.';
  return { data: ref, html: str };
};

const book = (ref) => {
  let str = authorList(ref.authors);
  str += ` <i>${ref.title}</i>. ${ref.publisher}, ${ref.year}.`;
  return { data: ref, html: str };
};

const website = (ref) => {
  // MLA does not allow http(s) in urls
  let url;
  if (ref.url) {
    url = ref.url.replace('http://', '').replace('https://', '');
  }
  let str = authorList(ref.authors);
  str += ` <i>${ref.title}</i>. ${ref.siteTitle}`;
  if (ref.pubDate) {
    const pubDate = moment(ref.pubDate).format('D MMM. YYYY');
    str += `, ${pubDate}`;
  }
  str += `, ${url}.`;
  if (ref.accessDate) {
    const accessDate = moment(ref.accessDate).format('D MMM. YYYY');
    str += ` Accessed ${accessDate}.`;
  }
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
