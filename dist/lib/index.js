var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var src_exports = {};
__export(src_exports, {
  Checkbox: () => Checkbox_default,
  Form: () => Form_default,
  Input: () => Input_default,
  PasswordInput: () => PasswordInput_default,
  Radio: () => Radio_default,
  RadioGroup: () => RadioGroup_default,
  TextArea: () => TextArea_default
});
module.exports = __toCommonJS(src_exports);

// src/components/Checkbox/Checkbox.js
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_prop_types = __toESM(require("prop-types"));

// src/components/Icon/PieIcon.js
var React = __toESM(require("react"));

// src/components/Icon/CheckIcon.js
var React2 = __toESM(require("react"));
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
  return /* @__PURE__ */ import_react.default.createElement(
    "label",
    {
      htmlFor: name ? `checkbox_${name}` : "",
      className: (0, import_classnames.default)(Checkbox_module_default.root, className)
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: (0, import_classnames.default)(Checkbox_module_default.inputRoot) }, /* @__PURE__ */ import_react.default.createElement(
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
    ), /* @__PURE__ */ import_react.default.createElement(
      "span",
      {
        className: (0, import_classnames.default)(Checkbox_module_default.box, {
          [Checkbox_module_default.boxDisabled]: disabled
        })
      },
      /* @__PURE__ */ import_react.default.createElement(CheckIcon_default, { className: Checkbox_module_default.icon })
    ), /* @__PURE__ */ import_react.default.createElement("div", { className: Checkbox_module_default.text }, label)),
    error ? /* @__PURE__ */ import_react.default.createElement("div", { className: Checkbox_module_default.errorLabel }, error) : null
  );
}
Checkbox.propTypes = {
  label: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.element]),
  name: import_prop_types.default.string,
  error: import_prop_types.default.string,
  checked: import_prop_types.default.bool,
  onChange: import_prop_types.default.func.isRequired,
  className: import_prop_types.default.string,
  disabled: import_prop_types.default.bool
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
var import_react2 = __toESM(require("react"));
var import_classnames2 = __toESM(require("classnames"));

// src/components/Form/Form.module.css
var Form_module_default = {};

// src/components/Form/Form.js
var Form = ({ children, ...rest }) => {
  return /* @__PURE__ */ import_react2.default.createElement("form", { className: (0, import_classnames2.default)(Form_module_default.root), ...rest }, children);
};
Form.propTypes = {};
Form.defaultProps = {};
var Form_default = Form;

// src/components/Input/Input.js
var import_react3 = __toESM(require("react"));
var import_classnames3 = __toESM(require("classnames"));
var import_dompurify = __toESM(require("dompurify"));
var import_prop_types2 = __toESM(require("prop-types"));

// src/components/Input/Input.module.css
var Input_module_default = {};

