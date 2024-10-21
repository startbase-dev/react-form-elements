import type { Preview } from '@storybook/react';

import 'react-day-picker/src/style.css';
import 'rc-slider/assets/index.css';
import '../src/style/globals.scss';
import './storybook.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
