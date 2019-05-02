import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { DetailService } from "../../services/DetailService"
import { ServiceService } from "../../services/ServiceService"
import { TransactionService } from "../../services/TransactionService"

interface IState {
  details: IDetail[]
  transaction: ITransaction[]
  services: IService[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "transaction",
    label: "Invoice",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "invoice",
      valueKey: "_id",
    },
  },

  {
    name: "service",
    label: "Service Name",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "serviceName",
      valueKey: "_id",
    },
  },

  {
    name: "process",
    label: "Process",
    // validations: ["required"],
  },
  {
    name: "qty",
    label: "Quantity",
    validations: ["required", "numeric"],
  },
]

export default class Idetails extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    details: [],
    transaction: [],
    services: [],
    loading: false,
  }

  public detailService = new DetailService()
  public transactionService = new TransactionService()
  public serviceService = new ServiceService()

  public componentDidMount() {
    this.getDetail()
    this.getTransaction()
    this.getMember()
  }

  public getMember() {
    this.serviceService.get().then((services) => this.setState({ services }))
  }

  public getTransaction() {
    this.transactionService
      .get()
      .then((transaction) => this.setState({ transaction }))
  }

  public getDetail() {
    this.setState({ loading: true })
    this.detailService
      .get()
      .then((details) => this.setState({ details }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createDetail(input: IDetail) {
    this.setState({ loading: true })
    this.detailService
      .create(input)
      .then(() => this.getDetail())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateDetail(input: IDetail, id: string) {
    this.setState({ loading: true })
    this.detailService
      .update(input, id)
      .then(() => this.getDetail())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteDetail(id: string) {
    this.setState({ loading: true })
    this.detailService
      .delete(id)
      .then(() => this.getDetail())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public setOptionsData() {
    fields[0].optionData!.data = this.state.transaction
  }
  public setOptionsData2() {
    fields[1].optionData!.data = this.state.services
  }

  public render() {
    this.setOptionsData()
    this.setOptionsData2()
    return (
      <Fragment>
        <Header content="Detail" subheader="List of Detail data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IDetail>
          data={this.state.details}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createDetail(input)}
          onUpdate={(input) => this.updateDetail(input, input._id)}
          onDelete={(input) => this.deleteDetail(input._id)}
        />
      </Fragment>
    )
  }
}
