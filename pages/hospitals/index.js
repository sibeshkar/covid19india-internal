import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import axios from 'axios'

import Layout from '../../components/layout'
import LocationTable from '../../components/LocationTable/Table'
import { generateHospitalTable } from '../../components/LocationTable/utils'

function HospitalTable(props) {
  const [fetched, setFetched] = useState(false)
  const [entries, setEntries] = useState([
    {
      hospital: 'RML',
      total: 56,
      underTreatment: 45,
      recovered: 26,
      deceased: 2,
    },
    {
      hospital: 'LNJP',
      total: 56,
      underTreatment: 45,
      recovered: 26,
      deceased: 2,
    },
  ])
  const [tableSchema, setTableSchema] = useState([
    {
      Header: 'Hospital Name',
      accessor: 'hospital',
    },
    {
      Header: 'Total Patients',
      accessor: 'total',
    },
    {
      Header: 'In Treatment',
      accessor: 'inTreatment',
    },
    {
      Header: 'Recovered',
      accessor: 'recovered',
    },
    {
      Header: 'Deceased',
      accessor: 'deceased',
    },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchRawData() {
      const response = await axios.get('/api/raw')
      if (response.data) {
        // setPatients(response.data.raw_data.filter(p => p.detectedstate))

        console.log(generateHospitalTable(response.data.data.rawPatientData))
        setEntries(generateHospitalTable(response.data.data.rawPatientData))
        setFetched(true)
        setLoading(false)
      } else {
        setError("Couldn't fetch patient data. Try again after sometime.")
        console.log(response)
      }
    }

    if (!fetched) {
      fetchRawData()
    }
  }, [fetched])

  return (
    <Layout>
      <div
        className="container"
        style={{ maxWidth: '100vw', marginTop: '40px' }}
      >
        {error ? <div className="alert alert-danger">{error}</div> : ''}
        {loading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ReactLoading type="spin" color="#000" />
          </div>
        ) : (
          <LocationTable
            entries={entries}
            schema={tableSchema}
            locationType="hospital"
          />
        )}
      </div>
    </Layout>
  )
}

export default HospitalTable