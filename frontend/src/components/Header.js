import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

class Header extends Component {
  render() {
    const { categories } = this.props

    return (
      <header className="header">
        <div className="header__inner">
          <Link className="logo" to="/">Readable</Link>
          <ul className="categories-list">
            {categories.map((category) => (
              <li className="categories-list__item" key={category.name}>
                <NavLink to={`/${category.path}`} activeStyle={{color: 'b40b43'}}>
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </header>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(Header)
