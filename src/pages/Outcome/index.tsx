import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { OutcomeService } from "../../services/OutcomeService"

interface IState {
  outcomes: IOutcome[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "outcome_name",
    label: "Outcome Name",
    validations: ["required"],
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
    loading: false,
  }

  public outcomeService = new OutcomeService()

  public componentDidMount() {
    this.getOutcome()
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

  public render() {
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
