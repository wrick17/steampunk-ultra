const LEGEND_SCHEMA = [
  {
    title: String,
    steps: Number, // optional - if steps is true, you have to mention step in each field.
    fields: {
      number: {
        title: String,
        type: 'number',
        isCurrency: Boolean, // optional
        value: Number, // optional
        placeholder: String, // optional
        step: Number, // optional - for pages in calculator
        class: String // optional - add your own css classes to the component
      },
      text: {
        title: String,
        type: 'text',
        value: String, // optional
        placeholder: String, // optional
        step: Number, // optional - for pages in calculator
        class: String // optional - add your own css classes to the component
      },
      slider: {
        title: String,
        type: 'slider',
        min: Number,
        max: Number,
        value: Number, // optional
        unit: String, // optional
        stepValue: Number, // optional - interval of the slider values
        editValue: Boolean, // optional - defaults to false, does not show the edit value box
        step: Number, // optional - for pages in calculator
        class: String // optional - add your own css classes to the component
      },
      dropdown: {
        title: String,
        type: 'dropdown',
        options: [
          {
            label: String,
            value: String
          },
        ],
        value: String, // optional,
        step: Number, // optional - for pages in calculator
        class: String // optional - add your own css classes to the component
      },
      checkbox: {
        title: String,
        type: 'checkbox',
        options: [
          {
            label: String,
            value: String
          },
        ],
        value: [String], // optional
        step: Number, // optional - for pages in calculator
        class: String // optional - add your own css classes to the component
      },
      radio: {
        title: String,
        type: 'radio',
        options: [
          {
            label: String,
            value: String
          },
        ],
        value: String, // optional
        step: Number, // optional - for pages in calculator
        class: String // optional - add your own css classes to the component
      },
      output: {
        title: String,
        type: 'output',
        formula: Function / String,
        isCurrency: Boolean, // optional
        step: Number, // optional - for pages in calculator
        class: String // optional - add your own css classes to the component
      },
      table: {
        title: String,
        type: 'table',
        formula: Function, // required / optional - Provide either data or formula that returns a 2D array
        data: [[String, Number]], // required / optional
        step: Number, // optional - for pages in calculator
        class: String // optional - add your own css classes to the component
      },
    }
  }
];

const LEGEND = [
  {
    title: 'Legend',
    steps: true, // optional - if steps is true, you have to mention step in each field.
    fields: {
      number: {
        title: 'Number',
        type: 'number',
        isCurrency: false, // optional
        value: 1000, // optional
        placeholder: 'Placeholder', // optional
        step: 1, // optional - for pages in calculator
      },
      currency: {
        title: 'Number field with currency',
        type: 'number',
        isCurrency: true, // optional
        value: 10000, // optional
        placeholder: 'Placeholder', // optional
        step: 1, // optional - for pages in calculator
      },
      text: {
        title: 'Textbox',
        type: 'text',
        value: 'Sample text', // optional
        placeholder: 'Put some text here', // optional
        step: 1, // optional - for pages in calculator
      },
      dropdown: {
        title: 'Dropdown',
        type: 'dropdown',
        options: [
          {
            label: 'one',
            value: '1'
          },
          {
            label: 'two',
            value: '2'
          },
          {
            label: 'three',
            value: '3'
          },
        ],
        value: '1', // optional,
        step: 1, // optional - for pages in calculator
      },
      checkbox: {
        title: 'Checkbox',
        type: 'checkbox',
        options: [
          {
            label: 'one',
            value: '1'
          },
          {
            label: 'two',
            value: '2'
          },
          {
            label: 'three',
            value: '3'
          },
        ],
        value: ['1', '3'], // optional
        step: 1, // optional - for pages in calculator
      },
      radio: {
        title: 'Radio',
        type: 'radio',
        options: [
          {
            label: 'one',
            value: '1'
          },
          {
            label: 'two',
            value: '2'
          },
          {
            label: 'three',
            value: '3'
          },
        ],
        value: '1', // optional
        step: 1, // optional - for pages in calculator
      },
      slider: {
        title: 'Slider',
        type: 'slider',
        min: 0,
        max: 100,
        value: 40, // optional
        unit: 'units', // optional
        stepValue: 10, // optional - interval of the slider values
        editValue: false, // optional - defaults to false, does not show the edit value box
        step: 1, // optional - for pages in calculator
      },
      editableSlider: {
        title: 'Editable box Slider',
        type: 'slider',
        min: 0,
        max: 100,
        value: 40, // optional
        unit: 'units', // optional
        stepValue: 10, // optional - interval of the slider values
        editValue: true, // optional - defaults to false, does not show the edit value box
        step: 1, // optional - for pages in calculator
      },
      output: {
        title: 'Output box (number + currency): ',
        type: 'output',
        formula: 'number + currency',
        isCurrency: true, // optional
        step: [1, 2],
      },
      table: {
        title: 'Table',
        type: 'table',
        formula: function(){}, // required / optional - Provide either data or formula that returns a 2D array
        data: [['head', 'tail'], ['one', 'two'], ['three', 'four']], // required / optional
        step: [1, 2],
      }
    }
  }
];

export default LEGEND;
