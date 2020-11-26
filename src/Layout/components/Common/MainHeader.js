import React from 'react'
import MainNavLinks from './MainNavLinks'

function MainHeader() {
    return (
    <header className="shadow-sm">
      <nav className="navbar navbar-expand navbar-light container-fluid container-md">
        <a className="navbar-brand font-weight-bold" href="/">DevConnect </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <MainNavLinks />
      </nav>
      </header>
    )
}

export default MainHeader
