const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { JSDOM } = require("jsdom");

const app = express();
app.use(cors());

app.get("/api/proxy", async (req, res) => {
  try {
    
    const category = req.query.category;
    console.log("server",category);
    let url = "";
    if (category === 'ELT'){
      url = "https://databank.oup.com/cgi-bin/starfinder/0?path=ptypes.txt&id=fastmyreps&pass=seya&format=WEBPREV2";
    }
    else{
       url = "https://databank.oup.com/cgi-bin/starfinder/0?path=groups.txt&id=fastgroups&pass=lerom&search=y&format=WEBPREV2";
    }
    // console.log("url",url);
    const response = await axios.get(url);
    const html = response.data;
    console.log("Raw HTML Response:", html);

    const dom = new JSDOM(html);
    const document = dom.window.document;
    const options = document.querySelectorAll("select[name='test'] option");

    const parsedData = Array.from(options).map(option => ({
      value: option.getAttribute("value"),
      text: option.textContent.trim(),
    }));

    console.log("Data :", parsedData);
    res.json(parsedData);
  } catch (error) {
    console.error("Parse error:", error);
    
  }
});



app.listen(5000, () => console.log("Proxy server running on port 5000"));
