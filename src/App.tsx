import { useState } from "react";
import Select from "./components/Select"
import { SelectOption } from './types/SelectOption'

function App() {
  const fruits = [
    { label: "Apple", value: "APL" },
    { label: "Banana", value: "BNN" },
    { label: "Grapes", value: "GPR" },
    { label: "Oranges", value: "ORG" }
  ]

  const colours = [
    { label: "Red", value: "red" },
    { label: "Orange", value: "org" },
    { label: "Green", value: "grn" },
    { label: "Blue", value: "ble" }
  ]

  // This is only OK because we know that there are options...
  const [valueSingle, setValueSingle] = useState<SelectOption | undefined>(fruits[0])
  const [valueMultiple, setValueMultiple] = useState<SelectOption[]>(colours)

  const onChangeHandlerSingle = (selectedOption: SelectOption | undefined) => {
    setValueSingle(selectedOption)
  }

  const onChangeHandlerMultiple = (selectedOption: SelectOption[] | undefined) => {
    setValueMultiple(selectedOption)
  }



  return (
    <div>
      <Select muliple={false} onChange={onChangeHandlerSingle} options={fruits} value={valueSingle} />
      <br/>
      <Select muliple={true} onChange={onChangeHandlerMultiple} options={colours} value={valueMultiple} />
    </div>
  )
}

export default App
