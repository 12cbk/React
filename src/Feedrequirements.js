
import { fetchData } from "./ApiService";
let feedrequirements = [{ type: "Radio", label: "Are you interested in receiving information about a specific area of publishing or are you simply interested in everything that OUP publishes?", 
  name:"BESP",  
  values: [
        { value: "standard", text: "Specific area of publishing" },
        { value: "common", text: "Everything that OUP publishes" }
      ] },
      {
  type: "Combined",
  dependency: "BESP-standard",
  elements: [
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
    },
    {
      type: "Dropdown",      
      name: "imageQuality",
      dropdownlabel: "Choose cover image quality",
      values: [
        { value: "72", text: "72 dpi - for online display" },
        { value: "300", text: "300 dpi - for print display" }
      ],
      dependency: "oupType-COVERS",
    },
    {
      type: "Dropdown",      
      name: "sampleTypes",
      dropdownlabel: "Choose sample types",
      values: [
        { value: "all", text: "All sample files" },
        { value: "bibliography", text: "Bibliography files (.pdf)" },
        { value: "introductions", text: "Introductions (.pdf)" },
        { value: "chapters", text: "Sample chapters (.pdf)" },
        { value: "toc", text: "Tables of Contents (.pdf)" },
      ],
      dependency: "oupType-PDFFILES",
    }
  ]
},

      { type: "Checkbox", label: "Send me the following files for all titles available from OUP UK", 
                            name:"filetype",                             
                            values: [
                                  { value: "ONIX", text: "A standard 2.1 ONIX feed containing extensive metadata for all OUP titles (updated weekly, only available via ftp)" } ,             
                                  { value: "COVER", text: "A feed containing new cover images for all OUP titles (updated weekly, only available via ftp)." }    ,          
                                             
                                ] ,
                              dependency: "BESP-common"
                    
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
        
                  },

                  { type: "Radio", label: "Do you wish to search by subject or series?", 
                    name:"searchBy",  
                    values: [
                          { value: "subject", text: "Search by subject" } ,               
                          { value: "series", text: "Search by series" } ,               
                        ] ,
                      dependency: "searchType-flexible"
            
                      },

                  {
  type: "DisplayCard",
  dependency: "searchBy-subject",subdependency: "searchType-flexible"
},
{
  type: "DisplayCardSeries",
  dependency: "searchBy-series",subdependency: "searchType-flexible"
},
{
  type: "MultiLineInput",
  label: "Search by ISBN",
  description: "A maximum of 500 ISBNs is permitted. Enter one ISBN to a line without hyphens.",
  name: "isbn",
  placeholder: "Enter ISBNs here",
  dependency: "searchType-isbn"
},


                  { type: "Dropdown", label: "Select format", 
                    name:"BIND", 
                    dropdownlabel:"Format", 
                    values: [
                          { value: "P&C&SP&SH&F&L&PK&O&PI", text: "All printed formats" } ,               
                          { value: "C&SH&L", text: "Hardback only" } ,               
                          { value: "P&SP&F", text: "Paperback only" } ,               
                          { value: "least_expensive", text: "Least expensive printed format" } ,               
                          { value: "P&C&SP&SH&F&L&PK&O&CS&V&SW&Software*&eBook*&Online&CdRom*&PI", text: "All printed formats & electronic product" } ,               
                          { value: "PK&CDRom*", text: "Mixed Media (e.g. Pbk & CD Rom)" } ,               
                          { value: "Software*&eBook*&Online*&CDRom*", text: "Electronic product only" } ,               
                          { value: "PI", text: "Sheet Music" } ,               
                        ]                     
            
                      },         
                      {
                        type: "textbox",
                        label: "Search by UK price (GBP). If you do not wish to refine by price, please leave the fields blank.",
                        values:[
                          {
                            textboxlabel:"From: £", value:"AMTFRM"},
                            {textboxlabel: "To: £", value:"AMTTO"}
                        ]                        
                      },
                      {
                            type:"Combined",
                            elements: [{ type: "Radio", label: "Search by UK publication date", 
                        name:"pub_select", 
                        sublabel:[
                          "Please select either a forward publishing period*, or enter a fixed date range.",
                          "* recommended for for datafeeds you intend to schedule to rerun periodically in the future."
                        ] ,
                        values: [
                              { value: "no_date", text: "Do not filter by publication date" } ,             
                              { value: "period", text: "Forward publishing period" }    ,          
                              { value: "date_range", text: "Within a fixed date range" }              
                            ] 
                          
                
                          },{ type: "Dropdown", label: "", 
                                name:"sched", 
                                dropdownlabel:"Forward publishing period:", 
                                values: [
                                      { value: "1month", text: "within 1 month" } ,               
                                      { value: "3months", text: "in the next 3 months" } ,               
                                      { value: "6months", text: "in the next 6 months" } ,               
                                      { value: "12months", text: "in the next 12 months" }            
                                    ] ,
                                    dependency: "pub_select-period"                    
                        
                                  },{type: "DatePicker",
                                    dependency:"pub_select-date_range"
                                  }
                                  
                          ]
                           },
                          { type: "Checkbox", label: "UK availability status", 
                            name:"searchType",                             
                            values: [
                                  { value: "order_now", text: "Published and available to supply now" } ,             
                                  { value: "not_pub", text: "Not yet published (but with a provisional UK publication date)" }    ,          
                                  { value: "on_demand", text: "Printed on demand" } ,             
                                  { value: "out_of_stock", text: "Out of stock / temporarily unavailable" }    ,          
                                  { value: "out_of_print", text: "Recently declared 'out of print'" }              
                                ] 
                              
                    
                              },
                           {
                            type:"Combined",
                            elements: [{
                              type:"textbox",label: "File name and format options",
                              values:[
                                {textboxlabel:"Please give your report a name.", value:"RPTname"}
                              ] 
                            },{
                              type:"Checkbox", label:"",
                              name:"dateStamp",
                              values:[{value:"dateStamp", text:"Add a date stamp suffix to each file name"}]
                            }
                          ]
                           } ,
                           {
                            type:"Combined",
                            elements: [{ type: "Radio", label: "Delivery options", 
                              name:"DELIV",  
                              values: [
                                    { value: "email", text: "Deliver files by email (enter email address)" } ,             
                                    { value: "ftp", text: "Deliver files by FTP (enter FTP server, directory, username, password)" }          
                                               
                                  ] 
                                
                      
                                },
                                {
                                  type:"textbox",label: "",
                                  values:[
                                    {textboxlabel:"Email address(es)", value:"mail"}
                                  ] ,
                                  dependency: "DELIV-email"
                                },
                                {
                                  type:"textbox",label: "",
                                  values:[
                                    
        { textboxlabel: "FTP server", value:"FTPSERV" },
        { textboxlabel: "FTP directory", value:"FTPDIR" },
        { textboxlabel: "FTP username", value:"FTPUSR" },
        { textboxlabel: "FTP password",value:"FTPPWD" }
                                  ] ,
                                  dependency: "DELIV-ftp"
                                }
                                
                              ]
                           },
                           {
                            type:"Combined",
                            elements: [
                              { type: "Dropdown", label: "File frequency options", 
                                name:"sched", 
                                dropdownlabel:"Please select your preference for how often you wish to receive this report:", 
                                values: [
                                      { value: "now", text: "Run now (1-off, complete dataset)" } ,               
                                      { value: "daily", text: "Run now and schedule to re-run daily" } ,               
                                      { value: "weekly", text: "Run now and schedule to re-run weekly" } ,               
                                      { value: "monthly", text: "Run now and schedule to re-run monthly" } ,               
                                      { value: "quarterly", text: "Run now and schedule to re-run quarterly" } ,               
                                      { value: "annually", text: "Run now and schedule to re-run annually" }            
                                    ]                     
                        
                                  },
                              ,{
                                type: "Radio", label: "", 
                                name:"searchType",  
                                values: [
                                      { value: "complete", text: "Send complete dataset with each re-run" } ,             
                                      { value: "update", text: "Send new/changed records only with each re-run" }          
                                                   
                                    ] 
                                   
                                }]
                           }   
                      
            
      
      
    ]
    
    
    

export default feedrequirements