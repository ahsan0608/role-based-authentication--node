const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("user").readOwn("profile").updateOwn("profile");

  ac.grant("admin").extend("basic").readAny("profile");

  ac.grant("superadmin")
    .extend("user")
    .extend("admin")
    .updateAny("profile")
    .deleteAny("profile");

  return ac;
})();
