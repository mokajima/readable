import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

function Header(props) {
  console.log(props)
  return (
    <header className="header">
      <div className="header__inner">
        <Link className="logo" to="/">Readable</Link>
        <ul className="categories-list">
          {props.categories.map((category) => (
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

Header.propTypes = {
  categories: PropTypes.array.isRequired
}

export default Header
