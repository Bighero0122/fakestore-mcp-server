export function validateRequired(value: any, fieldName: string): void {
  if (value === undefined || value === null || value === "") {
    throw new Error(`${fieldName} is required`);
  }
}

export function validateNumber(value: any, fieldName: string): void {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error(`${fieldName} must be a valid number`);
  }
}

export function validatePositiveNumber(value: any, fieldName: string): void {
  validateNumber(value, fieldName);
  if (value <= 0) {
    throw new Error(`${fieldName} must be a positive number`);
  }
}

export function validateString(value: any, fieldName: string): void {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string`);
  }
}
