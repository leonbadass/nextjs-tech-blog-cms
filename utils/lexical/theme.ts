export  const Theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: '',
  quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600',
  heading: {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-bold',
    h4: 'text-lg font-bold',
    h5: 'text-base font-bold',
    h6: 'text-sm font-bold',
  },
list: {
  nested: {
    listitem: 'ml-6 list-disc', // indent + bullet
  },
  ol: 'list-decimal list-inside',  // ordered list with numbers
  ul: 'list-disc list-inside',     // unordered list with bullets
  listitem: 'my-1',                // margin between items
  listitemChecked: 'line-through text-gray-400',   // for checked items
  listitemUnchecked: '',           // no special styling for unchecked
},

  hashtag: 'editor-hashtag',
  image: 'editor-image',
  link: 'text-blue-600 underline hover:text-blue-800 transition-colors',
  text: {
    bold: 'font-bold',
    code: 'editor-textCode',
    italic: 'italic',
    strikethrough: 'line-through',
    subscript: 'text-xs align-sub',
    superscript: 'text-xs align-super',
    underline: 'underline',
    
  },
  code: 'editor-code',
  codeHighlight: {
    atrule: 'editor-tokenAttr',
    attr: 'editor-tokenAttr',
    boolean: 'editor-tokenProperty',
    builtin: 'editor-tokenSelector',
    cdata: 'editor-tokenComment',
    char: 'editor-tokenSelector',
    class: 'editor-tokenFunction',
    'class-name': 'editor-tokenFunction',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenProperty',
    deleted: 'editor-tokenProperty',
    doctype: 'editor-tokenComment',
    entity: 'editor-tokenOperator',
    function: 'editor-tokenFunction',
    important: 'editor-tokenVariable',
    inserted: 'editor-tokenSelector',
    keyword: 'editor-tokenAttr',
    namespace: 'editor-tokenVariable',
    number: 'editor-tokenProperty',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenComment',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenVariable',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenSelector',
    symbol: 'editor-tokenProperty',
    tag: 'editor-tokenProperty',
    url: 'editor-tokenOperator',
    variable: 'editor-tokenVariable',
  },
};