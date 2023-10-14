import React, { useState } from 'react';

import RadioGroup from './RadioGroup';

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
        <RadioGroup
          {...args}
          label="RadioGroup"
          value={inputs.default}
          name="default"
          onChange={onChange}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
        />
      </div>
    </>
  );
};

export const RadioGroupComponent = Template.bind({});
RadioGroupComponent.args = { title: 'RadioGroup' };

export const RadioGroupComponentChecked = Template.bind({});
RadioGroupComponentChecked.args = { title: 'RadioGroup', checked: true };

export const RadioGroupComponentDisabled = Template.bind({});
RadioGroupComponentDisabled.args = { title: 'RadioGroup', disabled: true };

export const RadioGroupComponentError = Template.bind({});
RadioGroupComponentError.args = {
  title: 'RadioGroup with error',
  error: 'Error Message',
};

const Component = {
  title: 'Form/RadioGroup',
  component: RadioGroupComponent,
};

export default Component;
