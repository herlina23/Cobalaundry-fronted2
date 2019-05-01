import { Item } from "semantic-ui-react"
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
    icon: "group",
    path: "/member",
    private: true,
  },
  {
    component: Diskon,
    label: "Diskon",
    icon: "dollar sign",
    path: "/diskon",
    private: true,
  },
  {
    component: Service,
    label: "Service",
    icon: "pencil",
    path: "/service",
    private: true,
  },
  {
    component: User,
    label: "User",
    icon: "call",
    path: "/user",
    private: true,
  },
  {
    component: Items,
    label: "Item",
    icon: "book",
    path: "/item",
    private: true,
  },
  {
    component: Itemins,
    label: "Item In",
    icon: "pencil",
    path: "/itemin",
    private: true,
  },
  {
    component: Itemouts,
    label: "Item Out",
    icon: "pencil",
    path: "/itemout",
    private: true,
  },
  {
    component: Salary,
    label: "Salary",
    icon: "dollar",
    path: "/salary",
    private: true,
  },
  // {
  //   component: Transaction,
  //   label: "Transaction",
  //   icon: "dollar",
  //   path: "/transaction",
  //   private: true,
  // },

  {
    component: Outcomeins,
    label: "Outcome In",
    icon: "pencil",
    path: "/outcomein",
    private: true,
  },

  {
    component: Outcomes,
    label: "Outcome",
    icon: "dollar",
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
