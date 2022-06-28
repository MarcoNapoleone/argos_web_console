export const getFormattedDate = (dateString: string) => {
  const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu",
    "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
  ];
  let dt = new Date(dateString)
  return (`${("0" + dt.getDate()).slice(-2)} ${monthNames[dt.getMonth()]} ${("000" + dt.getFullYear()).slice(-4)}`)
};

export const getFormattedTime = (date: Date | string | number) => {
  let dt = new Date(date)
  return (`${('0' + dt.getHours()).slice(-2)}:${('0' + dt.getMinutes()).slice(-2)}`);
};

