import React, { useState } from 'react';

import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import RadioGroup from '../RadioGroup/RadioGroup';
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
        <Input
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
      </Form>

      <h2>Form Component</h2>
      <Form>
        <Input
          label="Username"
          name="username"
          disableShrink
          value={inputs.username}
          onChange={onChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          disableShrink
          value={inputs.password}
          onChange={onChange}
        />
        <TextArea
          name="textarea"
          onChange={onChange}
          disableShrink
          label="Description"
          value={inputs.textarea}
        />
      </Form>

      <h2>Form Component</h2>
      <Form>
        <Input
          label="Username"
          name="username"
          disableShrink
          value={inputs.username}
          onChange={onChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          disableShrink
          value={inputs.password}
          onChange={onChange}
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
