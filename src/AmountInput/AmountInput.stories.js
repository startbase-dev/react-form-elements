import React, { useState } from 'react';

import { PieIcon } from '../Icon';
import AmountInput from './index';

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
      <AmountInput
        {...arg}
        name="input"
        value={inputs.input}
        onChange={onChange}
      />
    </>
  );
};
export const AmountInputComponent = Template.bind({});
AmountInputComponent.args = { title: 'Input' };

export const AmountInputWithLabel = Template.bind({});
AmountInputWithLabel.args = { title: 'Input with label', label: 'Label' };

export const AmountInputWithPlaceholder = Template.bind({});
AmountInputWithPlaceholder.args = {
  title: 'AmountInput with placeholder',
  placeholder: 'Placeholder',
};

export const AmountInputWithPlaceholderAndLabel = Template.bind({});
AmountInputWithPlaceholderAndLabel.args = {
  title: 'AmountInput with placeholder and label',
  placeholder: 'Placeholder',
  label: 'Label',
};

export const AmountInputWithPlaceholderAndLabelAndDisableShrink = Template.bind(
  {}
);
AmountInputWithPlaceholderAndLabelAndDisableShrink.args = {
  title: 'AmountInput with placeholder and label and disable shrink',
  placeholder: 'Placeholder',
  label: 'Label',
  disableShrink: true,
};

export const AmountInputDisabled = Template.bind({});
AmountInputDisabled.args = {
  title: 'Disabled AmountInput',
  placeholder: 'Placeholder',
  disabled: true,
  label: 'Label',
};

export const AmountInputAppend = Template.bind({});
AmountInputAppend.args = {
  title: 'AmountInput with append',
  placeholder: 'Placeholder',
  label: 'Label',
  append: <PieIcon />,
};

export const AmountInputPrepend = Template.bind({});
AmountInputPrepend.args = {
  title: 'Input with prepend',
  placeholder: 'Placeholder',
  label: 'Label',
  prepend: <PieIcon />,
};

export const AmountInputError = Template.bind({});
AmountInputError.args = {
  title: 'AmountInput with error',
  label: 'Label',
  error: 'Error Message',
};

const Component = {
  title: 'Form/AmountInput',
  component: AmountInput,
};

export default Component;
