import * as React from 'react';
import { Grid, PageHeader, MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';

import * as api from './api';
import Articles from './components/Articles';
import FilterForm from './components/FilterForm';
import Footer from './components/Footer';
import SharingButtons from './components/SharingButtons';

const Header = () => {
  return (<header>
    <Navbar collapseOnSelect fixedTop inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href='#'>CTW</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavDropdown title='Associated Websites' id='other-websites'>
            <MenuItem href='http://ctw.getforge.io/' rel='noopener' target='_blank' active>
              Clinton, Trump, what's up
            </MenuItem>
            <MenuItem href='https://blood-donation-system0.herokuapp.com/' rel='noopener' target='_blank'>
              Blood Donation System
            </MenuItem>
            <MenuItem divider />
            <MenuItem href='https://ahimta.github.io/fuel-consumption-calculator/' rel='noopener' target='_blank'>
              أسعار البنزين و المياه و الكهرباء
            </MenuItem>
            <MenuItem href='http://ahimta.github.io/saudi-radios' rel='noopener' target='_blank'>
              الإذاعات السعودية
            </MenuItem>
            <MenuItem href='https://donation-web-pla-1479993243743.firebaseapp.com/' rel='noopener' target='_blank'>
              منصة التبرعات
            </MenuItem>
            <MenuItem href='https://ahimta.github.io/bagi/' rel='noopener' target='_blank'>
              باقي
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <PageHeader className='text-center' style={{ marginTop: '5em' }}>
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
