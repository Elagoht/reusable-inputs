"use client"

import classNames from "classnames"
import { FC, InputHTMLAttributes, ReactNode, useState } from "react"

interface IInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string
  type?: "text" | "email" | "password" | "tel" | "date" | "time" | "datetime-local" | "month" | "week" | "url" | "search"
  error?: string
  success?: string
  message?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  optional?: boolean
}

const Input: FC<IInputProps> = ({
  type = "text",
  label, error, success, message,
  iconLeft, iconRight, optional,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(String(props.value).length > 0)

  return <div
    className={classNames({
      "flex flex-col gap-0.5": true,
      "text-gray-300": !isFocused && !isFilled && !error && !success && !props.disabled && !props.readOnly,
      "text-blue-400": (isFocused) && !error && !success && !props.disabled && !props.readOnly,
      "text-green-400": success && !error && !props.disabled && !props.readOnly,
      "text-red-400": error && !props.disabled && !props.readOnly,
      "opacity-75": props.disabled || props.readOnly,
    })}
  >
    {optional &&
      <small className="text-xs text-blue-400 ml-2">
        (İsteğe bağlı)
      </small>
    }

    <label className="flex items-center gap-2 relative  border border-current rounded-md transition-all duration-300 ease-in-out px-2">
      <span className={classNames({
        "text-sm absolute transition-all duration-300 ease-in-out select-none line-clamp-1": true,
        "left-2": !iconLeft,
        "left-10": iconLeft,
        "right-2": !iconRight,
        "right-10": iconRight,
        "top-1/2 -translate-y-1/2": !isFocused && !isFilled,
        "top-0.5 text-xs": isFocused || isFilled,
      })}>
        {label}
      </span>

      {iconLeft}

      <input
        {...props}
        type={type}
        className="bg-transparent placeholder-transparent pt-3.5 pb-0.5 w-full text-gray-900 dark:text-gray-100 rounded-md outline-none"
        onFocus={(event) => {
          props.disabled || props.readOnly || setIsFocused(true)
          props.onFocus?.(event)
        }}
        onBlur={(event) => {
          props.disabled || props.readOnly || setIsFocused(false)
          props.onBlur?.(event)
        }}
        onChange={(event) => {
          setIsFilled(event.currentTarget.value.length > 0)
          props.onChange?.(event)
        }}
      />

      {iconRight}
    </label>

    {(error || success || message) &&
      <small className="ml-2 text-xs">
        {error ?? success ?? message}
      </small>
    }
  </div>
}

export default Input