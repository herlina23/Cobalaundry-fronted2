declare interface IRoute {
  label?: string
  icon?: string
  path: string
  component: React.FunctionComponent | React.Components
  hide?: boolean
  private?: boolean
  role: string[]
}

declare interface IField {
  name: string
  label: string
  type?: "text" | "password" | "option" | "image" | "date"
  validations?: string[]
  optionData?: IOptionData
  hide?: boolean
  hideForm?: boolean
}

declare interface IOptionData {
  data: any[]
  textKey: string
  valueKey: string
}

declare interface IMember {
  _id: string
  member_name: string
  phone: number
  address: string
}

declare interface IDiskon {
  _id: string
  freqlow: number
  freqmiddle: number
  freqhigh: number
  kglow: number
  kgmiddle: number
  kghigh: number
  paylow: number
  paymiddle: number
  payhigh: number
  discountlow: number
  discountmiddle: number
  discounthigh: number
}
declare interface IService {
  _id: string
  serviceName: string
  days: number
  unit: string
  tarif: number
}

declare interface IUser {
  _id: string
  username: string
  password: string
  role: string
  name: string
}
declare interface IItem {
  _id: string
  item_name: string
  unit: string
  stock: number
}
declare interface IItemin {
  _id: string
  item?: IItem | string
  qty: number
  price: number
  create_date: date
}
declare interface IItemout {
  _id: string
  item?: IItem | string
  qty: number
  create_date: date
}
// declare interface IItemout {
//   _id: string
//   item_name: string
//   qty: number
// }

declare interface ISalary {
  _id: string
  // emloyee?: IUser | string
  // user: IUser | string
  user?: IUser | string
  total: number
  create_date: date
}

declare interface ITransaction {
  _id: string
  invoice: string
  dateIn: date
  dateOut: date
  discount: number
  total: number
  grandTotal: number
  status?: IStatus | string
  // recepient: string
  member?: IMember | string
  user: IUser | string
  detail: string[]
}
declare interface IDetail {
  _id: string
  process?: IProcess | string
  transaction?: IDetail | string
  service?: IService | string
  qty: number
}
declare interface IOutcomein {
  _id: string
  outcome_name: string
}
declare interface IStatus {
  _id: string
  status_name: string
}
declare interface IProcess {
  _id: string
  process_name: string
}

declare interface IOutcome {
  _id: string
  outcomein?: IOutcomein | string
  total: number
  user: IUser | string
  unit: string
  qty: number
  date: date
}

declare interface IDas_admin {
  // _id: string
  // outcomein?: IOutcomein | string
  // total: number
  // user: IUser | string
}

declare interface IDas_kasir {
  // _id: string
  // outcomein?: IOutcomein | string
  // total: number
  // user: IUser | string
}

declare interface IShowtrans {
  _id: string
  invoice: string
  dateIn: date
  dateOut: date
  discount: number
  total: number
  grandTotal: number
  status?: IStatus | string
  recepient: string
  member?: IMember | string
  user: IUser | string
  detail: string[]
}

declare interface IShowdtl {
  _id: string
  process?: IProcess | string
  transaction?: IShowdtl | string
  service?: IService | string
  qty: number
}

declare interface IAppContext {
  token: string
  setToken: (token: string) => void
  user: IUser | null
  setUser: (user: IUser) => void
  isLoggedIn: () => boolean
}
