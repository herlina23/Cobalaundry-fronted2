import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { StatusService } from "../../services/StatusService"

interface IState {
  statuss: IStatus[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "status_name",
    label: "status Name",
    validations: ["required"],
  },
]

export default class Statuss extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    statuss: [],
    loading: false,
  }

  public statusService = new StatusService()

  public componentDidMount() {
    this.getStatus()
  }

  public getStatus() {
    this.setState({ loading: true })
    this.statusService
      .get()
      .then((statuss) => this.setState({ statuss }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createStatus(input: IStatus) {
    this.setState({ loading: true })
    this.statusService
      .create(input)
      .then(() => this.getStatus())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateStatus(input: IStatus, id: string) {
    this.setState({ loading: true })
    this.statusService
      .update(input, id)
      .then(() => this.getStatus())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteStatus(id: string) {
    this.setState({ loading: true })
    this.statusService
      .delete(id)
      .then(() => this.getStatus())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="Status In" subheader="List of Status In data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IStatus>
          data={this.state.statuss}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createStatus(input)}
          onUpdate={(input) => this.updateStatus(input, input._id)}
          onDelete={(input) => this.deleteStatus(input._id)}
        />
      </Fragment>
    )
  }
}
