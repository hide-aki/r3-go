import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import CenteredSection from '../CenteredSection';
import H1 from '../H1';
import messages from './messages';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <CenteredSection>
          <H1>
            <Link to="/">
              <FormattedMessage {...messages.header} />
            </Link>
          </H1>
        </CenteredSection>
      </div>
    );
  }
}
