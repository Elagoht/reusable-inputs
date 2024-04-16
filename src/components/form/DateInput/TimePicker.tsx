import classNames from "classnames"
import { ClockIcon, MouseIcon, PointerIcon, TouchpadIcon, XCircleIcon } from "lucide-react"
import { FC } from "react"

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

    <div className="aspect-square relative flex items-center justify-center h-full gap-2">
      <div
        className="flex flex-col items-center justify-center w-full h-full"
        onWheel={(event) => {
          event.stopPropagation()
          const delta = -event.deltaY
          const hour = (Math.min(Math.max(Math.min(Number(selectedTime.slice(0, 2)) + Math.sign(delta)), -1), 24) + 24) % 24
          setSelectedTime(
            `${hour.toString().padStart(2, "0").slice(0, 2)
            }:${selectedTime.slice(3, 5)
            }`
          )
        }}
        onPointerDown={(event) => {
          event.stopPropagation()
          const startY = event.clientY
          const startHour = Number(selectedTime.slice(0, 2))
          const handlePointerMove = (event: PointerEvent) => {
            const delta = event.clientY - startY
            const hour = (Math.min(Math.max(Math.min(startHour - delta / 10), -1), 24) + 24) % 24
            setSelectedTime(
              `${hour.toString().split(".")[0].padStart(2, "0")
              }:${selectedTime.slice(3, 5)}`
            )
          }
          const handlePointerUp = () => {
            window.removeEventListener("pointermove", handlePointerMove)
            window.removeEventListener("pointerup", handlePointerUp)
          }
          window.addEventListener("pointermove", handlePointerMove)
          window.addEventListener("pointerup", handlePointerUp)
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <button
            type="button"
            key={index}
            className={classNames({
              "rounded-lg w-full flex items-center justify-center text-5xl bg-gray-400 dark:bg-gray-600": true,
              "h-1/3 [transform:_rotateX(50deg)]": index !== 1,
              "h-1/2": index === 1,
            })}
            onClick={
              index === 0
                ? () => setSelectedTime(
                  `${((Number(selectedTime.slice(0, 2)) + 24 - 1) % 24).toString().padStart(2, "0")
                  }:${selectedTime.slice(3, 5)}`
                )
                : index === 2
                  ? () => setSelectedTime(
                    `${((Number(selectedTime.slice(0, 2)) + 24 + 1) % 24).toString().padStart(2, "0")
                    }:${selectedTime.slice(3, 5)}`
                  )
                  : undefined
            }
          >
            <span className={classNames({
              "-translate-y-1/5": index === 0,
              "translate-y-1/5": index === 2
            })}>
              {((Number(selectedTime.slice(0, 2)) + index - 1 + 24) % 24).toString().padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      <div
        className="flex flex-col items-center justify-center w-full h-full"
        onWheel={(event) => {
          event.stopPropagation()
          const delta = -event.deltaY
          const minute = (Math.min(Math.max(Math.min(Number(selectedTime.slice(3, 5)) + Math.sign(delta)), -1), 60) + 60) % 60
          setSelectedTime(
            `${selectedTime.slice(0, 2)
            }:${minute.toString().padStart(2, "0")}`
          )
        }}
        onPointerDown={(event) => {
          event.stopPropagation()
          const startY = event.clientY
          const startMinute = Number(selectedTime.slice(3, 5))
          const handlePointerMove = (event: PointerEvent) => {
            const delta = event.clientY - startY
            const minute = (Math.min(Math.max(Math.min(startMinute - delta / 10), -1), 60) + 60) % 60
            setSelectedTime(
              `${selectedTime.slice(0, 2)
              }:${minute.toString().split(".")[0].padStart(2, "0")}`
            )
          }
          const handlePointerUp = () => {
            window.removeEventListener("pointermove", handlePointerMove)
            window.removeEventListener("pointerup", handlePointerUp)
          }
          window.addEventListener("pointermove", handlePointerMove)
          window.addEventListener("pointerup", handlePointerUp)
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <button
            type="button"
            key={index}
            className={classNames({
              "rounded-lg w-full flex items-center justify-center text-5xl bg-gray-400 dark:bg-gray-600": true,
              "h-1/3 [transform:_rotateX(50deg)]": index !== 1,
              "h-1/2": index === 1,
            })}
            onClick={
              index === 0
                ? () => setSelectedTime(
                  `${selectedTime.slice(0, 2)
                  }:${((Number(selectedTime.slice(3, 5)) + 60 - 1) % 60).toString().padStart(2, "0")}`
                )
                : index === 2
                  ? () => setSelectedTime(
                    `${selectedTime.slice(0, 2)
                    }:${((Number(selectedTime.slice(3, 5)) + 60 + 1) % 60).toString().padStart(2, "0")}`
                  )
                  : undefined
            }
          >
            <span className={classNames({
              "-translate-y-1/5": index === 0,
              "translate-y-1/5": index === 2
            })}>
              {((Number(selectedTime.slice(3, 5)) + index - 1 + 60) % 60).toString().padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      <div className="absolute inset-y-2 inset-x-0 bg-gradient-to-b from-gray-200 dark:from-gray-800 via-transparent dark:via-transparent to-gray-200 dark:to-gray-800 pointer-events-none" />
    </div>

    <div className="flex justify-evenly gap-2 -mt-2">
      <MouseIcon size={16} /> <TouchpadIcon size={16} /> <PointerIcon size={16} />
    </div>
    <small className="text-center text-xs">
      Kaydırarak saat ve dakika seçebilirsiniz.
    </small>

    <button
      type="button"
      className="rounded-lg w-full p-2 bg-emerald-400 dark:bg-emerald-600 dark:text-white text-gray-800"
      onClick={() => setShow(false)}
    >
      Onayla
    </button>
  </div>
}

export default TimePicker