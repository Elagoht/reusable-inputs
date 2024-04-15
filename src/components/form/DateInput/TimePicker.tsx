import classNames from "classnames"
import { ClockIcon, XCircleIcon } from "lucide-react"
import { FC, useState } from "react"

interface ITimePickerProps {
  selectedTime: string
  setSelectedTime: (time: string) => void
  setShow: (show: boolean) => void
  minTime?: string
  maxTime?: string
  pickerLabel?: string
}

const TimePicker: FC<ITimePickerProps> = ({
  selectedTime, setSelectedTime, setShow,
  minTime, maxTime, pickerLabel
}) => {
  const [amOrPm, setAmOrPm] = useState<"AM" | "PM">(
    selectedTime.slice(0, 2) < "12"
      ? "AM"
      : "PM"
  )

  return <div
    onClick={(event) => event.stopPropagation()}
    className="border border-gray-300 dark:border-gray-700 rounded-xl p-2 gap-2 flex flex-col bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 min-w-72 min-h-80 shadow-lg select-none"
  >
    <div /* Close Button */ className="flex justify-between gap-2">
      <button
        type="button"
        className=""
        onClick={() => {
          const now = new Date().toTimeString().slice(0, 5)
          setSelectedTime(now)
        }}
        disabled={false}
      >
        <ClockIcon size={16} />
      </button>

      <span className="leading-none">{pickerLabel || "Saat Seç"}</span>

      <button type="button" onClick={() => setShow(false)}>
        <XCircleIcon
          className="stroke-red-800 hover:stroke-red-600 dark:stroke-red-500 dark:hover:stroke-red-400"
          size={16}
        />
      </button>
    </div>

    <div className="aspect-square w-full relative flex items-center justify-center">
      {Array.from({ length: 12 }, (_, index) => (
        <button
          key={index}
          type="button"
          className={classNames({
            "absolute w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out": true,
            "bg-emerald-400 dark:bg-emerald-700 hover:bg-emerald-300 dark:hover:bg-emerald-600": Number(selectedTime.slice(0, 2)) % 12 === index
          })
          }
          style={{
            top: `${50 + 42 * Math.sin((index - 3) * Math.PI / 6)}%`,
            left: `${50 + 42 * Math.cos((index - 3) * Math.PI / 6)}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => {
            const hour = amOrPm === "AM"
              ? index === 0
                ? 0
                : index
              : index === 0
                ? 12
                : index + 12
            setSelectedTime(`${hour.toString().padStart(2, "0")}:${selectedTime.slice(3)}`)
          }}
        >
          {amOrPm === "AM"
            ? index
            : index + 12
          }
        </button>
      ))}

      {Array.from({ length: 60 / 5 }, (_, index) => (
        <button
          key={index}
          type="button"
          className={classNames({
            "absolute w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out": true,
            "bg-emerald-400 dark:bg-emerald-700 hover:bg-emerald-300 dark:hover:bg-emerald-600": Number(selectedTime.slice(3)) === index * 5
          })}
          style={{
            top: `${50 + 27 * Math.sin((index - 3) * Math.PI / 6)}%`,
            left: `${50 + 27 * Math.cos((index - 3) * Math.PI / 6)}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => setSelectedTime(`${selectedTime.slice(0, 3)}${(index * 5).toString().padStart(2, "0")}`)}
        >
          {(index * 5).toString().padStart(2, "0")}
        </button>
      ))}

      {/* AM/PM */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-1">
        <button
          type="button"
          className={classNames({
            "w-8 h-8 rounded-lg transition-all duration-200 ease-in-out": true,
            "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600": amOrPm !== "AM",
            "bg-emerald-400 dark:bg-emerald-700 hover:bg-emerald-300 dark:hover:bg-emerald-600": amOrPm === "AM"
          })}
          onClick={() => {
            setAmOrPm("AM")
            setSelectedTime(`${Number(selectedTime.slice(0, 2)) < 12
              ? selectedTime.slice(0, 2)
              : (Number(selectedTime.slice(0, 2)) - 12).toString().padStart(2, "0")
              }:${selectedTime.slice(3)}`)
          }}
        >
          ÖÖ
        </button>

        <button
          type="button"
          className={classNames({
            "w-8 h-8 rounded-lg transition-all duration-200 ease-in-out": true,
            "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600": amOrPm !== "PM",
            "bg-emerald-400 dark:bg-emerald-700 hover:bg-emerald-300 dark:hover:bg-emerald-600": amOrPm === "PM"
          })}
          onClick={() => {
            setAmOrPm("PM")
            setSelectedTime(`${Number(selectedTime.slice(0, 2)) < 12
              ? (Number(selectedTime.slice(0, 2)) + 12).toString().padStart(2, "0")
              : selectedTime.slice(0, 2)
              }:${selectedTime.slice(3)}`)
          }}
        >
          ÖS
        </button>
      </div>
    </div>
  </div >

}

export default TimePicker