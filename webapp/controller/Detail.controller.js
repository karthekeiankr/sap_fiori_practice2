sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/unified/DateRange",
    "sap/ui/core/date/UI5Date",
      "sap/m/MessageBox"
], (Controller, DateRange, UI5Date, MessageBox) => {
    "use strict";

    return Controller.extend("leaverequestnew.controller.Detail", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            // Decode the path safely
            let sPath = decodeURIComponent(decodeURIComponent(oEvent.getParameter("arguments").path));

            // Get the model (change "" to model name if required)
            let oModel = this.getView().getModel();

            // Force reload of data before binding
            oModel.refresh(true);

            // Bind element and update calendar after data is ready
            this.getView().bindElement({
                path: "/" + sPath,
                events: {
                    change: this._updateCalendar.bind(this),
                    dataRequested: function () {
                        // Optional: show busy indicator
                        this.getView().setBusy(true);
                    }.bind(this),
                    dataReceived: function () {
                        // Remove busy indicator
                        this.getView().setBusy(false);
                    }.bind(this)
                }
            });
        },

        _updateCalendar: function () {
            let oContext = this.getView().getBindingContext();
            if (!oContext) {
                return;
            }

            let oData = oContext.getObject();
            let oCalendar = this.byId("leaveCalendar");
            oCalendar.removeAllSelectedDates();

            if (oData && oData.StartDate && oData.EndDate) {
                oCalendar.addSelectedDate(new DateRange({
                    startDate: UI5Date.getInstance(oData.StartDate),
                    endDate: UI5Date.getInstance(oData.EndDate)
                }));
            }
        },
         onApprovePress: function () {
            MessageBox.confirm("Are you sure you want to approve this leave?", {
                title: "Confirm Approval",
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        MessageBox.success("Leave request approved.");
                    }
                }
            });
        },

        onRejectPress: function () {
            MessageBox.confirm("Are you sure you want to reject this leave?", {
                title: "Confirm Rejection",
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        MessageBox.error("Leave request rejected.");
                    }
                }
            });
        }
    });
});
