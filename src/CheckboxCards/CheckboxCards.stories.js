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
          label="CheckboxCards"
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

export const CheckboxCardsComponent = Template.bind({});
CheckboxCardsComponent.args = { title: 'CheckboxCards' };

export const CheckboxCardsComponentChecked = Template.bind({});
CheckboxCardsComponentChecked.args = {
  title: 'CheckboxCards',
  value: ['default1', 'default2'],
};

export const CheckboxCardsComponentRow = Template.bind({});
CheckboxCardsComponentRow.args = {
  title: 'CheckboxCards',
  direction: 'row',
};

export const CheckboxCardsComponentDisabled = Template.bind({});
CheckboxCardsComponentDisabled.args = {
  title: 'CheckboxCards',
  disabled: true,
};

export const CheckboxCardsComponentWithInput = Template.bind({});
CheckboxCardsComponentWithInput.args = {
  title: 'CheckboxCards',
  hideInput: false,
};

export const CheckboxCardsComponentError = Template.bind({});
CheckboxCardsComponentError.args = {
  title: 'CheckboxCards with error',
  error: 'Error Message',
};

const Component = {
  title: 'Form/CheckboxCards',
  component: CheckboxCardsComponent,
};

export default Component;
