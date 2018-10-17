import React from 'react'

import Landing from './components/Landing'
import Header from './components/Header'
import Footer from './components/Footer'

import './App.css'

// Component that will hold body of landing page
const Layout = ({ children }) =>
  <div>
    <Header />
    <main>
      { children }
    </main>
    <Footer />
  </div>

const App = () =>
  <Layout>
    <Landing />
  </Layout>

export default App
