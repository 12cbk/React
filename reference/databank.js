function getFeedsList() {
	// user id set from EAC widget
	var id = EAC_LOGIN_WIDGET.eacUserId;

	var div = document.getElementById('hiddenFeeds'); //for iframe element
	if (div != null && document.createElement && ( iframe = document.createElement('iframe') )) {
		div.appendChild(iframe);
		iframe.id = 'fastLinkFeeds';
		iframe.src = '/cgi-bin/starfinder/0?path=myreps.txt&id=fastmyreps&pass=seya&search=' + id + '&format=WEBPREVIEW';
//		iframe.src = 'http://localhost/gb/static/staticFeeds.html';
	}
}

function getFaqs() {
	var div = document.getElementById('hiddenFaqs'); //for iframe element
	if (div != null && document.createElement && ( iframe = document.createElement('iframe') )) {
		div.appendChild(iframe);
		iframe.id = 'fastLinkFaqs';
		iframe.src = '/cgi-bin/starfinder/0?path=webfaqs.txt&id=fastmyreps&pass=seya&format=WEBFAST';
//		iframe.src = 'http://localhost/gb/static/staticFaqs.html';
	}
}

function populateFaqs() {
	var iframe = document.getElementById("fastLinkFaqs");
	if (iframe != null) {
		var fDoc = getDocumentByObject(iframe);
		var fDiv = document.getElementById("faqsDiv");
		if ( fDoc != null && fDiv != null) {
			var cDiv = fDoc.getElementById('content');
			fDiv.innerHTML = cDiv.innerHTML;
		}
	}
}

