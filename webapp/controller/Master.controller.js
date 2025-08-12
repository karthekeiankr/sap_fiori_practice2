sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("leaverequestnew.controller.Master", {
      onItemPress: function (oEvent) {
    var sPath = oEvent.getParameter("listItem").getBindingContext().getPath().substr(1); 
    // Example: "LeaveRequests/0"

    this.getOwnerComponent().getRouter().navTo("detail", {
        path: encodeURIComponent(sPath)
    });
}

    });
});