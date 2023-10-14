// src/components/Checkbox/Checkbox.js
import React3 from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// src/components/Icon/PieIcon.js
import * as React from "react";

// src/components/Icon/CheckIcon.js
import * as React2 from "react";
var SvgComponent = (props) => /* @__PURE__ */ React2.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: 12,
    height: 12,
    fill: "none",
    ...props
  },
  /* @__PURE__ */ React2.createElement(
    "path",
    {
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 1.5,
      d: "M9.666 3.666 4.999 8.332 2.666 6"
    }
  )
);
var CheckIcon_default = SvgComponent;

// src/components/Checkbox/Checkbox.module.css
var Checkbox_module_default = {};

// src/components/Checkbox/Checkbox.js
function Checkbox({
  label,
  name,
  checked,
  className,
  onChange,
  disabled,
  error
}) {
  return /* @__PURE__ */ React3.createElement(
    "label",
    {
      htmlFor: name ? `checkbox_${name}` : "",
      className: cx(Checkbox_module_default.root, className)
    },
    /* @__PURE__ */ React3.createElement("div", { className: cx(Checkbox_module_default.inputRoot) }, /* @__PURE__ */ React3.createElement(
      "input",
      {
        className: Checkbox_module_default.input,
        name,
        type: "checkbox",
        checked,
        onChange,
        id: name ? `checkbox_${name}` : "",
        disabled
      }
    ), /* @__PURE__ */ React3.createElement(
      "span",
      {
        className: cx(Checkbox_module_default.box, {
          [Checkbox_module_default.boxDisabled]: disabled
        })
      },
      /* @__PURE__ */ React3.createElement(CheckIcon_default, { className: Checkbox_module_default.icon })
    ), /* @__PURE__ */ React3.createElement("div", { className: Checkbox_module_default.text }, label)),
    error ? /* @__PURE__ */ React3.createElement("div", { className: Checkbox_module_default.errorLabel }, error) : null
  );
}
Checkbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string,
  error: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool
};
Checkbox.defaultProps = {
  name: null,
  checked: false,
  label: null,
  error: null,
  onChange: () => {
  },
  className: "",
  disabled: false
};
var Checkbox_default = Checkbox;

// src/components/Form/Form.js
import React4 from "react";
import cx2 from "classnames";

// src/components/Form/Form.module.css
var Form_module_default = {};

// src/components/Form/Form.js
var Form = ({ children, ...rest }) => {
  return /* @__PURE__ */ React4.createElement("form", { className: cx2(Form_module_default.root), ...rest }, children);
};
Form.propTypes = {};
Form.defaultProps = {};
var Form_default = Form;

// src/components/Input/Input.js
import React5, { forwardRef, useCallback, useMemo, useState } from "react";
import cx3 from "classnames";
import DOMPurify from "dompurify";
import PropTypes2 from "prop-types";

// src/components/Input/Input.module.css
var Input_module_default = {};

