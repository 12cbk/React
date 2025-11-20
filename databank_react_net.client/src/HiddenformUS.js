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
}

    if (answers["BESP"] === "common") {  
  const selectedCommonFiles = answers["filetype"] || [];  
  form.elements["TXTYP"].value = selectedCommonFiles.join(',');
}

 form.elements["STYPE"].value = answers["searchType"];
 

 if(form.elements["STYPE"].value ==="bisac")
{
       form.elements["STYPE"].value = "flexible";
       form.elements["SCHBY"].value="bisac";
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
    form.elements["ISBN"].value = answers["EAN"]; 
  }

  if (answers["searchType"] === "bisac") {
    form.elements["BISAC"].value = answers["bisac"]; 
  }

  if (answers["searchType"] === "flexible") {
    form.elements["SCHBY"].value = answers["searchBy"];
    // form.elements["AREA2"].value = arealist;
    let selectionKeys;
    if (answers["searchBy"] == 'subject'){
       selectionKeys = Object.keys(answers).filter(key => key.startsWith('selection-'));
    }
    else if(answers["searchBy"] == 'series'){
      selectionKeys = Object.keys(answers).filter(key => key.startsWith('series-'));
    }   

  const combinedList = selectionKeys.flatMap(key => answers[key]).filter(v =>v !== "*");
  //console.log("combinedList", combinedList);
combinedList.sort();

// Step 2: Prepare a filtered list
const filteredList = [];

for (let i = 0; i < combinedList.length; i++) {
  // Trim trailing zeros
  let valueToMatch = combinedList[i].replace(/0+$/, '');
  // Pad with '0' if odd length
  if (valueToMatch.length % 2 !== 0) valueToMatch += '0';

  let isPrefix = false;
  // Check if any *later* code starts with this one
  for (let j = i + 1; j < combinedList.length; j++) {
    let matchAgainst = combinedList[j].replace(/0+$/, '');
    if (matchAgainst.length % 2 !== 0) matchAgainst += '0';
    if (matchAgainst.startsWith(valueToMatch)) {
      isPrefix = true;
      break;
    }
  }
  // Only keep if not a prefix of any later code
  if (!isPrefix) {
    filteredList.push(combinedList[i]);
  }
}
//console.log("filteredList", combinedList);
form.elements["AREA2"].value = filteredList.join(',');
form.elements["AREA"].value = filteredList.join(',');
  if(answers["searchBy"] == 'subject'){
    form.elements["PTYPE"].value = answers["selection-right-EL-abc"] || "";
    form.elements["SUBJ"].value = filteredList.join(','); 
    form.elements["SUBJ2"].value = combinedList.sort().join(','); 
    form.elements["SERIE"].value = "";
  }
  else if(answers["searchBy"] == 'series'){
    form.elements["PTYPE"].value = "";
    form.elements["SUBJ"].value = "";
    form.elements["SUBJ2"].value = "";
    form.elements["SERIE"].value = filteredList.join(',');

  }
    

  
  } 

 
//page 3
    form.elements["BIND"].value = answers["BIND"] || "";
    form.elements["PRIF"].value = answers["fromPrice"] || "";
    form.elements["PRIT"].value = answers["toPrice"] || "";
    if (answers["pub_select"]==="period"){
      form.elements["EPUB"].value = answers["EPUB"];
    }
    else{
      form.elements["EPUB"].value = "";
    }
    if(answers["pub_select"]==="date_range"){
      form.elements["PUBF"].value = answers["PUBF"] || "";
      form.elements["PUBT"].value = answers["PUBT"] || "";
    }

    if (answers["searchType"] === "isbn") {
    form.elements["ANS"].value = ""
  }
  else{
    const av = answers["availability"];
    //console.log("availability", av);
    form.elements["ANS"].value = Array.isArray(av) ? av.join(",") : (av ? String(av) : "");
  }

  const fieldsArr = [];
    Object.keys(answers || {}).forEach((k) => {
      if (!k.startsWith("custom")) return;
      const v = answers[k];
      if (Array.isArray(v)) {
        v.forEach((item) => {
          if (item != null && item !== "") fieldsArr.push(String(item));
        });
      } else if (v != null && v !== "") {
        fieldsArr.push(String(v));
      }
    });    
    
    const hasXB3 = fieldsArr.includes("XB3");
    const hasXB2 = fieldsArr.includes("XB2");   
    form.elements["DELIM"].value = '';
    const filteredArr = fieldsArr.filter(item => item !== "XB3" && item !== "XB2");    
    
    if (hasXB3) {
      filteredArr.push("XB3");
    }    
    
    if (hasXB2) {
      filteredArr.push("XB2");
      console.log("cs value", answers["cs"]);
      form.elements["DELIM"].value = answers["cs"];
    }
    
    const fields = filteredArr.join(",");   
    form.elements["FLDS"].value = fields;

    //Page 5
    

  if (answers["BESP"]  === "standard") {
        form.elements["NAME"].value= answers["NAME"];
    }	

    let named = answers.NAMED;
    form.elements["NAMED"].value =  (Array.isArray(named) ? named.includes("Y") : named === "Y") ? "Y" : "N";
    
  
  if (answers["BESP"] !== "common" && answers["oupType"] !== "custom") {
        form.elements["TXTYP"].value= answers["format"];
    }	
  
