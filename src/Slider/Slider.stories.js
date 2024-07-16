import React, { useState } from 'react';

import Slider from './index';

const Template = (args) => {
  const [inputs, setInputs] = useState({});
  const onChange = (e) => {
    const { name, value, type } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? !prevState[name] : value,
    }));
  };

  return (
    <>
      <h2>{args.title}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
          height: '200px',
        }}
      >
        <Slider
          name="slider"
          label="Slider"
          min={0}
          max={100}
          value={inputs.slider}
          onChange={onChange}
          {...args}
        />
      </div>
    </>
  );
};

export const SliderComponent = Template.bind({});
SliderComponent.args = { title: 'Slider' };

export const SliderComponentDisabled = Template.bind({});
SliderComponentDisabled.args = {
  title: 'Slider',
  disabled: true,
};

export const SliderComponentMarks = Template.bind({});
SliderComponentMarks.args = {
  title: 'Slider',
  disabled: false,
  marks: {
    0: <strong>0°C</strong>,
    26: '26°C',
    37: '37°C',
    50: '50°C',
    100: {
      style: {
        color: 'red',
      },
      label: <strong>100°C</strong>,
    },
  },
};

export const SliderComponentMarksVertical = Template.bind({});
SliderComponentMarksVertical.args = {
  title: 'Slider',
  vertical: true,
  marks: {
    0: <strong>0°C</strong>,
    26: '26°C',
    37: '37°C',
    50: '50°C',
    100: {
      style: {
        color: 'red',
      },
      label: <strong>100°C</strong>,
    },
  },
};

export const SliderRangeComponent = Template.bind({});
SliderRangeComponent.args = {
  title: 'Slider Range',
  range: true,
  defaultValue: [20, 50],
};

export const SliderVerticalComponent = Template.bind({});
SliderVerticalComponent.args = {
  title: 'Slider Vertical',
  defaultValue: 50,
  vertical: true,
};

export const SliderComponentError = Template.bind({});
SliderComponentError.args = {
  title: 'Slider with error',
  error: 'Error Message',
};

const Component = {
  title: 'Form/Slider',
  component: SliderComponent,
};

export default Component;
