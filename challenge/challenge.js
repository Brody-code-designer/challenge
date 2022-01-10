// attempt-challenge

//do get request, parse data N/A, -, . If array Remove. Turn array back into string.

const http = require("https");

http.get("https://jsonplaceholder.typicode.com/users", (res) => {
  let data = ""; 
  let finalData = [];
  let finalString = "";

  //stores the data from get request to variable
  res.on("data", (chunk) => {
    data += chunk;
  });

  //async call that parses data when data is available
  res.on("end", async () => {
    if (JSON.parse(data !== null)) {
      
      data = JSON.parse(data);

      //this get indivdual objects key values to be parsed if they contain either N/A, -, ., or empty array
      let parsedData = data.map((user) => {
        for (const [key, value] of Object.entries(user)) {
          let info = {};
          info[key] = value;

          //regular expression to find special characters
          var format = /[-.]/;

            //Removes Objects that contain N/A
          if (value !== "N/A") {
            if (typeof value === "string" || value instanceof String) {
              if (format.test(value) === false) {
                //removes objects with special characters
                finalData.push(info);
              }
            } else if (value === []) { //removes an empty array
            } else {
              finalData.push(info);
            }
          }
        }

        //this turns parsed data to a string
        finalString = JSON.stringify(finalData);
        console.log("finalString", finalString);
      });
    }
  });
});
