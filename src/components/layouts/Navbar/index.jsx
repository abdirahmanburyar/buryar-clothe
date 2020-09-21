import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../redux/actions/user/auth.user";
import "./header.style.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
    };
  }
  handleLogout = () => {
    this.props
      .logout()
      .then(() => this.props.history.push("/"))
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    window.addEventListener("scroll", () => {
      const isTop = window.scrollY < 200;
      console.log(window.scrollY);
      if (isTop !== true) {
        this.setState({ scrolled: true });
      } else {
        this.setState({ scrolled: false });
      }
    });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll");
  }
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          duration={1000}
          fixed={this.state.scrolled ? "top" : ""}
        >
          <Link to="/" className="navbar-brand">
            Buryar
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Nav>
              {this.props.isAuthenticated ? (
                <li className="nav-item">
                  <NavLink
                    to="#"
                    onClick={this.handleLogout}
                    className="nav-link"
                  >
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">
                      SingIn
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">
                      SingUp
                    </NavLink>
                  </li>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Header);
