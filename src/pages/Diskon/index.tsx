import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable2"
import ErrorMessage from "../../components/ErrorMessage"
import { DiskonService } from "../../services/DiskonService"

interface IState {
  diskons: IDiskon[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "freqlow",
    label: "freqlow",
    validations: ["required", "numeric"],
  },
  {
    name: "freqmiddle",
    label: "freqmiddle",
    validations: ["required", "numeric"],
    hide: true,
  },
  {
    name: "freqhigh",
    label: "freqhigh",
    validations: ["required", "numeric"],
    hide: true,
  },
  {
    name: "paylow",
    label: "paylow",
    validations: ["required", "numeric"],
  },
  {
    name: "paymiddle",
    label: "paymiddle",
    validations: ["required", "numeric"],
    hide: true,
  },
  {
    name: "payhigh",
    label: "payhigh",
    validations: ["required", "numeric"],
    hide: true,
  },
  {
    name: "discountlow",
    label: "discountlow",
    validations: ["required", "numeric"],
  },
  {
    name: "discountmiddle",
    label: "discountmiddle",
    validations: ["required", "numeric"],
    hide: true,
  },
  {
    name: "discounthigh",
    label: "discounthigh",
    validations: ["required", "numeric"],
    hide: true,
  },
]

export default class Diskon extends Component<{}, IState> {
  public state: IState = {
    diskons: [],
    loading: false,
  }

  public diskonService = new DiskonService()

  public componentDidMount() {
    this.getDiskon()
  }

  public getDiskon() {
    this.setState({ loading: true })
    this.diskonService
      .get()
      .then((diskons) => this.setState({ diskons }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createDiskon(input: IDiskon) {
    this.setState({ loading: true })
    this.diskonService
      .create(input)
      .then(() => this.getDiskon())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateDiskon(input: IDiskon, id: string) {
    this.setState({ loading: true })
    this.diskonService
      .update(input, id)
      .then(() => this.getDiskon())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteDiskon(id: string) {
    this.setState({ loading: true })
    this.diskonService
      .delete(id)
      .then(() => this.getDiskon())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="Diskon" subheader="List of diskon data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IDiskon>
          data={this.state.diskons}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createDiskon(input)}
          onUpdate={(input) => this.updateDiskon(input, input._id)}
          onDelete={(input) => this.deleteDiskon(input._id)}
        />
      </Fragment>
    )
  }
}
