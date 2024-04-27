import { get, isArray } from "lodash";
import accounting from "accounting";
import {
  PDFDocument,
  rgb,
  StandardFonts,
  PDFPage,
  PDFDictionary,
  PDFArray,
} from "pdf-lib";
import moment from "moment";

const moneyFormat = (number, symbol = "₱", precision = 2) => {
  if (number === undefined || number === null) {
    return "";
  }
  return accounting.formatMoney(number, `${symbol} `, precision, ",", ".");
};

const DEFAULT_COLOR = rgb(0.1, 0.1, 0.1);
const FONT_SIZE = 10;

const MONEY_FORMAT = "money";
const DATE_FORMAT = "DATE_MMM_DD_YYYY";
const getStyles = (styles = {}, defaultFonts) => {
  let font = defaultFonts.selectedFont;
  let color = DEFAULT_COLOR;

  if (styles?.color) {
    const rgbString = styles?.color.match(/\d+/g).map((e) => +e);
    color = rgb(...rgbString);
  }

  if (styles?.fontWeight === "bold") {
    font = defaultFonts.selectedFontBold;
  }

  const size = styles?.fontSize ?? FONT_SIZE;

  return { font, color, size };
};

const alignRight = (page, x, y, textWidth) => {
  const boxWidth = 100;
  const boxHeight = 50;
  const boxX = x;
  const boxY = y;

  page.drawRectangle({
    x: boxX,
    y: boxY,
    width: boxWidth,
    height: boxHeight,
    borderColor: rgb(0, 0, 1),
    borderOpacity: 0,
  });

  return boxX + boxWidth - textWidth; // new positionX
};

const getElementFromRaw = (rawElement) => {
  return rawElement.indexOf("$") > 0
    ? rawElement.substring(0, rawElement.indexOf("$"))
    : rawElement;
};

const copyPage = async (pdfDoc, templatePage, index) => {
  const [newPage] = await pdfDoc.copyPages(templatePage, [0]);
  await pdfDoc.insertPage(index, newPage, index);
};

const setLetterSpacing = (text, letterSpacing) => {
  if (letterSpacing > 1) {
    const spaces = " ".repeat(letterSpacing - 1);
    return text.split("").join(spaces);
  }
  return text;
};
const renderPdfContent = async (
  isTopLeftOrigin,
  isModify,
  position,
  pdfPage,
  element,
  format,
  data,
  selectedFont,
  selectedFontBold,
) => {
  const pageSize = pdfPage.getSize();
  const pageHeight = pageSize.height;
  const pageWidth = pageSize.width;
  // console.log(
  //   "page size:",
  //   pageWidth,
  //   pageHeight,
  //   "print coordinates:",
  //   format.printCoordinates,
  // );

  if (format.printCoordinates) {
    for (let i = 0; i < pageHeight; i += 20) {
      pdfPage.drawText(String(i), {
        x: 0,
        y: isTopLeftOrigin ? pageHeight - (i + 10 + 2) : i,
        size: 10,
      });
    }
    for (let i = 0; i < pageWidth; i += 20) {
      pdfPage.drawText(String(i), {
        x: i,
        y: pageHeight - 12,
        size: 10,
      });
    }
  }
  if (position.subfields) {
    Object.keys(position.subfields).map((positionSubFields) => {
      get(data, getElementFromRaw(element)).map(
        (elementDataEntry, elementDataEntryIndex) => {
          // console.log("## positionSubFields:", positionSubFields);
          const elementData =
            elementDataEntry[getElementFromRaw(positionSubFields)];

          const {
            x,
            y: subfieldY,
            letterSpacing,
            format,
            styles,
          } = get(position, `subfields[${positionSubFields}]`, {});
          const { font, size, color } = getStyles(styles, {
            selectedFont,
            selectedFontBold,
          });

          let text = elementData;
          if (format === MONEY_FORMAT) {
            text = moneyFormat(elementData, "P");
          } else if (format === DATE_FORMAT) {
            text = moment(elementData).format("MMM DD, YYYY");
          }

          let positionX = x;
          const positionY = isTopLeftOrigin
            ? position.y +
              elementDataEntryIndex * (position.lineSize || 20) -
              (subfieldY || 0)
            : position.y -
              elementDataEntryIndex * (position.lineSize || 20) -
              (subfieldY || 0);

          // console.log("text:", text);
          const textWidth = font.widthOfTextAtSize(String(text || ""), size);

          if (styles?.textAlign === "right") {
            positionX = alignRight(pdfPage, x, positionY, textWidth);
          }
          // console.log(
          //   "######x:",
          //   isTopLeftOrigin,
          //   positionX,
          //   pageHeight - (positionY + size + 2),
          //   text,
          // );
          pdfPage.drawText(
            setLetterSpacing(String(text || ""), letterSpacing || 1),
            {
              x: positionX,
              y: isTopLeftOrigin
                ? pageHeight - (positionY + size + 2)
                : positionY,
              size,
              font,
              color,
            },
          );
        },
      );
    });
  } else {
    const elementData = String(
      get(data, getElementFromRaw(element), position?.default || ""),
    );
    const { x, y, format, styles, letterSpacing } = position ?? {};

    const { font, size, color } = getStyles(styles, {
      selectedFont,
      selectedFontBold,
    });

    let text = elementData;
    if (format === MONEY_FORMAT) {
      text = moneyFormat(elementData, "P");
    } else if (format === DATE_FORMAT) {
      text = moment(elementData).format("MMM DD, YYYY");
    }
    let positionX = x;
    const positionY = y;
    const textWidth = font.widthOfTextAtSize(text, size);

    if (styles?.textAlign === "right") {
      positionX = alignRight(pdfPage, x, y, textWidth);
    }
    // console.log(
    //   "######xy:",
    //   isTopLeftOrigin,
    //   positionX,
    //   pageHeight - (positionY + size + 2),
    //   text,
    //   "--> ",
    //   element,
    //   "--> ",
    //   get(data, getElementFromRaw(element), position?.default || ""),
    //   "data:",
    //   data,
    // );
    if (elementData) {
      pdfPage.drawText(
        setLetterSpacing(String(text || ""), letterSpacing || 1),
        {
          x: positionX,
          y: isTopLeftOrigin ? pageHeight - (positionY + size + 2) : positionY,
          size,
          font,
          color,
        },
      );
    }
  }
};
const populatePage = async (
  isTopLeftOrigin,
  isModify,
  firstPage,
  allPages,
  format,
  data,
  selectedFont,
  selectedFontBold,
) => {
  // const formatting = JSON.parse(format);
  // console.log("formatting", format);
  Object.keys(format.positions).map((element) => {
    const position = format.positions[element];
    if (isArray(position)) {
      for (const positionEntry of position) {
        renderPdfContent(
          isTopLeftOrigin,
          isModify,
          positionEntry,
          positionEntry.page > 0 ? allPages[positionEntry.page - 1] : firstPage,
          element,
          format,
          data,
          selectedFont,
          selectedFontBold,
        );
      }
    } else {
      renderPdfContent(
        isTopLeftOrigin,
        isModify,
        position,
        position.page > 0 ? allPages[position.page - 1] : firstPage,
        element,
        format,
        data,
        selectedFont,
        selectedFontBold,
      );
    }
  });
};

