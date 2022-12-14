//https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial/static-web-app-image-analysis?tabs=bash%2Cvscode
import React, { useState } from "react";
import {
  computerVision,
  isConfigured as ComputerVisionIsConfigured,
} from "./azure-cognitiveservices-computervision";
import ProgressBar from "react-bootstrap/ProgressBar";

function ComputerVision() {
  const [fileSelected, setFileSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFileSelected(e.target.value); // controla a alteração do input da imagem
  };
  const sendImage = () => {
    // hold UI
    setProcessing(true);
    setAnalysis(null);
    setError("");

    computerVision(fileSelected || null)
      .then((item) => {
        // reset state/form
        setAnalysis(item); // defindo variável analysis com o retorno item da chamada da funcao
        setFileSelected("");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  // Display JSON data in readable format
  const PrettyPrintJson = (data) => {
    //console.log(JSON.stringify(data,null,2));
    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  const DisplayTag = () => {
    return (
      <div>
        <h2 className="text-white">Tags</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="text-white">Name </th>
              <th className="text-white">Confiança </th>
            </tr>
          </thead>
          <tbody className="">
            {analysis.tags?.map((item, index) => {
              if (item.confidence > 0.1) {
                return (
                  <tr key={index}>
                    <td className="text-white">{item.name}</td>
                    <td className="">
                      <ProgressBar
                        now={item.confidence}
                        label={`${item.confidence.toFixed(2)}%`}
                        variant="success"
                        min="0"
                        max="1"
                      />
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const DisplayCategorias = () => {
    return (
      <div>
        <div >
          <img src={analysis.URL} height="300" border="1" alt="Imagem" />
        </div>
        <h3 className="text-white">Categorias</h3>
        <table className="table ">
          <thead>
            <tr>
              <th className="text-white">Categoria </th>
              <th className="text-white">Confiança </th>
            </tr>
          </thead>
          <tbody className="text-white">
            {analysis.categories?.map((item, index) => {
              if (item.score > 0.1) {
                return (
                  <tr key={index}>
                    <td className="text-white">{item.name}</td>
                    <td>
                      <ProgressBar
                        now={item.score}
                        label={`${item.score.toFixed(2)}%`}
                        variant="success"
                        min="0"
                        max="1"
                      />
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const DisplayCaption = () => {
    return (
      <div className="text-white h4">
        <h2 className="text-white"> Descrição da imagem </h2>
        {analysis.description?.captions[0].text}
      </div>
    );
  };

  const DisplayResults = () => {
    return (
      <div>
        {DisplayCaption()}
        {DisplayCategorias()}
        {DisplayTag()}
        {PrettyPrintJson(analysis)}
      </div>
    );
  };

  const Analyze = () => {
    return (
      <div className="container bg-dark bg-gradient rounded">
        <h1 className="display-2 text-center text-success">Análise de imagens Azure</h1>
        {!processing && (
          <div className="text-center">
            <div className="mb-3">
              <div
                className="input-group"
                style={error ? { border: "2px solid red" } : null}
              >
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  URL
                </span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Entre com a URL"
                  onChange={handleChange}
                ></input>
              </div>
              {error ? (
                <h3 className="h3 text-left" style={{ color: "red" }}>
                  {error}
                </h3>
              ) : null}
            </div>
            <button className="btn btn-outline-success btn-lg" onClick={sendImage}>
              Analisar
            </button>
          </div>
        )}
        {processing && <div className="text-success">Processing</div>}
        <hr />
        {analysis && DisplayResults()}
      </div>
    );
  };

  const CantAnalyze = () => {
    return (
      <div>
        Key e/ou endpoint não configurado em
        ./azure-cognitiveservices-computervision.js
      </div>
    );
  };

  function Render() {
    const ready = ComputerVisionIsConfigured();
    if (ready) {
      return <Analyze />;
    }
    return <CantAnalyze />;
  }

  return <div>{Render()}</div>;
}

export default ComputerVision;
