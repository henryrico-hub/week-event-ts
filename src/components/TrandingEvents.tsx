import { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel'
import { getEventsDesc } from '../models/event.server';
import { EventType } from '../types';
import { Link } from 'react-router-dom';
import { formatearFecha } from '../utils/helpers';
import { Skeleton } from 'antd';
import logosm from '../assets/images/logo1.jpeg'

export default function TrandingEvents() {

  const [loading, setLoading] = useState(false)

  const [eventDescArray, setEventDescArray] = useState<EventType[]>([]); // Initialize state with an empty array
    
  useEffect(() => {
    setLoading(true)
    const fetchData = async() => {
      try {
        const events = await getEventsDesc();
        setEventDescArray(events.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }
    }

    fetchData();
  }, [setEventDescArray]);

  const options = {
    items: 1,
    nav: true,
    dots: false,
    loop: true,
    autoplay: true
  }
  /* console.log(eventDescArray); */
  

  return (
    <>
      {/* <!-- Breaking News Start --> */}
    <div className="notshow-mob container-fluid mt-2 mb-3 pt-3">
      <div className="container-md">
        {loading ?
          <Skeleton.Button size={'large'} block={true} style={{ marginBottom: '.5rem' }}/>
        :
          <div className="row align-items-center">
            <div className="col-12">
              <div className="box-shadow-edit d-flex justify-content-between">
                <div className="section-title-ws border-right-0 mb-0" style={{width: '180px'}}>
                  <h4 className="m-0 text-uppercase font-weight-bold">Tranding</h4>
                </div>
                <OwlCarousel className='tranding-carousel position-relative d-inline-flex align-items-center bg-white border border-left-0' style={{width: 'calc(100% - 170px)', paddingRight:'90px'}} {...options}>
                  {eventDescArray?.map( (event, key) => (
                    <div key={key} className="text-truncate">
                      <Link className="text-black text-uppercase font-weight-semi-bold" 
                        to={`/evento/${event.url}`}>{`( ${formatearFecha(event.date_event)})  ${event.name} : ${event.description1}`}</Link>
                    </div>
                  ))}
                </OwlCarousel>
                
              </div>
            </div>
          </div>
        }
      </div>
    </div>
    {/* <!-- Breaking News End --> */}
    </>
  )
}
