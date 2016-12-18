jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.declare("sap.ui.core.routing.History");
sap.ui.controller("sap.ui.demo.myFiori.view.NotFound", {
	onInit : function() {
//		var oRouter, oTarget;
//		oRouter = this.getRouter();
//		oTarget = oRouter.getTarget("notFound");
//		oTarget.attachDisplay(function(oEvent) {
//			this._oData = oEvent.getParameter("data"); //store the data
//		}, this);
	},
	onNavBack: function (oEvent) {
		var oHistory, sPreviousHash;
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);		
		oHistory = sap.ui.core.routing.History.getInstance();
		sPreviousHash = oHistory.getPreviousHash();
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			oRouter.navTo("master", {}, true /*no history*/);
		}
	}	
});