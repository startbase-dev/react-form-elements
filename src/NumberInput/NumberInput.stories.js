import React, { useState } from 'react';

import Index from './index';

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
      <Index {...arg} name="input" value={inputs.input} onChange={onChange} />
    </>
  );
};

export const NumberInputComponent = Template.bind({});
NumberInputComponent.args = { title: 'NumberInput' };

export const NumberInputWithLabel = Template.bind({});
NumberInputWithLabel.args = {
  title: 'NumberInput with label',
  label: 'Label',
};

export const NumberInputWithPlaceholder = Template.bind({});
NumberInputWithPlaceholder.args = {
  title: 'NumberInput with placeholder',
  placeholder: 'Placeholder',
};

export const NumberInputWithPlaceholderAndLabel = Template.bind({});
NumberInputWithPlaceholderAndLabel.args = {
  title: 'NumberInput with placeholder and label',
  placeholder: 'Placeholder',
  label: 'Label',
};

export const NumberInputWithPlaceholderAndLabelAndDisableShrink = Template.bind(
  {}
);
NumberInputWithPlaceholderAndLabelAndDisableShrink.args = {
  title: 'NumberInput with placeholder and label and disable shrink',
  placeholder: 'Placeholder',
  label: 'Label',
  disableShrink: true,
};

export const NumberInputDisabled = Template.bind({});
NumberInputDisabled.args = {
  title: 'Disabled NumberInput',
  placeholder: 'Placeholder',
  disabled: true,
  label: 'Label',
};

export const NumberInputError = Template.bind({});
NumberInputError.args = {
  title: 'NumberInput with error',
  label: 'Label',
  error: 'Error Message',
};

const Component = {
  title: 'Form/NumberInput',
  component: Index,
};

export default Component;
