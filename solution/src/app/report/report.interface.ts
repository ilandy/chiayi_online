export class Dist {
  DistrictId: string;
  DistrictName: string;
  Zones: Zone[];
}
export class Zone {
  Governor: string;
  Officer: string;
  ZoneCode: string;
  ZoneName: string;
}

export class RecaptchaCode {
    HashCode: string;
    TimeStamp: string;
    ValidationCode: string;
}
