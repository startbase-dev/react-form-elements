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
          {...args}
          label="RadioCards"
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

export const RadioCardsComponent = Template.bind({});
RadioCardsComponent.args = { title: 'RadioCards' };

export const RadioCardsComponentChecked = Template.bind({});
RadioCardsComponentChecked.args = { title: 'RadioCards', checked: true };

export const RadioCardsComponentRow = Template.bind({});
RadioCardsComponentRow.args = {
  title: 'RadioCards',
  direction: 'row',
};

export const RadioCardsComponentWithInput = Template.bind({});
RadioCardsComponentWithInput.args = {
  title: 'RadioCards',
  hideInput: false,
};

export const RadioCardsComponentDisabled = Template.bind({});
RadioCardsComponentDisabled.args = { title: 'RadioCards', disabled: true };

export const RadioCardsComponentError = Template.bind({});
RadioCardsComponentError.args = {
  title: 'RadioCards with error',
  error: 'Error Message',
};

const Component = {
  title: 'Form/RadioCards',
  component: RadioCardsComponent,
};

export default Component;
