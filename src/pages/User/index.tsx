import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable4"
import ErrorMessage from "../../components/ErrorMessage"
import { UserService } from "../../services/UserService"

interface IState {
  users: IUser[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "name",
    label: "Nama",
    validations: ["required"],
  },
  {
    name: "username",
    label: "Username",
    validations: ["required"],
  },
  {
    name: "password",
    label: "Password",
    validations: ["required"],
    hide: true,
    type: "password",
  },
  {
    name: "role",
    label: "Jabatan",
    validations: ["required"],
  },
]

export default class User extends Component<{}, IState> {
  public state: IState = {
    users: [],
    loading: false,
  }

  public userService = new UserService()

  public componentDidMount() {
    this.getUser()
  }

  public getUser() {
    this.setState({ loading: true })
    this.userService
      .get()
      .then((users) => this.setState({ users }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createUser(input: IUser) {
    this.setState({ loading: true })
    this.userService
      .create(input)
      .then(() => this.getUser())
      .catch((error) => this.setState({ error, loading: false }))
  }

  // public updateUser(input: IUser, id: string) {
  //   this.setState({ loading: true })
  //   this.userService
  //     .update(input, id)
  //     .then(() => this.getUser())
  //     .catch((error) => this.setState({ error, loading: false }))
  // }

  public deleteUser(id: string) {
    this.setState({ loading: true })
    this.userService
      .delete(id)
      .then(() => this.getUser())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header
          content="User"
          subheader="Klik Tabel untuk melakukan perubahan data"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IUser>
          data={this.state.users}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createUser(input)}
          // onUpdate={(input) => this.updateUser(input, input._id)}
          onDelete={(input) => this.deleteUser(input._id)}
        />
      </Fragment>
    )
  }
}
