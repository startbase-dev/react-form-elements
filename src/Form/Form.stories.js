import React, { useState } from 'react';

import Checkbox from '../Checkbox';
import Input from '../Input';
import PasswordInput from '../PasswordInput';
import RadioGroup from '../RadioGroup';
import Switch from '../Switch';
import TextArea from '../TextArea';
import Form from './index.js';
import NumberInput from '../NumberInput';
import AmountInput from '../AmountInput';
import Select from '../Select';
import PhoneInput from '../PhoneInput';
import DatePicker from '../DatePicker';
import OTPInput from '../OTPInput';
import DateRangePicker from '../DateRangePicker';
import MultipleDatePicker from '../MultipleDatePicker';
import Calendar from '../Calendar';

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
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [disableShrink, setDisableShrink] = useState(false);
  const onChange = (e) => {
    const { name, value, type } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? !prevState[name] : value,
    }));
  };

  const handleOnSubmit = () => console.log(inputs);

  return (
    <>
      <h2>Form Component</h2>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Checkbox
          label="Error"
          name="error"
          checked={error}
          onChange={() => {
            setError((prevState) => !prevState);
          }}
        />
        <Checkbox
          label="Disabled"
          name="disabled"
          checked={disabled}
          onChange={() => {
            setDisabled((prevState) => !prevState);
          }}
        />
        <Checkbox
          label="Disable Shrink"
          name="disableShrink"
          checked={disableShrink}
          onChange={() => {
            setDisableShrink((prevState) => !prevState);
          }}
        />
        <Input
          label="Error Message"
          name="errorMessage"
          value={error}
          onChange={(e) => {
            setError(e.target.value);
          }}
        />
      </div>
      <Form>
        <Input
          label="Username"
          name="username"
          disableShrink={disableShrink}
          value={inputs.username}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <PasswordInput
          label="Password"
          name="password"
          disableShrink={disableShrink}
          value={inputs.password}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <NumberInput
          label="Number"
          name="number"
          disableShrink={disableShrink}
          value={inputs.number}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <AmountInput
          label="Amount"
          name="amount"
          disableShrink={disableShrink}
          value={inputs.amount}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <Select
          label="Select"
          options={OPTIONS}
          isClearable
          name="select"
          disableShrink={disableShrink}
          value={inputs.select}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <Select
          label="Multi Select"
          options={OPTIONS}
          isMulti
          name="multi"
          disableShrink={disableShrink}
          value={inputs.multi}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <PhoneInput
          label="Phone"
          name="phone"
          disableShrink={disableShrink}
          value={inputs.phone}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <Calendar
          label="Calendar"
          name="calendar"
          value={inputs.calendar}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <DatePicker
          label="Date"
          name="date"
          disableShrink={disableShrink}
          value={inputs.date}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <MultipleDatePicker
          name="multiple_date"
          value={inputs.multiple_date}
          onChange={onChange}
          disableShrink={disableShrink}
          error={error}
          label="Multiple Date Picker"
          disabled={disabled}
        />
        <DateRangePicker
          label="DateRange"
          name="date_range"
          disableShrink={disableShrink}
          value={inputs.date_range}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <OTPInput
          length={6}
          label="OTP Input"
          name="otp"
          value={inputs.otp}
          onChange={onChange}
          error={error}
          disabled={disabled}
          timer={120}
        />
        <TextArea
          label="Description"
          autoGrow
          error={error}
          name="textarea"
          disableShrink={disableShrink}
          value={inputs.textarea}
          onChange={onChange}
          disabled={disabled}
        />
        <RadioGroup
          disabled={disabled}
          label="RadioGroup"
          name="country"
          value={inputs.country}
          onChange={onChange}
          error={error}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
        />
        <Checkbox
          disabled={disabled}
          label="I understand and accept the terms and conditions and privacy policy."
          name="policy"
          checked={inputs.policy}
          onChange={onChange}
          error={error}
        />
        <Switch
          label="Switch"
          name="terms"
          checked={inputs.terms}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
      </Form>
      <button onClick={handleOnSubmit}> Submit </button>
    </>
  );
};

export const FormComponent = Template.bind({});

const Component = {
  title: 'Form/Form',
  component: Form,
};

export default Component;
