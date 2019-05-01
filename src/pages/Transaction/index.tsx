import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { TransactionService } from "../../services/TransactionService"

interface IState {
  transaction: ITransaction[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "dateout",
    label: "Date Out",
    // validations: ["required"],
  },
  {
    name: "member",
    label: "MemberID",
    validations: ["required", "numeric"],
  },
  {
    name: "discount",
    label: "Discount",
    // validations: ["required"],
  },
  {
    name: "total",
    label: "Total",
    // validations: ["required"],
  },
  {
    name: "grandTotal",
    label: "Grand Total",
    // validations: ["required"],
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
    loading: false,
  }

  public transactionService = new TransactionService()

  public componentDidMount() {
    this.getTransaction()
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

  public render() {
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
