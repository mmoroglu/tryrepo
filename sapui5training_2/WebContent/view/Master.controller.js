jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");

sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

	handleListItemPress : function(evt) {
		var context = evt.getSource().getBindingContext();		
		var rowPath = context.getPath().substr(1, 20);
		var rowIndex = context.getPath().substr(22);
		
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		
		router.navTo("detail", {
			soId : rowPath,
			index : rowIndex
		});
	},

	handleSearch : function(evt) {

		// create model filter
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("SoId",
					sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter);
		}

		// update list binding
		var list = this.getView().byId("list");
		var binding = list.getBinding("items");
		binding.filter(filters);
	},

	handleListSelect : function(evt) {		
		var path = evt.getSource().getSelectedContextPaths().pop();
//		evt.getSource().getSelectedContexts().pop().getObject();
//		evt.getSource().getSelectedContexts().pop().getProperty("/EmployeeSet('1')");
		
		var rowPath = path.substr(1, 20);
		var rowIndex = path.substr(22);
		
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		
		router.navTo("detail", {
			soId : rowPath,
			index : rowIndex
		});		
	}
});