import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema
} from '../config/seo'

/**
 * Component to inject structured data (Schema.org) into pages
 * This helps search engines understand your business better
 */
const StructuredData = ({ schemas = [] }) => {
  // Always include core schemas
  const coreSchemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateWebsiteSchema()
  ]

  const allSchemas = [...coreSchemas, ...schemas]

  return (
    <Helmet>
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export default StructuredData

