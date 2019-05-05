import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { OutcomeinService } from "../../services/OutcomeinService"
import { OutcomeService } from "../../services/OutcomeService"

interface IState {
  outcomes: IOutcome[]
  outcomeins: IOutcomein[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "outcomein",
    label: "Nama Pengeluaran",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "outcomein_name",
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
    name: "total",
    label: "Total",
    validations: ["required", "numeric"],
  },
]

export default class Outcomes extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    outcomes: [],
    outcomeins: [],
    loading: false,
  }

  public outcomeService = new OutcomeService()
  public outcomeinService = new OutcomeinService()

  public componentDidMount() {
    this.getOutcome()
    this.getOutcomein()
  }

  public getOutcomein() {
    // this.setState({ loading: true })
    this.outcomeinService
      .get()
      .then((outcomeins) => this.setState({ outcomeins }))
  }

  public getOutcome() {
    this.setState({ loading: true })
    this.outcomeService
      .get()
      .then((outcomes) => this.setState({ outcomes }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createOutcome(input: IOutcome) {
    this.setState({ loading: true })
    this.outcomeService
      .create(input)
      .then(() => this.getOutcome())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateOutcome(input: IOutcome, id: string) {
    this.setState({ loading: true })
    this.outcomeService
      .update(input, id)
      .then(() => this.getOutcome())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteOutcome(id: string) {
    this.setState({ loading: true })
    this.outcomeService
      .delete(id)
      .then(() => this.getOutcome())
      .catch((error) => this.setState({ error, loading: false }))
  }
  public setOptionsData() {
    fields[0].optionData!.data = this.state.outcomeins
  }

  public render() {
    // console.log(this.state.outcomes)
    this.setOptionsData()
    return (
      <Fragment>
        <Header content="Outcome" subheader="List of Outcome data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IOutcome>
          data={this.state.outcomes}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createOutcome(input)}
          onUpdate={(input) => this.updateOutcome(input, input._id)}
          onDelete={(input) => this.deleteOutcome(input._id)}
        />
      </Fragment>
    )
  }
}
