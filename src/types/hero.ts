export type TDefaultInfo = {
    available: number;
    collectionURI: string;
    items: {
        resourceURI: string;
        name: string;
    }[];
    returned: number;
}

export type THero = {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    resourceURI: string;
    comics: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
        returned: number;
    };
    series: TDefaultInfo;
    stories: TStories;
    events: TDefaultInfo;
    urls: {
        
    }[];
}

export type TStories = {
    available: number,
    collectionURI: string,
    items: {
        resourceURI: string;
        name: string;
        type: string;
    }[];
    returned: number
}
type TUrl = {
    type: string;
    url: string;
}


export type TResponse = {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: {
        offset: number;
        limit: number;
        total: number;
        count: number;
        results: THero[];
    };
  }