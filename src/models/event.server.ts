///
// -Consulta eventos apartir de la fecha actual

export async function getEventsParams(url: string) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
  const resultado = await respuesta.json();

  return resultado;
}

export async function putClapsArticle(id: string, dataClap: number) {
  const respuesta = await fetch(
    `${import.meta.env.VITE_API_URL}/article-scs/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ claps: dataClap }),
    }
  );
  const resultado = await respuesta.json();

  return resultado;
}

// --------------------- --------------------- --------------------- ---------------------
export async function getEvents() {
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/events?fields[0]=name&fields[1]=date_event&populate[category][fields][0]=name&populate[img_main][fields][0]=url`
  );
  const resultado = await respuesta.json();

  return resultado;
}
export async function getCategoryEvents(category_url: string) {
  /* const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/events?filters[category][slug][$eq]=${category_url}&[populate][category][fields][0]=name&pagination[page]=${currentPage}&pagination[pageSize]=${itemsPerPage}`{
      headers : {
        'Authorization' : `Bearer ${import.meta.env.STRIPE_TOKEN}`
      }
    }); */
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/events?filters[category][slug][$eq]=${category_url}&[populate][category][fields][0]=name&[populate][img_main][fields][0]=url`
  );
  const resultado = await respuesta.json();

  return resultado;
}

export async function getEventsDesc() {
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/events?fields[0]=name&fields[1]=date_event&fields[2]=description1&fields[3]=url`
  );
  const resultado = await respuesta.json();

  return resultado;
}

export async function getEventsCurrents(date: string) {
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/events?fields[0]=name&fields[1]=date_event&fields[2]=url&populate[category][fields][0]=name&populate[img_main][fields][0]=url&filters[date_event][$gt]=2025-03-04&sort[0]=date_event:asc&pagination[page]=1&pagination[pageSize]=9`
  );
  const resultado = await respuesta.json();

  return resultado;
}

export async function getEventsLastOne() {
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/events?fields[0]=name&fields[1]=date_event&fields[2]=url&populate[category][fields][0]=name&populate[img_main][fields][0]=url&filters[date_event][$gt]=2024-10-13&sort[0]=date_event:desc&pagination[page]=1&pagination[pageSize]=9`
  );
  const resultado = await respuesta.json();

  return resultado;
}

export async function getAllEvents() {
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/events?fields[0]=name&fields[1]=url&populate[img_main][fields]*`
  );
  const resultado = await respuesta.json();

  return resultado;
}
export async function getlatestEvent() {
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/events?sort[0]=createdAt&filters[createdAt][$gt]=2024-09-13&fields[0]=name&fields[1]=description1&fields[2]=date_event&fields[4]=url&fields[5]=claps&populate[category][fields][0]=name&populate[img_main][fields][0]=url&populate[img_desc1][fields][0]=url&populate[author_sc][populate][0]=avatar&populate[state][fields]*`
  );
  /* const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/events?sort[0]=createdAt&filters[createdAt][$gt]=2024-09-13&fields[0]=name&fields[1]=description1&fields[2]=date_event&populate[category][fields][0]=name&populate[img_main][fields][0]=url`{
      headers : {
        'Authorization' : `Bearer ${import.meta.env.STRIPE_TOKEN}`
      }
    }); */
  const resultado = await respuesta.json();

  return resultado;
}
export async function getPublishAtEvent() {
  const respuesta = await fetch(
    `${import.meta.env.VITE_API_URL}/events?status=publishedAt`
  );
  /* const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/events?sort[0]=createdAt&filters[createdAt][$gt]=2024-09-13&fields[0]=name&fields[1]=description1&fields[2]=date_event&populate[category][fields][0]=name&populate[img_main][fields][0]=url`{
      headers : {
        'Authorization' : `Bearer ${import.meta.env.STRIPE_TOKEN}`
      }
    }); */
  const resultado = await respuesta.json();

  return resultado;
}
export async function getDraftEvent() {
  const respuesta = await fetch(
    `${import.meta.env.VITE_API_URL}/events?status=draft`
  );
  /* const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/events?sort[0]=createdAt&filters[createdAt][$gt]=2024-09-13&fields[0]=name&fields[1]=description1&fields[2]=date_event&populate[category][fields][0]=name&populate[img_main][fields][0]=url`{
      headers : {
        'Authorization' : `Bearer ${import.meta.env.STRIPE_TOKEN}`
      }
    }); */
  const resultado = await respuesta.json();

  return resultado;
}
export async function getSingleEvent(url: string) {
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/events?filters[url][$eq]=${url}&fields[0]=name&fields[1]=description1&fields[2]=date_event&fields[3]=author_desc&fields[4]=distance_category&fields[5]=city_state&fields[6]=price&fields[7]=registration_prices&fields[8]=claps&fields[9]=kit_delivery&fields[10]=services&populate[category][fields][0]=name&populate[img_main][fields]*&populate[img_desc1][fields]*&populate[img_desc2][fields]*&populate[state][fields]*`
  );
  const resultado = await respuesta.json();

  return resultado;
}
export async function getCalendar() {
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/events?fields[0]=name&fields[1]=description1&fields[2]=date_event&fields[3]=author_desc&fields[4]=distance_category&fields[5]=city_state&fields[6]=price&fields[7]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[img_main][fields]*&populate[author_sc][populate][0]=avatar&populate[state][fields]*`
  );
  const resultado = await respuesta.json();

  return resultado;
}
export async function getAllArticle() {
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/article-scs?fileds[0]=date:desc&populate[event_category][fields][0]=name&populate[author_sc][fields][0]=name&populate[author_sc][populate][0]=avatar&populate[img_main][fields][0]=url`
  );
  const resultado = await respuesta.json();

  return resultado;
}
export async function getSingleArticle(url: string) {
  const respuesta = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/article-scs?filters[url][$eq]=${url}&populate[author_sc][populate][0]=avatar&populate[event_category][fields][0]=name&populate[img_main][fields][0]=url`
  );
  const resultado = await respuesta.json();

  return resultado;
}