// src/components/Input/Input.js
var Input = forwardRef(
  ({
    error,
    name,
    label,
    placeholder,
    value,
    onChange,
    className,
    rootClassName,
    containerClassName,
    prepend,
    prependClassName,
    append,
    appendClassName,
    disableShrink,
    disabled,
    ...rest
  }, inputRef) => {
    const [active, setActive] = useState(false);
    const handleChange = useCallback(
      (e) => {
        const inputName = e.target.name;
        const val = DOMPurify.sanitize(e.target.value);
        onChange({
          ...e,
          target: {
            name: inputName,
            value: val
          }
        });
      },
      [onChange]
    );
    const input = useMemo(() => {
      return /* @__PURE__ */ React5.createElement(
        "input",
        {
          type: "text",
          className: cx3(Input_module_default.input, className, {
            [Input_module_default.disableShrink]: disableShrink || !label,
            [Input_module_default.placeholder]: label && placeholder && !disableShrink,
            [Input_module_default.disabled]: disabled
          }),
          name,
          value,
          ref: inputRef,
          onChange: handleChange,
          disabled,
          placeholder,
          onFocus: () => setActive(true),
          onBlur: () => setActive(false),
          ...rest
        }
      );
    }, [
      className,
      disableShrink,
      disabled,
      name,
      active,
      value,
      inputRef,
      handleChange,
      rest
    ]);
    const labelEl = useMemo(
      () => /* @__PURE__ */ React5.createElement(
        "label",
        {
          htmlFor: name,
          className: cx3(Input_module_default.label, {
            [Input_module_default.disableShrink]: disableShrink,
            [Input_module_default.labelPlaceholder]: label && placeholder && !disableShrink
          }),
          onClick: () => {
            var _a;
            try {
              const inputs = document.querySelectorAll(`[name="${name}"]`);
              if (!inputs.length) {
                return;
              }
              let input2 = inputs == null ? void 0 : inputs[0];
              if ((input2 == null ? void 0 : input2.type) === "hidden") {
                input2 = (_a = input2 == null ? void 0 : input2.parentNode) == null ? void 0 : _a.querySelector("input");
              }
              input2 == null ? void 0 : input2.focus();
            } catch (error2) {
              throw error2;
            }
          }
        },
        label
      ),
      [name, disableShrink, label]
    );
    return /* @__PURE__ */ React5.createElement("div", { className: cx3(Input_module_default.root, rootClassName) }, /* @__PURE__ */ React5.createElement("div", { className: cx3(Input_module_default.inputRoot, containerClassName) }, prepend && /* @__PURE__ */ React5.createElement("div", { className: cx3(Input_module_default.prepend, prependClassName) }, prepend), append && /* @__PURE__ */ React5.createElement(
      "div",
      {
        className: cx3(Input_module_default.append, {
          [Input_module_default.appendDisabledShrink]: disableShrink,
          [appendClassName]: appendClassName
        })
      },
      append
    ), label && disableShrink ? labelEl : null, input, label && !disableShrink ? labelEl : null), error ? /* @__PURE__ */ React5.createElement("div", { className: Input_module_default.errorLabel }, error) : null);
  }
);
Input.propTypes = {
  error: PropTypes2.oneOfType([PropTypes2.bool, PropTypes2.string]),
  name: PropTypes2.string,
  label: PropTypes2.oneOfType([PropTypes2.string, PropTypes2.object]),
  placeholder: PropTypes2.string,
  value: PropTypes2.oneOfType([PropTypes2.string, PropTypes2.number]),
  onChange: PropTypes2.func,
  className: PropTypes2.string,
  containerClassName: PropTypes2.string,
  rootClassName: PropTypes2.string,
  prepend: PropTypes2.oneOfType([PropTypes2.node, PropTypes2.element]),
  prependClassName: PropTypes2.string,
  append: PropTypes2.oneOfType([PropTypes2.node, PropTypes2.element]),
  appendClassName: PropTypes2.string,
  disableShrink: PropTypes2.bool,
  disabled: PropTypes2.bool
};
Input.defaultProps = {
  disabled: false,
  error: null,
  name: "",
  label: null,
  placeholder: null,
  value: "",
  className: null,
  containerClassName: null,
  rootClassName: null,
  onChange: null,
  prepend: null,
  prependClassName: null,
  append: null,
  appendClassName: null,
  disableShrink: false
};
var Input_default = Input;

// src/components/PasswordInput/PasswordInput.js
import React6, { useCallback as useCallback2, useState as useState2 } from "react";
import cx4 from "classnames";

// src/components/PasswordInput/PasswordInput.module.css
var PasswordInput_module_default = {};

// src/components/PasswordInput/PasswordInput.js
function PasswordInput({ ...rest }) {
  const [isOpen, setOpen] = useState2(false);
  const handleToggle = useCallback2((e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  }, []);
  return /* @__PURE__ */ React6.createElement(
    Input_default,
    {
      ...rest,
      type: isOpen ? "text" : "password",
      append: /* @__PURE__ */ React6.createElement(
        "button",
        {
          type: "button",
          className: PasswordInput_module_default.toggle,
          onClick: handleToggle,
          tabIndex: "-1"
        },
        /* @__PURE__ */ React6.createElement(
          "div",
          {
            className: cx4({
              [PasswordInput_module_default.eyeOpen]: isOpen,
              [PasswordInput_module_default.eyeClose]: !isOpen
            })
          },
          /* @__PURE__ */ React6.createElement("div", { className: PasswordInput_module_default.iconEye }, /* @__PURE__ */ React6.createElement(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 -220 320 400",
              width: 24,
              height: 24
            },
            /* @__PURE__ */ React6.createElement("g", { fill: "none", className: PasswordInput_module_default.eye, strokeWidth: 20 }, /* @__PURE__ */ React6.createElement("g", { stroke: "currentColor", className: PasswordInput_module_default.eyeLashes }, /* @__PURE__ */ React6.createElement("path", { d: "M140 90v90M70 60l-60 80M210 60l60 80" })), /* @__PURE__ */ React6.createElement(
              "path",
              {
                stroke: "currentColor",
                d: "M0 0q140 190 280 0",
                className: PasswordInput_module_default.eyeBottom
              }
            ), /* @__PURE__ */ React6.createElement(
              "path",
              {
                stroke: "currentColor",
                d: "M0 0q140 190 280 0",
                className: PasswordInput_module_default.eyeTop
              }
            ), /* @__PURE__ */ React6.createElement(
              "circle",
              {
                cx: 140,
                r: 40,
                fill: "currentColor",
                className: PasswordInput_module_default.eyePupil
              }
            ))
          ))
        )
      )
    }
  );
}
var PasswordInput_default = PasswordInput;

