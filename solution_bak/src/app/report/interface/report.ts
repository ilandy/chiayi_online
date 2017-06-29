export interface Dist {
  DistrictId: string;
  DistrictName: string;
  Zones: Zone[];
}

export interface Zone {
  Governor: string;
  Officer: string;
  ZoneCode: string;
  ZoneName: string;
}

export interface RecaptchaCode {
    HashCode: string;
    TimeStamp: string;
    ValidationCode: string;
}

