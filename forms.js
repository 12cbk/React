function selectFormElement( formName, elementName ) {
	document.forms[formName].elements[elementName].checked="checked";
}

function setFormElementValue( formName, elementName, value ) {
	document.forms[formName].elements[elementName].value=value;
}

function setFormValues() {
	// pre-populate form elements where possible

	// user id set from EAC widget
	document.hiddenform.ERGHT.value = EAC_LOGIN_WIDGET.eacUserId;
        document.hiddenform.EACEM.value = EAC_LOGIN_WIDGET.eacUserName;
	// edit feed - set iframe source for Star record
	var feedId = urlParam('feed');
	if (feedId != null) {
		document.hiddenform.MTIME.value = feedId;
		var iframe = document.getElementById('fastLinkEdit');
		iframe.src = '/cgi-bin/starfinder/0?path=fastedit.txt&id=fastmyreps&pass=seya&search=' + feedId + '&format=WEBPREV2';
//		iframe.src = 'http://localhost/gb/static/staticEdit.html';
	}
}

function populateEdit() {
	// feed form values set from Star record
	var iframe = document.getElementById("fastLinkEdit");
	if (iframe) {
		var fDoc = getDocumentByObject(iframe);	
		if (fDoc) {
			var optionsList = fDoc.getElementsByTagName('option');
			if (optionsList != null && optionsList.length > 0) {
				var fieldValue;
				// Page1 - file-types
				fieldValue = getOptionValue(optionsList, "BESP");
				document.hiddenform.BESP.value = fieldValue;
				setRadio(document.fileTypesForm.BESP, fieldValue);
	
				// Common files
				fieldValue = getOptionValue(optionsList, "TXTYP");
				document.hiddenform.TXTYP.value = fieldValue;
				setCheckboxes(document.fileTypesForm, fieldValue);
				
				// Standard files
				fieldValue = getOptionValue(optionsList, "REPRT");
				document.hiddenform.REPRT.value = fieldValue;
				setRadio(document.fileTypesForm.oupType, fieldValue);
				//TODO split and set cover types
				if (fieldValue == "PDFFILES") {
					fieldValue = getOptionValue(optionsList, "PDFT");
					document.hiddenform.PDFT.value = fieldValue;
					setSelect(document.fileTypesForm.sampleTypes, fieldValue);
				}
	
				// Page2 - select-titles
				fieldValue = getOptionValue(optionsList, "CATCO");
				if (notEmpty(fieldValue)) {
					// title group selected
					setRadio(document.fileTypesForm.searchType, "quick");
					document.hiddenform.CATCO.value = fieldValue;
					setRadio(document.selectTitlesForm.catco, fieldValue);
	
				} else {
					fieldValue = getOptionValue(optionsList, "ISBN");
					if (notEmpty(fieldValue)) {
						// ISBN selected
						setRadio(document.fileTypesForm.searchType, 'isbn');
						document.hiddenform.ISBN.value = fieldValue;
						document.selectTitlesForm.ean.value = fieldValue;
	
					} else {
						// Subject / Series selected
						setRadio(document.fileTypesForm.searchType, 'flexible');
						fieldValue = getOptionValue(optionsList, "SCHBY");
						setRadio(document.selectTitlesForm.searchBy, fieldValue);
						document.hiddenform.SCHBY.value = fieldValue;
						
						// set the multi-level dropdowns
						fieldValue = getOptionValue(optionsList, "AREA");
						document.hiddenform.AREA.value = fieldValue;
						fieldValue = getOptionValue(optionsList, "SUBJ");
						document.hiddenform.SUBJ.value = fieldValue;
						fieldValue = getOptionValue(optionsList, "SERIE");
						document.hiddenform.SERIE.value = fieldValue;
						populateAllMultiSelects();
					}
				}			
	
				// Page3 - refine-selection
				fieldValue = getOptionValue(optionsList, "BIND");
				document.hiddenform.BIND.value = fieldValue;
				setSelect(document.refineSelectionForm.BIND, fieldValue);
				fieldValue = getOptionValue(optionsList, "PRIF");
				document.hiddenform.PRIF.value = fieldValue;
				if (fieldValue) document.refineSelectionForm.fromPrice.value = fieldValue;
				fieldValue = getOptionValue(optionsList, "PRIT");
				document.hiddenform.PRIT.value = fieldValue;
				if (fieldValue) document.refineSelectionForm.toPrice.value = fieldValue;
				fieldValue = getOptionValue(optionsList, "EPUB");
				if (notEmpty(fieldValue)) {
					setRadio(document.refineSelectionForm.pub_select, 'period');
					document.hiddenform.EPUB.value = fieldValue;
					setSelect(document.refineSelectionForm.EPUB, fieldValue);
				} else {
					fieldValue = getOptionValue(optionsList, "PUBF");
					if (notEmpty(fieldValue)) {
						setRadio(document.refineSelectionForm.pub_select, 'date_range');
						document.hiddenform.PUBF.value = fieldValue;
						document.refineSelectionForm.fromPub.value = fieldValue;
						fieldValue = getOptionValue(optionsList, "PUBT");
						document.hiddenform.PUBT.value = fieldValue;
						document.refineSelectionForm.toPub.value = fieldValue;
					} else {
						setRadio(document.refineSelectionForm.pub_select, 'no_date');
					}
				}
				fieldValue = getOptionValue(optionsList, "ANS");
				clearCheckboxes(document.refineSelectionForm);
				setCheckboxes(document.refineSelectionForm, fieldValue);
				document.hiddenform.ANS.value = fieldValue;
				
				// Page4 - choose-fields
				clearCheckboxes(document.chooseFieldsForm);
				fieldValue = getOptionValue(optionsList, "FLDS");
				setCheckboxes(document.chooseFieldsForm, fieldValue);
				document.hiddenform.FLDS.value = fieldValue;
				
				// Page5 - name-format-delivery
				fieldValue = getOptionValue(optionsList, "NAME"); // Data feed report name
				document.hiddenform.NAME.value = fieldValue;
				document.nameFormatDeliveryForm.NAME.value = fieldValue;
				fieldValue = getOptionValue(optionsList, "NAMED"); // Add a date stamp suffix to each file name
				document.hiddenform.NAMED.value = fieldValue;
				if (notEmpty(fieldValue) && (fieldValue == 'y' || fieldValue == 'Y')) {
					document.nameFormatDeliveryForm.dateStamp.checked = true;
				} else {
					document.nameFormatDeliveryForm.dateStamp.checked = false;
				}
				fieldValue = getOptionValue(optionsList, "TXTYP"); // File format
				document.hiddenform.TXTYP.value = fieldValue;
				setSelect(document.nameFormatDeliveryForm.format, fieldValue);
				fieldValue = getOptionValue(optionsList, "CHEAD"); // Include column header
				document.hiddenform.CHEAD.value = fieldValue;
				if (notEmpty(fieldValue) && fieldValue == 'y' || fieldValue == 'Y') {
					document.nameFormatDeliveryForm.colHeader.checked = true;
				} else {
					document.nameFormatDeliveryForm.colHeader.checked = false;
				}
				fieldValue = getOptionValue(optionsList, "FTPS");
				if (notEmpty(fieldValue)) {
					setRadio(document.nameFormatDeliveryForm.DELIV, 'ftp');
					setRadio(document.commonDeliveryForm.delivery, 'ftp');
					document.hiddenform.FTPS.value = fieldValue;
					document.nameFormatDeliveryForm.FTPS.value = fieldValue;
					document.commonDeliveryForm.FTPS.value = fieldValue;
					fieldValue = getOptionValue(optionsList, "FTPD");
					document.hiddenform.FTPD.value = fieldValue;
					document.nameFormatDeliveryForm.FTPD.value = fieldValue;
					document.commonDeliveryForm.FTPD.value = fieldValue;
					fieldValue = getOptionValue(optionsList, "FTPU");
					document.hiddenform.FTPU.value = fieldValue;
					document.nameFormatDeliveryForm.FTPU.value = fieldValue;
					document.commonDeliveryForm.FTPU.value = fieldValue;
					fieldValue = getOptionValue(optionsList, "FTPW");
					document.hiddenform.FTPW.value = fieldValue;
					document.nameFormatDeliveryForm.FTPW.value = fieldValue;
					document.commonDeliveryForm.FTPW.value = fieldValue;
				} else {
					setRadio(document.nameFormatDeliveryForm.DELIV, 'email');
				}
				fieldValue = getOptionValue(optionsList, "EMAIL");
				document.hiddenform.EMAIL.value = fieldValue;
				document.nameFormatDeliveryForm.EMAIL.value = fieldValue;
				document.commonDeliveryForm.EMAIL.value = fieldValue;
				fieldValue = getOptionValue(optionsList, "SCHED");
				document.hiddenform.SCHED.value = fieldValue;
				setSelect(document.nameFormatDeliveryForm.sched, fieldValue);
				fieldValue = getOptionValue(optionsList, "DELTA");
				document.hiddenform.DELTA.value = fieldValue;
				setRadio(document.nameFormatDeliveryForm.datasetOptions, fieldValue);
				fieldValue = getOptionValue(optionsList, "CNTRY");
				document.hiddenform.CNTRY.value = fieldValue;
				setSelect(document.nameFormatDeliveryForm.country, fieldValue);
			}
			setFooter();
		}
	}
}