// src/components/Radio/Radio.js
import React7 from "react";
import cx5 from "classnames";
import PropTypes3 from "prop-types";

// src/components/Radio/Radio.module.css
var Radio_module_default = {};

// src/components/Radio/Radio.js
function Radio({
  label,
  name,
  checked,
  className,
  onChange,
  disabled,
  value,
  error,
  ...rest
}) {
  return /* @__PURE__ */ React7.createElement(
    "label",
    {
      htmlFor: name ? `radio_${value}` : "",
      className: cx5(Radio_module_default.root, className)
    },
    /* @__PURE__ */ React7.createElement("div", { className: cx5(Radio_module_default.inputRoot) }, /* @__PURE__ */ React7.createElement(
      "input",
      {
        ...rest,
        className: Radio_module_default.input,
        name,
        type: "radio",
        checked,
        value,
        onChange,
        id: `radio_${value}`,
        disabled
      }
    ), /* @__PURE__ */ React7.createElement(
      "span",
      {
        className: cx5(Radio_module_default.box, {
          [Radio_module_default.boxDisabled]: disabled
        })
      },
      /* @__PURE__ */ React7.createElement(CheckIcon_default, { className: Radio_module_default.icon })
    ), /* @__PURE__ */ React7.createElement("div", { className: Radio_module_default.text }, label)),
    error ? /* @__PURE__ */ React7.createElement("span", { className: Radio_module_default.errorLabel }, error) : null
  );
}
Radio.propTypes = {
  label: PropTypes3.oneOfType([PropTypes3.string, PropTypes3.element]),
  name: PropTypes3.string,
  checked: PropTypes3.bool,
  onChange: PropTypes3.func.isRequired,
  className: PropTypes3.string,
  disabled: PropTypes3.bool
};
Radio.defaultProps = {
  name: null,
  checked: false,
  label: null,
  onChange: () => {
  },
  className: "",
  disabled: false
};
var Radio_default = Radio;

// src/components/RadioGroup/RadioGroup.js
import React8 from "react";
import cx6 from "classnames";
import PropTypes4 from "prop-types";

// src/components/RadioGroup/RadioGroup.module.css
var RadioGroup_module_default = {};

// src/components/RadioGroup/RadioGroup.js
function RadioGroup({
  options,
  label,
  name,
  className,
  onChange,
  disabled,
  value,
  error
}) {
  return /* @__PURE__ */ React8.createElement("label", { htmlFor: `radio_${name}`, className: cx6(RadioGroup_module_default.root, className) }, /* @__PURE__ */ React8.createElement("span", { className: RadioGroup_module_default.label }, label), options.map((option, index) => {
    return /* @__PURE__ */ React8.createElement(
      Radio_default,
      {
        key: index,
        checked: option.value === value,
        label: option.label,
        value: option.value,
        disabled,
        name,
        onChange
      }
    );
  }), error ? /* @__PURE__ */ React8.createElement("div", { className: RadioGroup_module_default.errorLabel }, error) : null);
}
RadioGroup.propTypes = {
  label: PropTypes4.oneOfType([PropTypes4.string, PropTypes4.element]),
  name: PropTypes4.string,
  onChange: PropTypes4.func.isRequired,
  className: PropTypes4.string,
  disabled: PropTypes4.bool
};
RadioGroup.defaultProps = {
  name: null,
  label: null,
  onChange: () => {
  },
  className: "",
  disabled: false
};
var RadioGroup_default = RadioGroup;

// src/components/TextArea/TextArea.js
import React9, {
  useCallback as useCallback3,
  useEffect,
  useMemo as useMemo2,
  useRef,
  useState as useState3
} from "react";
import cx7 from "classnames";
import DOMPurify2 from "dompurify";
import PropTypes5 from "prop-types";

// src/components/TextArea/TextArea.module.css
var TextArea_module_default = {};

