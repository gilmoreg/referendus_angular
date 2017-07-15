const moment = require('moment');

const apaName = (author) => {
  let str = `${author.lastName}, ${author.firstName.charAt(0)}.`;
  if (author.middleName) str += ` ${author.middleName.charAt(0)}.`;
  return str;
};

const authorList = (authors) => {
  if (authors.length < 1) return '';
  let str = '';
  // Single author
  if (authors.length === 1) {
    str += apaName(authors[0].author);
  } else if (authors.length === 2) {
    // Two authors
    str += `${apaName(authors[0].author)} & ${apaName(authors[1].author)}`;
  } else if (authors.length >= 3 && authors.length <= 7) {
    // Two authors
    // Last author has to be preceded by ampersand, so count up to penultimate only
    for (let i = 0; i < authors.length - 1; i += 1) {
      str += `${apaName(authors[i].author)}, `;
    }
    str += `& ${apaName(authors[authors.length - 1].author)}. `;
  } else if (authors.length > 7) {
    // More than 7 authors
    for (let i = 0; i < 6; i += 1) {
      str += `${apaName(authors[i].author)}, `;
    }
    str += `. . . ${apaName(authors[authors.length - 1].author)}`;
  }
  return str;
};

const article = (ref) => {
  let str = `${authorList(ref.authors)} `;
  str += `(${ref.year}). ${ref.title}. <i>${ref.journal}</i>, `;
  str += `<i>${ref.volume}</i>`;
  if (ref.pages) str += `, ${ref.pages}.`;
  else str += '.';
  return { data: ref, html: str };
};

const book = (ref) => {
  const str = `${authorList(ref.authors)} (${ref.year}). <i>${ref.title}</i>. ${ref.city}: ${ref.publisher}.`;
  return { data: ref, html: str };
};

const website = (ref) => {
  const authors = authorList(ref.authors);
  let str = '';
  let pubDate = '';
  if (ref.pubDate) pubDate = moment(ref.pubDate).format('YYYY, MMMM D');
  else pubDate = 'n.d.';
  const accessDate = moment(ref.accessDate).format('YYYY, MMMM D');
  // Author, A. (date). Title of document. Retrieved from http://URL
  if (authors) {
    str += `${authors} (${pubDate}). ${ref.title},`;
  } else {
    // If no author, title moves to the front
    str += `${ref.title}. (${pubDate}).`;
  }
  str += ` <i>${ref.siteTitle}</i>. Retrieved ${accessDate} from ${ref.url}.`;

  return { data: ref, html: str };
};

exports.format = (ref) => {
  switch (ref.type.toLowerCase()) {
    case 'article': return article(ref);
    case 'book': return book(ref);
    case 'website': return website(ref);
    default: return Error('Invalid Type');
  }
};
