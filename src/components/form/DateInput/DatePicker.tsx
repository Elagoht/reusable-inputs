import classNames from "classnames"
import { CalendarDaysIcon, ChevronLeftCircleIcon, ChevronRightCircleIcon, XCircleIcon } from "lucide-react"
import { FC, useEffect, useState } from "react"

interface IDatePickerProps {
  selectedDate: string
  setSelectedDate: (date: string) => void
  show: boolean
  setShow: (show: boolean) => void
  minDate?: Date
  maxDate?: Date
  calendarLabel?: string
}

const months = [
  "Ocak", "Şubat", "Mart",
  "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül",
  "Ekim", "Kasım", "Aralık"
]

const weekDays = ["Pzt", "Sal", "Çrş", "Prş", "Cum", "Cmt", "Pzr"]

const DatePicker: FC<IDatePickerProps> = ({
  selectedDate, setSelectedDate,
  show, setShow, minDate, maxDate,
  calendarLabel
}) => {

  const [pickerMode, setPickerMode] = useState<"date" | "month" | "year">("date")
  const [yearPage, setYearPage] = useState<number>(0)

  useEffect(() => {
    setPickerMode("date")
  }, [show])

  return <div
    onClick={event => event.stopPropagation()}
    className="border border-gray-300 dark:border-gray-700 rounded-xl p-2 gap-2 flex flex-col bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 min-w-72 max-w-screen-md m-4 w-full min-h-80 max-h-[60%] h-full shadow-lg select-none sm:text-2xl transition-all duration-300 ease-in-out"
  >
    <div /* Close Button */ className="flex justify-between gap-2">
      <button
        type="button"
        title={((minDate && new Date() < minDate) || (maxDate && new Date() > maxDate))
          ? "Bugün seçilemez"
          : "Bugünü seç"
        }
        className={classNames({
          "opacity-50 pointer-events-none": ((minDate && new Date() < minDate) || (maxDate && new Date() > maxDate)),
        })}
        onClick={() => {
          const today = new Date()
          if ((minDate && today < minDate) || (maxDate && today > maxDate)) return
          setSelectedDate(
            `${today.getDate().toString().padStart(2, "0")
            }/${(today.getMonth() + 1).toString().padStart(2, "0")
            }/${today.getFullYear()}`
          )
          setPickerMode("date")
        }}
        disabled={(minDate && new Date() < minDate) || (maxDate && new Date() > maxDate)}
      >
        <CalendarDaysIcon className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <span className="leading-none">
        {calendarLabel || "Tarih Seçiniz"}
      </span>

      <button
        type="button"
        onClick={() => setShow(false)}
      >
        <XCircleIcon className="stroke-red-800 hover:stroke-red-600 dark:stroke-red-500 dark:hover:stroke-red-400 w-4 h-4 sm:w-6 sm:h-6" />
      </button>
    </div>

    <div /* Year and Month */ className="flex items-center gap-2">
      <button
        type="button"
        className={classNames({
          "flex-1 text-center rounded-lg": true,
          "bg-gray-100 dark:bg-gray-700": pickerMode !== "year",
          "bg-emerald-400 dark:bg-emerald-600 shadow-lg": pickerMode === "year",
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
            year, month - 1, 1
          ) < minDate) return

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
        disabled={(minDate && new Date(
          Number(selectedDate.slice(-4)),
          Number(selectedDate.slice(3, 5)) - 1,
          1
        ) < minDate)}
      >
        <ChevronLeftCircleIcon className="stroke-gray-500" />
      </button>

      <button
        type="button"
        className={classNames({
          "flex-1 text-center rounded-lg": true,
          "bg-gray-100 dark:bg-gray-700": pickerMode !== "month",
          "bg-emerald-400 dark:bg-emerald-600 shadow-lg": pickerMode === "month",
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
            year, month, 1
          ) > maxDate) return

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
        disabled={(maxDate && new Date(
          Number(selectedDate.slice(-4)),
          Number(selectedDate.slice(3, 5)),
          1
        ) > maxDate)}
      >
        <ChevronRightCircleIcon className="stroke-gray-500" />
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

      <div /* Days of Month */ className="grid grow grid-cols-7 gap-1">
        {Array.from({ length: 42 }).map((_, index) => {
          const date = new Date(
            Number(selectedDate.slice(-4)),
            Number(selectedDate.slice(3, 5)) - 1,
            1
          )
          date.setDate(index - (date.getDay() + 6) % 7 + 1)
          const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate)
          let isSelected: boolean
          try {
            isSelected = date.toISOString().split("T")[0] === new Date(
              Number(selectedDate.slice(-4)),
              Number(selectedDate.slice(3, 5)) - 1,
              Number(selectedDate.slice(0, 2))
            ).toISOString().split("T")[0]
          } catch (error) {
            isSelected = false
          }

          return <button
            key={index}
            type="button"
            className={classNames({
              "text-center p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600": true,
              "shadow-lg": !isDisabled,
              "pointer-events-none opacity-50": isDisabled,
              "text-gray-400 dark:text-gray-500": date.getMonth() !== Number(selectedDate.slice(3, 5)) - 1,
              "!bg-emerald-400 dark:!bg-emerald-600 hover:!bg-emerald-300 dark:hover:!bg-emerald-500": isSelected,
            })}
            disabled={isDisabled}
            onClick={() => {
              if (isDisabled) return
              setSelectedDate(
                `${date.getDate().toString().padStart(2, "0")
                }/${(date.getMonth() + 1).toString().padStart(2, "0")
                }/${date.getFullYear()}`
              )
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
          const isDisabled =
            (
              minDate && new Date(
                Number(selectedDate.slice(-4)),
                index + 1,
                1
              ) < minDate
            ) || (
              maxDate && new Date(
                Number(selectedDate.slice(-4)),
                index,
                1
              ) > maxDate
            )
          return <button
            type="button"
            key={month}
            className={classNames({
              "text-center p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600": true,
              "!bg-emerald-400 dark:!bg-emerald-600 hover:!bg-emerald-300 dark:hover:!bg-emerald-500": index + 1 === Number(selectedDate.slice(3, 5)),
              "pointer-events-none opacity-50": isDisabled,
              "shadow-lg": !isDisabled,
            })}
            onClick={() => {
              if (isDisabled) return
              setSelectedDate(
                `${selectedDate.slice(0, 2)
                }/${(index + 1).toString().padStart(2, "0")
                }/${selectedDate.slice(-4)}`
              )
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
          className={classNames({
            "pointer-events-none opacity-50": minDate && Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 - 10 <= Math.floor(minDate.getFullYear() / 10) * 10 - 10
          })}
          disabled={minDate && Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 - 10 <= Math.floor(minDate.getFullYear() / 10) * 10 - 10}
        >
          <ChevronLeftCircleIcon className="stroke-gray-500" />
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
          className={classNames({
            "pointer-events-none opacity-50": maxDate && Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + 10 >= Math.floor(maxDate.getFullYear() / 10) * 10 + 10
          })}
          disabled={maxDate && Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + 10 >= Math.floor(maxDate.getFullYear() / 10) * 10 + 10}
        >
          <ChevronRightCircleIcon className="stroke-gray-500" />
        </button>
      </div>

      <div /* Years */ className="grid grid-cols-2 gap-1 flex-1">
        {Array.from({ length: 10 }).map((_, index) => {
          const isDisabled = minDate && new Date(
            Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + index + 1,
            Number(selectedDate.slice(3, 5)) - 1,
            1
          ) < minDate || maxDate && new Date(
            Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + index,
            Number(selectedDate.slice(3, 5)) - 1,
            1
          ) > maxDate

          return <button
            type="button"
            key={index}
            className={classNames({
              "text-center p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600": true,
              "!bg-emerald-400 dark:!bg-emerald-600 hover:!bg-emerald-300 dark:hover:!bg-emerald-500": selectedDate.slice(-4) === (Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + index).toString(),
              "pointer-events-none opacity-50": isDisabled,
              "shadow-lg": !isDisabled,
            })}
            onClick={() => {
              setSelectedDate(
                `${selectedDate.slice(0, 2)
                }/${selectedDate.slice(3, 5)
                }/${Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + index}`
              )
              setPickerMode("month")
            }}
            disabled={isDisabled}
          >
            {Math.floor((Number(selectedDate.slice(-4)) + yearPage) / 10) * 10 + index}
          </button>
        })}
      </div>
    </>
    }
  </div >
}

export default DatePicker