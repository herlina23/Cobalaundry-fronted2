import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable3"
import ErrorMessage from "../../components/ErrorMessage"
import { MemberService } from "../../services/MemberService"
import { StatusService } from "../../services/StatusService"
import { TransactionService } from "../../services/TransactionService"

interface IState {
  transaction: IShowtrans[]
  members: IMember[]
  statuss: IStatus[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "invoice",
    label: "Invoice",
    // validations: ["required"],
    hideForm: true,
  },
  {
    name: "dateIn",
    label: "Tgl Masuk",
    // validations: ["required"],
    hideForm: true,
  },
  {
    name: "dateOut",
    label: "Tgl Ambil",
    // validations: ["required"],
    hideForm: true,
  },
  {
    name: "member",
    label: "Nama Member",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "member_name",
      valueKey: "_id",
    },
  },
  {
    name: "member",
    label: "Telepon",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "phone",
      valueKey: "_id",
    },
  },
  {
    name: "user",
    label: "Username",
    type: "option",
    optionData: {
      data: [],
      textKey: "username",
      valueKey: "_id",
    },
    hideForm: true,
    hide: true,
  },
  {
    name: "discount",
    label: "Diskon",
    // validations: ["required"],
    hideForm: true,
    hide: true,
  },
  {
    name: "total",
    label: "Total",
    // validations: ["required"],
    hideForm: true,
    hide: true,
  },
  {
    name: "grandTotal",
    label: "Grand Total",
    // validations: ["required"],
    hideForm: true,
  },
  {
    name: "recipient",
    label: "Penerima",
    // validations: ["required"],
  },
  // {
  //   name: "paymentStatus",
  //   label: "Status Bayar",
  //   // validations: ["required"],
  // },
  {
    name: "status",
    label: "Status Bayar",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "status_name",
      valueKey: "_id",
    },
  },
]

export default class ShowTransaction extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    transaction: [],
    members: [],
    statuss: [],
    loading: false,
  }

  public transactionService = new TransactionService()
  public memberService = new MemberService()
  public statusService = new StatusService()

  public componentDidMount() {
    this.getTransaction()
    this.getMember()
    this.getStatus()
  }

  public getMember() {
    this.memberService.get().then((members) => this.setState({ members }))
  }
  public getStatus() {
    this.statusService.get().then((statuss) => this.setState({ statuss }))
  }

  public getTransaction() {
    this.setState({ loading: true })
    this.transactionService
      .get()
      .then((transaction) => this.setState({ transaction }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createTransaction(input: ITransaction) {
    this.setState({ loading: true })
    this.transactionService
      .create(input)
      .then(() => this.getTransaction())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateTransaction(input: ITransaction, id: string) {
    this.setState({ loading: true })
    this.transactionService
      .update(input, id)
      .then(() => this.getTransaction())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteTransaction(id: string) {
    this.setState({ loading: true })
    this.transactionService
      .delete(id)
      .then(() => this.getTransaction())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public renderAdditionalAction(transaction: IShowtrans) {
    return transaction._id ? (
        <Link to={`/show_trans/detail`}>
        <Button
          content="Detail"
          color="orange"
          onClick={() =>
            localStorage.setItem("transaction", JSON.stringify(transaction))
          }
        />
      </Link>
    ) : null
  }

  public setOptionsData() {
    fields[3].optionData!.data = this.state.members
  }
  public setOptionsData3() {
    fields[4].optionData!.data = this.state.members
  }
  public setOptionsData2() {
    fields[9].optionData!.data = this.state.statuss
  }

  public render() {
    this.setOptionsData()
    // this.setOptionsData2()
    this.setOptionsData3()
    return (
      <Fragment>
        <Header content="Transaksi" subheader="Daftar Transaksi Laundry" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IShowtrans>
          data={this.state.transaction}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createTransaction(input)}
          onUpdate={(input) => this.updateTransaction(input, input._id)}
          onDelete={(input) => this.deleteTransaction(input._id)}
          additionalAction={(transaction) =>
            this.renderAdditionalAction(transaction)
          }
        />
      </Fragment>
    )
  }
}
