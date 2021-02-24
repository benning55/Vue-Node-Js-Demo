const notGmail = function(value = "") {
  return value.includes("gmail");
}


const recheckPassword = (param1) => function(value) {
  return param1 === value
}

module.exports = {
  notGmail,
  recheckPassword
}