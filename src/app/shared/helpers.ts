import {RoutesPath} from "./routes";
import {Brand, BrandDisplayNames} from "../generated-code";

export const userRoutes = [RoutesPath.rent, RoutesPath.profile, RoutesPath.bookingsOverview, RoutesPath.pageNotFound];
export const adminRoutes = [RoutesPath.adminDashboard, RoutesPath.adminCarTable, RoutesPath.adminUserTable];
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
export function getEnumArray(enumType: any, enumDisplayNames: any): { value: string, viewValue: string }[] {
  return Object.keys(enumType).map(key => ({
    value: enumType[key as keyof typeof enumType],
    viewValue: enumDisplayNames[enumType[key as keyof typeof enumType]]
  }));
}
