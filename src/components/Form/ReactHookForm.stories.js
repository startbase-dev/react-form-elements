import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

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
import DatePicker from '../DatePicker/DatePicker';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import MultipleDatePicker from '../MultipleDatePicker/MultipleDatePicker';
import CalendarRoot from '../Calendar/CalendarRoot';

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

  const { control, register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => setInputs(data);

  console.log(inputs);
  return (
    <>
      <h2>Form Component</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          value={watch('username')}
          {...register('username')}
        />
        <PasswordInput
          label="Password"
          value={watch('password')}
          {...register('password')}
        />
        <NumberInput
          label="Number"
          value={watch('number')}
          {...register('number')}
        />
        <AmountInput
          label="Amount"
          value={watch('amount')}
          {...register('amount')}
        />
        <Select
          label="Select"
          options={OPTIONS}
          isClearable
          value={watch('select')}
          {...register('select')}
        />
        <Select
          label="Multi Select"
          options={OPTIONS}
          isMulti
          value={watch('multi')}
          {...register('multi')}
        />
        <PhoneInput
          label="Phone"
          value={watch('phone')}
          {...register('phone')}
        />
        <CalendarRoot />
        <DatePicker
          inputProps={{
            label: 'Date',
            value: watch('date'),
            ...register('date'),
          }}
        />
        <MultipleDatePicker
          inputProps={{
            label: 'MultipleDatePicker',
            value: watch('multiple_date'),
            ...register('multiple_date'),
          }}
        />

        <Controller
          name="date_range"
          control={control}
          render={({ field }) => (
            <DateRangePicker
              inputProps={{
                label: 'DateRange',
                value: watch('date_range'),
                ...field,
              }}
            />
          )}
        />
        <TextArea
          label="Description"
          autoGrow
          value={watch('textarea')}
          {...register('textarea')}
        />
        <RadioGroup
          label="RadioGroup"
          value={watch('country')}
          {...register('country')}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
        />
        <Checkbox
          label="I understand and accept the terms and conditions and privacy policy."
          checked={watch('agree')}
          {...register('agree')}
        />
        <Switch checked={watch('dark')} label="Switch" {...register('dark')} />
        <input type="submit" />
      </Form>
    </>
  );
};

export const FormComponent = Template.bind({});

const Component = {
  title: 'Form/Form/ReactHookForm',
  component: Form,
};

export default Component;
