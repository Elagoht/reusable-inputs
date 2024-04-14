"use client"

import Pretty from "@/helpers/prettiers"
import classNames from "classnames"
import { CalendarDaysIcon, CircleAlertIcon, CircleCheckIcon } from "lucide-react"
import { FC, InputHTMLAttributes, ReactNode, useRef, useState } from "react"

interface IDatePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string
  type?:
  | "date"
  | "time"
  | "datetime-local"
  // | "month" // Not supported by all browsers
  // | "week" // Not supported by all browsers
  optional?: boolean
  error?: string
  success?: string
  message?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  validityIcons?: boolean
  calendarIcon?: boolean
}

const DatePicker: FC<IDatePickerProps> = ({
  type = "date", optional = false,
  label, error, success, message,
  iconLeft, iconRight, validityIcons,
  calendarIcon, ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(Boolean(props.value))
  const selfRef = useRef<HTMLInputElement>(null)

  return <div className={classNames({
    "flex flex-col gap-0.5": true,
    "text-gray-500": !isFocused && !error && !success,
    "text-blue-500": isFocused && !error && !success && !props.disabled && !props.readOnly,
    "text-green-500": success && !error && !props.disabled && !props.readOnly,
    "text-red-500": error && !props.disabled && !props.readOnly,
    "opacity-75": props.disabled || props.readOnly,
  })}>
    {optional &&
      <small className="text-xs text-blue-500 ml-2">
        (İsteğe bağlı)
      </small>
    }

    <label className="flex items-center gap-2 relative  border border-current rounded-md transition-all duration-200 ease-in-out px-2">
      <span className={classNames({
        "text-sm absolute transition-all duration-200 ease-in-out select-none line-clamp-1": true,
        "left-2": !iconLeft && !calendarIcon,
        "left-10": iconLeft || calendarIcon,
        "top-1/2 -translate-y-1/2": !isFocused && !isFilled,
        "top-0.5 text-xs": isFocused || isFilled,
      })}>
        {label}
      </span>

      {calendarIcon
        ? <CalendarDaysIcon />
        : iconLeft
      }

      <input
        {...props}
        ref={selfRef}
        type="text"
        className={classNames({
          "bg-transparent pt-3.5 pb-0.5 w-full text-gray-900 dark:text-gray-100 rounded-md outline-none max-w-none min-w-0 h-10": true,
          "opacity-0": !isFocused && !isFilled,
          "pl-8 -ml-8": calendarIcon || iconLeft,
        })}
        defaultValue={props.defaultValue
          ? Pretty.phoneNumber((props.defaultValue as string).slice(-10))
          : undefined
        }
        value={
          typeof props.value === "string"
            ? Pretty.phoneNumber(props.value.slice(-10))
            : undefined
        }
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
          event.target.value = Pretty.date(event.target.value)
          props.onChange?.({
            ...event,
            target: {
              ...event.target,
              name: event.target.name,
              value: (event.target.value.length === 10)
                ? `${new Date(
                  Number(event.target.value.slice(-4)),
                  Number(event.target.value.slice(3, 5)) - 1,
                  Number(event.target.value.slice(0, 2))
                ).toISOString().split("T")[0]
                }T00:00:00.000Z`
                : ""
            }
          })
        }}
      />

      {validityIcons
        ? error
          ? <CircleAlertIcon />
          : success
            ? <CircleCheckIcon />
            : iconRight
        : iconRight
      }
    </label>

    {(error ?? success ?? message) &&
      <small className="ml-2 text-xs">
        {error ?? success ?? message}
      </small>
    }
  </div>
}

export default DatePicker