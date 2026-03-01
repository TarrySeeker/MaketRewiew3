import {
  CDEKAuthResponse,
  CDEKTariffRequest,
  CDEKTariff,
  CDEKDeliveryPoint,
  CDEKOrderRequest,
  CDEKOrderResponse,
  CDEKOrderInfo,
} from "./types";

const CDEK_API_URL = process.env.CDEK_API_URL || "https://api.edu.cdek.ru/v2";
const CDEK_CLIENT_ID = process.env.CDEK_CLIENT_ID!;
const CDEK_CLIENT_SECRET = process.env.CDEK_CLIENT_SECRET!;

let tokenCache: {
  token: string;
  expiresAt: number;
} | null = null;

/**
 * Получить токен доступа СДЭК (с кешированием)
 */
async function getAccessToken(): Promise<string> {
  // Проверяем кеш
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.token;
  }

  // Запрашиваем новый токен
  const response = await fetch(`${CDEK_API_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CDEK_CLIENT_ID,
      client_secret: CDEK_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error(`CDEK Auth failed: ${response.statusText}`);
  }

  const data: CDEKAuthResponse = await response.json();

  // Кешируем токен (expires_in в секундах, вычитаем 60 сек запас)
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return data.access_token;
}

/**
 * Расчёт тарифов доставки
 */
export async function calculateTariff(
  request: CDEKTariffRequest
): Promise<CDEKTariff[]> {
  const token = await getAccessToken();

  const response = await fetch(`${CDEK_API_URL}/calculator/tarifflist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`CDEK tariff calculation failed: ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.tariff_codes || [];
}

/**
 * Список пунктов выдачи
 */
export async function getDeliveryPoints(params: {
  city_code?: number;
  postal_code?: string;
  country_code?: string;
  type?: string;
}): Promise<CDEKDeliveryPoint[]> {
  const token = await getAccessToken();

  const queryParams = new URLSearchParams();
  if (params.city_code) queryParams.set("city_code", params.city_code.toString());
  if (params.postal_code) queryParams.set("postal_code", params.postal_code);
  if (params.country_code) queryParams.set("country_code", params.country_code);
  if (params.type) queryParams.set("type", params.type);

  const response = await fetch(
    `${CDEK_API_URL}/deliverypoints?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`CDEK delivery points failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Создать заказ
 */
export async function createOrder(
  order: CDEKOrderRequest
): Promise<CDEKOrderResponse> {
  const token = await getAccessToken();

  const response = await fetch(`${CDEK_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`CDEK order creation failed: ${JSON.stringify(error)}`);
  }

  return response.json();
}

/**
 * Получить информацию о заказе
 */
export async function getOrderInfo(uuid: string): Promise<CDEKOrderInfo> {
  const token = await getAccessToken();

  const response = await fetch(`${CDEK_API_URL}/orders/${uuid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`CDEK order info failed: ${response.statusText}`);
  }

  return response.json();
}
