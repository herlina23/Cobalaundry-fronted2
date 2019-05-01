import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { UserService } from "../../services/UserService"

interface IState {
  users: IUser[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "username",
    label: "Username",
    validations: ["required"],
  },
  {
    name: "password",
    label: "Password",
    validations: ["required"],
  },
  {
    name: "role",
    label: "Role",
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
    this.getMember()
  }

  public getMember() {
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
      .then(() => this.getMember())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateUser(input: IUser, id: string) {
    this.setState({ loading: true })
    this.userService
      .update(input, id)
      .then(() => this.getMember())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteUser(id: string) {
    this.setState({ loading: true })
    this.userService
      .delete(id)
      .then(() => this.getMember())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="User" subheader="List of User data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IUser>
          data={this.state.users}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createUser(input)}
          onUpdate={(input) => this.updateUser(input, input._id)}
          onDelete={(input) => this.deleteUser(input._id)}
        />
      </Fragment>
    )
  }
}
