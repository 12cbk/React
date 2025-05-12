const formatFeedRequirements = (extractedData) => {
    const formattedQuestions = [];
    let currentHeader = null;
  
    extractedData.forEach((item) => {
      if (item.value === "heading") {
        currentHeader = { type: "Radio", label: item.text, name: "catco", values: [], dependency: "searchType-quick" };
        formattedQuestions.push(currentHeader);
      } else if (currentHeader) {
        currentHeader.values.push({ value: item.value, text: item.text });
      }
    });
  
    return formattedQuestions;
  };

  export default formatFeedRequirements;