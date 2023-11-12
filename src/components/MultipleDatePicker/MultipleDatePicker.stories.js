import React, { useState } from 'react';

import MultipleDatePicker from './MultipleDatePicker';

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
      <MultipleDatePicker
        {...arg}
        name="input"
        value={inputs.input}
        onChange={onChange}
      />
    </>
  );
};
export const DatePickerComponent = Template.bind({});
DatePickerComponent.args = { title: 'MultipleDatePicker' };

const Component = {
  title: 'Form/MultipleDatePicker',
  component: MultipleDatePicker,
};

export default Component;
