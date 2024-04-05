import { Box } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import React from 'react'

const SalesGraph = ({ data2 }) => {
  const sumOfSales = data2.reduce((acc, item) => acc + item.price, 0);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      Overall Sales: {sumOfSales}
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={500}
        height={300}
      />
    </Box>
  )
}

export default SalesGraph