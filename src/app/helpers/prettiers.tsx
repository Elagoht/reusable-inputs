class Pretty {
  static phoneNumber = (phoneNumber: string) => {
    // If there's no phone number, return an empty string
    if (!phoneNumber) return ""
    const value = (phoneNumber
      // Remove all non-digits
      .replace(/\D/g, "")
      // Create capture groups for each section of the phone number
      .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
    ) as RegExpMatchArray
    return !value[2]
      ? value[1]
      : `(${value[1]}) ${value[2]}${value[3]
        ? ` ${value[3]}`
        : ""
      }${value[4]
        ? ` ${value[4]}`
        : ""}`
  }
}

export default Pretty