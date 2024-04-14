"use client"

import Pretty from "@/helpers/prettiers"
import classNames from "classnames"
import { CalendarDaysIcon, CircleAlertIcon, CircleCheckIcon } from "lucide-react"
import { ChangeEvent, FC, FocusEvent, InputHTMLAttributes, ReactNode, useEffect, useState } from "react"
import DatePicker from "./DatePicker"

interface IDateInputProps extends Omit<
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
  minDate?: Date
  maxDate?: Date
}

const DateInput: FC<IDateInputProps> = ({
  type = "date", optional = false,
  label, error, success, message,
  iconLeft, iconRight, validityIcons,
  calendarIcon, minDate, maxDate,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [pickedDate, setPickedDate] = useState<string>(
    (props.defaultValue
      ? new Date(props.defaultValue as string)
      : props.value
        ? new Date(props.value as string)
        : new Date()
    ).toISOString().split("T")[0].split("-").reverse().join("/")
  )

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return; // İlk yüklemeyi yap ve useEffect'i burada sonlandır
    }

    if (pickedDate.length !== 10) return
    props.onChange?.({
      target: {
        name: props.name,
        value: `${new Date(
          Number(pickedDate.slice(-4)),
          Number(pickedDate.slice(3, 5)) - 1,
          Number(pickedDate.slice(0, 2)) + 1
        ).toISOString().split("T")[0]
          }T00:00:00.000Z`
      }
    } as ChangeEvent<HTMLInputElement>)
    props.onBlur?.({
      target: {
        name: props.name
      }
    } as FocusEvent<HTMLInputElement>)
  }, [pickedDate]) // eslint-disable-line react-hooks/exhaustive-deps

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

      <button
        type="button"
        className="bg-gray-200 dark:bg-gray-800 -m-1 p-1 relative rounded-full transition-all duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-700 h-8 w-8"
        onClick={() => pickedDate.length === 10 && setShowPicker(true)}
      >
        {calendarIcon
          ? <CalendarDaysIcon />
          : iconLeft
        }
      </button>

      <input
        {...props}
        type="text"
        className={classNames({
          "bg-transparent pt-3.5 pb-0.5 w-full text-gray-900 dark:text-gray-100 rounded-md outline-none max-w-none min-w-0 h-10": true,
          "opacity-0": !isFocused && !isFilled,
          "pl-8 -ml-8": calendarIcon || iconLeft,
        })}
        defaultValue={props.defaultValue
          ? Pretty.date((props.defaultValue as string).slice(-10))
          : undefined
        }
        value={Pretty.date(pickedDate)}
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
          setPickedDate(event.target.value)
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

    <div
      className={classNames({
        "absolute inset-0 z-10 flex items-center justify-center bg-black transition-all duration-300 ease-in-out": true,
        "opacity bg-opacity-75": showPicker,
        "opacity-0 pointer-events-none": !showPicker,
      })}
      onClick={() => setShowPicker(false)}
    >
      <DatePicker
        selectedDate={pickedDate}
        setSelectedDate={(date: string) => {
          setPickedDate(date)
        }}
        minDate={minDate}
        maxDate={maxDate}
        show={showPicker}
        setShow={() => setShowPicker(false)}
      />
    </div>
  </div>
}

export default DateInput