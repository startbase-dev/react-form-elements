import React, { useState } from 'react';

import Slider from './index';

const Template = (args) => {
  const [inputs, setInputs] = useState({});
  const onChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value);

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
        }}
      >
        <Slider
          name="slider"
          label="Slider"
          min={0}
          max={100}
          step={20}
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
SliderComponentDisabled.args = { title: 'Slider', disabled: true };

export const SliderRangeComponent = Template.bind({});
SliderRangeComponent.args = {
  title: 'Slider Range',
  range: true,
  defaultValue: [20, 50],
};

export const SliderDotsComponent = Template.bind({});
SliderDotsComponent.args = {
  title: 'Slider Dots',
  defaultValue: [20, 50],
  dots: true,
};

export const SliderVerticalComponent = Template.bind({});
SliderVerticalComponent.args = {
  title: 'Slider Vertical',
  defaultValue: [20, 50],
  dots: true,
  range: true,
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
