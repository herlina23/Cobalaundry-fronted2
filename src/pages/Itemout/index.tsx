import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { ItemoutService } from "../../services/ItemoutService"
import { ItemService } from "../../services/ItemService"

interface IState {
  itemouts: IItemout[]
  items: IItem[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "item",
    label: "Item Name",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "item_name",
      valueKey: "_id",
    },
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
    items: [],
    loading: false,
  }

  public itemoutService = new ItemoutService()
  public itemService = new ItemService()

  public componentDidMount() {
    this.getItemout()
    this.getItem()
  }

  public getItemout() {
    this.setState({ loading: true })
    this.itemoutService
      .get()
      .then((itemouts) => this.setState({ itemouts }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public getItem() {
    // this.setState({ loading: true })
    this.itemService.get().then((items) => this.setState({ items }))
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
  public setOptionsData() {
    fields[0].optionData!.data = this.state.items
  }

  public render() {
    this.setOptionsData()
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
