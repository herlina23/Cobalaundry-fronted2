import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { SalaryService } from "../../services/SalaryService"

interface IState {
  salary: ISalary[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "employee",
    label: "Employee",
    validations: ["required"],
  },
  {
    name: "total",
    label: "Total",
    validations: ["required", "numeric"],
  },
]

export default class Salary extends Component<{}, IState> {
  public state: IState = {
    salary: [],
    loading: false,
  }

  public salaryService = new SalaryService()

  public componentDidMount() {
    this.getSalary()
  }

  public getSalary() {
    this.setState({ loading: true })
    this.salaryService
      .get()
      .then((salary) => this.setState({ salary }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createSalary(input: ISalary) {
    this.setState({ loading: true })
    this.salaryService
      .create(input)
      .then(() => this.getSalary())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateSalary(input: ISalary, id: string) {
    this.setState({ loading: true })
    this.salaryService
      .update(input, id)
      .then(() => this.getSalary())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteSalary(id: string) {
    this.setState({ loading: true })
    this.salaryService
      .delete(id)
      .then(() => this.getSalary())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="Salary" subheader="List of salary data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<ISalary>
          data={this.state.salary}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createSalary(input)}
          onUpdate={(input) => this.updateSalary(input, input._id)}
          onDelete={(input) => this.deleteSalary(input._id)}
        />
      </Fragment>
    )
  }
}