function populateFeeds() {
	var iframe = document.getElementById("fastLinkFeeds");
	if (iframe != null) {
		var fDoc = getDocumentByObject(iframe);
		var table = document.getElementById("feedsTable");
		if ( fDoc != null && table != null) {
			// user id set from EAC widget
			var userId = EAC_LOGIN_WIDGET.eacUserId;

			var tbody = document.createElement('tbody');
			var fRows= fDoc.getElementsByTagName('tr');
			for (i=0 ; i<fRows.length ; i++) {
				// add data row
				var tr = document.createElement('tr');
				if (i==0) {
					tr.setAttribute('class', 'first');
				}
				var fTds = fRows[i].getElementsByTagName('td');
				// td cols: 1=report name, 2=date last edited, 3=date last run, 4=next scheduled run, 5=frequency, 6=delivery method, 7=feed id
				for (j=0 ; j<6 ; j++) {
					var td = document.createElement('td');
					var txt = document.createTextNode(fTds[j].innerHTML);
					td.appendChild(txt);
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
				
				var id = fTds[6].innerHTML;
				// add action row
				var ar = document.createElement('tr');
				var ad = document.createElement('td');
				ad.setAttribute('colspan', '6');
				var a1 = document.createElement('a');
				var a2 = document.createElement('a');
				var a3 = document.createElement('a');
				var a4 = document.createElement('a');
				a1.setAttribute('href', '#schedule' + id);
				a1.setAttribute('id', id);
				a1.className = "date-pick";
				a1.innerHTML = 'Schedule to run';
				a2.setAttribute('href', '/cgi-bin/QuickSched.pl?id=' + id + '&dbname=DATABANKQE&sched=NOW&del=no&ERGHT=' + userId);
				a2.innerHTML = 'Run now';
				a3.setAttribute('href', 'feed_wizard/edit_feed.shtml?feed=' + id);
				a3.innerHTML = 'Edit';
				a4.setAttribute('href', '/cgi-bin/QuickSched.pl?id=' + id + '&dbname=DATABANKQE&sched=NOW&del=yes&ERGHT=' + userId);
				a4.innerHTML = 'Delete';
				ad.appendChild(a1);
				ad.appendChild(document.createTextNode(' | '));
				ad.appendChild(a2);
				ad.appendChild(document.createTextNode(' | '));
				ad.appendChild(a3);
				ad.appendChild(document.createTextNode(' | '));
				ad.appendChild(a4);

				ar.appendChild(ad);
				tbody.appendChild(ar);
			}
			table.appendChild(tbody);
		}
	}
	datePickInit();
}

function scheduleDate(feedId, schedDate) {
	if (schedDate) {
		if (dateValidation('schedule', schedDate)) {
			document.schedForm.MTIME.value = feedId;
			document.schedForm.RDATE.value = schedDate;
			document.schedForm.submit();
		}
		
	} else {
		alert('date cannot be empty');
	}
}

function buildTitleGroups() {
	var fDoc = getDocumentById('fastLinkGroups'); //for iframe element
	if ( fDoc != null) {
		var div = document.getElementById("titleGroupDiv");
		var flOptions= fDoc.getElementsByTagName('option');
		for ( i=0; i<flOptions.length; i++ ) {
			if (flOptions[i].value == "heading") {
				// treat as an <h2> header
				var text = document.createTextNode(flOptions[i].text);
				var h2 = document.createElement("h2");
				h2.appendChild(text);
				div.appendChild(h2);
			} else {
				// treat as a radio button
				var label = document.createElement("label");
				label.setAttribute("for", flOptions.value);
				var input = document.createElement("input");
				input.setAttribute("type", "radio");
				input.setAttribute("id", flOptions[i].value);
				input.setAttribute("name", "catco");
				input.setAttribute("value", flOptions[i].value);
				label.appendChild(input);
				var text = document.createTextNode(flOptions[i].text);
				label.appendChild(text);
				div.appendChild(label);
			}
		}
  	}
}

function buildFirstLevelElements() {
	// loop for all Area of Publishing options, adding an iframe and select for each value
	var areaSelect = document.getElementById("AreaPubSelect");
	var areaOptions = areaSelect.getElementsByTagName("option");
	for (i=0; i<areaOptions.length; i++) {
		if (areaOptions[i].value != "*") {
			// build new subject iframe e.g. 'fastLinkAC'
			var iframe = createIframe('subject', areaOptions[i].value);
			if (iframe) {
				// create new select within 'multiLevelDiv' e.g. 'SelectAC'
				var select = createSelect('subject', areaOptions[i].value, areaOptions[i].text);
			}
			
			// build new series iframe e.g. 'fastLinkSeriesAC'
			var iframe = createIframe('series', areaOptions[i].value);
			if (iframe) {
				// create new select within 'multiLevelDiv' e.g. 'SelectSeriesAC'
				var select = createSelect('series', areaOptions[i].value, areaOptions[i].text);
			}
		}
	}
}

function buildSecondLevelElements(param) {
	// do not build multiple second-level dropdowns for ELT (use single Product Type dropdown instead)
	if (param == 'EL') {
		var subIframe = createIframe('subject', 'ELTProductType');
		if (subIframe != null) {
			var subSelect = createSelect('subject', 'ELTProductType', 'ELTProductType');
		}

	} else {		
		// get select within 'multiLevelDiv' e.g. 'SelectAC'
		var select = document.getElementById("Select" + param);
		if (select != null) {
			// loop for all option values, creating iframes and selects
		  	var options = select.getElementsByTagName('option');
			for (k=0; k<options.length; k++) {
				// strip the 0's so 'ACHE1010000000' becomes 'ACHE101'
				var value = rTrim(options[k].value, '0');
				// make sure there is an even number of chars by adding an extra 0 if necessary - 'ACHE101' becomes 'ACHE1010'
				if (value.length % 2 != 0) value = value + '0';
	
				if (value != "*0" && value != "*") {
					// build new iframe e.g. 'fastLinkACAC'
					var subIframe = createIframe('subject', value);
					if (subIframe != null) {
						// create new select within 'multiLevelDiv' e.g. 'SelectACAC'
						var subSelect = createSelect('subject', value, options[k].text);
					}
				}
			}
		}
	}
}

function populateOptions(param) {
	// populate subject dropdowns
	populateTheOptions('subject', param);
	// populate series dropdowns
	populateTheOptions('series', param);
}

function populateTheOptions(selectType, selectParam) {
	var iframe;
	var select;
	if (selectType == 'subject') {
		iframe = document.getElementById("fastLink" + selectParam);
		// get select within 'multiLevelDiv' e.g. 'SelectAC'
		select = document.getElementById("Select" + selectParam);
		
	} else if (selectType == 'series') {
		iframe = document.getElementById("fastLinkSeries" + selectParam);
		// get select within 'multiLevelDiv' e.g. 'SelectSeriesAC'
		select = document.getElementById("SelectSeries" + selectParam);
	}

	if ( iframe != null && select != null && select.getElementsByTagName('option').length <= 0) {
		// build option list for select
		buildOptionList(select, selectParam, iframe);
	}
}
