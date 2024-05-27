import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import AmountInput from '../AmountInput';
import Calendar from '../Calendar';
import Checkbox from '../Checkbox';
import CheckboxCards from '../CheckboxCards';
import CheckboxGroup from '../CheckboxGroup';
import DatePicker from '../DatePicker';
import DateRangePicker from '../DateRangePicker';
import Form from './index.js';
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
import { PieIcon } from '../Icon';

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
  const { control, register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => setInputs(data);

  console.log(inputs);
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
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <AmountInput
              label="Amount Input"
              disableShrink={disableShrink}
              value={watch('amount')}
              error={error}
              {...field}
              disabled={disabled}
              prepend={<PieIcon />}
            />
          )}
        />
        <Calendar
          label="Calendar"
          value={watch('calendar')}
          {...register('calendar')}
          error={error}
          disabled={disabled}
        />
        <Checkbox
          disabled={disabled}
          label="Checkbox"
          checked={watch('checkbox')}
          {...register('checkbox')}
          error={error}
        />
        <Controller
          name="checkbox Cards"
          control={control}
          render={({ field }) => (
            <CheckboxCards
              disabled={disabled}
              label="CheckboxCards"
              value={watch('checkboxCards')}
              {...field}
              error={error}
              options={[
                { label: 'CheckboxCards Option 1', value: 'default1' },
                { label: 'CheckboxCards Option 2', value: 'default2' },
              ]}
            />
          )}
        />
        <Controller
          name="checkbox Group"
          control={control}
          render={({ field }) => (
            <CheckboxGroup
              disabled={disabled}
              label="CheckboxGroup"
              value={watch('checkboxGroup')}
              {...field}
              error={error}
              options={[
                { label: 'CheckboxGroup Option 1', value: 'default1' },
                { label: 'CheckboxGroup Option 2', value: 'default2' },
              ]}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Date Picker"
              disableShrink={disableShrink}
              value={watch('date')}
              {...field}
              error={error}
              disabled={disabled}
              prepend={<PieIcon />}
            />
          )}
        />
        <Controller
          name="date_range"
          control={control}
          render={({ field }) => (
            <DateRangePicker
              label="Date Range Picker"
              disableShrink={disableShrink}
              value={watch('date_range')}
              {...register('date_range')}
              {...field}
              error={error}
              disabled={disabled}
              prepend={<PieIcon />}
            />
          )}
        />
        <Input
          label="Input"
          value={watch('input')}
          {...register('input')}
          disableShrink={disableShrink}
          error={error}
          disabled={disabled}
          prepend={<PieIcon />}
        />
        <MultipleDatePicker
          value={watch('multiple_date')}
          {...register('multiple_date')}
          disableShrink={disableShrink}
          error={error}
          label="Multiple Date Picker"
          disabled={disabled}
        />
        <NumberInput
          label="Number Input"
          disableShrink={disableShrink}
          value={watch('number')}
          {...register('number')}
          error={error}
          disabled={disabled}
          prepend={<PieIcon />}
        />
        <OTPInput
          length={6}
          label="OTP Input"
          name="otp"
          value={watch('otp')}
          {...register('otp')}
          error={error}
          disabled={disabled}
          timer={120}
        />
        <PasswordInput
          label="Password Input"
          disableShrink={disableShrink}
          value={watch('password')}
          {...register('password')}
          error={error}
          disabled={disabled}
          prepend={<PieIcon />}
        />
        <PhoneInput
          label="Phone Input"
          disableShrink={disableShrink}
          value={watch('phone')}
          {...register('phone')}
          error={error}
          disabled={disabled}
          prepend={<PieIcon />}
        />
        <Radio
          disabled={disabled}
          label="Radio"
          checked={watch('radio') === 'radio'}
          value={'radio'}
          {...register('radio')}
          error={error}
        />
        <RadioCards
          disabled={disabled}
          label="Radio Cards"
          value={watch('radioCards')}
          {...register('radioCards')}
          error={error}
          options={[
            { label: 'RadioCards Option 1', value: 'default1' },
            { label: 'RadioCards Option 2', value: 'default2' },
          ]}
        />
        <RadioGroup
          disabled={disabled}
          label="Radio Group"
          value={watch('radioGroup')}
          {...register('radioGroup')}
          error={error}
          options={[
            { label: 'RadioGroup Option 1', value: 'default1' },
            { label: 'RadioGroup Option 2', value: 'default2' },
          ]}
        />
        <Select
          label="Select"
          options={OPTIONS}
          isClearable
          disableShrink={disableShrink}
          value={watch('select')}
          {...register('select')}
          error={error}
          disabled={disabled}
        />
        <Slider
          name="slider"
          label="Slider"
          value={watch('slider')}
          {...register('slider')}
          error={error}
          disabled={disabled}
        />
        <Switch
          label="Switch"
          checked={watch('switch')}
          {...register('switch')}
          error={error}
          disabled={disabled}
        />
        <Controller
          name="textarea"
          control={control}
          render={({ field }) => (
            <TextArea
              label="Description"
              autoGrow
              disableShrink={disableShrink}
              value={watch('textarea')}
              {...field}
              error={error}
              disabled={disabled}
            />
          )}
        />
      </Form>
      <button onClick={handleSubmit(onSubmit)}> Submit</button>
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
  title: 'Form/Form/ReactHookForm',
  component: Form,
};

export default Component;
