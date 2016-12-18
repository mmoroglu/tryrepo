sap.ui.controller("sap.ui.demo.myFiori.view.LineItem", {
    onInit: function() {
        this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this._oRouter.getRoute("lineItem").attachPatternMatched(
            this._onObjectMatched, this);
    },

    _onObjectMatched: function(oEvent) {
        this._path = "/" + oEvent.getParameter("arguments").soId + "/" +
            oEvent.getParameter("arguments").index +
            "/" +
            oEvent.getParameter("arguments").soItemPos +
            "/" +
            oEvent.getParameter("arguments").indexLine;
        var that = this;
        this.getView().bindElement({
            path: that._path,
            model: "dataModel"
        });
    },

    handleNavBack: function(evt) {
        var oHistory, sPreviousHash;
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oHistory = sap.ui.core.routing.History.getInstance();
        sPreviousHash = oHistory.getPreviousHash();
        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            oRouter.navTo("master", {}, true /* no history */ );
        }
    }
});