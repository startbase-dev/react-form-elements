import React, { useState } from 'react';

import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import PasswordInput from '../PasswordInput/PasswordInput';
import RadioGroup from '../RadioGroup/RadioGroup';
import Switch from '../Switch/Switch';
import TextArea from '../TextArea/TextArea';
import Form from './Form.js';

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
          onChange={onChange}
        />
        <PasswordInput
          label="Password"
          name="password"
          value={inputs.password}
          onChange={onChange}
        />
        <TextArea
          name="textarea"
          label="Description"
          onChange={onChange}
          value={inputs.textarea}
        />
        <RadioGroup
          label="RadioGroup"
          value={inputs.country}
          name="country"
          onChange={onChange}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
        />
        <Checkbox
          checked={inputs.agree}
          label="I understand and accept the terms and conditions and privacy policy."
          name="agree"
          onChange={onChange}
        />
        <Switch
          checked={inputs.dark}
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
          name="username"
          disableShrink
          value={inputs.username}
          onChange={onChange}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          name="password"
          disableShrink
          value={inputs.password}
          onChange={onChange}
        />
        <TextArea
          name="textarea"
          placeholder="Description"
          onChange={onChange}
          disableShrink
          label="Description"
          value={inputs.textarea}
        />
        <RadioGroup
          label="RadioGroup"
          value={inputs.country}
          name="country"
          onChange={onChange}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
          ]}
        />
        <Checkbox
          checked={inputs.agree}
          label="I understand and accept the terms and conditions and privacy policy."
          name="agree"
          onChange={onChange}
        />
        <Switch
          checked={inputs.dark}
          label="Switch"
          name="dark"
          onChange={onChange}
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
        <RadioGroup
          disabled
          label="RadioGroup"
          value={inputs.country_disabled}
          name="country_disabled"
          onChange={onChange}
          options={[
            { label: 'Radio Option 1', value: 'default1' },
            { label: 'Radio Option 2', value: 'default2' },
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
