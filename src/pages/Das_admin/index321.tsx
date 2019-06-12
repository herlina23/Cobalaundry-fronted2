import React, { Component, Fragment } from "react"
import { Card, Icon, Table } from "semantic-ui-react"
import { MemberService } from "../../services/MemberService"
import { TransactionService } from "../../services/TransactionService"

interface IState {
  trans: ITransaction[]
  mem: IMember[]
}

export default class Dasadmin321 extends Component<{}, IState> {
  public state: IState = {
    trans: [],
    mem: [],
  }

  public componentDidMount() {
    const transService = new TransactionService()
    const memService = new MemberService()
    transService.get().then((trans) => this.setState({ trans }))
    memService.get().then((mem) => this.setState({ mem }))
  }

  public render() {
    return (
      <div>
        <Card.Group>
          <Card
            link
            icon="pencil"
            color="red"
            header="Jumlah Transaksi"
            meta="Total Keseluruhan Transaksi"
            description={this.state.trans.length}
          />
          <Card
            link
            icon="pencil"
            color="purple"
            header="Jumlah Member"
            meta="Total Keseluruhan Pelanggan"
            description={this.state.mem.length}
          />
          <Card
            link
            icon="pencil"
            color="red"
            header="Jumlah Transaksi"
            meta="Total Keseluruhan Transaksi"
            description={this.state.trans.length}
          />
          <Card
            link
            icon="pencil"
            color="red"
            header="Jumlah Transaksi"
            meta="Total Keseluruhan Transaksi"
            description={this.state.trans.length}
          />
          <Card
            link
            icon="pencil"
            color="red"
            header="Jumlah Transaksi"
            meta="Total Keseluruhan Transaksi"
            description={this.state.trans.length}
          />
        </Card.Group>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Tanggal</Table.HeaderCell>
              <Table.HeaderCell>Pemasukan</Table.HeaderCell>
              <Table.HeaderCell>Pengeluaran</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>2019-5-8</Table.Cell>
              <Table.Cell>100000</Table.Cell>
              <Table.Cell>50000</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}
