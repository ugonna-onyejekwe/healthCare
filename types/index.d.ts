// types for params
type paramsType = {
  params: {
    userId: string;
  };
};

// types to create new user
type createUserTypes = {
  fullName: string;
  phoneNumber: string;
  email: string;
};

type datePickerTypes = {
  date: any;
  setDate: (value: any) => void;
};
