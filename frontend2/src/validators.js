export function isNameJoe(value) {
    if (!value) return true;
    return value === "Joe";
  }
  
  export function notGmail(value = "") {
    // console.log(value)
    return value.includes("gmail");
  }

  export function recheckPassword(value1="", value2="") {
    console.log(value1)
    console.log(value2)
    if(value1 === value2) {
      return true
    } else {
      return false
    }
  }
  
//   export function isEmailAvailable(value) {
//     if (value === "") return true;
  
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(value.length > 10);
//       }, 500);
//     });
//   }