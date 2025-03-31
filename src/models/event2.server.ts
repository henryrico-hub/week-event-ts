/// 
// -Consulta eventos apartir de la fecha actual 

export async function getEventsParams(url : string) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
  const resultado = await respuesta.json()

  return resultado
}
export async function getCategoryEvents(category_url: string ) {
  /* const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/events?filters[category][slug][$eq]=${category_url}&[populate][category][fields][0]=name&pagination[page]=${currentPage}&pagination[pageSize]=${itemsPerPage}`{
      headers : {
        'Authorization' : `Bearer ${import.meta.env.STRIPE_TOKEN}`
      }
    }); */
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/events?filters[category][slug][$eq]=${category_url}&[populate][category][fields][0]=name&[populate][img_main][fields][0]=url`);
  const resultado = await respuesta.json()

  return resultado
}
