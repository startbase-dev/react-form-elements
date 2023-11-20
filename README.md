# react-form-elements

![npm](https://img.shields.io/npm/v/%40start-base%2Freact-form-elements)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40start-base%2Freact-form-elements)
![npm](https://img.shields.io/npm/dm/%40start-base/react-form-elements)

This npm package provides a set of form-related components for React. You can use these components to build forms with ease.

- CSS variables for theming are available for all components.
- Classnames are available for all components.
- Built-in dark mode support.

![](dark.png)
![](light.png)
![](theme.png)

## Table of Contents

- [Installation](#installation)
- [Documentation](#documentation)
- [Components](#components)
- [Examples](#examples)
- [Demos](#demos)

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install --save @start-base/react-form-elements
    $ yarn add @start-base/react-form-elements

## Documentation

Make sure to add css file to your app root file

```jsx
import '@start-base/react-form-elements/dist/lib/index.css';
```

Nextjs example can show all features how to use.

```jsx
import { Inter } from 'next/font/google';

import '@start-base/react-form-elements/dist/lib/index.css';

import './globals.css';

layout.js;

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'React Form Elements',
  description: 'React Form Elements Examples',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

## Components

## Props

### Common Props

| Name           | Type                  | Default | Description                                             |
| -------------- | --------------------- | ------- | ------------------------------------------------------- |
| name           | `string`              |         | Name of the input                                       |
| label          | `string`              |         | Label of the input                                      |
| value          | `string` or `number`  |         | Value of the input                                      |
| onChange       | `function`            |         | Callback function that is fired when the value changes. |
| inputClassName | `string`              |         | Classname for input element                             |
| labelClassName | `string`              |         | Classname for label element                             |
| errorClassName | `string`              |         | Classname for error element                             |
| disabled       | `boolean`             | `false` | Disable the input                                       |
| error          | `string` or `boolean` |         | Error message to display below the input                |

### Form

| Name     | Type        | Default | Description          |
| -------- | ----------- | ------- | -------------------- |
| children | `ReactNode` |         | Children of the form |

### Input

| Name             | Type                  | Default | Description                   |
| ---------------- | --------------------- | ------- | ----------------------------- |
| prepend          | `string` or `element` |         | Prepend text to the input     |
| append           | `string` or `element` |         | Append text to the input      |
| appendClassName  | `string`              |         | Classname for append element  |
| prependClassName | `string`              |         | Classname for prepend element |

### TextArea

| Name             | Type      | Default | Description             |
| ---------------- | --------- | ------- | ----------------------- |
| disableShrink    | `boolean` | `false` | Disable shrink on focus |
| autoGrowautoGrow | `boolean` | `false` | Auto grow textarea      |

### Checkbox

| Name    | Type      | Default | Description                 |
| ------- | --------- | ------- | --------------------------- |
| checked | `boolean` |         | Checked state of the switch |

### Radio

| Name    | Type      | Default | Description                 |
| ------- | --------- | ------- | --------------------------- |
| checked | `boolean` |         | Checked state of the switch |

### Switch

| Name    | Type      | Default | Description                 |
| ------- | --------- | ------- | --------------------------- |
| checked | `boolean` |         | Checked state of the switch |

### RadioGroup

| Name                 | Type     | Default | Description                 |
| -------------------- | -------- | ------- | --------------------------- |
| options              | `array`  |         | Array of options to display |
| optionLabelClassName | `string` |         | Classname for option label  |

### PasswordInput

| Name             | Type                  | Default | Description                   |
| ---------------- | --------------------- | ------- | ----------------------------- |
| prepend          | `string` or `element` |         | Prepend text to the input     |
| append           | `string` or `element` |         | Append text to the input      |
| appendClassName  | `string`              |         | Classname for append element  |
| prependClassName | `string`              |         | Classname for prepend element |
| disableShrink    | `boolean`             | `false` | Disable shrink on focus       |

### AmountInput

| Name             | Type                  | Default | Description                   |
| ---------------- | --------------------- | ------- | ----------------------------- |
| prepend          | `string` or `element` |         | Prepend text to the input     |
| append           | `string` or `element` |         | Append text to the input      |
| appendClassName  | `string`              |         | Classname for append element  |
| prependClassName | `string`              |         | Classname for prepend element |
| disableShrink    | `boolean`             | `false` | Disable shrink on focus       |

### NumberInput

| Name                   | Type                  | Default        | Description                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | --------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prepend                | `string` or `element` |                | Prepend text to the input                                                                                                                                                                                                                                                                                                                                                        |
| append                 | `string` or `element` |                | Append text to the input                                                                                                                                                                                                                                                                                                                                                         |
| appendClassName        | `string`              |                | Classname for append element                                                                                                                                                                                                                                                                                                                                                     |
| prependClassName       | `string`              |                | Classname for prepend element                                                                                                                                                                                                                                                                                                                                                    |
| disableShrink          | `boolean`             | `false`        | Disable shrink on focus                                                                                                                                                                                                                                                                                                                                                          |
| allowDecimals          | `boolean`             | `true`         | Allow decimals                                                                                                                                                                                                                                                                                                                                                                   |
| allowNegativeValue     | `boolean`             | `true`         | Allow user to enter negative value                                                                                                                                                                                                                                                                                                                                               |
| defaultValue           | `number`              |                | Default value                                                                                                                                                                                                                                                                                                                                                                    |
| decimalsLimit          | `number`              | `2`            | Limit length of decimals allowed                                                                                                                                                                                                                                                                                                                                                 |
| decimalScale           | `number`              |                | Specify decimal scale for padding/trimming eg. 1.5 -> 1.50 or 1.234 -> 1.23 if decimal scale 2                                                                                                                                                                                                                                                                                   |
| fixedDecimalLength     | `number`              |                | Value will always have the specified length of decimals                                                                                                                                                                                                                                                                                                                          |
| prefix                 | `string`              |                | Include a prefix eg. £ or \$                                                                                                                                                                                                                                                                                                                                                     |
| suffix                 | `string`              |                | Include a suffix eg. € or %                                                                                                                                                                                                                                                                                                                                                      |
| decimalSeparator       | `string`              | locale default | Separator between integer part and fractional part of value                                                                                                                                                                                                                                                                                                                      |
| groupSeparator         | `string`              | locale default | Separator between thousand, million and billion                                                                                                                                                                                                                                                                                                                                  |
| intlConfig             | `object`              |                | `locale` should be a [BCP 47 language tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation), such as "en-US" or "en-IN". `currency` should be a [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217), such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. |
| disableAbbreviations   | `boolean`             | `false`        | Disable abbreviations eg. 1k -> 1,000, 2m -> 2,000,000                                                                                                                                                                                                                                                                                                                           |
| disableGroupSeparators | `boolean`             | `false`        | Disable auto adding the group separator between values, eg. 1000 -> 1,000                                                                                                                                                                                                                                                                                                        |
| maxLength              | `number`              |                | Maximum characters the user can enter                                                                                                                                                                                                                                                                                                                                            |
| step                   | `number`              |                | Incremental value change on arrow down and arrow up key press                                                                                                                                                                                                                                                                                                                    |
| transformRawValue      | `function`            |                | Transform the raw value from the input before parsing. Needs to return `string`.                                                                                                                                                                                                                                                                                                 |

### Select

This component is a wrapper around [react-select](https://react-select.com/home) component. All props from react-select can be passed to this component.

| Name       | Type     | Default | Description                             |
| ---------- | -------- | ------- | --------------------------------------- |
| classNames | `object` |         | ClassNames object for select components |
| components | `object` |         | Components object for select components |

### PhoneInput

This component is a wrapper around [react-phone-number-input](https://catamphetamine.gitlab.io/react-phone-number-input/) component. All props from react-phone-number-input can be passed to this component.

### Calendar

### DatePicker

### MultipleDatePicker

### DateRangePicker

## Examples

Here's an example of using the form elements in a React component:

```jsx
import React, { useState } from 'react';

import {
  Checkbox,
  Form,
  Input,
  PasswordInput,
  RadioGroup,
  TextArea,
} from '@start-base/react-form-elements';

('use client');

export default function FormElements() {
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
      <h2>React Form Elements</h2>
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
          onChange={onChange}
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
      </Form>
    </>
  );
}
```

## Demos

For live demos of these components in action, please visit our [CodeSandbox](https://codesandbox.io/p/sandbox/inspiring-jepsen-wnr5tg) and [Storybook](https://form-storybook-am7u.vercel.app/) demo pages.