let col = answers.COLHEADER;
form.elements["CHEAD"].value = (Array.isArray(col) ? col.includes("Y") : col === "Y") ? "Y" : "N";

  form.elements["EMAIL"].value= answers["mail"];


  
    form.elements["SCHED"].value = answers["sched"] || "";
    form.elements["DELTA"].value = answers["DELTA"] || "";
    // form.elements["CNTRY"].value= answers["country"];

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

  if (answers["BESP"] === "common") {
        form.elements["NAME"].value = "OUP All Title Reports";		
        form.elements["SCHED"].value = "weekly";
        form.elements["NAMED"].value = "N";
        form.elements["CHEAD"].value = "N";
        form.elements["STYPE"].value = "quick";
        form.elements["CATCO"].value = "all";        
        
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
      <form ref={formRef} name="hiddenform" method="post" action="/cgi-bin/form.pl" style={{ display: "none" }}>
       <input type="hidden" name="PTYPE" defaultValue="" />
        <input type="hidden" name="NAMED" defaultValue="" />
        <input type="hidden" name="CHEAD" defaultValue="" />
        <input type="hidden" name="NAME" defaultValue="" />
        <input type="hidden" name="CNTRY" defaultValue="" />
        <input type="hidden" name="FLDS" defaultValue="" />
        <input type="hidden" name="TXTYP" defaultValue="" />
        <input type="hidden" name="BESP" defaultValue="" />
        <input type="hidden" name="REPRT" defaultValue="" />
        <input type="hidden" name="PDFT" defaultValue="" />
        <input type="hidden" name="STYPE" defaultValue="" />
        <input type="hidden" name="CATCO" defaultValue="" />
        <input type="hidden" name="ISBN" defaultValue="" />
        <input type="hidden" name="SCHBY" defaultValue="" />
        <input type="hidden" name="DELIM" defaultValue="" />
        <input type="hidden" name="SUBJ" defaultValue="" />
        <input type="hidden" name="SERIE" defaultValue="" />
        <input type="hidden" name="BIND" defaultValue="" />
        <input type="hidden" name="PRIF" defaultValue="" />
        <input type="hidden" name="PRIT" defaultValue="" />
        <input type="hidden" name="EPUB" defaultValue=""/>
        <input type="hidden" name="PUBF" defaultValue=""/>
        <input type="hidden" name="PUBT" defaultValue=""/>
      <input type="hidden" name="ANS" defaultValue=""/>
      <input type="hidden" name="NAME" defaultValue=""/>
        <input type="hidden" name="DELIV" defaultValue="" />
        <input type="hidden" name="EMAIL" defaultValue="" />
        <input type="hidden" name="FTPS" defaultValue="" />
        <input type="hidden" name="FTPD" defaultValue="" />
        <input type="hidden" name="FTPU" defaultValue="" />
        <input type="hidden" name="FTPW" defaultValue="" />
        <input type="hidden" name="SCHED" defaultValue="" />
        <input type="hidden" name="DELTA" defaultValue="" />
        <input type="hidden" name="BISAC" defaultValue="" />
        <input type="hidden" name="SUBJ2" defaultValue="" />
        
      </form>
      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  );
};

export default HiddenFormSubmit;
