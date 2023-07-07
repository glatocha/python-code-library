function validateTags(input) {
  if (input) {
    // Remove any leading or trailing whitespaces from the input
    // const trimmedInput = input.trim();
    const trimmedInput = input.replace(/\s/g, "");
    // Split the input into an array of tags using semicolon as the separator
    const tags = trimmedInput.split(";");
    //removes the last element if empty for checking (in case last tag is terminated with ;)
    if (tags.slice(-1) == "") {
      tags.pop();
    }
    // Check if each tag starts with '#' and has at least one character after '#'
    var isValid = tags.every((tag) => /^#\w+/.test(tag));
    isValid = isValid && !tags.some((tag) => /^#.*#/.test(tag)); //test if there is only one # in tags (check if no #tag1 #tag2)
    isValid = isValid && tags.filter((item, index) => tags.indexOf(item) !== index).length == 0; //search for duplicates
    return isValid;
  } else {
    return true;
  }
}

export default validateTags;
