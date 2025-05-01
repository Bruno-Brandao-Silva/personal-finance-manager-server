export const FinancialStatus = {
  ToConfirm: 'to confirm',
  Pending: 'pending',
  Cancelled: 'cancelled',
  Paid: 'paid',
  Overdue: 'overdue'
} as const;

export type FinancialStatus = typeof FinancialStatus[keyof typeof FinancialStatus];