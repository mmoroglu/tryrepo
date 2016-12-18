//jQuery.sap.declare("sap.ui.demo.myFiori.Component");
//
//sap.ui.core.UIComponent.extend("sap.ui.demo.myFiori.Component", {
//
//	createContent : function() {
//
//		// create root view
//		var oView = sap.ui.view({
//			id : "app",
//			viewName : "sap.ui.demo.myFiori.view.App",
//			type : "JS",
//			viewData : { component : this }
//		});
//
//		// set i18n model
//		var i18nModel = new sap.ui.model.resource.ResourceModel({
//			bundleUrl : "i18n/messageBundle.properties"
//		});
//		oView.setModel(i18nModel, "i18n");
//
////		// Using OData model to connect against a real service
////		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
////		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
////		oView.setModel(oModel);
//
//		// Using a local model for offline development
//		var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
//		oView.setModel(oModel);
//
//		// done
//		return oView;
//	}
//});

sap.ui.define([ "sap/ui/core/UIComponent" ], function(UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.myFiori.Component", {
		
		"metadata" : {
		"routing" : {
			"config" : {
				"routerClass" : "sap.m.routing.Router",
				"viewType" : "XML",
				"viewPath" : "sap.ui.demo.myFiori.view",
				"controlId" : "splitApp",
				"controlAggregation" : "pages",
				"transition" : "slide",
				"clearTarget" : false,
				 "bypassed": {
					 target: ["master" , "notFound"]
				}
			},
			routes : [ {
				pattern : "",
				name : "master",
				target: "master"
			},
			{
			    pattern: "detail/{soId}/{index}",
			    name: "detail",
			    target: ["detail","master"],
			    targetControl: "splitApp",
			    targetAggregation: "pages"
			},
			{
			    pattern: "lineItem/{soId}/{index}/{soItemPos}/{indexLine}",
			    name: "lineItem",
			    target: ["lineItem", "master"],
			    targetControl: "splitApp",
			    targetAggregation: "pages"
		    }],
			targets: {
				master: {
					viewName: "Master",
					controlAggregation:"masterPages",
					viewLevel: 1,
				},	
				notFound: {
				    pattern: "notfound",
					viewName: "NotFound",
					transition: "show",
					controlAggregation: "detailPages",
					viewLevel: 2
				},				
				detail: {
					viewName: "Detail",
					controlAggregation: "detailPages",
					transition: "slide",
					viewLevel: 2
				},
				lineItem: {
					viewName: "LineItem",
					controlAggregation: "detailPages",
					transition: "slide",
					viewLevel: 2
				}
			}
		}
	},		
		init : function() {
			var router;
			jQuery.sap.require("sap.ui.core.routing.History");
			jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
			sap.ui.core.UIComponent.prototype.init.apply(this);
			router = this.getRouter();
			//		        this.routerHandler = new sap.m.routing.RouteMatchedHandler(router);
			return router.initialize();
			// create the views based on the url/hash
			//        this.getRouter().initialize();
		},

		createContent : function() {

			// create root view
			var oView = sap.ui.view({
				id : "app",
				viewName : "sap.ui.demo.myFiori.view.App",
				type : "JS",
				viewData : {
					component : this
				}
			});

			// set i18n model
			var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl : "i18n/messageBundle.properties"
			});
			oView.setModel(i18nModel, "i18n");

			//			// Using OData model to connect against a real service
			//			var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
			//			var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
			//			oView.setModel(oModel);

			// Using a local model for offline development
			var oModel = new sap.ui.model.json.JSONModel("model/mock.json", "d1");
			oView.setModel(oModel);
			
			this.setModel(oModel, "dataModel");

	        // set device model
	        var deviceModel = new sap.ui.model.json.JSONModel({
	            isPhone: jQuery.device.is.phone,
	            isNoPhone: !jQuery.device.is.phone,
	            listMode: (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
	            listItemType: (jQuery.device.is.phone) ? "Active" : "Inactive"
	        });
	        deviceModel.setDefaultBindingMode("OneWay");
	        oView.setModel(deviceModel, "device");
	        
			// done
			return oView;
		}
	});
});
