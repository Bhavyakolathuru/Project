sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.Dashboard", {

        onSubmit: function () {

            var name = this.byId("empName").getValue();
            var id = this.byId("empId").getValue();
            var phone = this.byId("empPhone").getValue();
            var email = this.byId("empEmail").getValue();
            var dept = this.byId("empDept").getSelectedKey();

            // Validation
            if (!name || !id || !phone || !email || !dept) {
                MessageToast.show("Please fill all fields ⚠️");
                return;
            }

            MessageToast.show("Employee Details Submitted ✅");

            // Clear fields
            this.byId("empName").setValue("");
            this.byId("empId").setValue("");
            this.byId("empPhone").setValue("");
            this.byId("empEmail").setValue("");
            this.byId("empDept").setSelectedKey("");
        }

    });
});