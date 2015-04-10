var restBaseUrl = "http://localhost:7645/";

function DisplayData(id,databasename,tablename,columnname,data,url){
	var self = this;
	self.id = ko.observable(id);
	self.databasename = ko.observable(databasename);
	self.tablename = ko.observable(tablename);
	self.columnname = ko.observable(columnname);
	self.data = ko.observable(data);
	self.url = ko.observable(url);
}

function Display(){
	var self = this;

	self.tuples = ko.observableArray();

	self.keywords = ko.observable();
	
	self.search = function(){
		
		$.ajax({
			url: restBaseUrl + "Demo1/helloWorld/" + self.keywords(),
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data){	
debugger;

				self.tuples.removeAll();

				for (var i = 0; i < data.length; i++) {
					//need to clear the data before retrieve data again.
					//append to the right colunm in the tables
					var onetuple = new DisplayData(data[i].id, data[i].databasename, 
						data[i].tablename, data[i].columnname, data[i].data, data[i].url);

					self.tuples.push(onetuple);
				}
			},
			error: function(data) {
				alert("Something went wrong while getting message. Please try again.");
			}
		});
	};
}

ko.applyBindings(new Display(), $("#searchResultContainer")[0]);
