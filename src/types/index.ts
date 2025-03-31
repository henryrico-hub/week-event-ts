export type Event = {
  id: string;
  name: string;
  category: string;
  distance: string;
  elev_gain: string;
  description1: string;
  description2: string;
  imgDesc1: string;
  imgDesc2: string;
  url: string;
  author_desc: string;
  date_event: Date;
};
export type Category = {
  name: string;
  url: string;
};

export type EventType = {
  id: string;
  documentId: string;
  name: string;
  date_event: Date;
  description1: string;
  author_desc: string;
  Article: string;
  url: string;
  price: number;
  city_state: string;
  claps: number;
  img_main: {
    id: string;
    documentId: string;
    name: string;
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  img_desc1: {
    id: string;
    documentId: string;
    name: string;
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  img_desc2: {
    id: string;
    documentId: string;
    name: string;
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  category: {
    id: string;
    documentId: string;
    name: string;
    slug: string;
    description: string;
  };
  state: {
    id: string;
    name: string;
    slug: string;
  };
  author_sc: {
    name: string;
    avatar: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
  distance_category: string;
  registration_prices: string;
};
export type ArticleType = {
  id: string;
  documentId: string;
  name: string;
  date: Date;
  description: string;
  url: string;
  claps_quantity: number;
  img_main: {
    id: string;
    documentId: string;
    name: string;
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  event_category: {
    id: string;
    documentId: string;
    name: string;
    slug: string;
    description: string;
  };
  art_body: string;
  author_sc: {
    name: string;
    avatar: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
  claps: number;
};
/* 
  export type AlbumType = {
    id : string
    attributes : {
      album_name: string;
      description: string
      url: string;
      photo: {
      data: Array<{
        id : string
        attributes: {
          name?: string;
          width: number;
          height: number;
          url: string;
        };
      }>;
    };
    }
  } */
