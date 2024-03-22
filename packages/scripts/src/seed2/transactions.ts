import type { NewTransactions } from "../types/index.js";

export const transactions: Array<NewTransactions> = [
  {
    id: '00000001YWZC1V8T6QHTQ3CCKD',
    user_id: '00000001YX5VD9XAFVWXRVSTVW',
    price: 3000,
    payment_status: 'completed',
    transaction_type: JSON.stringify({
      type: 'subject-registration',
      opening_subject_ids: [
        '00000001YX1JTZQP2X95XRSGAK'
      ]
    }),
    created_at: '2019-01-01T00:00:00.000+0700',
    updated_at: '2019-01-01T00:00:00.000+0700'
  },
  {
    id: '00000001YWYTCG74C1JER5R4X0',
    user_id: '00000001YX9TMSKMH7C7ASF7WA',
    price: 3000,
    payment_status: 'completed',
    transaction_type: JSON.stringify({
      type: 'subject-registration',
      opening_subject_ids: [
        '00000001YX1JTZQP2X95XRSGAK'
      ]
    }),
    created_at: '2019-01-01T00:00:00.000+0700',
    updated_at: '2019-01-01T00:00:00.000+0700'
  },
  {
    id: '00000001YW8HW5RXKHGKYQT1PJ',
    user_id: '00000001YXF2R0PBMTPJ91PP3W',
    price: 3000,
    payment_status: 'completed',
    transaction_type: JSON.stringify({
      type: 'subject-registration',
      opening_subject_ids: [
        '00000001YX1JTZQP2X95XRSGAK'
      ]
    }),
    created_at: '2019-01-01T00:00:00.000+0700',
    updated_at: '2019-01-01T00:00:00.000+0700'
  }
]