const generatePdf = async ({
  pdfTemplate,
  existingPdfBytes,
  data,
  isMultiPage,
}) => {
  const isModify = get(pdfTemplate, "isRenderTemplate", false);
  // console.log("pdfTemplate:", pdfTemplate);
  const format = JSON.parse(get(pdfTemplate, "format", "{}"));
  const isTopLeftOrigin = get(format, "yOrigin", "bottom") === "top";
  const templatePdf = await PDFDocument.load(existingPdfBytes);
  // console.log("## templatePdf", templatePdf);
  const pdfDoc = isModify
    ? await PDFDocument.load(existingPdfBytes)
    : await PDFDocument.create();
  // Embed the Times Roman font
  const selectedFont = await pdfDoc.embedFont(
    get(format, "font", StandardFonts.TimesRoman),
  );
  const selectedFontBold = await pdfDoc.embedFont(
    get(format, "fontBold", StandardFonts.TimesRomanBold),
  );
  // console.log("isMultiPage:", isMultiPage);
  if (isMultiPage && isArray(data)) {
    const dataLength = data.length;
    for (let index = 0; index < dataLength; index++) {
      if (isModify) {
        if (index > 0) {
          // pdfDoc.insertPage(index, copyPage(pdfDoc, templatePdf, 0));
          await copyPage(pdfDoc, templatePdf, index);
        }
      } else {
        if (isTopLeftOrigin) {
          await pdfDoc.addPage([792, 612]);
        } else {
          await pdfDoc.addPage();
        }
      }
    }
    const pages = pdfDoc.getPages();
    for (let index = 0; index < dataLength; index++) {
      const dataEntry = data[index];
      // console.log("pages[index]:", pages);

      // console.log("ismultiple page:", isMultiPage);
      await populatePage(
        isTopLeftOrigin,
        isModify,
        pages[index],
        pages,
        format,
        dataEntry,
        selectedFont,
        selectedFontBold,
      );
    }
  } else {
    const pages = isModify ? pdfDoc.getPages() : [];
    await populatePage(
      isTopLeftOrigin,
      isModify,
      isModify ? pages[0] : pdfDoc.addPage(),
      pages,
      format,
      data,
      selectedFont,
      selectedFontBold,
    );
  }
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

const PDFUtil = {
  generatePdf,
  getStyles,
  copyPage,
  moneyFormat,
  renderPdfContent,
};
export default PDFUtil;
// generatePdf
// pdfTemplate, existingPdfBytes, data, isMultiPage
// pdfTemplate { }
// byte file
// data from database
// is
