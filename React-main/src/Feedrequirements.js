import { label } from "framer-motion/client"

const feedrequirements = [{ type: "Radio", label: "Are you interested in receiving information about a specific area of publishing or are you simply interested in everything that OUP publishes?", 
    values: [
        { id: "specific_publishing_area", text: "Specific area of publishing" },
        { id: "everything_oup_publishes", text: "Everything that OUP publishes" }
      ] },
    {type: "Radio",label:"A number of standard file types are listed below. Please select one of these file types should it suit your requirement. If not, please see below.",
        values: [
            { id: "order_no_jacket", text: "Order form without jacket images (single Excel file)." },
            { id: "order_with_jacket", text: "Order form with jacket images (single Excel file)." },
            { id: "sales_briefs", text: "Sales Briefs or AI sheets (as a single html file)." },
            { id: "onix_report", text: "ONIX report (single XML file)." },
            { id: "cover_images", text: "Cover image files (multiple jpg files)." },
            { id: "sample_content", text: "Sample content files (multiple pdf files)." },
            { id: "music_report", text: "Music report, showing music-specific data - such as arranger, type of score, orchestration and ABRSM selected grade (single Excel file)." }
          ]},
     {type: "Radio",label:"If none of these file types are appropriate and you wish to build your own file or output, please select this option.",
        values:[{id : "Custom", text :"Custom report"}] },
    {type: "Radio",label:"What method would you like to use to narrow your product selection?",
        values: [
            { id: "quick_search", text: "Quick search by title group or catalogue" },
            { id: "isbn_search", text: "Search for individual ISBNs" },
            { id: "subject_or_series_search", text: "Flexible search by subject or series" }
          ] },
        {type: "textbox", label: "Enter your details", placeholder: "Type here"},
        {
            type: "combined",
            elements: [
              {
                type: "Radio",
                label: "First name",
                values: [
                    { id: "quick_search", text: "Quick search by title group or catalogue" },
                    { id: "isbn_search", text: "Search for individual ISBNs" },
                    { id: "subject_or_series", text: "Flexible search by subject or series" },
                  ],
              },
              {
                type: "textbox",
                label: "First name",
                placeholder: "Type here",
              },
            ],
          },
          

          {
            type: "combined",
            elements: [
              {
                type: "dropdown",
                label: "Select a category",
                values: [
                  "Paperback",
                  "HardBack",
                  "Ebook",
                ],
              },
              {
                type: "textbox",
                label: "First name",
                placeholder: "Type here",
              },
            ],
          },

          {
            type: "Radio",
            label: "Delivery options",
            values: [{id : "Email", text : "Deliver files by email (enter email address)"}, {id: "FTP", text:"Deliver files by FTP (enter FTP server, directory, username, password)"}],
            trigger: {
              Email: { type: "textbox", label : "order type",placeholder: "Enter delivery requirements" },
            },
          },
        
        




]


export default feedrequirements