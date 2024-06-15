function selectElements(selectors) {
    return selectors.reduce((acc, selector) => {
      acc[selector] = document.querySelector(`.${selector}`);
      return acc;
    }, {});
  }
  
  export const variables = selectElements([
    'bosWrapper',
    'listWrapper',
    'formWrapper',
    'formNewWrapper',
    'formData',
    'addText',
    'createForm',
    'formTitle',
    'editFormButton',
    'saveEditFormButton',
    'inputOptions',
    'inputOptionsSaveBtn',
    'inputPlaceHolderOption',
  ]);