function populateAllMultiSelects() {
	var areaDiv = document.getElementById('areaDiv');
	var values = document.hiddenform.AREA.value;
	// set Area of Publishing
	setMultiSelects(areaDiv, values);

	// set 1st level subjects and series
	var valueList = values.split(',');
	for (var i=0; i < valueList.length; i++) {
		populateMultiSelects('subject', tidyCode(valueList[i]));
		populateMultiSelects('series', tidyCode(valueList[i]));
	}
	// set 2nd level subjects
	values = document.hiddenform.SUBJ.value;
	valueList = values.split(',');
	for (var i=0; i < valueList.length; i++) {
		populateMultiSelects('subject', tidyCode(valueList[i]));
   	}
}

function tidyCode(code) {
	// strip the 0's so 'ACHE1010000000' becomes 'ACHE101'
	code = rTrim(code, '0');
	// make sure there is an even number of chars by adding an extra 0 if necessary - 'ACHE101' becomes 'ACHE1010'
	if (code.length % 2 != 0) code = code + '0';
	return code;	
}

function populateMultiSelects(type, param) {
	var div;
	if (type == 'subject') {
		div = document.getElementById('Div' + param);	
	} else if (type == 'series') {
		div = document.getElementById('DivSeries' + param);
	}
	var iframe = document.getElementById("fastLinkEdit");
	var fDoc = getDocumentByObject(iframe);
	if (fDoc && div) {
		var optionsList = fDoc.getElementsByTagName('option');
		if (optionsList && optionsList.length > 0) {
			var fieldValue;
			if (type == 'subject') {
				if (param == 'ELTProductType') {
					fieldValue = getOptionValue(optionsList, "PTYPE");
				} else {
					fieldValue = getOptionValue(optionsList, "SUBJ");
				}
			} else if (type == 'series') {
				fieldValue = getOptionValue(optionsList, "SERIE");
			}
			if (fieldValue) {
				setMultiSelects(div, fieldValue);
			}
		}
	}
}

