import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { ServiceService } from "../../services/ServiceService"

interface IState {
  services: IService[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "serviceName",
    label: "Service Name",
    validations: ["required"],
  },
  {
    name: "days",
    label: "Days",
    validations: ["required", "numeric"],
  },
  {
    name: "unit",
    label: "Unit",
    validations: ["required"],
  },
  {
    name: "tarif",
    label: "Tarif",
    validations: ["required", "numeric"],
  },
]

export default class Service extends Component<{}, IState> {
  public state: IState = {
    services: [],
    loading: false,
  }

  public serviceService = new ServiceService()

  public componentDidMount() {
    this.getMember()
  }

  public getMember() {
    this.setState({ loading: true })
    this.serviceService
      .get()
      .then((services) => this.setState({ services }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createService(input: IService) {
    this.setState({ loading: true })
    this.serviceService
      .create(input)
      .then(() => this.getMember())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateService(input: IService, id: string) {
    this.setState({ loading: true })
    this.serviceService
      .update(input, id)
      .then(() => this.getMember())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteService(id: string) {
    this.setState({ loading: true })
    this.serviceService
      .delete(id)
      .then(() => this.getMember())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="Service" subheader="List of service data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IService>
          data={this.state.services}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createService(input)}
          onUpdate={(input) => this.updateService(input, input._id)}
          onDelete={(input) => this.deleteService(input._id)}
        />
      </Fragment>
    )
  }
}
