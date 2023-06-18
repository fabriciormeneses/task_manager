import { Home } from 'pages';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
