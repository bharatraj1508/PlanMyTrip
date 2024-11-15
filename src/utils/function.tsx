type Option = {
  label: string;
  value: string;
};

export const checkMissingFields = (
  location: Option,
  days: number,
  budget: string,
  traveler: string
) => {
  const missingFields = [
    !location?.label || !location?.value ? "location" : "",
    !budget ? "budget" : "",
    !traveler ? "traveler" : "",
  ]
    .filter(Boolean)
    .join(", ");

  if (missingFields) {
    return `Please fill ${missingFields} details.`;
  }

  if (days <= 0 || days > 5) {
    return "Days must be between 1 and 5.";
  }

  return "";
};

export const formatDate = (timestamp: string) => {
  const numTimestamp: number = Number(timestamp);

  const date = new Date(numTimestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
};
