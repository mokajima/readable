import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

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

Header.propTypes = {
  categories: PropTypes.array.isRequired
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(Header)
