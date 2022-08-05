import pump from "pump"

export const pumpAsync = (...streams: Array<pump.Stream>) => {
  return new Promise<void>((rs, rj) => {
    pump(...streams, err => {
      err ? rj(err) : rs()
    })
  })
}