function getOptionValue(options, text) {
	for(var i=0 ; i<options.length ; i++)
		if (options[i].innerHTML == text && options[i].value != null && options[i].value != "")
			return options[i].value;
	return null;	
}

function submitTheInfo() {
	// Page1 - file-types
	document.hiddenform.BESP.value = getRadio(document.fileTypesForm.BESP);
	if (getStyleObject("standardDiv").display == "block") {
		document.hiddenform.REPRT.value = getRadio(document.fileTypesForm.oupType);
		if (getStyleObject("coverDiv").display == "block") {
			document.hiddenform.REPRT.value = document.hiddenform.REPRT.value + getSelect(document.fileTypesForm.imageQuality);
		}
		if (getStyleObject("sampleDiv").display == "block") {
			document.hiddenform.PDFT.value = getSelect(document.fileTypesForm.sampleTypes);
		}
	}
	if (getStyleObject("commonDiv").display == "block") {
		var commonFiles = "";
		var checkboxes = commonDiv.getElementsByTagName("input");
		for (var i=0; i<checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				commonFiles +=  checkboxes[i].value + ',';
			}
		}
		document.hiddenform.TXTYP.value = commonFiles;
	}
	document.hiddenform.STYPE.value = getRadio(document.fileTypesForm.searchType);

	// Page2 - select-titles
	document.hiddenform.ISBN.value = "";
	document.hiddenform.CATCO.value = "";
	document.hiddenform.SERIE.value = "";
	document.hiddenform.SUBJ.value = "";
	document.hiddenform.SUBJ2.value = "";
	document.hiddenform.PTYPE.value = "";

	if (getStyleObject("titleGroupDiv").display == "block") {
		// quick search by title group or catalogue
		document.hiddenform.CATCO.value = getRadio(document.selectTitlesForm.catco);
		
	} else if (getStyleObject("isbnDiv").display == "block") {
		// search for individual isbns
		document.hiddenform.ISBN.value = document.selectTitlesForm.ean.value;
		
	} else if (getStyleObject("areaDiv").display == "block") {
		// flexible search by subject or series		
		var multiLevelDiv = document.getElementById("multiLevelDiv");
		var areaList = new List();
		var subjectList = new List();
		var EPTList = new List();
		
		var subjectDivs = multiLevelDiv.getElementsByTagName("div");
		for (var i=0; i<subjectDivs.length; i++) {
			if (getStyleObject(subjectDivs[i].id).display == "block"  && subjectDivs[i].id.search("outerDiv") < 0 && 
					subjectDivs[i].id != "leftcolumn" && subjectDivs[i].id != "rightcolumn") {
				var select = subjectDivs[i].getElementsByTagName("select")[0];
				var newList = getMultiSelect(select);
				for (var j=0 ; j<newList.size() ; j++) {
					if (subjectDivs[i].id == 'areaDiv') {
						areaList.add(newList.get(j));
					} else if (subjectDivs[i].id == 'DivELTProductType') {
						EPTList.add(newList.get(j));
					} else {
						subjectList.add(newList.get(j));
					}
				}
			}
		}
		document.hiddenform.SCHBY.value = getRadio(document.selectTitlesForm.searchBy);
		// set unfiltered list as AREA2
		document.hiddenform.AREA2.value = areaList.toCSV();
		// set filtered list as AREA
		areaList = filterTopAreas(areaList, subjectList);
		document.hiddenform.AREA.value = areaList.toCSV();
		if (document.hiddenform.SCHBY.value == 'subject') {
			document.hiddenform.PTYPE.value = EPTList.toCSV();
			// set unfiltered list as SUBJ2
			document.hiddenform.SUBJ2.value = subjectList.toCSV();
			subjectList = filterTopSubjects(subjectList);
			// set filtered list as SUBJ
			document.hiddenform.SUBJ.value = subjectList.toCSV();
			// clear series;
			document.hiddenform.SERIE.value = "";
		} else if (document.hiddenform.SCHBY.value == 'series') {
			// set unfiltered list as SERIE
			document.hiddenform.SERIE.value = subjectList.toCSV();
			// clear subject;
			document.hiddenform.SUBJ.value = "";
			document.hiddenform.SUBJ2.value = "";
			document.hiddenform.PTYPE.value = "";
		}
	}

	// Page3 - refine-selection
	document.hiddenform.BIND.value = getSelect(document.refineSelectionForm.BIND);
	document.hiddenform.PRIF.value = document.refineSelectionForm.fromPrice.value;
	document.hiddenform.PRIT.value = document.refineSelectionForm.toPrice.value;
	if (getStyleObject("pubPeriodDiv").display == "block") {
		document.hiddenform.EPUB.value = getSelect(document.refineSelectionForm.EPUB);
	} else {
		document.hiddenform.EPUB.value = "";
	}
	if (getStyleObject("fixedDateFromDiv").display == "block") {
		document.hiddenform.PUBF.value = document.refineSelectionForm.fromPub.value;
	} else {
		document.hiddenform.PUBF.value = "";
	}
	if (getStyleObject("fixedDateToDiv").display == "block") {
		document.hiddenform.PUBT.value = document.refineSelectionForm.toPub.value;
	} else {
		document.hiddenform.PUBT.value = "";
	}
	// do not set availability status for ISBN search
	if (getRadio(document.fileTypesForm.searchType) == "isbn") {
		document.hiddenform.ANS.value = "";
	} else {
		var availabilityStatusses = "";
		var availDiv = document.getElementById("availabilityStatus");
		var checkboxes = availDiv.getElementsByTagName("input");
		for (var i=0; i<checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				availabilityStatusses +=  checkboxes[i].value + ',';
			}
		}
		document.hiddenform.ANS.value = availabilityStatusses;
	}

	// Page4 - choose-fields
	var fields = "";
	var fieldFS = document.getElementById("fields");
	var checkboxes = fieldFS.getElementsByTagName("input");
	for (var i=0; i<checkboxes.length; i++) {
		if (checkboxes[i].checked && checkboxes[i].id.match('BIC') == null) {
			// don't include BIC fields here
			fields += checkboxes[i].value + ',';
		}
	}
	// now add BIC fields
	if (document.chooseFieldsForm.bicCodes.value == 'separate') {
		// if option 'Send each subject code as a separately delimited field' is selected then change value of field 'Subject according to BIC version 2' from 'XB3' to 'XG1'
		document.chooseFieldsForm.BIC2.value='XG1';
	} else {
		document.chooseFieldsForm.BIC2.value='XB3';
	}
	for (var i=0; i<checkboxes.length; i++) {
		if (checkboxes[i].checked && checkboxes[i].id.match('BIC') != null) {
			fields += checkboxes[i].value + ',';
		}
	}
	document.hiddenform.FLDS.value = fields;

	// Page5a - name-format-delivery
	if (getRadio(document.fileTypesForm.BESP) == "standard") {
		document.hiddenform.NAME.value = document.nameFormatDeliveryForm.NAME.value;
	}
	if (document.nameFormatDeliveryForm.dateStamp.checked) {
		document.hiddenform.NAMED.value = "Y";
	} else {
		document.hiddenform.NAMED.value = "N";
	}
	if (getStyleObject("commonDiv").display != "block") {
		document.hiddenform.TXTYP.value = getSelect(document.nameFormatDeliveryForm.format);
	}
	if (document.nameFormatDeliveryForm.colHeader.checked) {
		document.hiddenform.CHEAD.value = "Y";
	} else {
		document.hiddenform.CHEAD.value = "N";
	}
	document.hiddenform.EMAIL.value = document.nameFormatDeliveryForm.EMAIL.value;
	document.commonDeliveryForm.EMAIL.value = document.nameFormatDeliveryForm.EMAIL.value;
	
	if (getStyleObject("ftpDiv").display == "block") {
		document.hiddenform.DELIV.value = 'FTP';
		document.hiddenform.FTPS.value = document.nameFormatDeliveryForm.FTPS.value;
		document.hiddenform.FTPD.value = document.nameFormatDeliveryForm.FTPD.value;
		document.hiddenform.FTPU.value = document.nameFormatDeliveryForm.FTPU.value;
		document.hiddenform.FTPW.value = document.nameFormatDeliveryForm.FTPW.value;
	} else {
		document.hiddenform.DELIV.value = 'Email';
		document.hiddenform.FTPS.value = "";
		document.hiddenform.FTPD.value = "";
		document.hiddenform.FTPU.value = "";
		document.hiddenform.FTPW.value = "";
	}
	
	document.hiddenform.SCHED.value = getSelect(document.nameFormatDeliveryForm.sched);
	document.hiddenform.DELTA.value = getRadio(document.nameFormatDeliveryForm.datasetOptions);
	document.hiddenform.CNTRY.value = getSelect(document.nameFormatDeliveryForm.country);

	// Page5b - common-delivery
	if (getStyleObject("commonDiv").display == "block") {
		document.hiddenform.NAME.value = "OUP All Title Reports";
		document.hiddenform.SCHED.value = "weekly";
		document.hiddenform.NAMED.value = "N";
		document.hiddenform.CHEAD.value = "N";

		if (getStyleObject("commonEmailDiv").display == "block") {
			document.hiddenform.DELIV.value = 'Email';
			document.hiddenform.EMAIL.value = document.commonDeliveryForm.EMAIL.value;
		}
		if (getStyleObject("commonFtpDiv").display == "block") {
			document.hiddenform.DELIV.value = 'FTP';
			document.hiddenform.FTPS.value = document.commonDeliveryForm.FTPS.value;
			document.hiddenform.FTPD.value = document.commonDeliveryForm.FTPD.value;
			document.hiddenform.FTPU.value = document.commonDeliveryForm.FTPU.value;
			document.hiddenform.FTPW.value = document.commonDeliveryForm.FTPW.value;
		}
	}
