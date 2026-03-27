sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.Dashboard", {

        onInit: function () {

            var oData = {
                students: [
                    { id: "101", name: "Ravi", course: "SAP UI5" },
                    { id: "102", name: "Sita", course: "Java" }
                ]
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        // ➕ OPEN CREATE
        onCreate: function () {
            this.byId("createDialog").open();
        },

        // 💾 SAVE CREATE
        onSaveCreate: function () {

            var sId = this.byId("createId").getValue();
            var sName = this.byId("createName").getValue();
            var sCourse = this.byId("createCourse").getValue();

            if (!sId || !sName || !sCourse) {
                MessageToast.show("Enter all fields");
                return;
            }

            var oModel = this.getView().getModel();
            var aStudents = oModel.getProperty("/students");

            aStudents.push({
                id: sId,
                name: sName,
                course: sCourse
            });

            oModel.setProperty("/students", aStudents);

            this.byId("createDialog").close();

            // clear fields
            this.byId("createId").setValue("");
            this.byId("createName").setValue("");
            this.byId("createCourse").setValue("");

            MessageToast.show("Student Created ✅");
        },

        // ❌ CANCEL CREATE
        onCancelCreate: function () {
            this.byId("createDialog").close();
        },

        // ✏️ EDIT
        onEdit: function () {

            var oTable = this.byId("studentTable");
            var oSelected = oTable.getSelectedItem();

            if (!oSelected) {
                MessageToast.show("Select a row first");
                return;
            }

            var oContext = oSelected.getBindingContext();
            this._oEditData = oContext.getObject();

            this.byId("editName").setValue(this._oEditData.name);
            this.byId("editCourse").setValue(this._oEditData.course);

            this.byId("editDialog").open();
        },

        // 💾 SAVE EDIT
        onSaveEdit: function () {

            this._oEditData.name = this.byId("editName").getValue();
            this._oEditData.course = this.byId("editCourse").getValue();

            this.getView().getModel().refresh();

            this.byId("editDialog").close();

            MessageToast.show("Updated Successfully");
        },

        // ❌ CANCEL EDIT
        onCancelEdit: function () {
            this.byId("editDialog").close();
        },

        // 🗑 DELETE
        onDelete: function () {

            var oTable = this.byId("studentTable");
            var oSelected = oTable.getSelectedItem();

            if (!oSelected) {
                MessageToast.show("Select a row first");
                return;
            }

            var oModel = this.getView().getModel();
            var aStudents = oModel.getProperty("/students");

            var iIndex = oTable.indexOfItem(oSelected);
            aStudents.splice(iIndex, 1);

            oModel.setProperty("/students", aStudents);

            MessageToast.show("Student Deleted ❌");
        }

    });
});