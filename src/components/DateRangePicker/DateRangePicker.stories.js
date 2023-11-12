import React, { useState } from 'react';

import DateRangePicker from './DateRangePicker';

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
      <DateRangePicker
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
DatePickerComponent.args = { title: 'DateRangePicker' };

const Component = {
  title: 'Form/DateRangePicker',
  component: DateRangePicker,
};

export default Component;
