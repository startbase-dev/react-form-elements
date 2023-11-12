import React, { useState } from 'react';

import Calendar from './Calendar';

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
      <Calendar
        {...arg}
        name="input"
        value={inputs.input}
        onChange={onChange}
      />
    </>
  );
};
export const CalendarComponent = Template.bind({});
CalendarComponent.args = { title: 'Calendar' };

const Component = {
  title: 'Form/Calendar',
  component: Calendar,
};

export default Component;
