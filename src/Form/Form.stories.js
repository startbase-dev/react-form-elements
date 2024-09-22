import React, { useState } from 'react';

import AmountInput from '../AmountInput';
import Calendar from '../Calendar';
import Checkbox from '../Checkbox';
import CheckboxCards from '../CheckboxCards';
import CheckboxGroup from '../CheckboxGroup';
import DatePicker from '../DatePicker';
import DateRangePicker from '../DateRangePicker';
import Form from './index';
import Input from '../Input';
import MultipleDatePicker from '../MultipleDatePicker';
import NumberInput from '../NumberInput';
import OTPInput from '../OTPInput';
import PasswordInput from '../PasswordInput';
import PhoneInput from '../PhoneInput';
import Radio from '../Radio';
import RadioCards from '../RadioCards';
import RadioGroup from '../RadioGroup';
import Select from '../Select';
import Switch from '../Switch';
import Slider from '../Slider';
import TextArea from '../TextArea';

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
    console.log(name, value, type);

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
          border: '1px solid white',
          padding: '10px',
          marginBottom: '50px',
          borderRadius: '10px',
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
        <AmountInput
          label="Amount Input"
          name="amount"
          disableShrink={disableShrink}
          value={inputs.amount}
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
        <Checkbox
          disabled={disabled}
          name="checkbox"
          checked={inputs.checkbox}
          onChange={onChange}
          error={error}
        />
        <CheckboxCards
          disabled={disabled}
          label="Checkbox Cards"
          name="checkboxCards"
          value={inputs.checkboxCards}
          onChange={onChange}
          error={error}
          options={[
            { label: 'CheckboxCards Option 1', value: 'default1' },
            { label: 'CheckboxCards Option 2', value: 'default2' },
            { label: 'CheckboxCards Option 3', value: 'default3' },
          ]}
        />
        <CheckboxGroup
          disabled={disabled}
          label="Checkbox Group"
          name="checkboxGroup"
          value={inputs.checkboxGroup}
          onChange={onChange}
          error={error}
          options={[
            { label: 'CheckboxGroup Option 1', value: 'default1' },
            { label: 'CheckboxGroup Option 2', value: 'default2' },
            { label: 'CheckboxGroup Option 3', value: 'default3' },
          ]}
        />
        <DatePicker
          label="Date Picker"
          name="date"
          disableShrink={disableShrink}
          value={inputs.date}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <DateRangePicker
          label="Date Range Picker"
          name="date_range"
          disableShrink={disableShrink}
          value={inputs.date_range}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <Input
          label="Input"
          name="input"
          disableShrink={disableShrink}
          value={inputs.input}
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
        <NumberInput
          label="Number Input"
          name="number"
          disableShrink={disableShrink}
          value={inputs.number}
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
        <PasswordInput
          label="Password Input"
          name="password"
          disableShrink={disableShrink}
          value={inputs.password}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <PhoneInput
          label="Phone Input"
          name="phone"
          disableShrink={disableShrink}
          value={inputs.phone}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <Radio
          disabled={disabled}
          name="radio"
          value="radio"
          checked={inputs.radio === 'radio'}
          onChange={onChange}
          error={error}
        />
        <RadioCards
          disabled={disabled}
          label="Radio Cards"
          name="radioCards"
          value={inputs.radioCards}
          hideInput
          onChange={onChange}
          error={error}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
        />
        <RadioGroup
          disabled={disabled}
          label="Radio Group"
          name="radioGroup"
          value={inputs.radioGroup}
          onChange={onChange}
          error={error}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
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
        <Slider
          name="slider"
          label="Slider"
          value={inputs.slider}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <Switch
          name="switch"
          checked={inputs.switch}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
        <TextArea
          label="TextArea"
          autoGrow
          error={error}
          name="textarea"
          disableShrink={disableShrink}
          value={inputs.textarea}
          onChange={onChange}
          disabled={disabled}
        />
      </Form>
      <button onClick={handleOnSubmit}> Submit</button>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid white',
          padding: '10px',
          marginTop: '50px',
          borderRadius: '10px',
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
    </>
  );
};

export const FormComponent = Template.bind({});

const Component = {
  title: 'Form/Form',
  component: Form,
};

export default Component;
