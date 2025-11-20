function createIframe (type, param) {
	var iframe = null;
	if (type == 'subject') {
		// only build iframe for id if not already created (e.g. AC, HE, EL, OX, MU)
		if (document.getElementById("fastLink" + param) == null && document.createElement && ( iframe = document.createElement('iframe') )) {
			iframe.name = 'fastLink' + param;
			iframe.id = 'fastLink' + param;
			// special case for Higher Education - Star uses 'ACHE' instead of 'HE'
			if (param == "HE") param = "ACHE";
			iframe.src = '/gb/starlookups/Subject' + param + '.html';
//			iframe.src = 'http://localhost/gb/static/static' + param + '.html';
			
			// special case for ELT - use ELT Product type src (single-level select only)
			if (param == "ELTProductType") iframe.src = '/cgi-bin/starfinder/0?path=ptypes.txt&id=fastmyreps&pass=seya&format=WEBPREV2';
//			if (param == "ELTProductType") iframe.src = 'http://localhost/gb/static/staticELTProductType.html';
			var hiddenDiv = document.getElementById("finished");
			hiddenDiv.appendChild(iframe);
		}
		
	} else if (type == 'series') {
		// only build iframe for id if not already created (e.g. AC, HE, EL, OX, MU)
		if (document.getElementById("fastLinkSeries" + param) == null && document.createElement && ( iframe = document.createElement('iframe') )) {
			iframe.name = 'fastLinkSeries' + param;
			iframe.id = 'fastLinkSeries' + param;
			// special case for Higher Education - Star uses 'ACHE' instead of 'HE'
			if (param == "HE") param = "ACHE";
			iframe.src = '/gb/starlookups/Series' + param + '.html';
//			iframe.src = 'http://localhost/gb/static/staticSeriesAC.html';
			var hiddenDiv = document.getElementById("finished");
			hiddenDiv.appendChild(iframe);
		}
	}
	var iframes = parseInt( document.getElementById("iframesCreated").innerHTML );
	document.getElementById("iframesCreated").innerHTML = iframes + 1; 
	return iframe;
}

function createSelect(type, param, text) {
	var select;
	// only build select for id if not already created (e.g. AC, HE, EL, OX, MU)
	if (type == 'subject' && !document.getElementById('Div' + param) || type == 'series' && !document.getElementById('DivSeries' + param)) {
		var div;
		var attachPoint;
		
		if (document.createElement && ( div = document.createElement('div') )) {			
			if (type == 'subject') {
				// subject select
				div.id = 'Div' + param;
				// different attach points for 2nd level and 3rd level selects
				var outerDiv;
				if (param.length == 2) {
					// 2nd level (e.g. 'AC')
					attachPoint = document.getElementById("multiLevelDiv");
					outerDiv = document.createElement('div');
					outerDiv.id = 'outerDiv' + param;
					outerDiv.setAttribute('style', 'clear:both;');
					var leftColDiv = document.createElement('div');
					leftColDiv.id = 'leftcolumn';
					var rightColDiv = document.createElement('div');
					rightColDiv.id = 'rightcolumn';
					leftColDiv.appendChild(div);
					outerDiv.appendChild(leftColDiv);
					outerDiv.appendChild(rightColDiv);
					attachPoint.appendChild(outerDiv);
					attachPoint = div;
				
				} else {
					// 3rd level (e.g. 'ACAC') - get right col div within 2nd level outer div (e.g. <div id="rightcolumn">)
					if (param.substr(0,4) == 'ACHE') {
						// special case for Higher Education - param 'ACHE' should look for 'HE'
						outerDiv = document.getElementById("outerDivHE");
					} else {
						outerDiv = document.getElementById("outerDiv" + param.substr(0,2));
					}
					attachPoint = getElementById(outerDiv, "div", "rightcolumn");
					attachPoint.appendChild(div);
				}

			} else if (type == 'series') {
				// series select
				div.id = 'DivSeries' + param;
				attachPoint = document.getElementById("multiLevelDiv");
				var seriesDiv = document.createElement('div');
				seriesDiv.id = 'seriesDiv' + param;
				seriesDiv.setAttribute('style', 'clear:both;');
				seriesDiv.appendChild(div);
				attachPoint.appendChild(seriesDiv);
				attachPoint = div;
			}
						
			var br1 = document.createElement('br');						
			// add label
			var label = document.createTextNode(text);
			div.appendChild(label);
			div.appendChild(br1);

			// add select
			if (document.createElement && ( select = document.createElement('select') )) {
				if (type == 'subject') {
					select.name = 'Select' + param;
					select.id = 'Select' + param;
				} else if (type == 'series') {
					select.name = 'SelectSeries' + param;
					select.id = 'SelectSeries' + param;
				}
				// only add the onClick event for subject 1st level selects e.g. 'SelectAC', 'SelectHE' and NOT 'SelectACAC', 'SelectHEBU'
				if (type == 'subject' && param.length == 2) {
					select.onclick = function() {selectChanged(this);};
				} else {
					select.onclick = '';
				}
				select.setAttribute('multiple', 'multiple');
				select.setAttribute('size', '8');
				if (type == 'subject') {
					select.setAttribute('title', 'Press and hold \'Ctrl\' to select multiple subject areas');
				} else if (type == 'series') {
					select.setAttribute('title', 'Press and hold \'Ctrl\' to select multiple series');
				}
				div.appendChild(select);
				var br2 = document.createElement('br');						
				div.appendChild(br2);
			}
			// initially set visibility to false (display="none")
			changeDiv(div.id, "none");
		}
	}
	return select;
}

