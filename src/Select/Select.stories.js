import React, { useState } from 'react';
import Index from './index';

const OPTIONS = [
  {
    label: 'Item 1',
    value: 'item_1',
  },
  {
    label: 'Item 2',
    value: 'item_2',
  },
  {
    label: 'Item 3',
    value: 'item_3',
  },
  {
    label: 'Item 4',
    value: 'item_4',
  },
  {
    label: 'Item 5',
    value: 'item_5',
  },
];

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
      <Index
        {...arg}
        name="select"
        options={OPTIONS}
        value={inputs.select}
        onChange={onChange}
      />
    </>
  );
};

export const SelectComponent = Template.bind({});
SelectComponent.args = { title: 'Select' };

export const SelectWithLabel = Template.bind({});
SelectWithLabel.args = { title: 'Select with label', label: 'Label' };

export const SelectWithPlaceholder = Template.bind({});
SelectWithPlaceholder.args = {
  title: 'Select with placeholder',
  placeholder: 'Placeholder',
};

export const SelectWithPlaceholderAndLabel = Template.bind({});
SelectWithPlaceholderAndLabel.args = {
  title: 'Select with placeholder and label',
  placeholder: 'Placeholder',
  label: 'Label',
};

export const SelectWithPlaceholderAndLabelAndDisableShrink = Template.bind({});
SelectWithPlaceholderAndLabelAndDisableShrink.args = {
  title: 'Select with placeholder and label and disable shrink',
  placeholder: 'Placeholder',
  label: 'Label',
  disableShrink: true,
};

export const SelectDisabled = Template.bind({});
SelectDisabled.args = {
  title: 'Disabled Select',
  placeholder: 'Placeholder',
  disabled: true,
  label: 'Label',
};

export const SelectMulti = Template.bind({});
SelectMulti.args = {
  title: 'Select multiple items',
  label: 'Label',
  isMulti: true,
};

export const SelectError = Template.bind({});
SelectError.args = {
  title: 'Select with error',
  label: 'Label',
  error: 'Error Message',
};

const Component = {
  title: 'Form/Select',
  component: Index,
};

export default Component;
