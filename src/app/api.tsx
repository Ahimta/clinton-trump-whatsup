import { Promise } from 'es6-promise';

const htmlToText = (htmlString) => {
  const span = document.createElement('span');

  span.innerHTML = htmlString;
  return (span.textContent || span.innerText);
};

const fetchCNNArticles = (): Promise<ReadonlyArray<any>> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://edition.cnn.com/politics', true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 200 || xhr.status === 304)) {
        const res = xhr.responseText;

        try {
          const keyIndex = res.indexOf('"articleList":');
          const arrayStartIndex = res.indexOf('[', keyIndex);
          const arrayEndIndex = res.indexOf(']', keyIndex);
          const arrayString = res.substring(arrayStartIndex, arrayEndIndex + 1);

          const articleList = JSON.parse(arrayString);

          if (Array.isArray(articleList)) {
            resolve(articleList);
          } else {
            resolve([]);
          }
        } catch (e) {
          resolve([]);
        }
      }
    };
    xhr.onerror = () => {
      resolve([]);
    };

    xhr.send();
  });
};

const filterArticleFactory = (filterRegex) => ({headline}) => {
  return headline.match(filterRegex);
};

const getRegexForFilter = (filter) => {
  switch (filter) {
    case 'clinton': return /clinton/i;
    case 'trump': return /trump/i;
    case 'both': return /clinton.*trump|trump.*clinton/i;
    case 'either': return /clinton|trump/i;

    default: return /clinton|trump/i;
  }
};

const mapArticle = ({headline, description, uri}) => {
  return { headline, summary: htmlToText(description), url: `http://edition.cnn.com${uri}` };
};

export function getArticles(filter: string) {
  const filterRegex = getRegexForFilter(filter);

  return fetchCNNArticles().then((CNNArticles) => {
    return CNNArticles.filter(filterArticleFactory(filterRegex)).map(mapArticle).slice(0, 25);
  });
}
