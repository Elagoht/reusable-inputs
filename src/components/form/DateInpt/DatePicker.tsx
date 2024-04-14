import classNames from "classnames"
import { ChevronLeftCircle, ChevronRightCircle, XCircleIcon } from "lucide-react"
import { FC, useEffect, useState } from "react"

interface IDatePickerProps {
  selectedDate: string
  setSelectedDate: (date: string) => void
  show: boolean
  setShow: (show: boolean) => void
  minDate?: Date
  maxDate?: Date
  calendarLabel?: string
  onConfirm?: (date: Date) => void
  onClose?: () => void
}

const months = [
  "Ocak", "Şubat", "Mart",
  "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül",
  "Ekim", "Kasım", "Aralık"
]

const weekDays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]

const DatePicker: FC<IDatePickerProps> = ({
  selectedDate, setSelectedDate,
  show, setShow, minDate, maxDate,
  calendarLabel, onConfirm, onClose
}) => {

  const [pickerMode, setPickerMode] = useState<"date" | "month" | "year">("date")
  const [yearPage, setYearPage] = useState<number>(0)

  useEffect(() => {
    setPickerMode("date")
  }, [show])

  return <div
    onClick={event => event.stopPropagation()}
    className="border border-gray-300 dark:border-gray-700 rounded p-2 gap-2 flex flex-col bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 min-w-72 min-h-80"
  >
    <div /* Close Button */ className="flex justify-between gap-2">
      <span className="leading-none">
        {calendarLabel || "Tarih Seçiniz"}
      </span>

      <button
        type="button"
        onClick={() => {
          setShow(false)
          onClose?.()
        }}
      >
        <XCircleIcon className="stroke-red-800 hover:stroke-red-600 dark:stroke-red-500 dark:hover:stroke-red-400" size={16} />
      </button>
    </div>

    <div /* Year and Month */ className="flex items-center gap-2">
      <button
        type="button"
        className={classNames({
          "flex-1 text-center rounded-lg": true,
          "bg-gray-100 dark:bg-gray-700": pickerMode !== "year",
          "bg-gray-200 dark:bg-gray-600": pickerMode === "year",
        })}
        onClick={() => {
          setYearPage(0)
          setPickerMode(prev => prev === "year"
            ? "date"
            : "year"
          )
        }}
      >
        {selectedDate.slice(-4)}
      </button>

      <button
        type="button"
        className="flex justify-center items-center"
        onClick={() => {
          let [day, month, year] = selectedDate.split("/").map(Number)

          if (minDate && new Date(
            year, month - 1, day
          ) <= minDate) return

          month--
          if (month === 0) {
            month = 12
            year--
          }
          setSelectedDate(
            `${day.toString().padStart(2, "0")
            }/${month.toString().padStart(2, "0")
            }/${year}`
          )
        }}
      >
        <ChevronLeftCircle className="stroke-gray-500" />
      </button>

      <button
        type="button"
        className={classNames({
          "flex-1 text-center rounded-lg": true,
          "bg-gray-100 dark:bg-gray-700": pickerMode !== "month",
          "bg-gray-200 dark:bg-gray-600": pickerMode === "month",
        })}
        onClick={() => setPickerMode(prev => prev === "month"
          ? "date"
          : "month"
        )}
      >
        {months[Number(selectedDate.slice(3, 5)) - 1]}
      </button>

      <button
        type="button"
        className="flex justify-center items-center"
        onClick={() => {
          let [day, month, year] = selectedDate.split("/").map(Number)

          if (maxDate && new Date(
            year, month - 1, day
          ) >= maxDate) return

          month++
          if (month === 13) {
            month = 1
            year++
          }
          setSelectedDate(
            `${day.toString().padStart(2, "0")
            }/${month.toString().padStart(2, "0")
            }/${year}`
          )
        }}
        disabled={(maxDate && new Date() > maxDate)}
      >
        <ChevronRightCircle className="stroke-gray-500" />
      </button>
    </div>

    {pickerMode === "date" && <>
      <div /* Days of Week */ className="grid grid-cols-7 gap-1">
        {weekDays.map(day =>
          <div
            key={day}
            className="text-center"
          >
            {day}
          </div>
        )}
      </div>

      <div /* Days of Month */ className="grid grid-cols-7 gap-1">
        {Array.from({ length: 42 }).map((_, index) => {
          const date = new Date(
            Number(selectedDate.slice(-4)),
            Number(selectedDate.slice(3, 5)) - 1,
            1
          )
          date.setDate(index - (date.getDay() + 6) % 7 + 1)
          const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate)

          return <button
            key={index}
            type="button"
            className={classNames({
              "text-center p-1 rounded-lg": true,
              "text-gray-400 dark:text-gray-500": date.getMonth() !== Number(selectedDate.slice(3, 5)) - 1,
              "bg-gray-100 dark:bg-gray-700": true,
              "cursor-pointer": true,
              "hover:bg-gray-200 dark:hover:bg-gray-600": true,
              "pointer-events-none opacity-50": isDisabled,
            })}
            disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return
              setSelectedDate(
                `${date.getDate().toString().padStart(2, "0")
                }/${(date.getMonth() + 1).toString().padStart(2, "0")
                }/${date.getFullYear()}`
              )
              onConfirm?.(date)
              setShow(false)
            }}
          >
            {date.getDate()}
          </button>
        })}
      </div>
    </>
    }

    {pickerMode === "month" &&
      <div /* Months of Year */ className="grid flex-1 grid-cols-3 gap-1">
        {months.map((month, index) => {
          const isDisabled = (minDate && new Date() < minDate) || (maxDate && new Date() > maxDate)
          return <button
            type="button"
            key={month}
            className={classNames({
              "text-center p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600": true,
              "!bg-emerald-400 dark:!bg-emerald-600 hover:!bg-emerald-300 dark:hover:!bg-emerald-500": index + 1 === Number(selectedDate.slice(3, 5)),
              "pointer-events-none opacity-50": isDisabled,
            })}
            onClick={() => {
              if (isDisabled) return
              setSelectedDate(
                `${selectedDate.slice(0, 2)
                }/${(index + 1).toString().padStart(2, "0")
                }/${selectedDate.slice(-4)}`
              )
              console.log(selectedDate)
              setPickerMode("date")
            }}
            disabled={isDisabled}
          >
            {month}
          </button>
        })}
      </div>
    }

    {pickerMode === "year" && <>
      <div /* Year Pagination */ className="flex justify-between gap-2 grid-cols-3">
        <button
          type="button"
          onClick={() => setYearPage(prev => prev - 10)}
        >
          <ChevronLeftCircle className="stroke-gray-500" />
        </button>

        <span>
          {
            Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10
          } - {
            Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + 9
          }
        </span>

        <button
          type="button"
          onClick={() => setYearPage(prev => prev + 10)}
        >
          <ChevronRightCircle className="stroke-gray-500" />
        </button>
      </div>

      <div /* Years */ className="grid grid-cols-2 gap-1 flex-1">
        {Array.from({ length: 10 }).map((_, index) =>
          <button
            type="button"
            key={index}
            className={classNames({
              "text-center p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600": true,
              "!bg-emerald-400 dark:!bg-emerald-600 hover:!bg-emerald-300 dark:hover:!bg-emerald-500": selectedDate.slice(-4) === (Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + index).toString(),
            })}
            onClick={() => {
              setSelectedDate(
                `${selectedDate.slice(0, 2)
                }/${selectedDate.slice(3, 5)
                }/${Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + index}`
              )
              setPickerMode("month")
            }}
          >
            {Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + index}
          </button>
        )}
      </div>
    </>
    }
  </div>
}

export default DatePicker