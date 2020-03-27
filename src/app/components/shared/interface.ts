export interface headerBlock {
  name: string;
  link: string;
}
export interface singleItem {
  imageSrc: string;
  titleText: string;
  subtitleText: string;
  btnText: number;
  id: string;
}
export interface SocialMedia {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
}
export interface dialogData {
  prevData: any;
  newData: any;
}
export interface dialogDataHeader {
  prevData: any;
  newData: any;
  newIndex: number;
}
export interface headerLinks {
  urlName: string;
  urlPopUp?: headerLinks[];

  urlLabel: string;
}
export interface mainContent {
  items: singleItem[];
}
