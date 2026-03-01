export interface CDEKAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
}

export interface CDEKTariffRequest {
  type: number; // 1 - интернет-магазин
  currency: number; // 1 - RUB
  from_location: {
    code?: number;
    city?: string;
  };
  to_location: {
    code?: number;
    city?: string;
    postal_code?: string;
    address?: string;
  };
  packages: Array<{
    weight: number; // граммы
    length?: number; // см
    width?: number;
    height?: number;
  }>;
}

export interface CDEKTariff {
  tariff_code: number;
  tariff_name: string;
  tariff_description: string;
  delivery_mode: string;
  delivery_sum: number;
  period_min: number;
  period_max: number;
  calendar_min?: number;
  calendar_max?: number;
}

export interface CDEKDeliveryPoint {
  code: string;
  name: string;
  location: {
    country_code: string;
    region: string;
    city: string;
    address: string;
    address_full: string;
    latitude: number;
    longitude: number;
  };
  work_time: string;
  phones: Array<{ number: string }>;
  email?: string;
  note?: string;
  type: string;
  owner_code: string;
  take_only: boolean;
  is_handout: boolean;
  is_reception: boolean;
  is_dressing_room: boolean;
  have_cashless: boolean;
  have_cash: boolean;
  allowed_cod: boolean;
  office_image_list?: Array<{
    url: string;
  }>;
}

export interface CDEKOrderRequest {
  type: number; // 1 - интернет-магазин
  number: string; // номер заказа в ИМ
  tariff_code: number;
  comment?: string;
  shipment_point?: string; // код пункта отправления
  delivery_point?: string; // код ПВЗ
  recipient: {
    name: string;
    phones: Array<{
      number: string;
    }>;
    email?: string;
  };
  sender?: {
    name: string;
    phones?: Array<{
      number: string;
    }>;
  };
  from_location: {
    code?: number;
    city?: string;
    address?: string;
  };
  to_location: {
    code?: number;
    city?: string;
    address?: string;
  };
  packages: Array<{
    number: string;
    weight: number;
    length?: number;
    width?: number;
    height?: number;
    items: Array<{
      name: string;
      ware_key: string;
      payment: {
        value: number;
      };
      cost: number;
      weight: number;
      amount: number;
    }>;
  }>;
}

export interface CDEKOrderResponse {
  entity: {
    uuid: string;
  };
  requests: Array<{
    request_uuid: string;
    type: string;
    date_time: string;
    state: string;
  }>;
}

export interface CDEKOrderInfo {
  entity: {
    uuid: string;
    type: number;
    number: string;
    tariff_code: number;
    delivery_sum: number;
    delivery_mode: string;
    statuses: Array<{
      code: string;
      name: string;
      date_time: string;
    }>;
    recipient: {
      name: string;
      phones: Array<{ number: string }>;
    };
  };
}
