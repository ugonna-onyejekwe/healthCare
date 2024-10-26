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
