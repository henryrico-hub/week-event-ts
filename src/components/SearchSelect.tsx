import AsyncSelect from 'react-select/async';
import ValueType, { components, IndicatorsContainerProps} from 'react-select'


import { EventType } from '../types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type OptionType = {
  value: string;
  label: string;
}

type dataEProps = {
  dataE: EventType[]
}

export default function SearchSelect({ dataE } : dataEProps ) {
  
  const ArrayOptions : OptionType[] = dataE.map(eve => ({
    value: eve.url,
    label: eve.name
  }))
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(ArrayOptions[0]);

  const navigate = useNavigate();

  
  const filterColors = (inputValue: string) => {
    return ArrayOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  
  const promiseOptions = (inputValue: string) =>
    new Promise<OptionType[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });
  
  const IndicatorsContainer = (
    props: IndicatorsContainerProps<OptionType, true>
  ) => {
    return (
      <div style={{ background: '#f97316',  color: '#f97316'}}>
        <components.IndicatorsContainer {...props} />
      </div>
    );
  };

    
  const handleSelect = (valor: ValueType<unknown>) => {
    const option = valor as OptionType;
    setSelectedOption(valor)
    if (option) {
      navigate(`/evento/${option.value}`);
    }
  };
  

  return (
    <>
      <AsyncSelect
        className='w-11/12'
        cacheOptions 
        defaultOptions 
        loadOptions={promiseOptions} 
        components={{ IndicatorsContainer }}
        onChange={valor => handleSelect(valor)}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: '#ea9b63',
            primary75: '#ea9b63'
            
          },
        })}
        />
    </>
  )
}
