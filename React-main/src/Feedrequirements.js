
import { fetchData } from "./ApiService";
let feedrequirements = [{ type: "Radio", label: "Are you interested in receiving information about a specific area of publishing or are you simply interested in everything that OUP publishes?", 
  name:"BESP",  
  values: [
        { value: "standard", text: "Specific area of publishing" },
        { value: "common", text: "Everything that OUP publishes" }
      ] },
      {
        type: "Radio",
        label: "A number of standard file types are listed below. Please select one of these file types should it suit your requirement. If not, please see below.",
        name: "oupType",
        values: [
          { value: "ORDERFORM", text: "Order form without jacket images (single Excel file)" },
          { value: "ORDERFORMJ", text: "Order form with jacket images (single Excel file)." },
          { value: "SALESBRIEFS", text: "Sales Briefs or AI sheets (as a single html file)." },
          { value: "ONIX", text: "ONIX report (single XML file)." },
          { value: "COVERS", text: "Cover image files (multiple jpg files)." },
          { value: "PDFFILES", text: "Sample content files (multiple pdf files)." },
          { value: "MUSICREP", text: "Music report, showing music-specific data - such as arranger, type of score, orchestration and ABRSM selected grade (single Excel file)." },

        ],
        dependency: "BESP-standard"
      },
      { type: "Radio", label: "If none of these file types are appropriate and you wish to build your own file or output, please select this option.", 
        name:"oupType",  
        values: [
              { value: "custom", text: "Custom report" }              
            ] ,
          dependency: "BESP-standard"

          },
          { type: "Radio", label: "What method would you like to use to narrow your product selection?", 
            name:"searchType",  
            values: [
                  { value: "quick", text: "Quick search by title group or catalogue" } ,             
                  { value: "isbn", text: "Search for individual ISBNs" }    ,          
                  { value: "flexible", text: "Flexible search by subject or series" }              
                ] ,
              dependency: "BESP-standard"
    
              },
              { type: "Radio", label: "Search by title group", 
                name:"catco",  
                values: [
                      { value: "all", text: "All" } ,               
                    ] ,
                  dependency: "searchType-quick"
        
                  }
                  // { type: "Dropdown", label: "Select format", 
                  //   name:"BIND",  
                  //   values: [
                  //         { value: "P&C&SP&SH&F&L&PK&O&PI", text: "All printed formats" } ,               
                  //         { value: "C&SH&L", text: "Hardback only" } ,               
                  //         { value: "P&SP&F", text: "Paperback only" } ,               
                  //         { value: "least_expensive", text: "Least expensive printed format" } ,               
                  //         { value: "P&C&SP&SH&F&L&PK&O&CS&V&SW&Software*&eBook*&Online&CdRom*&PI", text: "All printed formats & electronic product" } ,               
                  //         { value: "PK&CDRom*", text: "Mixed Media (e.g. Pbk & CD Rom)" } ,               
                  //         { value: "Software*&eBook*&Online*&CDRom*", text: "Electronic product only" } ,               
                  //         { value: "PI", text: "Sheet Music" } ,               
                  //       ]                     
            
                  //     },         
                  //     {
                  //       type: "textbox",
                  //       label: "Search by UK price (GBP). If you do not wish to refine by price, please leave the fields blank.",
                  //       values:[
                  //         {
                  //           textboxlabel:"From: £",
                  //           textboxlabel: "To: £"
                  //         }
                  //       ]                        
                  //     }
                      
            
      
      
    ]
    
    
    

export default feedrequirements