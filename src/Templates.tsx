import {
  ArrayFieldTemplateItemType,
  ArrayFieldTemplateProps,
  FieldTemplateProps,
  ObjectFieldTemplateProps,
} from '@rjsf/utils';
import { Button, Gapped } from '@skbkontur/react-ui';
// import { TrashCanIcon16Regular } from '@skbkontur/icons/icons/TrashCanIcon';
// import { CopyIcon16Regular } from '@skbkontur/icons/icons/CopyIcon';
import cn from 'classnames';

const FormTemplate = (props: ObjectFieldTemplateProps) => {
  return (
    <Gapped vertical>
      {props.properties.map((element) => element.content)}
    </Gapped>
  );
};

const FieldTemplate = (props: FieldTemplateProps) => {
  const { id, label, required, description, children } = props;
  return (
    <Gapped verticalAlign="middle">
      <div className={props.classNames}>
        <label htmlFor={id}>
          {label}
          {required ? null : ' (optional)'}
        </label>
      </div>
      {description}
      {children}
    </Gapped>
  );
};

function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  return (
    <>
      {props.canAdd && <Button onClick={props.onAddClick}>Add</Button>}
      <Gapped className={props.className} vertical>
        {props.items.map((element, index) => {
          return (
            <Gapped className={element.className} verticalAlign="middle">
              {element.children}
              <Gapped vertical>
                {/* {element.hasCopy && (
                  <TrashCanIcon16Regular
                    onClick={element.onCopyIndexClick(index)}
                  />
                )}
                {element.hasRemove && (
                  <CopyIcon16Regular
                    onClick={element.onDropIndexClick(index)}
                    size={16}
                  />
                )} */}
              </Gapped>
            </Gapped>
          );
        })}
      </Gapped>
    </>
  );
}

function ArrayFieldItemTemplate(props: ArrayFieldTemplateItemType) {
  const {
    children,
    className,
    index,
    hasCopy,
    hasRemove,
    onCopyIndexClick,
    onDropIndexClick,
  } = props;
  return (
    <div style={{ backgroundColor: 'red' }} className={className}>
      {children}
    </div>
  );
}

export const templates = {
  FieldTemplate,
  ObjectFieldTemplate: FormTemplate,
  ArrayFieldTemplate,
  ArrayFieldItemTemplate,
};
