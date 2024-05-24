import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Checkbox from '../Checkbox';
import Input from '../Input';
import PasswordInput from '../PasswordInput';
import RadioGroup from '../RadioGroup';
import CheckboxGroup from '../CheckboxGroup';
import Switch from '../Switch';
import Radio from '../Radio';
import TextArea from '../TextArea';
import Form from './index.js';
import NumberInput from '../NumberInput';
import AmountInput from '../AmountInput';
import Select from '../Select';
import PhoneInput from '../PhoneInput';
import DatePicker from '../DatePicker';
import DateRangePicker from '../DateRangePicker';
import MultipleDatePicker from '../MultipleDatePicker';
import Calendar from '../Calendar';
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
          value={watch('username')}
          {...register('username')}
          disableShrink={disableShrink}
          error={error}
          disabled={disabled}
          prepend={<PieIcon />}
        />
        <PasswordInput
          label="Password"
          disableShrink={disableShrink}
          value={watch('password')}
          {...register('password')}
          error={error}
          disabled={disabled}
          prepend={<PieIcon />}
        />
        <NumberInput
          label="Number"
          disableShrink={disableShrink}
          value={watch('number')}
          {...register('number')}
          error={error}
          disabled={disabled}
          prepend={<PieIcon />}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <AmountInput
              label="Amount"
              disableShrink={disableShrink}
              value={watch('amount')}
              error={error}
              {...field}
              disabled={disabled}
              prepend={<PieIcon />}
            />
          )}
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
        <Select
          label="Multi Select"
          options={OPTIONS}
          isMulti
          disableShrink={disableShrink}
          value={watch('multi')}
          {...register('multi')}
          error={error}
          disabled={disabled}
        />
        <PhoneInput
          label="Phone"
          disableShrink={disableShrink}
          value={watch('phone')}
          {...register('phone')}
          error={error}
          disabled={disabled}
          prepend={<PieIcon />}
        />
        <Calendar
          label="Calendar"
          value={watch('calendar')}
          {...register('calendar')}
          error={error}
          disabled={disabled}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Date"
              disableShrink={disableShrink}
              value={watch('date')}
              {...field}
              error={error}
              disabled={disabled}
              prepend={<PieIcon />}
            />
          )}
        />
        <MultipleDatePicker
          value={watch('multiple_date')}
          {...register('multiple_date')}
          disableShrink={disableShrink}
          error={error}
          label="Multiple Date Picker"
          disabled={disabled}
        />
        <Controller
          name="date_range"
          control={control}
          render={({ field }) => (
            <DateRangePicker
              label="DateRange"
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
        <RadioGroup
          disabled={disabled}
          label="RadioGroup"
          value={watch('country')}
          {...register('country')}
          error={error}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
        />
        <CheckboxGroup
          disabled={disabled}
          label="CheckboxGroup"
          value={watch('country2')}
          {...register('country2')}
          error={error}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
        />
        <Radio
          disabled={disabled}
          label="I understand and accept the terms and conditions and privacy policy."
          checked={watch('policy2')}
          value={true}
          {...register('policy2')}
          error={error}
        />
        <Checkbox
          disabled={disabled}
          label="I understand and accept the terms and conditions and privacy policy."
          checked={watch('policy')}
          {...register('policy')}
          error={error}
        />
        <Switch
          label="Switch"
          checked={watch('terms')}
          {...register('terms')}
          error={error}
          disabled={disabled}
        />
      </Form>
      <button onClick={handleSubmit(onSubmit)}> Submit </button>
    </>
  );
};

export const FormComponent = Template.bind({});

const Component = {
  title: 'Form/Form/ReactHookForm',
  component: Form,
};

export default Component;
