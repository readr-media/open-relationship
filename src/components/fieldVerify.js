export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateDate(dateString) {
  // First check for the pattern
  // console.log("passed");
  // if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
  // Parse the date parts to integers

  var parts = dateString.split("-");

  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);

  if (isNaN(month)) month = 1;
  if (isNaN(day)) day = 1;

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

export function validateUrl(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

// Change datetime to 3 interger
export function devideDate(dateString, selection) {
  const parts = dateString.split("-");
  let day = parseInt(parts[2], 10);
  let month = parseInt(parts[1], 10);
  let year = parseInt(parts[0], 10);

  switch (selection) {
    case "year":
      return year;
      break;

    case "month":
      if (isNaN(month)) month = null;
      return month;
      break;

    case "day":
      if (isNaN(day)) day = null;
      return day;
      break;

    default:
      return null;
      break;
  }
}

export function mergeDate(year, month, day) {
  let dayString = day.toString();
  let monthString = month.toString();
  let yearString = year.toString();

  if (month < 10) {
    monthString = "0" + monthString;
  }

  if (day < 10) {
    dayString = "0" + dayString;
  }

  monthString;

  const result = yearString.concat("-", monthString, "-", dayString);
  return result;
}
