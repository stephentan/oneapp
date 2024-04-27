const AWS = require("aws-sdk");
const fs = require("fs");
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: "ap-southeast-1",
});
const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const getText = (result, blocksMap) => {
  let text = "";
  if (result.Relationships) {
    result.Relationships.map((relationship) => {
      if (relationship.Type === "CHILD") {
        relationship.Ids.map((childId) => {
          const word = blocksMap[childId];
          if (word.BlockType === "WORD") {
            text += word.Text + " ";
          }
          if (word.BlockType === "SELECTION_ELEMENT") {
            if (word.SelectionStatus === "SELECTED") {
              text += "X ";
            }
          }
        });
      }
    });
  }
  return text;
};
const getRowsColumnsMap = (tableResult, blocksMap) => {
  const rows = {};
  if (tableResult && tableResult.Relationships) {
    tableResult.Relationships.map((relationship) => {
      if (relationship.Type === "CHILD") {
        relationship.Ids.map((childId) => {
          const cell = blocksMap[childId];
          if (cell.BlockType === "CELL") {
            const rowIndex = cell.RowIndex;
            const colIndex = cell.ColumnIndex;
            if (!rows[rowIndex]) {
              rows[rowIndex] = {};
            }
            rows[rowIndex][colIndex] = getText(cell, blocksMap);
          }
        });
      }
    });
  }
  return rows;
};
const generateTableJson = (tableResult, blocksMap, tableIndex) => {
  const rows = getRowsColumnsMap(tableResult, blocksMap);
  let csv = [];
  if (rows) {
    const header = [];
    Object.values(rows).map((row, rowIndex) => {
      const newRow = {};
      Object.values(row).map((column, columnIndex) => {
        if (rowIndex === 0) {
          header.push(column);
        } else {
          newRow[[header[columnIndex]?.trim()]] = column?.trim();
        }
      });
      if (rowIndex > 0) {
        csv.push(newRow);
      }
    });
  }
  return csv;
};

const generateJson = async (response) => {
  const blocks = response.Blocks;

  const blockMap = {};
  const tableBlocks = [];
  blocks.map((block) => {
    blockMap[block.Id] = block;
    if (block.BlockType === "TABLE") {
      tableBlocks.push(block);
    }
  });

  if (tableBlocks.length <= 0) {
    return "No Table Found";
  }

  const jsonOutput = [];
  tableBlocks.map((entry, index) => {
    jsonOutput.push(generateTableJson(entry, blockMap, index + 1));
  });

  return jsonOutput;
};

const processFile = async (filePath) => {
  await sleep(2000);

  const textract = new AWS.Textract();
  try {
    const analyzedDocument = await textract
      .startDocumentAnalysis({
        DocumentLocation: {
          S3Object: {
            Bucket: process.env.S3_BUCKET_NAME, // This will be the same bucket that you use to save the file
            Name: filePath,
          },
        },
        FeatureTypes: ["TABLES", "FORMS"],
      })
      .promise();

    let nextToken;
    const textResResult = [];
    let textractResult;
    let page = 0;
    while (true && page < 10) {
      const textRes = await textract
        .getDocumentAnalysis({
          JobId: analyzedDocument.JobId,
          NextToken: nextToken,
        })
        .promise();

      if (textRes.JobStatus === "IN_PROGRESS") {
        await sleep(2000);
      } else {
        nextToken = textRes.NextToken;
        // fs.writeFileSync('./output.json', JSON.stringify(textRes));
        if (textractResult) {
          textractResult?.Blocks.push(textRes?.Blocks);
        } else {
          textractResult = textRes;
        }

        page++;
        if (!nextToken) {
          break;
        }
      }
    }
    fs.writeFileSync(
      "./result.json",
      JSON.stringify(textractResult, null, "  "),
    );
    const jsonResult = await generateJson(textractResult);
    textResResult.push(...jsonResult);

    return textResResult;
  } catch (err) {
    console.error("err", err);
  }
};
module.exports = {
  processFile,
};

const main = async () => {
  await processFile(
    "/home/stan/projects/goudapay/app/lib/utils/screenshot.png",
  );
};
main();
