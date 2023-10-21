import React, { useState } from 'react';

import Switch from './Switch';

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
        <Switch
          checked={inputs.default}
          {...args}
          label="Switch"
          name="default"
          onChange={onChange}
        />
      </div>
    </>
  );
};

export const SwitchComponent = Template.bind({});
SwitchComponent.args = { title: 'Switch' };

export const SwitchComponentChecked = Template.bind({});
SwitchComponentChecked.args = { title: 'Switch', checked: true };

export const SwitchComponentDisabled = Template.bind({});
SwitchComponentDisabled.args = { title: 'Switch', disabled: true };

export const SwitchComponentError = Template.bind({});
SwitchComponentError.args = {
  title: 'Switch with error',
  error: 'Error Message',
};

const Component = {
  title: 'Form/Switch',
  component: SwitchComponent,
};

export default Component;
