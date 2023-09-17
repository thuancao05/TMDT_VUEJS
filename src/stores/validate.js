// Email validation function
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Phone number validation function
  export function validatePhoneNumber(phoneNumber) {
    // You can customize this regex pattern for your specific phone number format
    const phoneRegex = /^\d{10}$/; // This example assumes a 10-digit phone number
    return phoneRegex.test(phoneNumber);
  }
  
  // Max length validation function
  export function validateMaxLength(value, maxLength) {
    return value.length <= maxLength;
  }
  export function validateNotEmpty(value) {
    return value != '' && value != null && value != undefined;
  }
  