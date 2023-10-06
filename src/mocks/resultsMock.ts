import { THero, TDefaultInfo, TStories } from '../types/hero';

export const mockHero:THero = {
  id: 0,
  name: 'Fake Hero',
  description: 'This is a description of fake hero',
  modified: '06/10/2023',
  thumbnail: {
      path: '',
      extension: ''
  },
  resourceURI: '',
  comics: {} as TDefaultInfo,
  series: {
      available: 1,
      collectionURI: '',
      items: [{
           name: 'Fake Serie',
          resourceURI: ''
      }],
      returned: 0
  },
  stories: {} as TStories,
  events: {
      available: 1,
      collectionURI: '',
      items: [{
          name: 'Fake Event',
          resourceURI: ''
      }],
      returned: 0
  },
  urls: []
};

export const mockResponse = {
    "code": 200,
    "status": "Ok",
    "copyright": "© 2023 MARVEL",
    "attributionText": "Data provided by Marvel. © 2023 MARVEL",
    "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2023 MARVEL</a>",
    "etag": "809657f923354ef088f212195342112d44795a75",
    "data": {
      "offset": 0,
      "limit": 10,
      "total": 1563,
      "count": 10,
      "results": [mockHero]
    }
  }
