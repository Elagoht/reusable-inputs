import Input from "@/components/form/Input"
import { CakeSliceIcon, CalendarDaysIcon, CalendarFoldIcon, CalendarIcon, ClockIcon, Globe2Icon, HashIcon, KeyIcon, MailIcon, PaletteIcon, SearchIcon, UserIcon, UsersIcon } from "lucide-react"
import { FC } from "react"

const MainPage: FC = () =>
  <main className="flex flex-col items-center justify-center h-screen gap-2">
    <h1 className="text-xl font-semibold">
      Reusable Input Components
    </h1>

    <p className="italic text-gray-500">
      Reusable input components for Next.js
    </p>

    <form className="flex flex-col gap-4">
      <Input
        label="İsim"
        type="text"
        iconLeft={<UserIcon />}
      />

      <Input
        label="E-posta"
        type="email"
        iconLeft={<MailIcon />}
      />

      <Input
        label="Şifre"
        type="password"
        iconLeft={<KeyIcon />}
      />

      <Input
        label="Telefon"
        type="tel"
        iconLeft={<UsersIcon />}
      />

      <Input
        label="Doğum Tarihi"
        type="date"
        iconLeft={<CakeSliceIcon />}
      />

      <Input
        label="Saat"
        type="time"
        iconLeft={<ClockIcon />}
      />

      <Input
        label="Tarih ve Saat"
        type="datetime-local"
        iconLeft={<CalendarDaysIcon />}
      />

      <Input
        label="Ay"
        type="month"
        iconLeft={<CalendarIcon />}
      />

      <Input
        label="Hafta"
        type="week"
        iconLeft={<CalendarFoldIcon />}
      />

      <Input
        label="URL"
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