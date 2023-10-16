import React from 'react'
import { Button, Select, type SelectOption } from '@/shared/uikit'

const o = [
  { label: 'one', value: 'one' },
  { label: 'two', value: 'two' },
  { label: 'Dthree', value: 'one' },
  { label: 'Dthree', value: 'one' },
  { label: 'Dthree', value: 'one' },
  { label: 'Dthree', value: 'one' },
  { label: 'Dthree', value: 'one' },
  { label: 'Dthree', value: 'one' },
  { label: 'Dthree', value: 'one' }
]

function App() {
  const [input, setInput] = React.useState<SelectOption[]>([])

  return (
    <div className="wrapper">
      <Button alertType="danger" styleType="outlined">
        I am button
      </Button>
      <Select
        onChange={(newValue) => {
          if (!!newValue) setInput(newValue)
        }}
        options={o}
        value={input}
        multiple={true}
      ></Select>
    </div>
  )
}

export default App
