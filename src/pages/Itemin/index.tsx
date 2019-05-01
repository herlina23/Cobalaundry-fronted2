import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { IteminService } from "../../services/IteminService"

interface IState {
  itemins: IItemin[]
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
    loading: false,
  }

  public iteminService = new IteminService()

  public componentDidMount() {
    this.getItemin()
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

  public render() {
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
