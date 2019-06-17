import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { ItemService } from "../../services/ItemService"
import { Link } from "react-router-dom";

interface IState {
  items: IItem[]
  loading: boolean
  error?: Error
}

const fields: IField[] = [
  {
    name: "item_name",
    label: "Nama Barang",
    validations: ["required"],
  },
  {
    name: "unit",
    label: "Satuan",
    validations: ["required"],
  },
  {
    name: "stock",
    label: "Stok",
    validations: ["required", "numeric"],
  },
]

export default class Items extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    items: [],
    loading: false,
  }

  public itemService = new ItemService()

  public componentDidMount() {
    this.getItem()
  }

  public getItem() {
    this.setState({ loading: true })
    this.itemService
      .get()
      .then((items) => this.setState({ items }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createItem(input: IItem) {
    this.setState({ loading: true })
    this.itemService
      .create(input)
      .then(() => this.getItem())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateItem(input: IItem, id: string) {
    this.setState({ loading: true })
    this.itemService
      .update(input, id)
      .then(() => this.getItem())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteItem(id: string) {
    this.setState({ loading: true })
    this.itemService
      .delete(id)
      .then(() => this.getItem())
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    
    return (
      <Fragment>
        <Header content="Item" subheader="List of Item data" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IItem>
          data={this.state.items}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createItem(input)}
          onUpdate={(input) => this.updateItem(input, input._id)}
          onDelete={(input) => this.deleteItem(input._id)}
        />
      </Fragment>
    )
  }
}
