import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { ProcessService } from "../../services/ProcessService"

interface IState {
  processs: IProcess[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "process_name",
    label: "process Name",
    validations: ["required"],
  },
]

export default class Processs extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    processs: [],
    loading: false,
  }

  public processService = new ProcessService()

  public componentDidMount() {
    this.getProcess()
  }

  public getProcess() {
    this.setState({ loading: true })
    this.processService
      .get()
      .then((processs) => this.setState({ processs }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public creatProcess(input: IProcess) {
    this.setState({ loading: true })
    this.processService
      .create(input)
      .then(() => this.getProcess())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateProcess(input: IProcess, id: string) {
    this.setState({ loading: true })
    this.processService
      .update(input, id)
      .then(() => this.getProcess())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteProcess(id: string) {
    this.setState({ loading: true })
    this.processService
      .delete(id)
      .then(() => this.getProcess())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header
          content="Proses Laundry"
          subheader="Klik Tabel untuk melakukan perubahan data"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IProcess>
          data={this.state.processs}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createProcess(input)}
          onUpdate={(input) => this.updateProcess(input, input._id)}
          onDelete={(input) => this.deleteProcess(input._id)}
        />
      </Fragment>
    )
  }
}