// src/components/Input/Input.js
var Input = (0, import_react3.forwardRef)(
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
    const [active, setActive] = (0, import_react3.useState)(false);
    const handleChange = (0, import_react3.useCallback)(
      (e) => {
        const inputName = e.target.name;
        const val = import_dompurify.default.sanitize(e.target.value);
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
    const input = (0, import_react3.useMemo)(() => {
      return /* @__PURE__ */ import_react3.default.createElement(
        "input",
        {
          type: "text",
          className: (0, import_classnames3.default)(Input_module_default.input, className, {
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
    const labelEl = (0, import_react3.useMemo)(
      () => /* @__PURE__ */ import_react3.default.createElement(
        "label",
        {
          htmlFor: name,
          className: (0, import_classnames3.default)(Input_module_default.label, {
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
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: (0, import_classnames3.default)(Input_module_default.root, rootClassName) }, /* @__PURE__ */ import_react3.default.createElement("div", { className: (0, import_classnames3.default)(Input_module_default.inputRoot, containerClassName) }, prepend && /* @__PURE__ */ import_react3.default.createElement("div", { className: (0, import_classnames3.default)(Input_module_default.prepend, prependClassName) }, prepend), append && /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        className: (0, import_classnames3.default)(Input_module_default.append, {
          [Input_module_default.appendDisabledShrink]: disableShrink,
          [appendClassName]: appendClassName
        })
      },
      append
    ), label && disableShrink ? labelEl : null, input, label && !disableShrink ? labelEl : null), error ? /* @__PURE__ */ import_react3.default.createElement("div", { className: Input_module_default.errorLabel }, error) : null);
  }
);
Input.propTypes = {
  error: import_prop_types2.default.oneOfType([import_prop_types2.default.bool, import_prop_types2.default.string]),
  name: import_prop_types2.default.string,
  label: import_prop_types2.default.oneOfType([import_prop_types2.default.string, import_prop_types2.default.object]),
  placeholder: import_prop_types2.default.string,
  value: import_prop_types2.default.oneOfType([import_prop_types2.default.string, import_prop_types2.default.number]),
  onChange: import_prop_types2.default.func,
  className: import_prop_types2.default.string,
  containerClassName: import_prop_types2.default.string,
  rootClassName: import_prop_types2.default.string,
  prepend: import_prop_types2.default.oneOfType([import_prop_types2.default.node, import_prop_types2.default.element]),
  prependClassName: import_prop_types2.default.string,
  append: import_prop_types2.default.oneOfType([import_prop_types2.default.node, import_prop_types2.default.element]),
  appendClassName: import_prop_types2.default.string,
  disableShrink: import_prop_types2.default.bool,
  disabled: import_prop_types2.default.bool
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
var import_react4 = __toESM(require("react"));
var import_classnames4 = __toESM(require("classnames"));

// src/components/PasswordInput/PasswordInput.module.css
var PasswordInput_module_default = {};

// src/components/PasswordInput/PasswordInput.js
function PasswordInput({ ...rest }) {
  const [isOpen, setOpen] = (0, import_react4.useState)(false);
  const handleToggle = (0, import_react4.useCallback)((e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  }, []);
  return /* @__PURE__ */ import_react4.default.createElement(
    Input_default,
    {
      ...rest,
      type: isOpen ? "text" : "password",
      append: /* @__PURE__ */ import_react4.default.createElement(
        "button",
        {
          type: "button",
          className: PasswordInput_module_default.toggle,
          onClick: handleToggle,
          tabIndex: "-1"
        },
        /* @__PURE__ */ import_react4.default.createElement(
          "div",
          {
            className: (0, import_classnames4.default)({
              [PasswordInput_module_default.eyeOpen]: isOpen,
              [PasswordInput_module_default.eyeClose]: !isOpen
            })
          },
          /* @__PURE__ */ import_react4.default.createElement("div", { className: PasswordInput_module_default.iconEye }, /* @__PURE__ */ import_react4.default.createElement(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 -220 320 400",
              width: 24,
              height: 24
            },
            /* @__PURE__ */ import_react4.default.createElement("g", { fill: "none", className: PasswordInput_module_default.eye, strokeWidth: 20 }, /* @__PURE__ */ import_react4.default.createElement("g", { stroke: "currentColor", className: PasswordInput_module_default.eyeLashes }, /* @__PURE__ */ import_react4.default.createElement("path", { d: "M140 90v90M70 60l-60 80M210 60l60 80" })), /* @__PURE__ */ import_react4.default.createElement(
              "path",
              {
                stroke: "currentColor",
                d: "M0 0q140 190 280 0",
                className: PasswordInput_module_default.eyeBottom
              }
            ), /* @__PURE__ */ import_react4.default.createElement(
              "path",
              {
                stroke: "currentColor",
                d: "M0 0q140 190 280 0",
                className: PasswordInput_module_default.eyeTop
              }
            ), /* @__PURE__ */ import_react4.default.createElement(
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
var import_react5 = __toESM(require("react"));
var import_classnames5 = __toESM(require("classnames"));
var import_prop_types3 = __toESM(require("prop-types"));

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
  return /* @__PURE__ */ import_react5.default.createElement(
    "label",
    {
      htmlFor: name ? `radio_${value}` : "",
      className: (0, import_classnames5.default)(Radio_module_default.root, className)
    },
    /* @__PURE__ */ import_react5.default.createElement("div", { className: (0, import_classnames5.default)(Radio_module_default.inputRoot) }, /* @__PURE__ */ import_react5.default.createElement(
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
    ), /* @__PURE__ */ import_react5.default.createElement(
      "span",
      {
        className: (0, import_classnames5.default)(Radio_module_default.box, {
          [Radio_module_default.boxDisabled]: disabled
        })
      },
      /* @__PURE__ */ import_react5.default.createElement(CheckIcon_default, { className: Radio_module_default.icon })
    ), /* @__PURE__ */ import_react5.default.createElement("div", { className: Radio_module_default.text }, label)),
    error ? /* @__PURE__ */ import_react5.default.createElement("span", { className: Radio_module_default.errorLabel }, error) : null
  );
}
Radio.propTypes = {
  label: import_prop_types3.default.oneOfType([import_prop_types3.default.string, import_prop_types3.default.element]),
  name: import_prop_types3.default.string,
  checked: import_prop_types3.default.bool,
  onChange: import_prop_types3.default.func.isRequired,
  className: import_prop_types3.default.string,
  disabled: import_prop_types3.default.bool
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
var import_react6 = __toESM(require("react"));
var import_classnames6 = __toESM(require("classnames"));
var import_prop_types4 = __toESM(require("prop-types"));

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
  return /* @__PURE__ */ import_react6.default.createElement("label", { htmlFor: `radio_${name}`, className: (0, import_classnames6.default)(RadioGroup_module_default.root, className) }, /* @__PURE__ */ import_react6.default.createElement("span", { className: RadioGroup_module_default.label }, label), options.map((option, index) => {
    return /* @__PURE__ */ import_react6.default.createElement(
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
  }), error ? /* @__PURE__ */ import_react6.default.createElement("div", { className: RadioGroup_module_default.errorLabel }, error) : null);
}
RadioGroup.propTypes = {
  label: import_prop_types4.default.oneOfType([import_prop_types4.default.string, import_prop_types4.default.element]),
  name: import_prop_types4.default.string,
  onChange: import_prop_types4.default.func.isRequired,
  className: import_prop_types4.default.string,
  disabled: import_prop_types4.default.bool
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
var import_react7 = __toESM(require("react"));
var import_classnames7 = __toESM(require("classnames"));
var import_dompurify2 = __toESM(require("dompurify"));
var import_prop_types5 = __toESM(require("prop-types"));

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
  const inputEl = (0, import_react7.useRef)();
  const [focused, setFocus] = (0, import_react7.useState)(false);
  const resizeTextArea = () => {
    if (resizable) {
      inputEl.current.style.height = "auto";
      inputEl.current.style.height = inputEl.current.scrollHeight + "px";
    }
  };
  (0, import_react7.useEffect)(resizeTextArea, [resizable, value]);
  const handleChange = (0, import_react7.useCallback)(
    (e) => {
      const inputName = e.target.name;
      const inputValue = import_dompurify2.default.sanitize(e.target.value);
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
  const setFocusState = (0, import_react7.useCallback)(() => {
    var _a;
    setFocus(true);
    (_a = inputEl == null ? void 0 : inputEl.current) == null ? void 0 : _a.focus();
  }, [inputEl]);
  const errorMessage = (0, import_react7.useMemo)(() => {
    let message = "";
    if (error) {
      message = error;
    }
    return message.replace(name, label);
  }, [error, name, label]);
  const textArea = (0, import_react7.useMemo)(() => {
    return /* @__PURE__ */ import_react7.default.createElement(
      "textarea",
      {
        ref: inputEl,
        disabled,
        rows,
        className: (0, import_classnames7.default)(TextArea_module_default.input, {
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
  const labelEl = (0, import_react7.useMemo)(
    () => /* @__PURE__ */ import_react7.default.createElement(
      "label",
      {
        htmlFor: name,
        className: (0, import_classnames7.default)(TextArea_module_default.label, {
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
  return /* @__PURE__ */ import_react7.default.createElement(
    "div",
    {
      className: (0, import_classnames7.default)(TextArea_module_default.inputContainer, {
        [containerClassName]: containerClassName,
        [TextArea_module_default.fluid]: fluid,
        [TextArea_module_default.focusedContainer]: !placeholder && (focused || !!value)
      })
    },
    /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: (0, import_classnames7.default)(TextArea_module_default.innerContainer, {
          [innerContainerClassName]: innerContainerClassName
        })
      },
      label && labelEl,
      /* @__PURE__ */ import_react7.default.createElement(
        "div",
        {
          onClick: setFocusState,
          className: (0, import_classnames7.default)(TextArea_module_default.innerWrapper, {
            [innerWrapperClassName]: innerWrapperClassName
          })
        },
        textArea
      )
    ),
    errorMessage ? /* @__PURE__ */ import_react7.default.createElement("div", { className: TextArea_module_default.errorLabel }, errorMessage) : null
  );
};
TextArea.propTypes = {
  fluid: import_prop_types5.default.bool,
  value: import_prop_types5.default.string,
  onChange: import_prop_types5.default.func.isRequired,
  placeholder: import_prop_types5.default.string,
  label: import_prop_types5.default.string,
  disabled: import_prop_types5.default.bool,
  resizable: import_prop_types5.default.bool,
  disableShrink: import_prop_types5.default.bool,
  className: import_prop_types5.default.string,
  containerClassName: import_prop_types5.default.string,
  innerContainerClassName: import_prop_types5.default.string,
  innerWrapperClassName: import_prop_types5.default.string,
  onFocus: import_prop_types5.default.func,
  onBlur: import_prop_types5.default.func,
  error: import_prop_types5.default.string,
  name: import_prop_types5.default.string,
  rows: import_prop_types5.default.number
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Checkbox,
  Form,
  Input,
  PasswordInput,
  Radio,
  RadioGroup,
  TextArea
});
