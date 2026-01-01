/************* Handle root route response **************/
const health = (req, res) => {
  // const { environment } = require("../../config/env");
  res.json({ message: `Hello from hello anfsdf environment!` });
};


/*********** modules export from here ************/
export {
  health
};

