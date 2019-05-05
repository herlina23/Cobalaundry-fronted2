import { Item } from "semantic-ui-react"
import Detail from "../pages/Detail"
import Diskon from "../pages/Diskon"
import Items from "../pages/Item"
import Itemins from "../pages/Itemin"
import Itemouts from "../pages/Itemout"
import Login from "../pages/Login"
import Member from "../pages/Member"
import Outcomes from "../pages/Outcome"
import Outcomeins from "../pages/Outcomein"
import Salary from "../pages/Salary"
import Service from "../pages/Service"
import Transaction from "../pages/Transaction"
import User from "../pages/User"

const routes: IRoute[] = [
  {
    component: Member,
    label: "Member",
    icon: "address book",
    path: "/member",
    private: true,
  },
  {
    component: Diskon,
    label: "Diskon",
    icon: "percent",
    path: "/diskon",
    private: true,
  },
  {
    component: Service,
    label: "Layanan Laundry",
    icon: "pencil",
    path: "/service",
    private: true,
  },
  {
    component: User,
    label: "User",
    icon: "user",
    path: "/user",
    private: true,
  },
  {
    component: Items,
    label: "Barang",
    icon: "window restore outline",
    path: "/item",
    private: true,
  },
  {
    component: Itemins,
    label: "Barang Masuk",
    icon: "pencil",
    path: "/itemin",
    private: true,
  },
  {
    component: Itemouts,
    label: "Barang Keluar",
    icon: "pencil",
    path: "/itemout",
    private: true,
  },
  {
    component: Salary,
    label: "Gaji karyawan",
    icon: "money bill alternate",
    path: "/salary",
    private: true,
  },
  {
    component: Transaction,
    label: "Transaksi",
    icon: "clipboard list",
    path: "/transaction",
    private: true,
  },
  {
    component: Detail,
    label: "Detail Transaksi",
    icon: "file text",
    path: "/transaction/detail",
    hide: true,
    private: true,
  },

  {
    component: Outcomeins,
    label: "Jenis Pengeluaran",
    icon: "list layout",
    path: "/outcomein",
    private: true,
  },

  {
    component: Outcomes,
    label: "Pengeluaran",
    icon: "money bill alternate outline",
    path: "/outcome",
    private: true,
  },

  {
    component: Login,
    path: "/login",
    hide: true,
  },
]

export default routes
