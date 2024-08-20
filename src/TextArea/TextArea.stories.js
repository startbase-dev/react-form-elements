import React, { useState } from 'react';

import Index from './index';

const Template = (args) => {
  const [inputs, setInputs] = useState({
    entered: 'Input Entered',
  });
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
      <Index {...args} name="input" onChange={onChange} value={inputs.input} />
    </>
  );
};

export const TextAreaComponent = Template.bind({});
TextAreaComponent.args = { title: 'TextArea' };

export const TextAreaComponentLabel = Template.bind({});
TextAreaComponentLabel.args = { title: 'TextArea', label: 'TextArea Label' };

export const TextAreaComponentPlaceholder = Template.bind({});
TextAreaComponentPlaceholder.args = {
  title: 'TextArea',
  placeholder: 'TextArea Placeholder',
};

export const TextAreaComponentPlaceholderAndLabel = Template.bind({});
TextAreaComponentPlaceholderAndLabel.args = {
  title: 'TextArea',
  placeholder: 'TextArea Placeholder',
  label: 'TextArea Label',
  disabled: true,
};

export const TextAreaComponentResizable = Template.bind({});
TextAreaComponentResizable.args = {
  title: 'TextArea',
  placeholder: 'TextArea Placeholder',
  label: 'TextArea Label',
  autoGrow: true,
};

export const TextAreaComponentError = Template.bind({});
TextAreaComponentError.args = {
  title: 'TextArea',
  label: 'TextArea Label',
  error: 'Error Message',
};

export const TextAreaComponentDisableShrink = Template.bind({});
TextAreaComponentDisableShrink.args = {
  title: 'TextArea',
  label: 'Label',
  placeholder: 'Placeholder',
  disableShrink: true,
};

const Component = {
  title: 'Form/TextArea',
  component: Index,
};

export default Component;
