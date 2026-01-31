export interface SenderDetails {
  fullName: string;
  mobileNumber: string;
  email?: string;
}

export interface ReceiverDetails {
  fullName: string;
  fullAddress: string;
}

export interface PackageDetails {
  weight: number;
  ratePerKg: number;
  totalCost: number;
}

export interface BookingFormData {
  sender: SenderDetails;
  receiver: ReceiverDetails;
  package: PackageDetails;
}
