export const PADDING_HORIZONTAL = 7;
export const PADDING_VERTICAL = 40;
export const IDLE_LOGOUT_TIME_LIMIT = 1 * 60 * 1000;
export const INACTIVITY_CHECK_INTERVAL_MS = 1000;

export function extractSelect(data, keyProperty, valueProperty) {
  return data?.map(item => ({
    key: item[keyProperty]?.toString(),
    value: item[valueProperty],
  }));
}

export function getObjectById(array, id) {
  return array.find(item => item.id === id);
}
export const urlRegex =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const transactions = [
  {
    type: 'internet',
    amount: 5000,
    status: 'credit',
    name: 'Monthly Subscription',
    time: '14:30',
  },
  {
    type: 'fee',
    amount: 1500,
    status: 'debit',
    name: 'Service Charge',
    time: '09:15',
  },
  {
    type: 'transfer',
    amount: 20000,
    status: 'credit',
    name: 'Payment Received',
    time: '16:45',
  },
  {
    type: 'legal',
    amount: 10000,
    status: 'debit',
    name: 'Legal Consultation Fee',
    time: '11:20',
  },
  {
    type: 'internet',
    amount: 7000,
    status: 'debit',
    name: 'Data Bundle Purchase',
    time: '18:10',
  },
  {
    type: 'fee',
    amount: 2500,
    status: 'credit',
    name: 'Refund for Overcharge',
    time: '12:05',
  },
  {
    type: 'transfer',
    amount: 45000,
    status: 'credit',
    name: 'Salary Payment',
    time: '08:50',
  },
  {
    type: 'legal',
    amount: 12000,
    status: 'debit',
    name: 'Contract Review Fee',
    time: '14:00',
  },
];
