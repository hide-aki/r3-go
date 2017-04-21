import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { selectAuthToken, selectIsLoggedIn } from '../selectors';
import { logout } from '../actions';
import { LOGIN_FORM_ACTION_PREFIX } from '../constants';
import withClickAway from 'components/ClickAway';
import LoginForm from '../components/LoginForm';

const Container = styled.div`
    background-color: white;
    box-shadow: 2px 2px 7px 0 rgba(0,0,0,0.13);
    display: flex;
    font-family: 'Lato Regular', sans-serif;
    justify-content: center;
    min-width: 300px;
    position: absolute;
    right: 0px;
    top: 82px;
    z-index: 10;
`;

const ListWrapper = styled(List)`
    width: 90%;
`;

function Dropdown({ isLoggedIn, logout, onClickAway }) {
  const loginForm = () => <LoginForm
    submitActionPrefix={LOGIN_FORM_ACTION_PREFIX}
    onClickAway={onClickAway}
  />;

  const userDropdown = () => (
    <List selectable ripple>
      <ListItem
        caption="My Account"
        leftIcon="account_circle"
        onClick={() => { browserHistory.push('/account'); onClickAway(); }}
      />
      <ListItem caption="Coming Soon" leftIcon="announcement" disabled />
      <ListDivider />
      <ListItem
        caption="LogOut"
        leftIcon="exit_to_app"
        onClick={logout}
      />
    </List>);

  return (
    <Container>
      { isLoggedIn ? userDropdown() : loginForm() }
    </Container>
  );
}

// Connect
const mapDispatchToProps = { logout };
const mapStateToProps = createStructuredSelector({
  authToken: selectAuthToken,
  isLoggedIn: selectIsLoggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withClickAway(Dropdown)
);
