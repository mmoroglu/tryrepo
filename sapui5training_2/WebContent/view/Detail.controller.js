jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.ui.demo.myFiori.view.Detail", {
	_oRouter : null,
	_path : null,

	onBeforeRendering : function() {
		this.byId("SupplierForm").bindElement("BusinessPartner");
	},

	onInit : function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		this._oRouter.getRoute("detail").attachPatternMatched(
				this._onObjectMatched, this);
	},

	_onObjectMatched : function(oEvent) {
		this._path = "/" + oEvent.getParameter("arguments").soId + "/"
				+ oEvent.getParameter("arguments").index;
		var that = this;
		this.getView().bindElement({
			path : that._path,
			model : "dataModel"
		});
	},
	// _onBindingChange : function (path, router) {
	// // No data for the binding
	// var oModel = sap.ui.getCore().byId("app").getModel("dataModel");
	// var dataExist = oModel.getProperty(path);
	//	   
	//	    
	// if (!dataExist) {
	// router.getTargets().display("notFound");
	// }
	// },
	handleNavButtonPress : function(eEvent) {
		var oHistory, sPreviousHash;
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oHistory = sap.ui.core.routing.History.getInstance();
		sPreviousHash = oHistory.getPreviousHash();
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			oRouter.navTo("master", {}, true /* no history */);
		}
	},
	handleApprove : function(evt) {
		// show confirmation dialog 
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(bundle.getText("ApproveDialogMsg"), function(
				oAction) {
			if (sap.m.MessageBox.Action.OK === oAction) {
				// notify user 
				var successMsg = bundle.getText("ApproveDialogSuccessMsg");
				sap.m.MessageToast.show(successMsg);
				// TODO call proper service method and update model (not part of this session)
			}
		}, bundle.getText("ApproveDialogTitle"));
	},
	handleLineItemPress : function(evt) {
		var path = evt.getSource().getBindingContextPath();
		var salesPath = path.substr(1, 20);
		var salesIndex = path.substr(22, 1);
		var linePath = path.substr(24, 9);
		var lineIndex = path.substr(34, 1);

		var router = sap.ui.core.UIComponent.getRouterFor(this);

		router.navTo("lineItem", {
			soId: salesPath,
		    index: salesIndex,		   
			soItemPos: linePath,
		    indexLine: lineIndex
		});
	}
});