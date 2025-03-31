import img_lg from '../assets/images/news-800x500-3.jpg'
import img_sm from '../assets/images/news-110x110-1.jpg'
import img from '../assets/images/news-700x435-2.jpg'
import img2 from '../assets/images/news-700x435-3.jpg'
import ads_img from '../assets/images/ads-728x90.png'
import perfil_img from '../assets/images/user.jpg'
import { EventType } from '../types'
import { useState, useEffect } from 'react'
import { getEventsDesc, getlatestEvent } from '../models/event.server'
import { formatearFecha } from '../utils/helpers'

export default function ContentSideBar() {

  const [latestEvent, setlatestEvent] = useState<EventType[]>([]); // Initialize state with an empty array

    useEffect(() => {
        async function fetchData() {
          try {
            const events = await getlatestEvent();
            setlatestEvent(events.data);
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        }
    
        fetchData();
    }, [setlatestEvent]);
    console.log("Latest ",latestEvent);

  return (
    <>
    {/* <!-- News With Sidebar Start --> */}
    <div className="container-fluid">
      <div className="container-md">
        <div className="row">
          <div className="col-lg-8">
            <div className="col-12">
              <div className="section-title">
                <h4 className="m-0 text-uppercase font-weight-bold">Latest News</h4>
                <a className="text-secondary font-weight-medium text-decoration-none" href="">View All</a>
              </div>
            </div>
            <div className="row">            
              <div className="col-lg-6">
                <div className="column">
                  
                  { latestEvent.slice(0,9).map( (eve, key) => (
                    <div key={key} className="col-lg-12">
                      <div className="position-relative mb-3">
                        <img className="img-fluid w-100" src={`${import.meta.env.VITE_API_URL_SHORT}${eve.img_main.formats.thumbnail.url}`} style={{objectFit: 'cover'}}/>
                        <div className="bg-white border border-top-0 p-4">
                          <div className="mb-2">
                            <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                href="">{eve.category.name}</a>
                            <a className="text-body" href=""><small>{formatearFecha(eve.date_event)}</small></a>
                          </div>
                          <a className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="">{eve.name}</a>
                          <p className="descript-resume m-0">{eve.description1}</p>
                        </div>
                        <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                          <div className="d-flex align-items-center">
                            <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                            <small>John Doe</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                            <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}
                  
                  <div className="col-lg-12">
                      <div className="position-relative mb-3">
                          <img className="img-fluid w-100" src={img2} style={{objectFit: 'cover'}}/>
                          <div className="bg-white border border-top-0 p-4">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                      href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                              <p className="m-0">Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna
                                  rebum clita rebum dolor stet amet justo</p>
                          </div>
                          <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                              <div className="d-flex align-items-center">
                                  <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                                  <small>John Doe</small>
                              </div>
                              <div className="d-flex align-items-center">
                                  <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                                  <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                        <img className="img-fluid" src={img_sm} alt=""/>
                        <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                            <div className="mb-2">
                                <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                            </div>
                            <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                        </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                        <img className="img-fluid" src={img_sm} alt=""/>
                        <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                            <div className="mb-2">
                                <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                            </div>
                            <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                        </div>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <a href=""><img className="img-fluid w-100" src={ads_img} alt=""/></a>
                  </div>
                  <div className="col-lg-12">
                    <div className="position-relative mb-3">
                      <img className="img-fluid w-100" src={img2} style={{objectFit: 'cover'}}/>
                      <div className="bg-white border border-top-0 p-4">
                        <div className="mb-2">
                          <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                            href="">Business</a>
                          <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                        </div>
                        <a className="h4 d-block mb-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                      </div>
                      <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                        <div className="d-flex align-items-center">
                          <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                          <small>John Doe</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                          <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="position-relative mb-3">
                          <img className="img-fluid w-100" src={img} style={{objectFit: 'cover'}}/>
                          <div className="bg-white border border-top-0 p-4">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                      href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h4 d-block mb-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          </div>
                          <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                              <div className="d-flex align-items-center">
                                  <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                                  <small>John Doe</small>
                              </div>
                              <div className="d-flex align-items-center">
                                  <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                                  <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                          <img className="img-fluid" src={img_sm} alt=""/>
                          <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          </div>
                      </div>
                      <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                          <img className="img-fluid" src={img_sm} alt=""/>
                          <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                          <img className="img-fluid" src={img_sm} alt=""/>
                          <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          </div>
                      </div>
                      <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                          <img className="img-fluid" src={img_sm} alt=""/>
                          <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                      <a href=""><img className="img-fluid w-100" src={ads_img} alt=""/></a>
                  </div>
                  <div className="col-lg-12">
                    <div className="row news-lg mx-0 mb-3">
                      <div className="col-md-6 h-100 px-0">
                          <img className="img-fluid h-100" src={img} style={{objectFit: 'cover'}}/>
                      </div>
                      <div className="col-md-6 d-flex flex-column border bg-white h-100 px-0">
                        <div className="mt-auto p-4">
                          <div className="mb-2">
                            <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2" href="">Business</a>
                            <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                          </div>
                          <a className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          <p className="m-0">Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna
                              rebum clita rebum dolor stet amet justo</p>
                        </div>
                        <div className="d-flex justify-content-between bg-white border-top mt-auto p-4">
                          <div className="d-flex align-items-center">
                            <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                            <small>John Doe</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                            <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                      <img className="img-fluid" src={img_sm} alt=""/>
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                          <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                        </div>
                          <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                      <img className="img-fluid" src={img_sm} alt=""/>
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                          <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                        </div>
                        <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                      <img className="img-fluid" src={img_sm} alt=""/>
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                          <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                        </div>
                        <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                      <img className="img-fluid" src={img_sm} alt=""/>
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                          <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                        </div>
                        <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                
              </div>
              <div className="col-lg-6">
                <div className="column">
                  
                  { latestEvent.slice(9).map( (eve, key) => (
                    <div key={key} className="col-lg-12">
                      <div className="position-relative mb-3">
                        <img className="img-fluid w-100" src={`${import.meta.env.VITE_API_URL_SHORT}${eve.img_main.url}`} style={{objectFit: 'cover'}}/>
                        <div className="bg-white border border-top-0 p-4">
                          <div className="mb-2">
                            <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                href="">{eve.category.name}</a>
                            <a className="text-body" href=""><small>{formatearFecha(eve.date_event)}</small></a>
                          </div>
                          <a className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="">{eve.name}</a>
                          <p className="descript-resume m-0">{eve.description1}</p>
                        </div>
                        <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                          <div className="d-flex align-items-center">
                            <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                            <small>John Doe</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                            <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}
                  <div className="col-lg-12">
                      <div className="position-relative mb-3">
                          <img className="img-fluid w-100" src={img2} style={{objectFit: 'cover'}}/>
                          <div className="bg-white border border-top-0 p-4">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                      href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                              <p className="m-0">Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna
                                  rebum clita rebum dolor stet amet justo</p>
                          </div>
                          <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                              <div className="d-flex align-items-center">
                                  <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                                  <small>John Doe</small>
                              </div>
                              <div className="d-flex align-items-center">
                                  <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                                  <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="position-relative mb-3">
                          <img className="img-fluid w-100" src={img2} style={{objectFit: 'cover'}}/>
                          <div className="bg-white border border-top-0 p-4">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                      href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                              <p className="m-0">Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna
                                  rebum clita rebum dolor stet amet justo</p>
                          </div>
                          <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                              <div className="d-flex align-items-center">
                                  <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                                  <small>John Doe</small>
                              </div>
                              <div className="d-flex align-items-center">
                                  <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                                  <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                        <img className="img-fluid" src={img_sm} alt=""/>
                        <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                            <div className="mb-2">
                                <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                            </div>
                            <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                        </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                        <img className="img-fluid" src={img_sm} alt=""/>
                        <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                            <div className="mb-2">
                                <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                            </div>
                            <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                        </div>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <a href=""><img className="img-fluid w-100" src={ads_img} alt=""/></a>
                  </div>
                  <div className="col-lg-12">
                    <div className="position-relative mb-3">
                      <img className="img-fluid w-100" src={img2} style={{objectFit: 'cover'}}/>
                      <div className="bg-white border border-top-0 p-4">
                        <div className="mb-2">
                          <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                            href="">Business</a>
                          <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                        </div>
                        <a className="h4 d-block mb-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                      </div>
                      <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                        <div className="d-flex align-items-center">
                          <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                          <small>John Doe</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                          <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="position-relative mb-3">
                          <img className="img-fluid w-100" src={img} style={{objectFit: 'cover'}}/>
                          <div className="bg-white border border-top-0 p-4">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                                      href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h4 d-block mb-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          </div>
                          <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
                              <div className="d-flex align-items-center">
                                  <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                                  <small>John Doe</small>
                              </div>
                              <div className="d-flex align-items-center">
                                  <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                                  <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                          <img className="img-fluid" src={img_sm} alt=""/>
                          <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          </div>
                      </div>
                      <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                          <img className="img-fluid" src={img_sm} alt=""/>
                          <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                          <img className="img-fluid" src={img_sm} alt=""/>
                          <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          </div>
                      </div>
                      <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                          <img className="img-fluid" src={img_sm} alt=""/>
                          <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                              <div className="mb-2">
                                  <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                                  <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                              </div>
                              <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                      <a href=""><img className="img-fluid w-100" src={ads_img} alt=""/></a>
                  </div>
                  <div className="col-lg-12">
                    <div className="row news-lg mx-0 mb-3">
                      <div className="col-md-6 h-100 px-0">
                          <img className="img-fluid h-100" src={img} style={{objectFit: 'cover'}}/>
                      </div>
                      <div className="col-md-6 d-flex flex-column border bg-white h-100 px-0">
                        <div className="mt-auto p-4">
                          <div className="mb-2">
                            <a className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2" href="">Business</a>
                            <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                          </div>
                          <a className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                          <p className="m-0">Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna
                              rebum clita rebum dolor stet amet justo</p>
                        </div>
                        <div className="d-flex justify-content-between bg-white border-top mt-auto p-4">
                          <div className="d-flex align-items-center">
                            <img className="rounded-circle mr-2" src={perfil_img} width="25" height="25" alt=""/>
                            <small>John Doe</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <small className="ml-3"><i className="far fa-eye mr-2"></i>12345</small>
                            <small className="ml-3"><i className="far fa-comment mr-2"></i>123</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                      <img className="img-fluid" src={img_sm} alt=""/>
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                          <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                        </div>
                          <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                      <img className="img-fluid" src={img_sm} alt=""/>
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                          <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                        </div>
                        <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                      <img className="img-fluid" src={img_sm} alt=""/>
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                          <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                        </div>
                        <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                      <img className="img-fluid" src={img_sm} alt=""/>
                      <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                        <div className="mb-2">
                          <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                          <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                        </div>
                        <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                
              </div>
              
            </div>

          </div>
        
          <div className="col-lg-4">

            {/* <!-- Social Follow Start --> */}
            <div className="mb-3">
              <div className="section-title mb-0">
                <h4 className="m-0 text-uppercase font-weight-bold">Follow Us</h4>
              </div>
              <div className="bg-white border border-top-0 p-3">
                <a href="" className="d-block w-100 text-white text-decoration-none mb-3" style={{background: '#39569E'}}>
                    <i className="fab fa-facebook-f text-center py-4 mr-3" style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                    <span className="font-weight-medium">12,345 Fans</span>
                </a>
                <a href="" className="d-block w-100 text-white text-decoration-none mb-3" style={{background: '#52AAF4'}}>
                    <i className="fab fa-twitter text-center py-4 mr-3"style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                    <span className="font-weight-medium">12,345 Followers</span>
                </a>
                <a href="" className="d-block w-100 text-white text-decoration-none mb-3" style={{background: '#0185AE'}}>
                    <i className="fab fa-linkedin-in text-center py-4 mr-3"style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                    <span className="font-weight-medium">12,345 Connects</span>
                </a>
                <a href="" className="d-block w-100 text-white text-decoration-none mb-3" style={{background: '#C8359D'}}>
                    <i className="fab fa-instagram text-center py-4 mr-3"style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                    <span className="font-weight-medium">12,345 Followers</span>
                </a>
                <a href="" className="d-block w-100 text-white text-decoration-none mb-3" style={{background: '#DC472E'}}>
                    <i className="fab fa-youtube text-center py-4 mr-3"style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                    <span className="font-weight-medium">12,345 Subscribers</span>
                </a>
                <a href="" className="d-block w-100 text-white text-decoration-none" style={{background: '#055570'}}>
                    <i className="fab fa-vimeo-v text-center py-4 mr-3"style={{width: '65px', background: 'rgba(0, 0, 0, .2)'}}></i>
                    <span className="font-weight-medium">12,345 Followers</span>
                </a>
              </div>
            </div>
            {/* <!-- Social Follow End --> */}

            {/* <!-- Ads Start --> */}
            <div className="mb-3">
              <div className="section-title mb-0">
                <h4 className="m-0 text-uppercase font-weight-bold">Advertisement</h4>
              </div>
              <div className="bg-white text-center border border-top-0 p-3">
                <a href=""><img className="img-fluid" src={img_lg} alt=""/></a>
              </div>
            </div>
            {/* <!-- Ads End --> */}

            {/* <!-- Popular News Start --> */}
            <div className="mb-3">
              <div className="section-title mb-0">
                <h4 className="m-0 text-uppercase font-weight-bold">Tranding News</h4>
              </div>
              <div className="bg-white border border-top-0 p-3">
                <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                  <img className="img-fluid" src={img_sm} alt=""/>
                  <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                    <div className="mb-2">
                      <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                      <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                    </div>
                    <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                  <img className="img-fluid" src={img_sm} alt=""/>
                  <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                    <div className="mb-2">
                      <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                      <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                    </div>
                    <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                  <img className="img-fluid" src={img_sm} alt=""/>
                  <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                    <div className="mb-2">
                      <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                      <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                    </div>
                    <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                  <img className="img-fluid" src={img_sm} alt=""/>
                  <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                    <div className="mb-2">
                      <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                      <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                    </div>
                    <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-white mb-3" style={{height: '110px'}}>
                  <img className="img-fluid" src={img_sm} alt=""/>
                  <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
                    <div className="mb-2">
                      <a className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2" href="">Business</a>
                      <a className="text-body" href=""><small>Jan 01, 2045</small></a>
                    </div>
                      <a className="h6 m-0 text-secondary text-uppercase font-weight-bold" href="">Lorem ipsum dolor sit amet elit...</a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Popular News End --> */}

              {/* <!-- Newsletter Start --> */}
            <div className="mb-3">
              <div className="section-title mb-0">
                <h4 className="m-0 text-uppercase font-weight-bold">Newsletter</h4>
              </div>
              <div className="bg-white text-center border border-top-0 p-3">
                <p>Aliqu justo et labore at eirmod justo sea erat diam dolor diam vero kasd</p>
                <div className="input-group mb-2" style={{width: '100%'}}>
                  <input type="text" className="form-control form-control-lg" placeholder="Your Email"/>
                  <div className="input-group-append">
                    <button className="btn btn-primary font-weight-bold px-3">Sign Up</button>
                  </div>
                </div>
                <small>Lorem ipsum dolor sit amet elit</small>
              </div>
            </div>
            {/* <!-- Newsletter End --> */}

            {/* <!-- Tags Start --> */}
            <div className="mb-3">
              <div className="section-title mb-0">
                <h4 className="m-0 text-uppercase font-weight-bold">Tags</h4>
              </div>
              <div className="bg-white border border-top-0 p-3">
                <div className="d-flex flex-wrap m-n1">
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Politics</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Business</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Corporate</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Business</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Health</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Education</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Science</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Business</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Foods</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Travel</a>
                </div>
              </div>
            </div>
            {/* <!-- Tags End --> */}
          </div>
        </div>
      </div>
    </div>
    {/* <!-- News With Sidebar End --> */}
    </>
  )
}
