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
      if (answers["searchType"] === "isbn") {
        form.elements["ISBN"].value = answers["isbn"] || "";
      } else if (answers["searchType"] === "quick") {
        form.elements["CATCO"].value = answers["catco"] || "";
      } else if (answers["searchType"] === "flexible") {
        form.elements["SCHBY"].value = answers["searchBy"] || "";
        if (answers["searchBy"] === "subject") {
          form.elements["SUBJ"].value = answers["subjectSelection"] || "";
        } else if (answers["searchBy"] === "series") {
          form.elements["SERIE"].value = answers["seriesSelection"] || "";
        }
      }
    }

    form.elements["BIND"].value = answers["BIND"] || "";
    form.elements["PRIF"].value = answers["fromPrice"] || "";
    form.elements["PRIT"].value = answers["toPrice"] || "";

    if (answers["DELIV"] === "ftp") {
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

   
    form.submit();
  };

  return (
    <div>
      <form ref={formRef} name="hiddenform" method="post" action="/cgi-bin/FormToStar.pl" style={{ display: "none" }}>
        
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
        
      </form>
      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  );
};

export default HiddenFormSubmit;
