export const normalizePhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/^\+/, '');
};
