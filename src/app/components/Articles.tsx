import * as React from 'react';
import { Button, Panel, ProgressBar, Well } from 'react-bootstrap';

const getSearchUrl = (filter) => {
  switch (filter) {
    case 'clinton': return 'http://edition.cnn.com/search/?text=clinton'
    case 'trump': return 'http://edition.cnn.com/search/?text=trump'
    default: return 'http://edition.cnn.com/search/?text=clinton%20trump'
  }
};

const Article = ({headline, summary, url}) => {
  const Footer = (<footer className='text-center'>
    <Button bsStyle='success' href={url} rel='noopener' target='_blank'>Read more</Button>
  </footer>);

  const Header = (<h3 className='text-center'>{headline}</h3>);

  if (summary) {
    return (<Panel bsStyle='primary' footer={Footer} header={Header}>
      <span>{summary}</span>
    </Panel>);
  } else {
    return (<Panel bsStyle='primary' footer={Footer} header={Header} />);
  }
};

const CNNSearchButton = ({filter, text}) => {
  return (<Button bsStyle='success' href={getSearchUrl(filter)} target='_blank' rel='noopener' block>
    {text}
  </Button>);
};

interface IProps {
  readonly articles: ReadonlyArray<any>;
  readonly filter: string;
  readonly isLoading: boolean;
}

export default function Articles({articles, filter, isLoading}: IProps) {
  if (isLoading) {
    return (<ProgressBar now={100} striped />);
  } else if (articles.length === 0) {
    return (<Well className='text-center'>
      <p>Sorry, couldn't find anything right now</p>
      <CNNSearchButton filter={filter} text='Search the CNN' />
    </Well>);
  } else {
    const ArticleElements = articles.map(({headline, summary, url}) => {
      return (<article key={url}>
        <Article headline={headline} summary={summary} url={url} />
      </article>);
    });

    return (<div>
      <div>{ArticleElements}</div>
      <CNNSearchButton filter={filter} text='Find more on the CNN' />
    </div>);
  }
}
