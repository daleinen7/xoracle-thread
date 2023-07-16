/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div>
        <head>
          <h1>Oracle Thread</h1>
          <nav>
            <ul
              style={{
                display: `flex`,
                justifyContent: `space-evenly`,
                listStyle: `none`,
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/createdeck">Create Deck</Link>
              </li>
            </ul>
          </nav>
        </head>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
