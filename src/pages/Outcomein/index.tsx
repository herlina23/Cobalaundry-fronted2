import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { OutcomeinService } from "../../services/OutcomeinService"

interface IState {
  outcomeins: IOutcomein[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "outcomein_name",
    label: "Nama Pengeluaran",
    validations: ["required"],
  },
]

export default class Outcomeins extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    outcomeins: [],
    loading: false,
  }

  public outcomeinService = new OutcomeinService()

  public componentDidMount() {
    this.getOutcomein()
  }

  public getOutcomein() {
    this.setState({ loading: true })
    this.outcomeinService
      .get()
      .then((outcomeins) => this.setState({ outcomeins }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createOutcomein(input: IOutcomein) {
    this.setState({ loading: true })
    this.outcomeinService
      .create(input)
      .then(() => this.getOutcomein())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateOutcomein(input: IOutcomein, id: string) {
    this.setState({ loading: true })
    this.outcomeinService
      .update(input, id)
      .then(() => this.getOutcomein())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteOutcomein(id: string) {
    this.setState({ loading: true })
    this.outcomeinService
      .delete(id)
      .then(() => this.getOutcomein())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="Outcome In" subheader="List of Outcome In data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IOutcomein>
          data={this.state.outcomeins}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createOutcomein(input)}
          onUpdate={(input) => this.updateOutcomein(input, input._id)}
          onDelete={(input) => this.deleteOutcomein(input._id)}
        />
      </Fragment>
    )
  }
}
