import React, { useState } from 'react';

import { PieIcon } from '../Icon';
import PhoneInput from './PhoneInput';

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
      <PhoneInput
        {...arg}
        name="input"
        value={inputs.input}
        onChange={onChange}
      />
    </>
  );
};
export const PhoneInputComponent = Template.bind({});
PhoneInputComponent.args = { title: 'PhoneInput' };

export const PhoneInputWithLabel = Template.bind({});
PhoneInputWithLabel.args = { title: 'PhoneInput with label', label: 'Label' };

export const PhoneInputWithPlaceholder = Template.bind({});
PhoneInputWithPlaceholder.args = {
  title: 'PhoneInput with placeholder',
  placeholder: '+1 234 567 8901',
};

export const PhoneInputWithPlaceholderAndLabel = Template.bind({});
PhoneInputWithPlaceholderAndLabel.args = {
  title: 'PhoneInput with placeholder and label',
  placeholder: '+1 234 567 8901',
  label: 'Label',
};

export const PhoneInputWithPlaceholderAndLabelAndDisableShrink = Template.bind(
  {}
);
PhoneInputWithPlaceholderAndLabelAndDisableShrink.args = {
  title: 'PhoneInput with placeholder and label and disable shrink',
  placeholder: '+1 234 567 8901',
  label: 'Label',
  disableShrink: true,
};

export const PhoneInputDisabled = Template.bind({});
PhoneInputDisabled.args = {
  title: 'Disabled PhoneInput',
  placeholder: '+1 234 567 8901',
  disabled: true,
  label: 'Label',
};

export const PhoneInputPrepend = Template.bind({});
PhoneInputPrepend.args = {
  title: 'PhoneInput with prepend',
  placeholder: '+1 234 567 8901',
  label: 'Label',
  prepend: <PieIcon />,
};

export const PhoneInputError = Template.bind({});
PhoneInputError.args = {
  title: 'PhoneInput with error',
  label: 'Label',
  error: 'Error Message',
};

const Component = {
  title: 'Form/PhoneInput',
  component: PhoneInput,
};

export default Component;
