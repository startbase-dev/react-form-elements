import React, { useState } from 'react';

import Index from './index';

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
        }}
      >
        <Index
          checked={inputs.default === 'default1'}
          {...args}
          label="Radio Option 1"
          value="default1"
          name="default"
          onChange={onChange}
        />
        <Index
          checked={inputs.default === 'default2'}
          {...args}
          label="Radio Option 2"
          name="default"
          value="default2"
          onChange={onChange}
        />
      </div>
    </>
  );
};

export const RadioComponent = Template.bind({});
RadioComponent.args = { title: 'Radio' };

export const RadioComponentChecked = Template.bind({});
RadioComponentChecked.args = { title: 'Radio', checked: true };

export const RadioComponentDisabled = Template.bind({});
RadioComponentDisabled.args = { title: 'Radio', disabled: true };

export const RadioComponentError = Template.bind({});
RadioComponentError.args = {
  title: 'Radio with error',
  error: 'Error Message',
};

const Component = {
  title: 'Form/Radio',
  component: RadioComponent,
};

export default Component;
