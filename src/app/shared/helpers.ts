import {RoutesPath} from "./routes";

export const userRoutes = [RoutesPath.rent, RoutesPath.profile, RoutesPath.bookingsOverview, RoutesPath.pageNotFound];
export const adminRoutes = [RoutesPath.adminDashboard];

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
