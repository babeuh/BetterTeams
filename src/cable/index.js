const ipc = require("../outlet/transport/ipc")

const setInternalData = (data) => {
  ipc.on(
    "BETTERTEAMS_INTERNAL_GET_ORIG_PRELOAD_PATH",
    data.original_preload_path
  );
};

module.exports = {setInternalData}