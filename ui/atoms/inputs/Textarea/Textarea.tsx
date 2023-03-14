import { ErrorMessage } from "@hookform/error-message";
import cn from "classnames";
import get from "lodash.get";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type FormTextareaProps<TFormValues extends FieldValues> = {
  id: string;
  name: Path<TFormValues>;
  label: string;
  className?: string;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const FormTextarea = <TFormValues extends Record<string, any>>({
  id,
  name,
  label,
  register,
  rules,
  errors,
  className,
  ...props
}: FormTextareaProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);
  const fieldProps = {
    id: id,
    name: name,
    "aria-label": label,
    "aria-invalid": !!(errors && errorMessages),
    className: cn(
      "relative block inline-flex w-full resize-none appearance-none overflow-auto rounded border border-gray-300 bg-gray-50 p-3 text-base leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-30",
      hasError
        ? "border-red-600 hover:border-red-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        : "",
    ),
    ...props,
  };

  return (
    <div className={className}>
      {!!register ? (
        <textarea {...(register && register(name, rules))} {...fieldProps} />
      ) : (
        <textarea {...fieldProps} />
      )}
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => <small className="text-red-500">{message}</small>}
      />
    </div>
  );
};

export default FormTextarea;