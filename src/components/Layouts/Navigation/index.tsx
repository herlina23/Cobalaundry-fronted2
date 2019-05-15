import React, { Component } from "react"
import { Link, RouteComponentProps, withRouter } from "react-router-dom"
import { Header, Menu } from "semantic-ui-react"
import { Consumer } from "../../../App"
import routes from "../../../routes"

interface IState {
  activeItem: string
}

class Navigation extends Component<RouteComponentProps, IState> {
  public state: IState = {
    activeItem: "",
  }

  public isActive(route: IRoute) {
    return (
      this.state.activeItem === route.label ||
      this.props.location.pathname.includes(route.path)
    )
  }

  public changeActiveItem(name: string) {
    this.setState({ activeItem: name })
  }

  public renderItems(role: string) {
    return routes.map((route) => {
      return route.hide || !route.role.includes(role) ? null : (
        <Menu.Item
          key={route.label}
          active={this.isActive(route)}
          onClick={() => {
            this.changeActiveItem(route.label!)
            this.props.history.push(route.path)
          }}
        >
          <Header content={route.label} icon={route.icon} size="tiny" />
        </Menu.Item>
      )
    })
  }

  public render() {
    return (
      <Menu
        vertical
        // size="large"
        size="tiny"
        fixed="left"
        secondary
        pointing
        style={styles.container}
      >
        <Consumer>
          {(context) => this.renderItems(context.user ? context.user.role : "")}
        </Consumer>
      </Menu>
    )
  }
}

const styles = {
  container: {
    paddingTop: 50,
  },
}

export default withRouter(Navigation)
