import React, { useRef } from 'react';

const HiddenFormSubmit = ({ answers }) => {
  const formRef = useRef();



 

  const handleSubmit = () => {
    const form = formRef.current;
    if (!form) return;

    
    form.elements["BESP"].value = answers["BESP"] || "";

   if (answers["BESP"] === "standard") {  
  let reprtValue = answers["oupType"] || "";
  if (answers["oupType"] === "COVERS" && answers["imageQuality"]) {  
    reprtValue += answers["imageQuality"];
  }
  form.elements["REPRT"].value = reprtValue;
  if (answers["oupType"] === "PDFFILES" && answers["sampleTypes"]) {  
    form.elements["PDFT"].value = answers["sampleTypes"];
  }
}

    if (answers["BESP"] === "common") {  
  const selectedCommonFiles = answers["filetype"] || [];  
  form.elements["TXTYP"].value = selectedCommonFiles.join(',');
}


    if (answers["searchType"]) {
      form.elements["STYPE"].value = answers["searchType"];
      if(form.elements["STYPE"].value ==="bisac"){
        form.elements["STYPE"].value = "flexible";
        form.elements["SCHBY"].value="bisac";
      }
      
    }

  form.elements["ISBN"].value = "";
  form.elements["BISAC"].value = "";
  form.elements["CATCO"].value = "";
  form.elements["SERIE"].value = "";
  form.elements["SUBJ"].value = "";
  form.elements["SUBJ2"].value = "";

  if (answers["searchType"] === "quick") {
    form.elements["CATCO"].value = answers["catco"];
  }

  if (answers["searchType"] === "isbn") {
    form.elements["ISBN"].value = answers["isbn"]; //todo
  }

  if (answers["searchType"] === "flexible") {
    form.elements["ISBN"].value = answers["isbn"]; //todo
  }

  if (form.elements["SCHBY"].value  != "bisac") {
			form.elements["SCHBY"].value  = answers["searchBy"]; 
		}

    form.elements["BIND"].value = answers["BIND"] || "";
    form.elements["PRIF"].value = answers["fromPrice"] || "";
    form.elements["PRIT"].value = answers["toPrice"] || "";

    if (answers["DELIV"] === "ftp") {//todo, check if it is correct
      form.elements["DELIV"].value = "FTP";
      form.elements["FTPS"].value = answers["ftpServer"] || "";
      form.elements["FTPD"].value = answers["ftpDir"] || "";
      form.elements["FTPU"].value = answers["ftpUser"] || "";
      form.elements["FTPW"].value = answers["ftpPass"] || "";
    } else {
      form.elements["DELIV"].value = "Email";
      form.elements["EMAIL"].value = answers["email"] || "";
    }

    form.elements["SCHED"].value = answers["sched"] || "";
    form.elements["DELTA"].value = answers["datasetOptions"] || "";

    
  // Step 1: Collect selection-* keys
  const selectionKeys = Object.keys(answers).filter(key => key.startsWith('selection-'));

  // Step 2: Merge all values from those keys
  const combinedList = selectionKeys.flatMap(key => answers[key]);
  console.log("Combined List:", combinedList);

  // Step 3: Sort and apply trim logic
  combinedList.sort();
  const trimmed = combinedList.map(x => x.replace(/0+$/, ''));
  const resultList = [];

  for (let i = 0; i < trimmed.length - 1; i++) {
    if (trimmed[i + 1].startsWith(trimmed[i])) {
      resultList.push(combinedList[i]);
    }
  }

  // Always add the last element
  if (combinedList.length > 0) {
    resultList.push(combinedList[combinedList.length - 1]);
  }

  // Step 4: Assign to SUBJ2 field (comma separated string)  

  form.elements["SUBJ2"].value = resultList.join(',');

  if (answers["BESP"]  === "standard") {
		form.elements["NAME"].value= answers["name"];
	}	
	form.elements["NAMED"].value =  answers["NAMED"];
	
  
  if (answers["BESP"] !== "common") {
		form.elements["TXTYP"].value= answers["format"];
	}	
  form.elements["CHEAD"].value= answers["CHEAD"];
	


  form.elements["SCHED"].value= answers["sched"];
	form.elements["DELTA"].value== answers["searchType"];
	form.elements["CNTRY"].value== answers["country"];

  if (answers["BESP"] === "common") {
		form.elements["NAME"].value = "OUP All Title Reports";		
		form.elements["SCHED"].value = "weekly";
		form.elements["NAMED"].value = "N";
		form.elements["CHEAD"].value = "N";}

		if (answers["DELIV"]==="email") {
			form.elements["DELIV"].value = 'Email';
			form.elements["EMAIL"].value = answers["mail"];      
		  form.elements["FTPS"].value= "";
		  form.elements["FTPD"].value= "";
		  form.elements["FTPU"].value = "";
		  form.elements["FTPW"].value = "";
		}
		if (answers["DELIV"]==="ftp") {
			form.elements["DELIV"].value = 'FTP';
			form.elements["FTPS"].value = answers["FTPSERV"];
			form.elements["FTPD"].value= answers["FTPDIR"];
			form.elements["FTPU"].value = answers["FTPUSR"];
			form.elements["FTPW"].value = answers["FTPPWD"];
		}
	

  form.submit();
  };

  return (
    <div>
      <form ref={formRef} name="hiddenform" method="post" action="/cgi-bin/FormToStar.pl" style={{ display: "none" }}>
        <input type="hidden" name="TXTYP" />
        <input type="hidden" name="BESP" />
        <input type="hidden" name="REPRT" />
        <input type="hidden" name="PDFT" />
        <input type="hidden" name="STYPE" />
        <input type="hidden" name="CATCO" />
        <input type="hidden" name="ISBN" />
        <input type="hidden" name="SCHBY" />
        <input type="hidden" name="SUBJ" />
        <input type="hidden" name="SERIE" />
        <input type="hidden" name="BIND" />
        <input type="hidden" name="PRIF" />
        <input type="hidden" name="PRIT" />
        <input type="hidden" name="DELIV" />
        <input type="hidden" name="EMAIL" />
        <input type="hidden" name="FTPS" />
        <input type="hidden" name="FTPD" />
        <input type="hidden" name="FTPU" />
        <input type="hidden" name="FTPW" />
        <input type="hidden" name="SCHED" />
        <input type="hidden" name="DELTA" />
        <input type="hidden" name="BISAC" />
<input type="hidden" name="SUBJ2" />
        
        
      </form>
      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  );
};

export default HiddenFormSubmit;
