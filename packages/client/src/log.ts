import chalk from 'chalk'

const log = console.log

 const warn = (...text: any[]) => log(chalk.yellow(text))

 const error = (...text: any[]) => log(chalk.red(text))

 const success = (...text: any[]) => log(chalk.green(text))

 const info = (...text: any[]) => log(chalk.blue(text))

export default {
  warn,
  error,
  success,
  info
}