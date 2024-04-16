"use client"

import DateInput from "@/components/form/DateInput"
import Input from "@/components/form/Input"
import { Form, Formik } from "formik"
import { CakeIcon, CalendarDaysIcon, CalendarIcon, ClockIcon, FlagTriangleLeftIcon, FlagTriangleRightIcon, Globe2Icon, HashIcon, KeyIcon, MailIcon, PhoneIcon, SearchIcon, UserIcon } from "lucide-react"
import { FC } from "react"
import { date, mixed, object } from "yup"

const MainPage: FC = () =>
  <main className="flex flex-col items-center justify-center min-h-screen gap-2">
    <h1 className="text-xl font-semibold">
      Reusable Input Components
    </h1>

    <p className="italic text-gray-500">
      Reusable input components for Next.js
    </p>

    <Formik
      initialValues={{
        birthDate: new Date(
          new Date().getFullYear() - 18,
          new Date().getMonth(),
          new Date().getDate() + 1
        ).toISOString().split("T")[0],
        birthTime: new Date().toTimeString().slice(0, 5)
      }}
      validationSchema={object().shape({
        birthDate: date()
          .max(new Date(
            new Date().getFullYear() - 18,
            new Date().getMonth(),
            new Date().getDate()
          ), "18 yaşından küçükler kayıt olamaz")
          .min(new Date(
            new Date().getFullYear() - 100,
            new Date().getMonth(),
            new Date().getDate()
          ), "100 yaşından büyükler kayıt olamaz")
          .required("Doğum tarihi boş bırakılamaz"),
        birthTime: mixed()
          .test("is-valid-time", "Geçerli bir saat girin", value => {
            if (typeof value !== "string") return false
            const [hour, minute] = value.split(":")
            return Number(hour) >= 0 && Number(hour) < 24 && Number(minute) >= 0 && Number(minute) < 60
          })
      })}
      onSubmit={values => console.log(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
      }) =>
        <Form className="flex flex-col gap-4 w-full max-w-sm">
          <pre>
            {JSON.stringify(values, null, 2)}
          </pre>

          <DateInput
            label="Doğum Tarihi"
            name="birthDate"
            type="date"
            calendarIcon
            validityIcons
            minDate={new Date(
              new Date().getFullYear() - 100,
              new Date().getMonth(),
              new Date().getDate()
            )}
            maxDate={new Date(
              new Date().getFullYear() - 18,
              new Date().getMonth(),
              new Date().getDate()
            )}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.birthDate}
            error={touched.birthDate ? errors.birthDate : undefined}
            success={touched.birthDate ? "Doğum tarihi geçerli" : undefined}
            message="Doğum tarihinizi girin"
          />

          <DateInput
            label="Doğum Saati"
            type="time"
            name="birthTime"
            value={values.birthTime}
            onChange={handleChange}
            onBlur={handleBlur}
            iconLeft={<ClockIcon />}
            error={touched.birthTime ? errors.birthTime : undefined}
            success={touched.birthTime ? "Doğum saati geçerli" : undefined}
            validityIcons
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
        </Form>
      }
    </Formik>
  </main>

export default MainPage