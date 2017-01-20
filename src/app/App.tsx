import * as React from 'react';
import { Grid, PageHeader } from 'react-bootstrap';

import * as api from './api';
import Articles from './components/Articles';
import FilterForm from './components/FilterForm';
import Footer from './components/Footer';
import SharingButtons from './components/SharingButtons';

const Header = () => {
  return (<header>
    <PageHeader className='text-center'>
      Clinton, Trump, what's up <small>Latest news from the CNN</small>
    </PageHeader>
  </header>);
};

interface IProps { }
interface IState {
  readonly articles: ReadonlyArray<any>;
  readonly filter: string;
  readonly isLoading: boolean;
}

export default class App extends React.Component<{}, IState> {
  private handleFilterChangeFactory: (filter: string) => () => void;

  constructor(props: IProps, context: any) {
    super(props, context);
    this.state = { articles: null, filter: 'either', isLoading: true };

    this.handleFilterChangeFactory = (filter) => () => {
      this.setState({ filter, isLoading: true } as IState);

      api.getArticles(filter).then((articles) => {
        this.setState({ articles, isLoading: false } as IState);
      });
    };
  }

  componentWillMount() {
    const {filter} = this.state;

    api.getArticles(filter).then((articles) => {
      this.setState({ articles, isLoading: false } as IState);
    });
  }

  render() {
    const {articles, filter, isLoading} = this.state;

    return (<div>
      <Header />

      <main>
        <Grid>
          <section>
            <FilterForm filter={filter} isLoading={isLoading} updateFilterFactory={this.handleFilterChangeFactory} />
          </section>
          <section><Articles articles={articles} filter={filter} isLoading={isLoading} /></section>
        </Grid>
      </main>

      <hr />

      <SharingButtons />

      <hr />

      <Footer />
    </div>);
  }
}
