import React, { useState } from 'react';

import Index from './index';

const Template = (arg) => {
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
      <h2>{arg.title}</h2>
      <Index {...arg} name="input" value={inputs.input} onChange={onChange} />
    </>
  );
};
export const DatePickerComponent = Template.bind({});
DatePickerComponent.args = { title: 'MultipleDatePicker' };

const Component = {
  title: 'Form/MultipleDatePicker',
  component: Index,
};

export default Component;
