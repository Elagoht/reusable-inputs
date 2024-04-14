"use client"

import DatePicker from "@/components/form/DatePicker"
import Input from "@/components/form/Input"
import { CakeIcon, CalendarDaysIcon, CalendarIcon, ClockIcon, FlagIcon, FlagTriangleLeftIcon, FlagTriangleRightIcon, Globe2Icon, HashIcon, KeyIcon, MailIcon, PhoneIcon, SearchIcon, UserIcon } from "lucide-react"
import { FC } from "react"

const MainPage: FC = () =>
  <main className="flex flex-col items-center justify-center h-screen gap-2">
    <h1 className="text-xl font-semibold">
      Reusable Input Components
    </h1>

    <p className="italic text-gray-500">
      Reusable input components for Next.js
    </p>

    <form className="flex flex-col gap-4 w-full max-w-sm">
      <DatePicker
        label="Doğum Tarihi"
        type="date"
        calendarIcon
        validityIcons
        onChange={e => console.log(e.target.value)}
      />

      <Input
        label="İsim"
        type="text"
        iconLeft={<UserIcon />}
        success="İsim doğru girildi"
      />

      <Input
        label="Parola"
        type="password"
        iconLeft={<KeyIcon />}
        error="Parola yanlış girildi"
      />

      <Input
        label="Doğum Tarihi"
        type="date"
        iconLeft={<CalendarDaysIcon />}
        iconRight={<CakeIcon />}
        message="Doğum tarihinizi girin"
        min={new Date().toISOString().split("T")[0]}
        max={(new Date(
          new Date().getFullYear() + 1,
          new Date().getMonth(),
          new Date().getDate()
        )).toISOString().split("T")[0]}
      />

      <Input
        label="Doğum Saati"
        type="time"
        iconLeft={<ClockIcon />}
        iconRight={<CakeIcon />}
        onChange={e => console.log(e.target.value)}
      />

      <Input
        label="Başlangıç Zamanı"
        type="datetime-local"
        iconLeft={<FlagTriangleLeftIcon />}
        iconRight={<FlagTriangleRightIcon />}
        message="Validasyon ikonları bunda da var"
        validityIcons
      />

      <Input
        label="Ay"
        type="month"
        iconLeft={<CalendarIcon />}
        validityIcons
        error="Ay yanlış girildi"
      />

      <Input
        label="Hafta"
        type="week"
        iconLeft={<CalendarDaysIcon />}
        validityIcons
        success="Hafta doğru girildi"
      />

      <Input
        label="Numara"
        type="number"
        iconLeft={<HashIcon />}
        optional
      />

      <Input
        label="E-posta"
        type="email"
        iconLeft={<MailIcon />}
      />

      <Input
        label="Telefon"
        type="tel"
        iconLeft={<PhoneIcon />}
      />

      <Input
        label="Web Site"
        type="url"
        iconLeft={<Globe2Icon />}
      />

      <Input
        label="Arama"
        type="search"
        iconLeft={<SearchIcon />}
      />
    </form>
  </main>

export default MainPage