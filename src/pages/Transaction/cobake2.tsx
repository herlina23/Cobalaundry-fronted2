import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { MemberService } from "../../services/MemberService"
import { TransactionService } from "../../services/TransactionService"

interface IState {
  transaction: ITransaction[]
  members: IMember[]
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
    label: "Date In",
    // validations: ["required"],
    hideForm: true,
  },
  {
    name: "dateOut",
    label: "Date Out",
    // validations: ["required"],
    hideForm: true,
  },
  {
    name: "member",
    label: "Member Name",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "member_name",
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
  },
  {
    name: "discount",
    label: "Discount",
    // validations: ["required"],
    hideForm: true,
  },
  {
    name: "total",
    label: "Total",
    // validations: ["required"],
    hideForm: true,
  },
  {
    name: "grandTotal",
    label: "Grand Total",
    // validations: ["required"],
    hideForm: true,
  },
  {
    name: "recipient",
    label: "Recipient",
    // validations: ["required"],
  },
  {
    name: "paymentStatus",
    label: "PaymentStatus",
    // validations: ["required"],
  },
]

export default class Transaction extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    transaction: [],
    members: [],
    loading: false,
  }

  public transactionService = new TransactionService()
  public memberService = new MemberService()

  public componentDidMount() {
    this.getTransaction()
    this.getMember()
  }

  public getMember() {
    this.memberService.get().then((members) => this.setState({ members }))
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

  public setOptionsData() {
    fields[3].optionData!.data = this.state.members
  }

  public render() {
    this.setOptionsData()
    return (
      <Fragment>
        <Header content="Transaction" subheader="List of Transaction data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<ITransaction>
          data={this.state.transaction}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createTransaction(input)}
          onUpdate={(input) => this.updateTransaction(input, input._id)}
          onDelete={(input) => this.deleteTransaction(input._id)}
        />
      </Fragment>
    )
  }
}
