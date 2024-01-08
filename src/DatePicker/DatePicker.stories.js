import React, { useState } from 'react';

import DatePicker from './index';

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
      <DatePicker
        {...arg}
        inputProps={{
          name: 'input',
          value: inputs.input,
          onChange: onChange,
        }}
      />
    </>
  );
};
export const DatePickerComponent = Template.bind({});
DatePickerComponent.args = { title: 'DatePicker' };

const Component = {
  title: 'Form/DatePicker',
  component: DatePicker,
};

export default Component;
