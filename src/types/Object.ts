export interface MetObject {
  objectID: number;
  isHighlight: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  department: string;
  objectName: string;
  title: string;
  culture: string;
  period: string;
  dynasty: string;
  reign: string;
  portfolio: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  artistNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistGender: string;
  objectDate: string;
  objectBeginDate: number;
  objectEndDate: number;
  medium: string;
  dimensions: string;
  creditLine: string;
  geographyType: string;
  city: string;
  state: string;
  county: string;
  country: string;
  classification: string;
  linkResource: string;
  objectURL: string;
  tags?: { term: string }[];
}

export interface SearchQuery {
  q?: string;
  departmentId?: string;
  dateBegin?: string;
  dateEnd?: string;
  isOnView?: boolean;
  hasImages?: boolean;
}
