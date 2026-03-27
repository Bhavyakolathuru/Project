sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.Login", {

        onLoginPress: function () {

            var sUsername = this.byId("username").getValue();
            var sPassword = this.byId("password").getValue();

            // Validation
            if (!sUsername || !sPassword) {
                MessageToast.show("Please enter Username & Password ⚠️");
                return;
            }

            // Dummy login
            if (sUsername === "Bhavya" && sPassword === "1234") {

                MessageToast.show("Login Successful ✅");

                // 👉 Navigate to Dashboard
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("dashboard");

            } else {
                MessageToast.show("Invalid Username or Password ❌");
            }
        }

    });
});