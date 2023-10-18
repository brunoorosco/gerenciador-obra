import React, { useState } from 'react'
import Select from 'react-select'
import { dogOptions } from './data'

// const IndicatorsContainer = (
//   props: IndicatorsContainerProps<DogOption, true>
// ) => {
//   return (
//     <div style={{ background: '#030303' }}>
//       <components.IndicatorsContainer {...props} />
//     </div>
//   )
// }

const MultiSelect = () => {
  const [warna, setWarna] = useState([])

  const handleWarnaChange = async (selected: any, selectaction: any) => {
    console.log(selected)
    const { action } = selectaction
    // console.log(`action ${action}`);
    if (action === 'clear') {
    } else if (action === 'select-option') {
    } else if (action === 'remove-value') {
      console.log('remove')
    }
    setWarna(selected)
  }

  return <Select options={dogOptions} />
}

export default MultiSelect
