import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Profile from './components/Profile'
import Feed from './components/Feed'
import Footer from './components/Footer'

const App = () => {
  return (
    <Container>
      <Header />
      <Profile />
      <Feed />
      <Footer />
    </Container>
  )
}

export default App

const Container = styled.div`
  width: 800px;
  margin: auto;
  padding: 20px;
`