// src/components/TextArea/TextArea.js
var TextArea = ({
  fluid,
  error,
  value,
  onChange,
  placeholder,
  label,
  disabled,
  className,
  containerClassName,
  innerContainerClassName,
  innerWrapperClassName,
  onFocus,
  onBlur,
  name,
  rows,
  resizable,
  disableShrink,
  ...rest
}) => {
  const inputEl = useRef();
  const [focused, setFocus] = useState3(false);
  const resizeTextArea = () => {
    if (resizable) {
      inputEl.current.style.height = "auto";
      inputEl.current.style.height = inputEl.current.scrollHeight + "px";
    }
  };
  useEffect(resizeTextArea, [resizable, value]);
  const handleChange = useCallback3(
    (e) => {
      const inputName = e.target.name;
      const inputValue = DOMPurify2.sanitize(e.target.value);
      onChange({
        ...e,
        target: {
          name: inputName,
          value: inputValue
        }
      });
    },
    [onChange]
  );
  const setFocusState = useCallback3(() => {
    var _a;
    setFocus(true);
    (_a = inputEl == null ? void 0 : inputEl.current) == null ? void 0 : _a.focus();
  }, [inputEl]);
  const errorMessage = useMemo2(() => {
    let message = "";
    if (error) {
      message = error;
    }
    return message.replace(name, label);
  }, [error, name, label]);
  const textArea = useMemo2(() => {
    return /* @__PURE__ */ React9.createElement(
      "textarea",
      {
        ref: inputEl,
        disabled,
        rows,
        className: cx7(TextArea_module_default.input, {
          [className]: className,
          [TextArea_module_default.withLabel]: !!label,
          [TextArea_module_default.disabled]: disabled,
          [TextArea_module_default.disableShrinkInput]: disableShrink,
          [TextArea_module_default.withPlaceholderLabel]: placeholder && label
        }),
        value,
        onChange: handleChange,
        placeholder,
        name,
        onFocus: (e) => {
          onFocus(e);
          setFocus(true);
        },
        onBlur: (e) => {
          onBlur(e);
          setFocus(false);
        },
        ...rest
      }
    );
  }, [className, disableShrink, disabled, name, value, handleChange, rest]);
  const labelEl = useMemo2(
    () => /* @__PURE__ */ React9.createElement(
      "label",
      {
        htmlFor: name,
        className: cx7(TextArea_module_default.label, {
          [TextArea_module_default.disableShrink]: disableShrink,
          [TextArea_module_default.labelPlaceholder]: label && placeholder && !disableShrink
        }),
        onClick: () => {
          var _a;
          try {
            const inputs = document.querySelectorAll(`[name="${name}"]`);
            if (!inputs.length) {
              return;
            }
            let input = inputs == null ? void 0 : inputs[0];
            if ((input == null ? void 0 : input.type) === "hidden") {
              input = (_a = input == null ? void 0 : input.parentNode) == null ? void 0 : _a.querySelector("input");
            }
            input == null ? void 0 : input.focus();
          } catch (error2) {
            throw error2;
          }
        }
      },
      label
    ),
    [name, disableShrink, label]
  );
  return /* @__PURE__ */ React9.createElement(
    "div",
    {
      className: cx7(TextArea_module_default.inputContainer, {
        [containerClassName]: containerClassName,
        [TextArea_module_default.fluid]: fluid,
        [TextArea_module_default.focusedContainer]: !placeholder && (focused || !!value)
      })
    },
    /* @__PURE__ */ React9.createElement(
      "div",
      {
        className: cx7(TextArea_module_default.innerContainer, {
          [innerContainerClassName]: innerContainerClassName
        })
      },
      label && labelEl,
      /* @__PURE__ */ React9.createElement(
        "div",
        {
          onClick: setFocusState,
          className: cx7(TextArea_module_default.innerWrapper, {
            [innerWrapperClassName]: innerWrapperClassName
          })
        },
        textArea
      )
    ),
    errorMessage ? /* @__PURE__ */ React9.createElement("div", { className: TextArea_module_default.errorLabel }, errorMessage) : null
  );
};
TextArea.propTypes = {
  fluid: PropTypes5.bool,
  value: PropTypes5.string,
  onChange: PropTypes5.func.isRequired,
  placeholder: PropTypes5.string,
  label: PropTypes5.string,
  disabled: PropTypes5.bool,
  resizable: PropTypes5.bool,
  disableShrink: PropTypes5.bool,
  className: PropTypes5.string,
  containerClassName: PropTypes5.string,
  innerContainerClassName: PropTypes5.string,
  innerWrapperClassName: PropTypes5.string,
  onFocus: PropTypes5.func,
  onBlur: PropTypes5.func,
  error: PropTypes5.string,
  name: PropTypes5.string,
  rows: PropTypes5.number
};
TextArea.defaultProps = {
  onFocus: () => {
  },
  onBlur: () => {
  },
  fluid: true,
  placeholder: "",
  label: "",
  className: "",
  containerClassName: "",
  innerContainerClassName: "",
  innerWrapperClassName: "",
  disabled: false,
  value: "",
  error: null,
  name: "",
  rows: 5,
  resizable: false,
  disableShrink: false
};
var TextArea_default = TextArea;
export {
  Checkbox_default as Checkbox,
  Form_default as Form,
  Input_default as Input,
  PasswordInput_default as PasswordInput,
  Radio_default as Radio,
  RadioGroup_default as RadioGroup,
  TextArea_default as TextArea
};
