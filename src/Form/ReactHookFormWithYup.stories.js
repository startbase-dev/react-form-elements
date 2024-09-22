import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const validationSchema = yup.object({
  amount: yup.string().required('Required').label('AmountInput'),
  calendar: yup.string().required('Required').label('Calendar'),
  checkbox: yup.boolean().required('Required').label('Checkbox'),
  checkboxCards: yup.array().required('Required').label('CheckboxCards'),
  checkboxGroup: yup.array().required('Required').label('CheckboxGroup'),
  date: yup.date().required('Required').label('DatePicker'),
  date_range: yup.object().required('Required').label('DateRangePicker'),
  input: yup.string().required('Required').label('Input'),
  multiple_date: yup.array().required('Required').label('MultipleDatePicker'),
  number: yup.string().required('Required').label('NumberInput'),
  otp: yup.string().required('Required').label('OTPInput'),
  password: yup.string().required('Required').label('PasswordInput'),
  phone: yup.string().required('Required').label('PhoneInput'),
  radio: yup.string().required('Required').label('Radio'),
  radioCards: yup.string().required('Required').label('RadioCards'),
  radioGroup: yup.string().required('Required').label('RadioGroup'),
  select: yup.object().required('Required').label('Select'),
  slider: yup.number().required('Required').label('Slider'),
  switch: yup.boolean().required('Required').label('Switch'),
  textarea: yup.string().required('Required').label('TextArea'),
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
          border: '1px solid white',
          padding: '10px',
          marginBottom: '50px',
          borderRadius: '10px',
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
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <AmountInput
              label="Amount Input"
              disableShrink={disableShrink}
              value={watch('amount')}
              error={errors.amount}
              {...field}
              disabled={disabled}
            />
          )}
        />
        <Calendar
          label="Calendar"
          value={watch('calendar')}
          {...register('calendar')}
          error={errors.calendar}
          disabled={disabled}
        />
        <Controller
          name="checkbox"
          control={control}
          render={({ field }) => (
            <Checkbox
              disabled={disabled}
              label="Checkbox"
              checked={watch('checkbox')}
              {...field}
              error={errors.checkbox}
            />
          )}
        />
        <Controller
          name="checkboxCards"
          control={control}
          render={({ field }) => (
            <CheckboxCards
              disabled={disabled}
              label="Checkbox Cards"
              value={watch('checkboxCards')}
              {...field}
              error={errors.checkboxCards}
              options={[
                { label: 'CheckboxCards Option 1', value: 'default1' },
                { label: 'CheckboxCards Option 2', value: 'default2' },
              ]}
            />
          )}
        />
        <Controller
          name="checkboxGroup"
          control={control}
          render={({ field }) => (
            <CheckboxGroup
              disabled={disabled}
              label="Checkbox Group"
              value={watch('checkboxGroup')}
              {...field}
              error={errors.checkboxGroup}
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
              error={errors.date}
              disabled={disabled}
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
              error={errors.date_range}
              disabled={disabled}
            />
          )}
        />
        <Input
          label="Input"
          value={watch('input')}
          {...register('input')}
          disableShrink={disableShrink}
          error={errors.input}
          disabled={disabled}
        />
        <MultipleDatePicker
          value={watch('multiple_date')}
          {...register('multiple_date')}
          disableShrink={disableShrink}
          error={errors.multiple_date}
          label="Multiple Date Picker"
          disabled={disabled}
        />
        <NumberInput
          label="Number Input"
          disableShrink={disableShrink}
          value={watch('number')}
          {...register('number')}
          error={errors.number}
          disabled={disabled}
        />
        <OTPInput
          length={6}
          label="OTP Input"
          name="otp"
          value={watch('otp')}
          {...register('otp')}
          error={errors.otp}
          disabled={disabled}
          timer={120}
        />
        <PasswordInput
          label="Password Input"
          disableShrink={disableShrink}
          value={watch('password')}
          {...register('password')}
          error={errors.password}
          disabled={disabled}
        />
        <PhoneInput
          label="Phone Input"
          disableShrink={disableShrink}
          value={watch('phone')}
          {...register('phone')}
          error={errors.phone}
          disabled={disabled}
        />
        <Radio
          disabled={disabled}
          label="Radio"
          checked={watch('radio') === 'radio'}
          value={'radio'}
          {...register('radio')}
          error={errors.radio}
        />
        <RadioCards
          disabled={disabled}
          label="Radio Cards"
          value={watch('radioCards')}
          {...register('radioCards')}
          error={errors.radioCards}
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
          error={errors.radioGroup}
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
          error={errors.select}
          disabled={disabled}
        />
        <Slider
          name="slider"
          label="Slider"
          value={watch('slider')}
          {...register('slider')}
          error={errors.slider}
          disabled={disabled}
        />
        <Controller
          name="switch"
          control={control}
          render={({ field }) => (
            <Switch
              label="Switch"
              {...field}
              checked={watch('switch')}
              error={errors.switch}
              disabled={disabled}
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
    </>
  );
};

export const FormComponent = Template.bind({});

const Component = {
  title: 'Form/Form/ReactHookFormYup',
  component: Form,
};

export default Component;
