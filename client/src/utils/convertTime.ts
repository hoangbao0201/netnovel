export const convertTime = (time: Date) => {
    // const date = new Date(time);
    // return date.getDate()
    // const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
    //     .toString()
    //     .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date
    //     .getHours()
    //     .toString()
    //     .padStart(2, "0")}:${date
    //     .getMinutes()
    //     .toString()
    //     .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
    // return formattedDate;


    if (!(time instanceof Date) || isNaN(time.getTime())) {
        return "Invalid Date";
      }
    
      const date = new Date(time);
      const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
      return formattedDate;
};
