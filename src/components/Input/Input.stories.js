import React, { useState } from 'react';

import { PieIcon } from '../Icon';
import Input from './Input';

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
      <Input {...arg} name="input" value={inputs.input} onChange={onChange} />
    </>
  );
};
export const InputComponent = Template.bind({});
InputComponent.args = { title: 'Input' };

export const InputWithLabel = Template.bind({});
InputWithLabel.args = { title: 'Input with label', label: 'Label' };

export const InputWithPlaceholder = Template.bind({});
InputWithPlaceholder.args = {
  title: 'Input with placeholder',
  placeholder: 'Placeholder',
};

export const InputWithPlaceholderAndLabel = Template.bind({});
InputWithPlaceholderAndLabel.args = {
  title: 'Input with placeholder and label',
  placeholder: 'Placeholder',
  label: 'Label',
};

export const InputWithPlaceholderAndLabelAndDisableShrink = Template.bind({});
InputWithPlaceholderAndLabelAndDisableShrink.args = {
  title: 'Input with placeholder and label and disable shrink',
  placeholder: 'Placeholder',
  label: 'Label',
  disableShrink: true,
};

export const InputDisabled = Template.bind({});
InputDisabled.args = {
  title: 'Disabled Input',
  placeholder: 'Placeholder',
  disabled: true,
  label: 'Label',
};

export const InputAppend = Template.bind({});
InputAppend.args = {
  title: 'Input with append',
  placeholder: 'Placeholder',
  label: 'Label',
  append: <PieIcon />,
};

export const InputPrepend = Template.bind({});
InputPrepend.args = {
  title: 'Input with prepend',
  placeholder: 'Placeholder',
  label: 'Label',
  prepend: <PieIcon />,
};

export const InputError = Template.bind({});
InputError.args = {
  title: 'Input with error',
  label: 'Label',
  error: 'Error Message',
};

const Component = {
  title: 'Form/Input',
  component: Input,
};

export default Component;
