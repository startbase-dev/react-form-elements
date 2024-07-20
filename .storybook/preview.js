import 'react-day-picker/dist/style.css';
import 'rc-slider/assets/index.css';
import '../src/style/globals.css';
import './storybook.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
