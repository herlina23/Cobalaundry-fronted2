import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { IteminService } from "../../services/IteminService"
import { ItemService } from "../../services/ItemService"

interface IState {
  itemins: IItemin[]
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
  {
    name: "price",
    label: "Price",
    validations: ["required", "numeric"],
  },
]

export default class Itemins extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    itemins: [],
    items: [],
    loading: false,
  }

  public iteminService = new IteminService()
  public itemService = new ItemService()

  public componentDidMount() {
    this.getItemin()
    this.getItem()
  }

  public getItem() {
    this.itemService.get().then((items) => this.setState({ items }))
  }

  public getItemin() {
    this.setState({ loading: true })
    this.iteminService
      .get()
      .then((itemins) => this.setState({ itemins }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createItemin(input: IItemin) {
    this.setState({ loading: true })
    this.iteminService
      .create(input)
      .then(() => this.getItemin())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateItemin(input: IItemin, id: string) {
    this.setState({ loading: true })
    this.iteminService
      .update(input, id)
      .then(() => this.getItemin())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteItemin(id: string) {
    this.setState({ loading: true })
    this.iteminService
      .delete(id)
      .then(() => this.getItemin())
      .catch((error) => this.setState({ error, loading: false }))
  }
  public setOptionsData() {
    fields[0].optionData!.data = this.state.items
  }
  public render() {
    this.setOptionsData()
    return (
      <Fragment>
        <Header content="Item In" subheader="List of Item In data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IItemin>
          data={this.state.itemins}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createItemin(input)}
          onUpdate={(input) => this.updateItemin(input, input._id)}
          onDelete={(input) => this.deleteItemin(input._id)}
        />
      </Fragment>
    )
  }
}
