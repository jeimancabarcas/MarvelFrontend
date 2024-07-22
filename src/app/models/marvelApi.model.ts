export interface MarvelApiResponse {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: MarvelApiData;
  }
  
  export interface MarvelApiData {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comic[];
  }
  
  export interface Comic {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: TextObject[];
    resourceURI: string;
    urls: Url[];
    series: Series;
    variants: Variant[];
    collections: any[];
    collectedIssues: any[];
    dates: DateElement[];
    prices: Price[];
    thumbnail: Thumbnail;
    images: Image[];
    creators: Creators;
    characters: Characters;
    stories: Stories;
    events: Events;
  }
  
  export interface TextObject {
    // Define según los datos que necesites, por ejemplo:
    type: string;
    language: string;
    text: string;
  }
  
  export interface Url {
    type: string;
    url: string;
  }
  
  export interface Series {
    resourceURI: string;
    name: string;
  }
  
  export interface Variant {
    resourceURI: string;
    name: string;
  }
  
  export interface DateElement {
    type: string;
    date: string;
  }
  
  export interface Price {
    type: string;
    price: number;
  }
  
  export interface Thumbnail {
    path: string;
    extension: string;
  }
  
  export interface Image {
    // Asumiendo estructura similar a Thumbnail
    path: string;
    extension: string;
  }
  
  export interface Creators {
    available: number;
    collectionURI: string;
    items: CreatorItem[];
    returned: number;
  }
  
  export interface CreatorItem {
    resourceURI: string;
    name: string;
    role: string;
  }
  
  export interface Characters {
    available: number;
    collectionURI: string;
    items: CharacterItem[];
    returned: number;
  }
  
  export interface CharacterItem {
    resourceURI: string;
    name: string;
  }
  
  export interface Stories {
    available: number;
    collectionURI: string;
    items: StoryItem[];
    returned: number;
  }
  
  export interface StoryItem {
    resourceURI: string;
    name: string;
    type: string;
  }
  
  export interface Events {
    available: number;
    collectionURI: string;
    items: EventItem[];
    returned: number;
  }
  
  export interface EventItem {
    resourceURI: string;
    name: string;
  }
  