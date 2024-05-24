import React, { useState } from 'react';

import Index from './index';

const Template = (args) => {
  const [inputs, setInputs] = useState({});
  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
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
          value={inputs.default}
          {...args}
          label="CheckboxGroup"
          name="default"
          onChange={onChange}
          options={[
            { label: 'Checkbox Option 1', value: 'default1' },
            { label: 'Checkbox Option 2', value: 'default2' },
          ]}
        />
      </div>
    </>
  );
};

export const CheckboxGroupComponent = Template.bind({});
CheckboxGroupComponent.args = { title: 'CheckboxGroup' };

export const CheckboxGroupComponentChecked = Template.bind({});
CheckboxGroupComponentChecked.args = {
  title: 'CheckboxGroup',
  value: ['default1', 'default2'],
};

export const CheckboxGroupComponentDisabled = Template.bind({});
CheckboxGroupComponentDisabled.args = {
  title: 'CheckboxGroup',
  disabled: true,
};

export const CheckboxGroupComponentError = Template.bind({});
CheckboxGroupComponentError.args = {
  title: 'CheckboxGroup with error',
  error: 'Error Message',
};

const Component = {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroupComponent,
};

export default Component;
