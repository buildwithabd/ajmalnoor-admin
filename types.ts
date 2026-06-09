export type ItemForm = {
  name: string;
  type: string;
  sn: string;
  ram: string;
  rom: string;
  touchscreen: boolean;
  qty: number;
  price: string;
};

export type CartItem = {
  id: string;
  name: string;
  type: string;
  qty: number;
  price: number;
  specs?: {
    sn?: string;
    ram?: string;
    rom?: string;
    touchscreen?: boolean;
  };
};

export type FormErrors = {
  customer: boolean;
  name: boolean;
  sn: boolean;
  ram: boolean;
  rom: boolean;
  price: boolean;
};
