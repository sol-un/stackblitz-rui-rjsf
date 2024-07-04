import { forwardRef } from 'react';
import { WidgetProps } from '@rjsf/utils';
import {
  Checkbox,
  Input,
  Toggle,
  Token,
  TokenInput,
  TokenInputType,
  Tooltip,
} from '@skbkontur/react-ui';
import { ValidationWrapper } from '@skbkontur/react-ui-validations';

export const CustomInput = (props: WidgetProps) => {
  const hasError = props.rawErrors?.length > 0;
  const errorMessages = props.rawErrors;

  return (
    <ValidationWrapper
      validationInfo={
        hasError
          ? {
              message: errorMessages.join('\n'),
              type: 'submit',
            }
          : null
      }
    >
      <Input id={props.id} value={props.value} onValueChange={props.onChange} />
    </ValidationWrapper>
  );
};

export const CustomArrayInput = (props: WidgetProps) => {
  return (
    <TokenInput
      type={TokenInputType.WithReference}
      getItems={() => Promise.resolve(props.schema.initalValues)}
      selectedItems={props.value}
      onValueChange={props.onChange}
      renderToken={(item, tokenProps) => (
        <Token key={item.toString()} {...tokenProps}>
          {item}
        </Token>
      )}
    />
  );
};

export const CustomCheckbox = function (props: WidgetProps) {
  const hasError = props.rawErrors?.length > 0;
  return (
    <Toggle
      id={props.id}
      error={hasError}
      checked={props.value}
      onChange={() => props.onChange(!props.value)}
    />
  );
};
