import React from 'react'

import Landing from './components/Landing'
import Header from './components/Header'
import Footer from './components/Footer'

import './App.css'

// Component that will hold body of landing page
const App = () => {
  return (
    <div>
      <Header />
      <main className="App">
        <Landing />
        <Footer />
      </main>
    </div>
  );
}

export default App
