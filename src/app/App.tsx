import * as React from 'react';

interface IAppProps { };

interface IAppState { };

export default class App extends React.Component<IAppProps, IAppState> {
  render() {
    return (
      <h1>{'Hello world!'}</h1>
    );
  }
}
