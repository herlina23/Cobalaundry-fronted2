import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { MemberService } from "../../services/MemberService"

interface IState {
  members: IMember[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "member_name",
    label: "Nama Member",
    validations: ["required"],
  },
  {
    name: "phone",
    label: "Telepon",
    validations: ["required", "numeric"],
  },
  {
    name: "address",
    label: "Alamat",
    validations: ["required"],
  },
]

export default class Member extends Component<{}, IState> {
  public state: IState = {
    members: [],
    loading: false,
  }

  public memberService = new MemberService()

  public componentDidMount() {
    this.getMember()
  }

  public getMember() {
    this.setState({ loading: true })
    this.memberService
      .get()
      .then((members) => this.setState({ members }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createMember(input: IMember) {
    this.setState({ loading: true })
    this.memberService
      .create(input)
      .then(() => this.getMember())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateMember(input: IMember, id: string) {
    this.setState({ loading: true })
    this.memberService
      .update(input, id)
      .then(() => this.getMember())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteMember(id: string) {
    this.setState({ loading: true })
    this.memberService
      .delete(id)
      .then(() => this.getMember())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header
          content="Member"
          subheader="Klik Tabel untuk melakukan perubahan data"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IMember>
          data={this.state.members}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createMember(input)}
          onUpdate={(input) => this.updateMember(input, input._id)}
          onDelete={(input) => this.deleteMember(input._id)}
        />
      </Fragment>
    )
  }
}
