import { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import { StrictRJSFSchema, UiSchema, RegistryWidgetsType } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import {
  ThemeContext,
  THEME_2022_UPDATE_2024,
  Textarea,
  Button,
  Gapped,
} from '@skbkontur/react-ui';
import './style.css';
import { templates } from './Templates';
import { transformErrors } from '../utils/errorTransformer';
import {
  CustomArrayInput,
  CustomCheckbox,
  CustomInput,
} from './CustomControls';
import { ValidationContainer } from '@skbkontur/react-ui-validations';

const schema: StrictRJSFSchema = {
  type: 'object',
  properties: {
    name: { title: 'Name', type: 'string', minLength: 1 },
    isWorking: {
      title: 'Working?',
      type: 'boolean',
      default: false,
    },
    tokens: {
      title: 'Tokens',
      type: 'array',
      initalValues: ['Token 1', 'Token 2', 'Token 3'],
      items: {
        type: 'string',
      },
    },
    errors: {
      title: 'Errors',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
        required: ['code', 'message'],
      },
    },
  },
  required: ['name', 'isWorking'],
  additionalProperties: false,
};

const uiSchema: UiSchema = {
  'ui:submitButtonOptions': {
    norender: true,
  },
  tokens: {
    'ui:widget': CustomArrayInput,
  },
  errors: {
    'ui:options': {
      copyable: true,
    },
  },
};

const widgets: RegistryWidgetsType = {
  TextWidget: CustomInput,
  CheckboxWidget: CustomCheckbox,
};

export const App = () => {
  const [formData, setFormData] = useState();
  const [value, setValue] = useState<string>();
  const [isValid, setIsValid] = useState(true);
  const validationRef = useRef<ValidationContainer>();

  useEffect(() => {
    try {
      const parsedData = JSON.parse(value);
      setIsValid(true);
      setFormData(parsedData);
    } catch (error) {
      setIsValid(false);
    }
  }, [value]);

  useEffect(() => {
    const stringData = JSON.stringify(formData, null, 2);
    setValue(stringData);
  }, [formData]);

  return (
    <ThemeContext.Provider value={THEME_2022_UPDATE_2024}>
      <ValidationContainer ref={validationRef}>
        <Gapped vertical gap={24}>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            liveValidate
            validator={validator}
            showErrorList={false}
            transformErrors={transformErrors}
            templates={templates}
            widgets={widgets}
            formData={formData}
            onChange={({ formData }) => setFormData(formData)}
          />
          <Textarea error={!isValid} value={value} onValueChange={setValue} />
          <Button
            onClick={async () => {
              const isValid = await validationRef.current.validate();
              isValid && console.log(formData);
            }}
          >
            Submit
          </Button>
        </Gapped>
      </ValidationContainer>
    </ThemeContext.Provider>
  );
};
