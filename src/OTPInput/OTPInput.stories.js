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
      <Index name="input" {...arg} value={inputs.input} onChange={onChange} />
    </>
  );
};

export const OTPInputComponent = Template.bind({});
OTPInputComponent.args = { title: 'OTPInput', length: 5 };

export const OTPInputWithLabel = Template.bind({});
OTPInputWithLabel.args = {
  title: 'OTPInput with label',
  length: 5,
  label: 'Label',
};

export const OTPInputWithLength = Template.bind({});
OTPInputWithLength.args = {
  label: 'Label',
  title: 'OTPInput with Length',
  length: 4,
};

export const OTPInputWithFormat = Template.bind({});
OTPInputWithFormat.args = {
  title: 'OTPInput with Format',
  length: 6,
  format: [2, 2, 2],
};

export const OTPInputWithSeparator = Template.bind({});
OTPInputWithSeparator.args = {
  title: 'OTPInput with Separator',
  length: 6,
  format: [3, 3],
  separator: '/',
};

export const OTPInputWithTimer = Template.bind({});
OTPInputWithTimer.args = {
  title: 'OTPInput with Separator',
  length: 6,
  format: [3, 3],
  timer: 120,
};

export const OTPInputWithOnComplete = Template.bind({});
OTPInputWithOnComplete.args = {
  title: 'OTPInput with OnComplete',
  length: 6,
  format: [3, 3],
  timer: 120,
  onComplete: () => {
    alert('completed');
  },
};

export const OTPInputWithOnResend = Template.bind({});
OTPInputWithOnResend.args = {
  title: 'OTPInput with OnResend',
  length: 6,
  timer: 120,
  onResend: () => {
    alert('resend');
  },
};

export const OTPInputDisabled = Template.bind({});
OTPInputDisabled.args = {
  title: 'Disabled OTPInput',
  placeholder: 'Placeholder',
  disabled: true,
  length: 5,
  label: 'Label',
};

export const OTPInputErrorMessage = Template.bind({});
OTPInputErrorMessage.args = {
  title: 'OTPInput with error message',
  label: 'Label',
  length: 5,
  error: 'Error Message',
};

export const OTPInputError = Template.bind({});
OTPInputError.args = {
  title: 'OTPInput with error',
  label: 'Label',
  length: 5,
  error: true,
};

const Component = {
  title: 'Form/OTPInput',
  component: Index,
};

export default Component;
