// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import Cookies from 'js-cookie';
import moment from 'moment';

import { showMessageBarMessage } from 'containers/MessageBar/actions';
import { logout } from 'containers/Session/actions';
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

const requireAuth = (store) => (replace, nextState) => { // eslint-disable-line no-unused-vars
  const expTime = Cookies.get('authTokenExpTime');

  if (!expTime || moment(expTime).isBefore(moment())) {
    store.dispatch(showMessageBarMessage('You have been logged out: please log back in'));
    store.dispatch(logout());
  }
};


export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        import('containers/HomePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },

      // Home route will load as a chunk,
      // all child routes will come together as a second chunk
      getChildRoutes(location, cb) {
        System.import('containers/HomePage/routes')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/account',
      name: 'account',
      onEnter: requireAuth(store),
      onChange: requireAuth(store),
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Account/reducer'),
          import('containers/Account/sagas'),
          import('containers/Account'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('account', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      // Account route will load as a chunk,
      // all child routes will come together as a second chunk
      getChildRoutes(location, cb) {
        System.import('containers/Account/routes')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