//	alert('submitting email: ' + document.hiddenform.EMAIL.value + ', EAC id: ' + document.hiddenform.ERGHT.value);
	document.hiddenform.submit();
}

function getRadio(radio) {
	for (var i=0; i < radio.length; i++) {
   		if (radio[i].checked) {
      		return radio[i].value;
      	}
   	}
	return null;
}
function setRadio(radio, value) {
//	alert('selecting radio with value: ' + value);
	if (radio && value) {
		for (var i=0; i < radio.length; i++) {
	   		if (radio[i].value == value) {
	      		radio[i].checked = 'checked';
//	      		alert('about to call click for: ' + radio[i].name + ', ' + radio[i].value)
	      		radio[i].click();
	      	}
	   	}
	}
}
function clearCheckboxes(form) {
	if (form) {
	    for (var i=0; i<form.elements.length; i++ ) {
	        if (form.elements[i].type == 'checkbox') {
            	form.elements[i].checked = false;
	        }
	    }
	}
}
function setCheckboxes(form, values) {
	if (form && values) {
		var valueList = values.split(',');
		for (var i=0; i < valueList.length; i++) {
			setCheckbox(form, valueList[i]);
	   	}
	}
}
function setCheckbox(form, value) {
	if(form && value) {
	    for (var i=0; i<form.elements.length; i++ ) {
	        if (form.elements[i].type == 'checkbox') {
	            if (form.elements[i].value == value) {
	            	form.elements[i].checked = true;
			    }
	        }
		}
	}
}
function clearCheckbox(form, name) {
	if(form && name) {
	    for (var i=0; i<form.elements.length; i++ ) {
	        if (form.elements[i].type == 'checkbox') {
	            if (form.elements[i].name == name) {
	            	form.elements[i].checked = false;
			    }
	        }
		}
	}
}
function getSelect(select) {
	for (var i=0; i < select.options.length; i++) {
   		if (select.options[i].selected) {
      		return select.options[i].value;
      	}
   	}
	return null;
}
function setSelect(select, value) {
	if(select && value) {
		for (var i=0; i < select.options.length; i++) {
	   		if (select.options[i].value == value) {
	      		select.options[i].selected = true;
	      	} else {
	      		select.options[i].selected = false;
	      	}
	   	}
		select.onclick();
	}
}
function getMultiSelect(select) {
	var optionList = new List();
	for (var i=0; i < select.options.length; i++) {
   		if (select.options[i].selected && select.options[i].value != "*") {
      		optionList.add(select.options[i].value);
      	}
   	}
	return optionList;
}
function setMultiSelects(div, values) {
	if (div && values) {
		var valueList = values.split(',');
		if(valueList.length > 0) {
			// deselect 'All' option
			setMultiSelect(div, '*', false);
		}
		for (var v=0; v < valueList.length; v++) {
			setMultiSelect(div, valueList[v], true);
	   	}
	}
}
function setMultiSelect(div, value, flag) {
	if (div && value) {
		var options = div.getElementsByTagName('option');
	    for (var o=0; o<options.length; o++ ) {
		    if (options[o].value == value) {
	            options[o].selected = flag;
	            if (options[o].parentNode.onclick) {
					options[o].parentNode.onclick();
	            }
	            if (flag) {
					// display dropdown
					changeDiv(div.id, 'block');
	            }
			}
		}
	}
}

function filterTopAreas(areaList, subjectList) {
	var toRemoveAreas = new List();
	for (var a=0 ; a<areaList.size() ; a++) {
		if (subjectList.matches(areaList.get(a), 0)) {
			toRemoveAreas.add(areaList.get(a));
		}
	}
	for (var b=0 ; b<toRemoveAreas.size() ; b++) {
		areaList.removeItem(toRemoveAreas.get(b));
	}
	return areaList;	
}

function filterTopSubjects(subjectList) {
	var toRemove = new List();
	subjectList.sort();
	for (var i=0 ; i<subjectList.size() ; i++) {
		if (subjectList.matches(subjectList.get(i), i+1)) {
			toRemove.add(subjectList.get(i));
		}
	}
	for (var j=0 ; j<toRemove.size() ; j++) {
		subjectList.removeItem(toRemove.get(j));
	}
	return subjectList;	
}

function debug(str) {
	document.hiddenform.debug.value = document.hiddenform.debug.value + '\n' + str;
}
