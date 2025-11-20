
const feedSteps = [
  // Step 1: BESP and its dependencies
  [
    {
      type: "Radio",
      label:
        "Are you interested in receiving information about a specific area of publishing or are you simply interested in everything that OUP publishes?",
      name: "BESP",
      values: [
        { value: "standard", text: "Specific area of publishing" },
        { value: "common", text: "Everything that OUP publishes" },
          ],
          default: "standard"
    },
    {
      type: "Combined",
      dependency: "BESP-standard",
      elements: [
        {
          type: "Radio",
          label:
            "A number of standard file types are listed below. Please select one of these file types should it suit your requirement. If not, please see below.",
          name: "oupType",
          values: [
            {
              value: "ORDERFORM",
              text: "Order form without jacket images (single Excel file)",
            },
            {
              value: "ORDERFORMJ",
              text: "Order form with jacket images (single Excel file).",
            },
            {
              value: "SALESBRIEFS",
              text: "Sales Briefs or AI sheets (as a single html file).",
            },
            { value: "ONIX", text: "ONIX report (single XML file)." },
            {
              value: "COVERS",
              text: "Cover image files (multiple jpg files).",
            },            
          ],
          default: "ORDERFORM"
        },
        {
          type: "Dropdown",
          name: "imageQuality",
          dropdownlabel: "Choose cover image quality",
          values: [
            { value: "72", text: "72 dpi - for online display" },
            { value: "300", text: "300 dpi - for print display" },
          ],
          dependency: "oupType-COVERS",
        },        
      ],
      
    },
    {
      type: "Checkbox",
      label: "Send me the following files for all titles available from OUP U.S.",
      name: "filetype",
      values: [
        {
          value: "ONIX",
          text:
            "A standard 2.1 ONIX feed containing extensive metadata for all OUP titles (updated weekly, only available via ftp).",
        },
        {
          value: "COVER",
          text:
            "A feed containing new cover images for all OUP titles (updated weekly, only available via ftp).",
        },
      ],
      dependency: "BESP-common",
    },
    {
      type: "Radio",
      label:
        "If none of these file types are appropriate and you wish to build your own file or output, please select this option.",
      name: "oupType",
      values: [{ value: "custom", text: "Custom report" }],
      dependency: "BESP-standard",
    },
  ],
  // Step 2: searchType and its dependencies
  [
    {
      type: "Radio",
      label: "What method would you like to use to narrow your product selection?",
      name: "searchType",
      values: [
        { value: "quick", text: "Quick search by title group or catalogue" },
        { value: "isbn", text: "Search for individual ISBNs" },
        { value: "bisac", text: "Search for individual BISAC codes" },
        { value: "flexible", text: "Flexible search by subject or series" },
      ],
      default: "quick",
      dependency: "BESP-standard",
    },
    {
      type: "Radio",
      label: "Search by title group",
      name: "catco",
      values: [{ value: "all", text: "All" }],
      dependency: "searchType-quick",
    },
    {
      type: "Radio",
      label: "Do you wish to search by subject or series?",
      name: "searchBy",
      values: [
        { value: "subject", text: "Search by subject" },
        { value: "series", text: "Search by series" },
      ],
      default: "subject",
      dependency: "searchType-flexible",
    },
    {
      type: "DisplayCard",
      dependency: "searchBy-subject",
      subdependency: "searchType-flexible",
    },
    {
      type: "DisplayCardSeries",
      dependency: "searchBy-series",
      subdependency: "searchType-flexible",
    },
    {
      type: "MultiLineInput",
      label: "Search by ISBN",
      description:
        "A maximum of 500 ISBNs is permitted. Enter one ISBN to a line without hyphens.",
      name: "EAN",
      placeholder: "Enter ISBNs here",
      dependency: "searchType-isbn",
    },
    {
      type: "MultiLineInput",
      label: "Search by BISAC code",
      description:
        "A maximum of 20 codes is permitted. Enter one code to a line without hyphens.",
      name: "bisac",
      placeholder: "Enter BISAC codes here",
      dependency: "searchType-bisac",
    }
  ],
  // Step 3: Format, price, publication date, availability
  [
    
    {
      type: "Dropdown",
      label: "Select format",
      name: "BIND",
      dropdownlabel: "Format",
      dependency: ["BESP-standard","searchType-quick", "searchType-flexible"],
      values: [
        { value: "BINDPRINT", text: "All printed formats" },
        { value: "BINDHB", text: "Hardback only" },
        { value: "BINDPB", text: "Paperback only" },
        { value: "BINDCHEAP", text: "Least expensive printed format" },
        {
          value: "BINDPRINTDIGITAL",
          text: "All printed formats & electronic product",
        },
        { value: "BINDMIXED", text: "Mixed Media (e.g. Pbk & CD Rom)" },
        {
          value: "BINDDIGITAL",
          text: "Electronic product only",
        },
        
      ],
      default: "BINDPRINT",
    },
    {
      type: "textbox",
      dependency: ["BESP-standard","searchType-quick", "searchType-flexible"],
      label:
        "Search by US price (USD). If you do not wish to refine by price, please leave the fields blank.",
      values: [
        { textboxlabel: "From: $", value: "fromPrice" },
        { textboxlabel: "To: $", value: "toPrice" },
      ],
      
    },
    {
      type: "Combined",
      dependency: ["BESP-standard","searchType-quick", "searchType-flexible"],
      elements: [
        {
          type: "Radio",
          label: "Search by US publication date",
          name: "pub_select",
          sublabel: [
            "Please select either a forward publishing period*, or enter a fixed date range.",
            "* recommended for for datafeeds you intend to schedule to rerun periodically in the future.",
          ],
          values: [
            { value: "no_date", text: "Do not filter by publication date" },
            { value: "period", text: "Forward publishing period" },
            { value: "date_range", text: "Within a fixed date range" },
          ],
          default: "no_date"
        },
        {
          type: "Dropdown",
          label: "",
          name: "EPUB",
          dropdownlabel: "Forward publishing period:",
          dependency: ["BESP-standard","searchType-quick", "searchType-flexible"],
          values: [
            { value: "1month", text: "within 1 month" },
            { value: "3months", text: "in the next 3 months" },
            { value: "6months", text: "in the next 6 months" },
            { value: "12months", text: "in the next 12 months" },
          ],
          dependency: "pub_select-period",
        },
        // { type: "DatePicker", dependency: "pub_select-date_range" },
        
        { type: "DatePicker", name: "PUBF", label: "From Date", dependency: "pub_select-date_range" },
        { type: "DatePicker", name: "PUBT", label: "To Date", dependency: "pub_select-date_range" },
  
      ],
    },
    {
      type: "Checkbox",
      label: "US availability status",
      name: "availability",
      dependency: ["BESP-standard","searchType-quick", "searchType-flexible"],
      values: [
        {
          value: "order_now",
          text: "Published and available to supply now",
        },
        {
          value: "not_pub",
          text: "Not yet published",
        },        
        {
          value: "out_of_stock",
          text: "Out of stock / temporarily unavailable",
        },
        {
          value: "out_of_print",
          text: "Recently declared 'out of print'",
        },
      ],
      default: ["order_now", "not_pub" ],
    },
  ],
  // Step 4: File/report name, delivery, frequency
  // Add this as a new step in your feedSteps array in Feedrequirements.js

[
  {
    type: "Checkbox",
    label: "1. Product identifiers:",
    dependency: ["BESP-standard", "oupType-custom"],
    name: "custominformation",
    values: [
      { value: "XA0", text: "ISBN-13/EAN" },
      { value: "XA1", text: "ISBN-13/EAN with hyphens" },
      { value: "XA2", text: "ISBN-10/EAN" },
      { value: "XA3", text: "ISBN-10/EAN with hyphens" }
    ]
  },
  {
    type: "Checkbox",
    label: "2. Title information:",
    dependency: ["BESP-standard", "oupType-custom"],
    name: "custominformation",
    values: [
      { value: "XA4", text: "Full title" },
      { value: "XA5", text: "Subtitle" },
      { value: "XA6", text: "Volume number" },
      { value: "XA7", text: "Edition number" }
    ]
  },
  {
    type: "Checkbox",
    label: "3. Author information:",
    dependency: ["BESP-standard", "oupType-custom"],
    name: "custominformation",
    values: [
      { value: "XA8", text: "Author(s)" },
      { value: "ANAME", text: "Name, role and affiliation" },
      { value: "BIOG", text: "Author biography" },
      { value: "CTRIB", text: "Full contributor list" }
    ]
  },
  {
    type: "Combined",
    dependency: ["BESP-standard", "oupType-custom"],
    elements: [
      {
        type: "Checkbox",
        label: "4. Publisher, Subject & Series information:",
        name: "custominformation",
        values: [
          { value: "XB0", text: "Series name" },
          { value: "XB1", text: "Series code" },
          { value: "XB2", text: "BISAC code" },
          { value: "XB3", text: "BISAC description" },
          { value: "XB5", text: "OUP taxonomy subject" },
          { value: "XG3", text: "Product Hierarchy" }
        ]
      },

      
      {
        type: "Dropdown",
        label: "BIC options",
        name: "CS",
        dropdownlabel: "How would you like BIC fields returned?",
        values: [
          { value: "single", text: "Send all subject codes in a single delimited field" },
          { value: "separate", text: "Send each subject code as a separately delimited field" },
          { value: "combined", text: "Send code and description together" }
        ],
         dependency: ["custominformation-XB2"]
      }
    ]
  },
  {
    type: "Checkbox",
    label: "5. Pricing information:",
    dependency: ["BESP-standard", "oupType-custom"],
    name: "custominformation",
    values: [
      { value: "XB6", text: "U.S. price excl. tax (USD)" },
      { value: "XB8", text: "U.S. MPG Code" },
      { value: "XG2", text: "Canadian price (CAD)" },
      { value: "XB9", text: "Canadian MPG Code" }
    ]
  },
  {
    type: "Checkbox",
    label: "6. UK availability information:",
    dependency: ["BESP-standard", "oupType-custom"],
    name: "custominformation",
    values: [
      { value: "XC2", text: "Availability from OUP U.S. warehouse" },
      { value: "XC3", text: "U.S., Canada & Latin America publication date (mm/dd/yyyy)" },
      { value: "XC4", text: "U.S., Canada & Latin America publication month" },
      { value: "XC5", text: "U.S., Canada & Latin America publication year" },
      { value: "XC6", text: "Market restrictions" }
    ]
  },{
  type: "Checkbox",
  label: "7. Bibliographic information:",
  dependency: ["BESP-standard", "oupType-custom"],
  name: "custominformation",
  values: [
    { value: "XC8", text: "Product format code (ONIX)" },
    { value: "XC9", text: "Format (e.g. paperback)" },
    { value: "XD0", text: "New in paperback" },
    { value: "XD1", text: "Page extent" },
    { value: "XD2", text: "Product trim size (HxW in mm)" },
    { value: "XD3", text: "Weight (grams)" },
    { value: "XD5", text: "Publisher" },
    { value: "XD6", text: "Co-publisher" },
    { value: "XG4", text: "Previous ISBN" },
    { value: "XE2", text: "Product type" },
    { value: "XH1", text: "Illustrations" },
    { value: "XH2", text: "Division" },
    { value: "XH3", text: "Online Product" },
    { value: "XH4", text: "EBook" }
  ]
},{
  type: "Checkbox",
  label: "8. Descriptions, features & links:",
  dependency: ["BESP-standard", "oupType-custom"],
  name: "custominformation",
  values: [
    { value: "XE4", text: "Short copy" },
    { value: "XE5", text: "Long copy" },
    { value: "XF3", text: "Readership" },
    { value: "XE6", text: "Features" },
    { value: "XE7", text: "Table of contents" },
    { value: "XE8", text: "Review quotes" },
    { value: "XG5", text: "New to this Edition" },
    { value: "XE9", text: "U.S. website URL link" },
    { value: "XF0", text: "Cover image URL link" },
    { value: "XH6", text: "Related titles" }
  ]
}


],
// Step 5: File name, delivery, frequency
  [
    {          type: "Combined",
          dependency: ["BESP-standard"],
          elements: [
            {
              type: "textbox",
              label: "File name and format options",
              values: [
                {
                  textboxlabel: "Please give your report a name.",
                  value: "NAME",
                },
              ],
            },
            {
              type: "Checkbox",
              label: "",
              name: "dateStamp",
              values: [
                {
                  value: "y",
                  text: "Add a date stamp suffix to each file name",
                },
              ],
            },
            {
          type: "Dropdown",
          name: "Fileformat",
          dropdownlabel: "File format",
          values: [
            { value: "excel", text: "Excel" },
            { value: "text", text: "Plain text" },
          ],
          dependency: "oupType-custom",
        },
            {
              type: "Checkbox",
              label: "",
              dependency: ["oupType-custom"],
              name: "CHEAD",
              values: [
                {
                  value: "y",
                  text: "Include column header (showing field names)",
                },
              ],
            },
          ],
         },
      
    
    {
      type: "Combined",
      dependency:"BESP-standard",
      elements: [
        {
          type: "Radio",
          label: "Delivery options",
          name: "DELIV",
          dependency:"BESP-standard",
          values: [
            {
              value: "email",
              text: "Deliver files by email (enter email address)",
            },
            {
              value: "ftp",
              text:
                "Deliver files by FTP (enter FTP server, directory, username, password)",
            },
          ],
        },
        {
          type: "textbox",
          label: "",
          dependency: ["DELIV-email"],
          values: [{ textboxlabel: "Email address(es)", value: "MAIL" }]         
          
        },
        {
          type: "textbox",
          label: "",
          values: [
            { textboxlabel: "FTP server", value: "FTPSERV" },
            { textboxlabel: "FTP directory", value: "FTPDIR" },
            { textboxlabel: "FTP username", value: "FTPUSR" },
            { textboxlabel: "FTP password", value: "FTPPWD" },
			{ textboxlabel: "Email address(es)", value: "MAIL" }
          ],
          dependency: ["DELIV-ftp"],
        },
      ],
    },
    {
      type: "Combined",
      elements: [
        {
          type: "Dropdown",
          label: "File frequency options",
          name: "SCHED",
          dependency:"BESP-standard",
          dropdownlabel:
            "Please select your preference for how often you wish to receive this report:",
          values: [
            { value: "now", text: "Run now (1-off, complete dataset)" },
            {
              value: "daily",
              text: "Run now and schedule to re-run daily",
            },
            {
              value: "weekly",
              text: "Run now and schedule to re-run weekly",
            },
            {
              value: "monthly",
              text: "Run now and schedule to re-run monthly",
            },
            {
              value: "quarterly",
              text: "Run now and schedule to re-run quarterly",
            },
            {
              value: "annually",
              text: "Run now and schedule to re-run annually",
            },
          ],
        },
        {
          type: "Radio",
          label: "",
          name: "DELTA",
          dependency:"BESP-standard",
          values: [
            {
              value: "complete",
              text: "Send complete dataset with each re-run",
            },
            {
              value: "update",
              text: "Send new/changed records only with each re-run",
            },
          ],
        },
        
        {
          type: "textbox",
          label: "Deliver files by FTP (enter FTP server, directory, username, password)",
          values: [
            { textboxlabel: "FTP server", value: "FTPSERV" },
            { textboxlabel: "FTP directory", value: "FTPDIR" },
            { textboxlabel: "FTP username", value: "FTPUSR" },
            { textboxlabel: "FTP password", value: "FTPPWD" },
          ],
          dependency:"BESP-common",
        }
        
      ],
    },
  ],
];

export default feedSteps;