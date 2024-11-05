// types for params
type paramsType = {
  params: {
    userId: string;
  };
};

// types to create new user
type createUserTypes = {
  name: string;
  phone: string;
  email: string;
};

type datePickerTypes = {
  date: any;
  setDate: (value: any) => void;
};

declare type Status = "pending" | "scheduled" | "cancelled";

declare type CreateAppointmentParams = {
  userId: string;
  patients: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type SearchParamProps = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  timeZone?: string;
  appointment: Appointment;
  type: string;
};
