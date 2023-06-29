const separator = [
  String.fromCharCode(160),
  " ",
  '"',
  ".",
  "(",
  ")",
  ":",
  "=",
  ",",
  ";",
  "[",
  "]",
];
const keywords = [
  "#If",
  "#Else",
  "#Else If",
  "#End If",
  "#Const",
  "Alias",
  "And",
  "As",
  "Base",
  "Boolean",
  "Byte",
  "ByRef",
  "ByVal",
  "Call",
  "Case",
  "CBool",
  "CByte",
  "CCur",
  "CDate",
  "CDbl",
  "CInt",
  "CLng",
  "CLngLng",
  "CLngPtr",
  "Compare",
  "Const",
  "CSng",
  "CStr",
  "Currency",
  "CVar",
  "Database",
  "Date",
  "Declare",
  "DefBool",
  "DefByte",
  "DefDate",
  "DefDec",
  "DefDouble",
  "DefInt",
  "DefLng",
  "DefLngLng",
  "DefLngPtr",
  "DefObj",
  "DefSng",
  "DefStr",
  "Dim",
  "Do",
  "Double",
  "Each",
  "Else",
  "ElseIf",
  "Empty",
  "End",
  "Enum",
  "Erase",
  "Error",
  "Event",
  "Exit",
  "Explicit",
  "False",
  "For",
  "Friend",
  "Function",
  "Get",
  "Global",
  "GoTo",
  "In",
  "If",
  "IIf",
  "Implements",
  "Integer",
  "Is",
  "Let",
  "LBound",
  "Lib",
  "Like",
  "Long",
  "LongLong",
  "Loop",
  "LSet",
  "Me",
  "Mod",
  "New",
  "Next",
  "Not",
  "Nothing",
  "Null",
  "Object",
  "On",
  "Option",
  "Optional",
  "Or",
  "ParamArray",
  "Preserve",
  "Private",
  "Property",
  "Public",
  "RaiseEvent",
  "ReDim",
  "Resume",
  "Return",
  "RSet",
  "Set",
  "Single",
  "Static",
  "Step",
  "Stop",
  "String",
  "Sub",
  "Text",
  "Then",
  "To",
  "True",
  "Type",
  "TypeOf",
  "UBound",
  "Until",
  "Variant",
  "Wend",
  "While",
  "With",
  "WithEvents",
  "Debug",
  "Print",
];
const tab = "    ";

function string2html(inString) {
  // code 10 = new line
  // code 32 = space
  var arr = [];
  var word = "";
  var output = "";
  var strLiteralFlag = false;
  var strLiteral = "";
  var comment = "";
  var commentFlag = false;

  // inString = inString.replace(/\s/g, '&nbsp');
  // console.log('inString :>> ', inString);
  inString += " ";

  inString = inString.replace(/\\/g, "&#92;");
  [...inString].forEach((l, index) => {
    // console.log(`The character code ${inString.charCodeAt(index)} is equal to ${l}`);

    //iterating through all characters:
    //checking in that order
    //1   - if end of line
    //1-1 - if it was a comment - end comment, format and add to output
    //1-2 - if not comment - format last word and add to output
    //      add <br> and reset the word variable
    //2   - if inside comment, add the character to the comment (not checking keywords and literals)
    //      replacing all spaces with &nbsp
    //3   - if " detected, toggle the strLiteral variable
    //3-1 - if end of strLiteral - add literal to the output
    //3-2 - start literal with "
    //4   - if ' - start the comment, set commentFlag
    //5   - if no EOL, comment or literal - adding characters into correct place
    //5-1 - if within strLiteral, add character to literal variable (sub spaces with &nbsp)
    //5-2 - if end of word detected, format word end add to output (if separator was space, replace &nbsp), reset word
    //5-3 - if no any other case, add the character to current word

    //end of line detection
    if (inString.charCodeAt(index) == 10) {
      if (commentFlag) {
        commentFlag = false;
        output += `<span class="code-comment">${comment}</span>`;
        comment = "";
      } else {
        output += checkWord(word);
      }
      output += "<br>";
      word = "";
    } else if (commentFlag) {
      //if within comment, just add characters
      if (l == " ") {
        comment += "&nbsp";
      } else {
        comment += l;
      }
    } else if (l == '"') {
      //string leteral detected
      strLiteralFlag = !strLiteralFlag;
      if (!strLiteralFlag) {
        output += `<span class="code-strLiteral">${strLiteral}"</span>`;
      } else {
        strLiteral = '"';
      }
    } else if (l == "'") {
      if (strLiteralFlag) {
        strLiteral += l;
      } else {
        commentFlag = true;
        comment = "'";
      }
    } else {
      if (strLiteralFlag) {
        if (l == " ") {
          strLiteral += "&nbsp";
        } else {
          strLiteral += l;
        }
      } else if (separator.includes(l)) {
        //end of word detected
        if (l == " ") {
          output += checkWord(word) + "&nbsp";
        } else {
          output += checkWord(word) + l;
        }
        word = "";
      } else {
        word += l;
      }
      //words construction
    }
  });
  // console.log('output :>> ', output);
  // [...output].forEach((l, index) => {
  //   console.log(`The character code ${output.charCodeAt(index)} is equal to ${l}`);
  // });
  return output;
}

function checkWord(w) {
  if (keywords.includes(w)) {
    return `<span class="code-keyword">${w}</span>`;
  } else {
    return w;
  }
}

export default string2html;
