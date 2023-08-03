import React from 'react'
// rafce short cut react arrow function compontnet and export

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div>
                    <a href="#" className = "navbar-brand">
                        Employee Management System
                    </a>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent;