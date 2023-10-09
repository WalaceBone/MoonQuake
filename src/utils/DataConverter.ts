import XMLParser from 'react-xml-parser';

const importXMLDocument = async () => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "metadata.xml", false);
    xhr.send();
    return xhr.responseXML;
  } catch (error) {
    console.log(`An error occured while loading the XML data source: ${error.message}`);
  }
};

const extractPSEData = async () => {
  const parser = new XMLParser();
  const data = await importXMLDocument()
    .then((xmlDocument) => parser.parseFromString(xmlDocument.activeElement.outerHTML));
  return data;
};

export default extractPSEData;
