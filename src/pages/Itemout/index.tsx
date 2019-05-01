import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { ItemoutService } from "../../services/ItemoutService"

interface IState {
  itemouts: IItemout[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "item_name",
    label: "Item Name",
    validations: ["required"],
  },
  {
    name: "qty",
    label: "Quantity",
    validations: ["required", "numeric"],
  },
]

export default class Itemouts extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    itemouts: [],
    loading: false,
  }

  public itemoutService = new ItemoutService()

  public componentDidMount() {
    this.getItemout()
  }

  public getItemout() {
    this.setState({ loading: true })
    this.itemoutService
      .get()
      .then((itemouts) => this.setState({ itemouts }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createItemout(input: IItemout) {
    this.setState({ loading: true })
    this.itemoutService
      .create(input)
      .then(() => this.getItemout())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateItemout(input: IItemout, id: string) {
    this.setState({ loading: true })
    this.itemoutService
      .update(input, id)
      .then(() => this.getItemout())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteItemout(id: string) {
    this.setState({ loading: true })
    this.itemoutService
      .delete(id)
      .then(() => this.getItemout())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    return (
      <Fragment>
        <Header content="Item Out" subheader="List of Item Out data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IItemout>
          data={this.state.itemouts}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createItemout(input)}
          onUpdate={(input) => this.updateItemout(input, input._id)}
          onDelete={(input) => this.deleteItemout(input._id)}
        />
      </Fragment>
    )
  }
}
