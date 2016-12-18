sap.ui.jsview("sap.ui.demo.myFiori.view.App", {

	getControllerName: function () {
		return "sap.ui.demo.myFiori.view.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		// create app
		this.app = new sap.m.SplitApp("splitApp");

		// load the master page
		var master = sap.ui.xmlview("Master", "sap.ui.demo.myFiori.view.Master");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
		
		// load the empty page
		var empty = sap.ui.xmlview("Empty", "sap.ui.demo.myFiori.view.Empty");
		this.app.addPage(empty, false);

		return this.app;
	}
});

//"metadata" : {
//"routing" : {
//	"config" : {
//		"routerClass" : "sap.m.routing.Router",
//		"viewType" : "JS",
//		"viewPath" : "sap.ui.demo.myFiori.view",
//		"controlId" : "splitApp",
//		"controlAggregation" : "pages",
//		"transition" : "slide",
//		"clearTarget" : false,
//	},
//	routes : [ {
//		pattern : "master",
//		name : "master",
//		target: "master",
//		targetControl: "splitApp",
//		targetAggregation: "pages",
//	},
//	{
//	    pattern: "detail",
//	    name: "detail",
//	    target: "detail",
//		targetControl: "splitApp",
//		targetAggregation: "pages"				    
//	}],
//	targets: {
//		master: {
//			viewName: "Master",
//			controlAggregation:"master"						
//		},
//		detail: {
//			viewName: "Detail",
//			controlAggregation: "detail",
//		}
//	}
//}
//},