function getElementById(element, tagName, id) {
	if (element && tagName && id) {
		var elements = element.getElementsByTagName(tagName);
		for (i=0 ; i<elements.length ; i++) {
			if (elements[i].id == id) {
				return elements[i];
			}
		}
	}
	return null;
}

function buildOptionList(select, param, iframe) {
	if (iframe != null) {
		var fDoc = getDocumentByObject(iframe);
		if (fDoc != null) {
			// add default 'All' option
			var selOption = document.createElement("option");
			var text = document.createTextNode("All");
			selOption.appendChild(text);
			selOption.setAttribute("value", "*");
			selOption.selected="true";
			select.appendChild(selOption);
			
			var flOptions= fDoc.getElementsByTagName('option');
			for (l=0; l<flOptions.length; l++) {
	    		// strip the final 0's so 'ACHE1010000000' becomes 'ACHE1010'
				var value = tidyCode(flOptions[l].value);
				// don't insert an option for 'general' choice - this will be 2 char instead of 4 (same length code as the second-level option). OK for ELT Product Type
				if (param.search("ELTProduct")>-1 || value.length != param.length) {
					selOption = document.createElement("option");
					text = document.createTextNode(flOptions[l].text);
					selOption.appendChild(text);
					selOption.setAttribute("value", flOptions[l].value);
					select.appendChild(selOption);
				}
			}
		}
	}
}

// get a reference to the dynamically generated HTML within a iframe element by name
function getDocumentById(iframeId) {
	var oIframe = document.getElementById(iframeId);
	if (oIframe != null) { 
		var oDoc = getDocumentByObject(oIframe);
	  	if (oDoc.document) oDoc = oDoc.document;
	}
	return oDoc;
}

// get a reference to the dynamically generated HTML within a iframe element by iframe object
function getDocumentByObject(iframe) {
	var iframeDoc;
	if (iframe.contentDocument) {
		iframeDoc = iframe.contentDocument;
	} else if (iframe.contentWindow) {
		iframeDoc = iframe.contentWindow.document;
	} else if (window.frames[iframe.name]) {
		iframeDoc = window.frames[iframe.name].document;
	}
	return iframeDoc;
}

function getIframeDoc(iframe) {
	alert(iframe.id);
	var iframeDoc;
	if (iframe.contentDocument) {
		iframeDoc = iframe.contentDocument;
	} else if (iframe.contentWindow) {
		iframeDoc = iframe.contentWindow.document;
	} else if (window.frames[iframe.name]) {
		iframeDoc = window.frames[iframe.name].document;
	}
	return iframeDoc;
}

function getLabel(inputElem) {
	if (inputElem.parentNode) {
		if (inputElem.parentNode.tagName=='label') {
			return inputElem.parentNode.innerHTML;
		}
	}
	var labels=document.getElementsByTagName("label"), i;
	for (i=0 ; i<labels.length ; i++) {
		if (labels[i].htmlFor==inputElem.id) {
			return labels[i].innerHTML;
		}
	}
	return inputElem.name;
}
