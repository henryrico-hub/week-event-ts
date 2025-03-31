import { Select } from 'antd';
import { ArticleType, EventType } from '../types';
import { useNavigate } from 'react-router-dom';

type OptionType = {
  value: string;
  label: string;
}

type dataEProps = {
  dataE: EventType[] | ArticleType[]
  setMobileMenuOpen : React.Dispatch<React.SetStateAction<boolean>>
  style : string
  type_props : string
}

export default function SelectSearch ({ dataE, setMobileMenuOpen, style, type_props } : dataEProps ) {
  const navigate = useNavigate();
  
  const ArrayOptions : OptionType[] = dataE?.map(eve => ({
    value: eve.url,
    label: eve.name
  }))

  const onChange = (value: string) => {
    if(type_props === 'Evento') {
      if (value) {
        navigate(`/evento/${value}`);
        setMobileMenuOpen(false)
      }

    } else {
      if (value) {
        navigate(`/comunidad/post/${value}`);
        setMobileMenuOpen(false)
      }
    }
    //console.log(`selected ${value}`);
  };
  
  /* const onSearch = (value: string) => {
    console.log('search:', value);
  }; */

  return (
    <>
      <Select
        className={`${style}`}
        showSearch
        placeholder={`Buscar ${type_props}`}
        optionFilterProp="label"
        onChange={onChange}
        /* onSearch={onSearch} */
        options={ArrayOptions}
      />
    </>
  )
}