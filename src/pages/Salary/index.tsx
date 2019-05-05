import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { SalaryService } from "../../services/SalaryService"
import { UserService } from "../../services/UserService"

interface IState {
  salary: ISalary[]
  users: IUser[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "employee",
    label: "Nama Pegawai",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "username",
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
    label: "Total Gaji",
    validations: ["required", "numeric"],
  },
]

export default class Salary extends Component<{}, IState> {
  public state: IState = {
    salary: [],
    users: [],
    loading: false,
  }

  public salaryService = new SalaryService()
  public userService = new UserService()

  public componentDidMount() {
    this.getSalary()
    this.getUser()
  }

  public getSalary() {
    this.setState({ loading: true })
    this.salaryService
      .get()
      .then((salary) => this.setState({ salary }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }
  public getUser() {
    this.userService.get().then((users) => this.setState({ users }))
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
  public setOptionsData() {
    fields[0].optionData!.data = this.state.users
  }

  public render() {
    this.setOptionsData()
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
