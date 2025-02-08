import Header from "../Header"

import "./Template.css"

function Template({ children }) {
  return (
    <div className="container-fluid px-0">
      <Header />
      <div id="template-overhaul-container">
        {children}
      </div>
    </div>
  )
}

export default Template
