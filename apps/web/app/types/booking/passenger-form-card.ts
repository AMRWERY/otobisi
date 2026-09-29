export interface PassengerInfo {
  name: string;
  phone: string;
  nationalId: string;
  gender: "male" | "female";
  saveToProfile?: boolean;
}
