export const TIME_FOR_TODAY = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const DATE_FORMAT = (type, date) => {
  let year;
  let month;
  let day;
  let hours;
  let minutes;

  if (date) {
    const dateTime = new Date(date);
    year = dateTime.getFullYear();
    month = dateTime.getMonth() + 1;
    day = dateTime.getDate();
    hours = ("0" + dateTime.getHours()).slice(-2);
    minutes = ("0" + dateTime.getMinutes()).slice(-2);
  }

  switch (type) {
    case "ALL":
      return new Date(+new Date() + 3240 * 10000)
        .toISOString()
        .replace("T", "_")
        .replace(/-/gi, "")
        .replace(/:/gi, "")
        .replace(/\..*/, "");
    case "YYYYMMDD":
      return new Date(+new Date() + 3240 * 10000)
        .toISOString()
        .split("T")[0]
        .replace(/-/gi, "");
    case "YYYY-MM-DD":
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    case "YYYY/MM/DD":
      return year + "/" + month + "/" + day + " " + hours + ":" + minutes;
    default:
      throw new Error("type error");
  }
};
