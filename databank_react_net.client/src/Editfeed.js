
export function Editfeed(html) {
  if (!html) return {};
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const optionsList = Array.from(doc.getElementsByTagName("option"));

    const getOptionValue = (key) => {         
      const opt = optionsList.find((o) => {
        const v = (o.getAttribute("value") ?? "").toString().toLowerCase();
        const t = (o.textContent || "").toString().toLowerCase();
        return v.includes(key.toLowerCase()) || t.includes(key.toLowerCase());
      });

      if (!opt) return "";      
      const attr = opt.getAttribute("value");
      if (attr !== null) {        
        return attr;
      }
      
      return opt.textContent.trim();
    };

    // keys you care about (extend as needed)
    const answers = {};
    const besp = getOptionValue("BESP");
    if (besp) answers.BESP = besp;

    const txtyp = getOptionValue("TXTYP");
    if (txtyp) {
      // normalize multi-values into array
      const arr = txtyp.includes(",") ? txtyp.split(",") : txtyp.includes("|") ? txtyp.split("|") : [txtyp];
      answers.filetype = arr.map(s => s.trim()).filter(Boolean);
    }
    let reprt = getOptionValue("REPRT");
    if (reprt) answers.oupType = reprt;
    if (reprt == "PDFFILES") {
					reprt = getOptionValue("PDFT");					
                    answers.sampleTypes = reprt;
				}
        else if(reprt == "COVERS"){
            reprt = getOptionValue("imageQuality");					
            answers.imageQuality = reprt;
        }
        console.log("Extracted oupType:",  getOptionValue("imageQuality"));
    const cat = getOptionValue("CATCO");
    if (cat) {
        answers.searchType = "quick";
        answers.catco = cat;
    }
    else {
        const isbn= getOptionValue("ISBN");
        if (isbn) {
            answers.searchType = "isbn"; 
            answers.EAN = isbn;
        }
        else{
        answers.searchType = "flexible";
        answers.searchBy = getOptionValue("SCHBY");
        let fieldValue = getOptionValue("AREA");
            answers.displayCardSelection = fieldValue;
            if (fieldValue || fieldValue === "") {
                answers.displayCardSelection = fieldValue
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean);
            }
             const subjRaw = getOptionValue("SUBJ");
  if (subjRaw) {
    const subjItems = subjRaw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const areas = Array.isArray(answers.displayCardSelection)
      ? answers.displayCardSelection
      : (String(getOptionValue("AREA") || "").split(',').map(s => s.trim()).filter(Boolean));

    areas.forEach(area => {
      if (!area) return;
        let upArea = area.toUpperCase();
        if (upArea === "HE") upArea = "ACHE";
      const matches = subjItems.filter(code => {
          const c = String(code || "").toUpperCase();
          if (upArea === "ACHE") {
              console.log("test subj", c, upArea)
          }

          // must start with area (first 2 letters) and have at least 4 chars
          if (!c.startsWith(upArea)) return false;
          
          if (upArea ==="ACHE"&& c.startsWith(upArea)) {
              let rest = c.slice(6);
              console.log("inside lop", rest);
              return /^0+$/.test(rest);
          }
          const rest = c.slice(4);
          console.log("subj value", rest);
          // rest must be all zeros and first4 exists (you can also ensure first4 !== '0000' if needed)
          return /^0+$/.test(rest);
             
         
      });

      if (matches.length > 0) {
        
          answers[`selection-${area}`] = matches;
          if (area === "EL") {
              const key = `selection-${area}`;
              
              // Add "ABC" only if it's not already present
              if (!answers[key].includes("abc")) {
                  answers[key].push("abc");
              }
          }
          matches.forEach(fullCode => {
              // Derive the prefix used by your Selection component:
              // displaycard slices childKey to get slicedChildKey: usually first 4 chars,
              // but for ACHE it expects first 6 chars.
              let childPrefix = fullCode.slice(0, 4);
              if (childPrefix === "ACHE") {
                  childPrefix = fullCode.slice(0, 6);
              }

              // Right-side options are codes that start with the childPrefix but are not the top-level code (i.e. rest not all zeros)
              const rightMatches = subjItems.filter(code => {
                  if (!code.startsWith(childPrefix)) return false;
                  const rest = code.slice(childPrefix.length);
                  // exclude codes that are all zeros (those are top-level); keep the rest
                  return !/^0+$/.test(rest);
              });

              if (rightMatches.length > 0) {
                  // store selected right-values for this parent/child combination
                  // key format matches the rest of your app: selection-right-<AREA>-<childKey>
                  answers[`selection-right-${area}-${fullCode}`] = rightMatches;
              } else {
                  // Ensure key exists (empty array) so UI can read it safely
                  answers[`selection-right-${area}-${fullCode}`] = [];
              }
          });
      }
    });
  }
    }}
    
            let fieldValue = getOptionValue("BIND");
            if (fieldValue) {answers.BIND = fieldValue;}
            
            fieldValue = getOptionValue("PRIF");
            if (fieldValue) answers.fromPrice = fieldValue;
            fieldValue = getOptionValue("PRIT");
            if (fieldValue) answers.toPrice = fieldValue;

            fieldValue = getOptionValue("EPUB");
            if (fieldValue && fieldValue !== "") {
                answers.pub_select = "period"
                answers.EPUB = fieldValue;
            }
            else{
                fieldValue = getOptionValue("PUBF");
                {
                    if (fieldValue) {
                        answers.pub_select = "date_range";
                        answers.PUBF = fieldValue;
                        fieldValue = getOptionValue("PUBT");
                        answers.PUBT = fieldValue;
                    }
                    else{
                        answers.pub_select = "no_date";
                    }
                }

              
            fieldValue = getOptionValue("ANS");
				console.log("Extracted ANS value:", fieldValue);
            if (fieldValue && fieldValue !== "") {
                const availArray = fieldValue.includes(",") ? fieldValue.split(",") : [fieldValue];
                answers.availability = availArray.map(s => s.trim()).filter(Boolean);
            }}

            fieldValue = getOptionValue("FLDS");
				console.log("Extracted FLDS value:", fieldValue);
            if (fieldValue && fieldValue !== "") {
                const availArray = fieldValue.includes(",") ? fieldValue.split(",") : [fieldValue];
                answers.custominformation = availArray.map(s => s.trim()).filter(Boolean);
            }
            fieldValue = getOptionValue("NAME"); 		
				answers.RPTname = fieldValue;
				fieldValue = getOptionValue( "NAMED"); 
        console.log("Extracted NAMED value:", fieldValue);
				if(fieldValue){
          if(fieldValue === "Y"||fieldValue === "y"){
          answers.dateStamp = ['y'];
        }}
				fieldValue = getOptionValue("TXTYP"); 
        if(fieldValue){
          answers.Fileformat = fieldValue;
        }
        fieldValue = getOptionValue("CHEAD");
        console.log("Extracted CHEAD value:", fieldValue);
        if(fieldValue){
          if(fieldValue === "Y"||fieldValue === "y"){
          answers.CHEAD = ['y'];
        }}
        fieldValue = getOptionValue("FTPS"); 
        if(fieldValue){
        answers.DELIV = "ftp";

        fieldValue = getOptionValue("FTPS");
        if(fieldValue){
          answers.FTPSERV = fieldValue;
        }
        fieldValue = getOptionValue("FTPU");
        if(fieldValue){
          answers.FTPUSR = fieldValue;
        }
        fieldValue = getOptionValue("FTPD");
        if(fieldValue){
          answers.FTPDIR = fieldValue;}
        fieldValue = getOptionValue("FTPW");
        if(fieldValue){
          answers.FTPPWD = fieldValue;
        }}
        else{
          answers.DELIV = "email";
          fieldValue = getOptionValue("EMAIL");
          console.log("Extracted EMAIL value:", fieldValue);
          if(fieldValue){
            answers.MAIL = fieldValue;
          }
        }
        fieldValue = getOptionValue("SCHED");
        if(fieldValue){
          answers.SCHED = fieldValue;
        }
        fieldValue = getOptionValue("DELTA");{
          if(fieldValue){
            answers.DELTA = fieldValue;
          }
        }
        
        fieldValue = getOptionValue("CNTRY");
        {
          console.log("Extracted CNTRY value:", fieldValue);
          if(fieldValue){
            answers.CNTRY = fieldValue;
          }
        }

        

            

    return answers;
  } catch (e) {
    console.error("parseFasteditHtml error:", e);
    return {};
  }
}
