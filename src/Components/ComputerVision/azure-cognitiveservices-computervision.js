// Azure SDK client libraries
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

// List of sample images to use in demo
//import RandomImageUrl from './DefaultImages';

// Authentication requirements
//const key = process.env.REACT_APP_AZURE_COMPUTER_VISION_KEY;
//const endpoint = process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT;

const key = "97fa72eed3304d189d8d43a3a3cb2650";
const endpoint = "https://iaifmachadogabriel.cognitiveservices.azure.com/";


// Cognitive service features
const visualFeatures = [
    "ImageType",
    "Faces",
    "Adult",
    "Categories",
    "Color",
    "Tags",
    "Description",
    "Objects",
    "Brands"
];

export const isConfigured = () => {
    const result = (key && endpoint && (key.length > 0) && (endpoint.length > 0)) ? true : false;
    return result;
}

// Analyze Image from URL
export const computerVision = async (url) => {

    // authenticate to Azure service
    const computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

    // get image URL - entered in form or random from Default Images
    const urlToAnalyze = url;//  || RandomImageUrl();
    
    try {
    // analyze image
    const analysis = await computerVisionClient.analyzeImage(urlToAnalyze, { visualFeatures,language:"pt" });

    // all information about image
    return { "URL": urlToAnalyze, ...analysis};
    }
    catch(e){
        throw new Error('Consulta inválida')
    }
}
