import React from 'react'
import { useSelector } from 'react-redux'

// view
import Header from 'components/Header'

const HeaderContainer = () => {
  const categories = useSelector(state => state.categories)

  return (
    <Header categories={categories} />
  )
}

export default HeaderContainer
