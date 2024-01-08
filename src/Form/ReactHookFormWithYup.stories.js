import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const validationSchema = yup.object({
  username: yup.string().required('Required').label('Username'),
  password: yup.string().required('Required').label('Password'),
  number: yup.number().required('Required').label('Number'),
  amount: yup.number().required('Required').label('Amount'),
  select: yup.object().required('Required').label('Select'),
  multi: yup.array().required('Required').label('Multi'),
  phone: yup.string().required('Required').label('Phone'),
  calendar: yup.date().required('Required').label('Calendar'),
  date: yup.date().required('Required').label('Date'),
  multiple_date: yup.array().required('Required').label('Multiple Date'),
  date_range: yup.object().required('Required').label('Date Range'),
  textarea: yup.string().required('Required').label('Description'),
  country: yup.string().required('Required').label('Country'),
  policy: yup.boolean().required('Required').label('Policy'),
  terms: yup.boolean().required('Required').label('Terms'),
});

const Template = () => {
  const [inputs, setInputs] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [disableShrink, setDisableShrink] = useState(false);
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
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
      </div>
      <Form>
        <Input
          label="Username"
          value={watch('username')}
          {...register('username')}
          disableShrink={disableShrink}
          error={errors.username}
          disabled={disabled}
        />
        <PasswordInput
          label="Password"
          disableShrink={disableShrink}
          value={watch('password')}
          {...register('password')}
          error={errors.password}
          disabled={disabled}
        />
        <NumberInput
          label="Number"
          disableShrink={disableShrink}
          value={watch('number')}
          {...register('number')}
          error={errors.number}
          disabled={disabled}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <AmountInput
              label="Amount"
              disableShrink={disableShrink}
              value={watch('amount')}
              error={errors.amount}
              {...field}
              disabled={disabled}
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
          error={errors.select}
          disabled={disabled}
        />
        <Select
          label="Multi Select"
          options={OPTIONS}
          isMulti
          disableShrink={disableShrink}
          value={watch('multi')}
          {...register('multi')}
          error={errors.multi}
          disabled={disabled}
        />
        <PhoneInput
          label="Phone"
          disableShrink={disableShrink}
          value={watch('phone')}
          {...register('phone')}
          error={errors.phone}
          disabled={disabled}
        />
        <Calendar
          label="Calendar"
          value={watch('calendar')}
          {...register('calendar')}
          error={errors.calendar}
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
              error={errors.date}
              disabled={disabled}
            />
          )}
        />
        <MultipleDatePicker
          value={watch('multiple_date')}
          {...register('multiple_date')}
          disableShrink={disableShrink}
          error={errors.multiple_date}
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
              error={errors.date_range}
              disabled={disabled}
              {...field}
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
              error={errors.textarea}
              disabled={disabled}
            />
          )}
        />
        <RadioGroup
          disabled={disabled}
          label="RadioGroup"
          value={watch('country')}
          {...register('country')}
          error={errors.country}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
        />
        <Checkbox
          disabled={disabled}
          label="I understand and accept the terms and conditions and privacy policy."
          checked={watch('policy')}
          {...register('policy')}
          error={errors.policy}
        />
        <Switch
          label="Switch"
          checked={watch('terms')}
          {...register('terms')}
          error={errors.terms}
          disabled={disabled}
        />
      </Form>
      <button onClick={handleSubmit(onSubmit)}> Submit </button>
    </>
  );
};

export const FormComponent = Template.bind({});

const Component = {
  title: 'Form/Form/ReactHookFormYup',
  component: Form,
};

export default Component;
