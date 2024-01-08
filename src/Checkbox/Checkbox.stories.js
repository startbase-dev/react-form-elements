import React, { useState } from 'react';

import Checkbox from './index';

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
        <Checkbox
          checked={inputs.default}
          {...args}
          label="Checkbox"
          name="default"
          onChange={onChange}
        />
      </div>
    </>
  );
};

export const CheckboxComponent = Template.bind({});
CheckboxComponent.args = { title: 'CheckBox' };

export const CheckboxComponentChecked = Template.bind({});
CheckboxComponentChecked.args = { title: 'CheckBox', checked: true };

export const CheckboxComponentDisabled = Template.bind({});
CheckboxComponentDisabled.args = { title: 'CheckBox', disabled: true };

export const CheckboxComponentError = Template.bind({});
CheckboxComponentError.args = {
  title: 'CheckBox with error',
  error: 'Error Message',
};

const Component = {
  title: 'Form/Checkbox',
  component: CheckboxComponent,
};

export default Component;
