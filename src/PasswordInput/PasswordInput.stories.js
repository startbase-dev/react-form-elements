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

export const PasswordInputComponent = Template.bind({});
PasswordInputComponent.args = { title: 'PasswordInput' };

export const PasswordInputWithLabel = Template.bind({});
PasswordInputWithLabel.args = {
  title: 'PasswordInput with label',
  label: 'Label',
};

export const PasswordInputWithPlaceholder = Template.bind({});
PasswordInputWithPlaceholder.args = {
  title: 'PasswordInput with placeholder',
  placeholder: 'Placeholder',
};

export const PasswordInputWithPlaceholderAndLabel = Template.bind({});
PasswordInputWithPlaceholderAndLabel.args = {
  title: 'PasswordInput with placeholder and label',
  placeholder: 'Placeholder',
  label: 'Label',
};

export const PasswordInputWithPlaceholderAndLabelAndDisableShrink =
  Template.bind({});
PasswordInputWithPlaceholderAndLabelAndDisableShrink.args = {
  title: 'PasswordInput with placeholder and label and disable shrink',
  placeholder: 'Placeholder',
  label: 'Label',
  disableShrink: true,
};

export const PasswordInputDisabled = Template.bind({});
PasswordInputDisabled.args = {
  title: 'Disabled PasswordInput',
  placeholder: 'Placeholder',
  disabled: true,
  label: 'Label',
};

export const PasswordInputError = Template.bind({});
PasswordInputError.args = {
  title: 'PasswordInput with error',
  label: 'Label',
  error: 'Error Message',
};

const Component = {
  title: 'Form/PasswordInput',
  component: Index,
};

export default Component;
