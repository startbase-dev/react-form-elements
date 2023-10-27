import React, { useState } from 'react';

import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import PasswordInput from '../PasswordInput/PasswordInput';
import RadioGroup from '../RadioGroup/RadioGroup';
import Switch from '../Switch/Switch';
import TextArea from '../TextArea/TextArea';
import Form from './Form.js';
import NumberInput from '../NumberInput/NumberInput';
import AmountInput from '../AmountInput/AmountInput';
import Select from '../Select/Select';
import PhoneInput from '../PhoneInput/PhoneInput';

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

const Template = () => {
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
      <h2>Form Component</h2>
      <Form>
        <Input
          label="Username"
          name="username"
          value={inputs.username}
          error="Error message"
          onChange={onChange}
        />
        <PasswordInput
          label="Password"
          name="password"
          error="Error message"
          value={inputs.password}
          onChange={onChange}
        />
        <NumberInput
          label="Number"
          error="Error message"
          name="number"
          value={inputs.number}
          onChange={onChange}
        />
        <AmountInput
          label="Amount"
          name="amount"
          error="Error message"
          value={inputs.amount}
          onChange={onChange}
        />
        <Select
          label="Select"
          name="select"
          error="Error message"
          options={OPTIONS}
          isClearable
          value={inputs.select}
          onChange={onChange}
        />
        <Select
          label="Multi Select"
          name="multi"
          error="Error message"
          options={OPTIONS}
          value={inputs.multi}
          isMulti
          onChange={onChange}
        />
        <PhoneInput
          label="Phone"
          name="phone"
          error="Error message"
          value={inputs.phone}
          onChange={onChange}
        />
        <TextArea
          name="textarea"
          label="Description"
          error="Error message"
          onChange={onChange}
          autoGrow
          value={inputs.textarea}
        />
        <RadioGroup
          label="RadioGroup"
          value={inputs.country}
          error="Error message"
          name="country"
          onChange={onChange}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
        />
        <Checkbox
          checked={inputs.agree}
          error="Error message"
          label="I understand and accept the terms and conditions and privacy policy."
          name="agree"
          onChange={onChange}
        />
        <Switch
          checked={inputs.dark}
          error="Error message"
          label="Switch"
          name="dark"
          onChange={onChange}
        />
      </Form>

      <h2>Form Component</h2>
      <Form>
        <Input
          label="Username"
          placeholder="Username"
          name="username1"
          disableShrink
          value={inputs.username1}
          onChange={onChange}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          name="password1"
          disableShrink
          value={inputs.password1}
          onChange={onChange}
        />
        <NumberInput
          label="Number"
          placeholder="Number"
          name="number"
          disableShrink
          value={inputs.number}
          onChange={onChange}
        />
        <AmountInput
          label="Amount"
          placeholder="Amount"
          name="amount"
          disableShrink
          value={inputs.amount}
          onChange={onChange}
        />
        <Select
          label="Select"
          placeholder="Select"
          name="select"
          disableShrink
          isClearable
          options={OPTIONS}
          value={inputs.select}
          onChange={onChange}
        />
        <Select
          label="Multi Select"
          placeholder="Select"
          name="multi"
          disableShrink
          options={OPTIONS}
          value={inputs.multi}
          isMulti
          onChange={onChange}
        />
        <PhoneInput
          label="Phone"
          placeholder="+1 234 567 8901"
          name="phone1"
          disableShrink
          value={inputs.phone1}
          onChange={onChange}
        />
        <TextArea
          name="textarea1"
          placeholder="Description"
          onChange={onChange}
          disableShrink
          autoGrow
          label="Description"
          value={inputs.textarea1}
        />
      </Form>

      <h2>Form Component</h2>
      <Form>
        <Input
          disabled
          label="Username"
          name="username_disabled"
          disableShrink
          value={inputs.username_disabled}
          onChange={onChange}
        />
        <PasswordInput
          disabled
          label="Password"
          name="password_disabled"
          disableShrink
          value={inputs.password_disabled}
          onChange={onChange}
        />
        <NumberInput
          label="Number"
          name="number_disabled"
          disabled
          disableShrink
          value={inputs.number_disabled}
          onChange={onChange}
        />
        <AmountInput
          label="Amount"
          name="amount_disabled"
          disabled
          disableShrink
          value={inputs.amount_disabled}
          onChange={onChange}
        />
        <Select
          label="Select"
          name="select_disabled"
          disableShrink
          isClearable
          disabled
          options={OPTIONS}
          value={inputs.select_disabled}
          onChange={onChange}
        />
        <Select
          label="Multi Select"
          name="multi_disabled"
          disableShrink
          disabled
          options={OPTIONS}
          value={inputs.multi_disabled}
          isMulti
          onChange={onChange}
        />
        <PhoneInput
          label="Phone"
          name="phone_disabled"
          disabled
          disableShrink
          value={inputs.phone_disabled}
          onChange={onChange}
        />
        <RadioGroup
          disabled
          label="RadioGroup"
          value={inputs.country_disabled}
          name="country_disabled"
          onChange={onChange}
          options={[
            { label: 'Radio Option 1', value: 'default122' },
            { label: 'Radio Option 2', value: 'default222' },
          ]}
        />
        <Checkbox
          disabled
          checked={inputs.agree_disabled}
          label="I understand and accept the terms and conditions and privacy policy."
          name="agree_disabled"
          onChange={onChange}
        />
        <Switch
          disabled
          checked={inputs.dark_disabled}
          label="Switch"
          name="dark_disabled"
          onChange={onChange}
        />
      </Form>
    </>
  );
};

export const FormComponent = Template.bind({});

const Component = {
  title: 'Form/Form',
  component: Form,
};

export default Component;
