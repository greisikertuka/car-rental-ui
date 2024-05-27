import {RoutesPath} from "./routes";
import {ValidatorFn, Validators} from "@angular/forms";

export const userRoutes = [RoutesPath.rent, RoutesPath.profile, RoutesPath.bookingsOverview, RoutesPath.pageNotFound];
export const adminRoutes = [RoutesPath.adminDashboard, RoutesPath.adminCarTable, RoutesPath.adminUserTable, RoutesPath.userDetails];
export const formWidth = 250;

export function convertToCamelCase(value: String): String {
  let returnValue = value.replaceAll('_', ' ');
  returnValue = returnValue.replaceAll('-', ' ');
  return returnValue.split(' ').map(seperatedString => {
    let lowerCaseString = seperatedString.toLowerCase();
    let firstChar = lowerCaseString.substring(0, 1).toUpperCase();
    return firstChar + lowerCaseString.substring(1, lowerCaseString.length);
  }).join(' ');
}


export function usernameValidator(): ValidatorFn {
  const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
  return Validators.pattern(usernameRegex);
}

export function passwordValidator(): ValidatorFn {
  // At least one uppercase, one lowercase, one number, one special character, and at least 8 characters long
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return Validators.pattern(passwordRegex);
}

export function getEnumArray(enumType: any, enumDisplayNames: any): { value: string, viewValue: string }[] {
  return Object.keys(enumType).map(key => ({
    value: enumType[key as keyof typeof enumType],
    viewValue: enumDisplayNames[enumType[key as keyof typeof enumType]]
  }));
}
