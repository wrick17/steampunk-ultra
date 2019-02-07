import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import JsonView from 'components/JsonView';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Json View', module)
  .add('Basic', () => <JsonView />);
