A small demo can be found here on [https://docs.internal.cleartax.co/steampunk-demo/](https://docs.internal.cleartax.co/steampunk-demo/) 

The code is in [https://github.com/ClearTax/steampunk](https://github.com/ClearTax/steampunk) (Its private by the way. You need to have access to see it)

## Getting started

Put the following CSS file in the head of the page

```html
<link rel="stylesheet" href="https://assets1.cleartax-cdn.com/calculator/dist/calculator-dsl-2.4.0.css">
```
Create a div, in which you want the calculator to spawn:
```html
<div id="calc"></div>
```
Add the script file to the body:
```html
<script type="text/javascript" src="https://assets1.cleartax-cdn.com/calculator/dist/calculator-dsl-2.4.0.js"></script>
```
Add the config in a script file below the library script, and initiate the Calculator:
```javascript
<script type="text/javascript">
  const config = {
    selector: '#calc',
    calculatorData: {
      title: 'Dynamic Calculator',
      fields: {
        a: {
          title: 'A',
          type: 'number',
          value: 1,
        },
        b: {
          title: 'B',
          type: 'number',
          value: 2,
        },
        addition: {
          title: 'Result',
          type: 'output',
          formula: 'a + b',
        },
      }
    }
  };

  const calculator = new Calc(config);
  calculator.init();

</script>
```
**Done.**

## Configuration

`selector` - The css selector of the element you wan to put the calculator in.

`calculatorData` - takes a [calculatorData](#calculator-data) object.

## Calculator Data
### `calculatorData`
> Configuration of the calculator. It contains all data from the input fields, output fields and their formulas.

`title` - Title of the Calculator.

`steps` - Determines if the calculator will have steps. Defaults to `false`. If value is `true` then the `step` key is mandatory in all the fields. This will automatically also bring in the previous and next step buttons.

`fields` - takes a [fields](#fields) object.

## Fields
### `fields`
> This is a key value pair of all the fields that will appear in the calculator in the order mentioned. **The key is going to be the id of the field**, and **the value is going to be one of the field objects** from down below:

**Input fields:**
* [Number](#number)
* [Text](#text)
* [Slider](#slider)
* [Dropdown](#dropdown)
* [Checkbox](#checkbox)
* [Radio](#radio)

**Output Fields:**
* [Output](#output)
* [Table](#table)

> **Note:** Make sure the field ID is not a reserved keyword in javascript. That'll break the code. Some examples of what IDs not to use would be `new` `var` `class` `Object` etc. The whole list can be found here [JavaScript Reserved Words](https://www.w3schools.com/js/js_reserved.asp).

**Example:**
```javascript
fields: {
  name: {
    title: 'Name',
    type: 'text'
  },
  age: {
    title: 'Age',
    type: 'number',
    value: 18, // Prefilled with 18
  },
}
```
> Here `name` and `age` are the keys for the respective fields.

### Text

The number field only accepts a string.

* `title` - **Mandatory.** Title of the number field, shows above the input box. Accepts a string.
* `type` - `text` - **Mandatory.** This determines the type of the field, in this case, text.
* `value` - Prefilled value of the field. Accepts only a String.
* `placeholder` - The placeholder of the box when there is no text. Accepts only string.
* `class` - Provide your custom classes as a string, if you want to add your own custom stylesheets and beautify this field.
* `step` - Step number in which the field appears. Accepts only integers. If you are going to use this, make sure you have marked `steps` as true in the `calculatorData` config.
* `hide` - Hide the field from the view. You can this option as an internal field. Defaults to `false`. Accepts **Boolean** or a function that returns **Boolean** or and Excel formula that returns either `true` or `false` as a string.
* `disabled` - Makes the field disabled. Defaults to `false`. Accepts **Boolean** values.

### Number

The number field only accepts integers. You can decorate it with a currenct symbol by mentioning the `isCurrency` flag.

* `title` - **Mandatory.** Title of the number field, shows above the input box. Accepts a string.
* `type` - `number` - **Mandatory.** This determines the type of the field, in this case, number.
* `min` - This value marks the start of the range. Accepts Integers, Excel formulas that returns a number and functions that returns Integers.
* `max` - This value marks the end of the range. Accepts Integers, Excel formulas that returns a number and functions that returns Integers.
* `isCurrency` - Determines wheather to show the currency symbol. Accepts only boolean values. Defaults to false.
* `currency` - The currency character. Eg: `₹` or `$`. Accepts only string. Defaults to `₹`. **Note:** *Do not use `.` in the currency, it collides with the decimal dot. Like don't use `Rs.` You can however use multiple charecter units like `USD` or `INR`.*
* `decimalPlaces` - The number of decimal places in the number field. Accepts only integers. Defaults to 2.
* `isCurrencySuffix` - Determines wheather to show the currency symbol after the value. Accepts only boolean values. Defaults to false.
* `value` - Prefilled value of the field. Accepts only Numbers. (Make sure you don't put number as a string)
* `class` - Provide your custom classes if you want to add your own custom stylesheets and beautify this field.
* `step` - Step number in which the field appears. Accepts only integers. If you are going to use this, make sure you have marked `steps` as true in the `calculatorData` config.
* `hide` - Hide the field from the view. You can this option as an internal field. Defaults to `false`. Accepts **Boolean** or a function that returns **Boolean** or and Excel formula that returns either `true` or `false` as a string.
* `disabled` - Makes the field disabled. Defaults to `false`. Accepts **Boolean** values.

### Slider

Use this field to limit the range of the value that the use can enter. The user can use the slider to pick a value.

* `title` - **Mandatory.** Title of the number field, shows above the input box. Accepts a string.
* `type` - `slider` - **Mandatory.** This determines the type of the field, in this case, slider.
* `min` -  **Mandatory.** This value marks the start of the range. Accepts Integers, Excel formulas that returns a number and functions that returns Integers.
* `max` -  **Mandatory.** This value marks the end of the range. Accepts Integers, Excel formulas that returns a number and functions that returns Integers.
* `value` - Prefilled value of the field. Accepts only Numbers. (Make sure you don't put number as a string)
* `unit` - This is the unit that shows up next to the selected value of slider. Accepts only String.
* `stepValue` - This is value of each step that the slider takes
* `editValue` - This toggles the edit value box. Accepts only Boolean. Defaults to `false`.
* `class` - Provide your custom classes as a string if you want to add your own custom stylesheets and beautify this field.
* `step` - Step number in which the field appears. Accepts only integers. If you are going to use this, make sure you have marked `steps` as true in the `calculatorData` config.
* `hide` - Hide the field from the view. You can this option as an internal field. Defaults to `false`. Accepts **Boolean** or a function that returns **Boolean** or and Excel formula that returns either `true` or `false` as a string.
* `disabled` - Makes the field disabled. Defaults to `false`. Accepts **Boolean** values.

Example:
```javascript
candies: {
  title: 'I am candy',
  type: 'number',
  value: 100
},
slider: {
  title: 'I am a slider',
  type: 'slider',
  value: 40,
  min: 'IF(candies<10,0,10)', // excel formula is acceptable
  max: function(fields) {
    return fields.candies > 100 ? 1000 : 100; // max will be 1000 if candies are more than 100, and 100 if less
  }
}
```

### Dropdown

The dropdown field lets the user select a value from the list of options.

* `title` - **Mandatory.** Title of the number field, shows above the input box. Accepts a string.
* `type` - `dropdown` - **Mandatory.** This determines the type of the field, in this case, dropdown.
* `options` - **Mandatory.** Array of [Option](#option) objects.
* `value` - Prefilled value of the field. This *should be a value of one of the options*. Accepts only a String.
* `class` - Provide your custom classes as a string, if you want to add your own custom stylesheets and beautify this field.
* `step` - Step number in which the field appears. Accepts only integers. If you are going to use this, make sure you have marked `steps` as true in the `calculatorData` config.
* `hide` - Hide the field from the view. You can this option as an internal field. Defaults to `false`. Accepts **Boolean** or a function that returns **Boolean** or and Excel formula that returns either `true` or `false` as a string.
* `disabled` - Makes the field disabled. Defaults to `false`. Accepts **Boolean** values.

### Checkbox

Pass a few options to let the users select any nuber of options they want to choose from.

* `title` - **Mandatory.** Title of the number field, shows above the input box. Accepts a string.
* `type` - `checkbox` - **Mandatory.** This determines the type of the field, in this case, checkbox.
* `options` - **Mandatory.** Array of [Option](#option) objects.
* `value` - Prefilled value of the field. This *should be an array of values from the options*. Accepts only an array of Strings.
* `class` - Provide your custom classes as a string, if you want to add your own custom stylesheets and beautify this field.
* `step` - Step number in which the field appears. Accepts only integers. If you are going to use this, make sure you have marked `steps` as true in the `calculatorData` config.
* `hide` - Hide the field from the view. You can this option as an internal field. Defaults to `false`. Accepts **Boolean** or a function that returns **Boolean** or and Excel formula that returns either `true` or `false` as a string.
* `disabled` - Makes the field disabled. Defaults to `false`. Accepts **Boolean** values.

### Radio

Let the user choose one of the options from the radio buttons.

* `title` - **Mandatory.** Title of the number field, shows above the input box. Accepts a string.
* `type` - `radio` - **Mandatory.** This determines the type of the field, in this case, radio.
* `options` - **Mandatory.** Array of [Option](#option) objects.
* `value` - Prefilled value of the field. This *should be a value of one of the options*. Accepts only a String.
* `class` - Provide your custom classes as a string, if you want to add your own custom stylesheets and beautify this field.
* `step` - Step number in which the field appears. Accepts only integers. If you are going to use this, make sure you have marked `steps` as true in the `calculatorData` config.
* `hide` - Hide the field from the view. You can this option as an internal field. Defaults to `false`. Accepts **Boolean** or a function that returns **Boolean** or and Excel formula that returns either `true` or `false` as a string.
* `disabled` - Makes the field disabled. Defaults to `false`. Accepts **Boolean** values.

### Output

The output field to show off your calculation results.

* `title` - **Mandatory.** Title of the number field, shows above the input box. Accepts a string.
* `type` - `output` - **Mandatory.** This determines the type of the field, in this case, output.
* `options` - **Mandatory.** Array of [Option](#option) objects.
* `formula` - **Mandatory.** Forumla of the output field that determines the value of the output. The variables in the formula of the output would be the keys of the `fields` object. The formula can be a normal lexical math formula or an [Excel](https://en.wikipedia.org/wiki/Microsoft_Excel) formula as a string. **OR**, you can pass a javascript function to it and do your complex calculations in it. You'll recieve the [Fields](#fields) object as the parameter. The function should return a stringified HTML. Eg: `<h1>The output is Blah!</h1>`. The function can also be async, just call back the callback in the second parameter with the value when your operations are done.
* `customHtml` - You can use this function to return a custom HTML string for output calculated via normal formulas. The function gets the value of the field in the parameter.
* `isCurrency` - Determines wheather to show the currency symbol. Accepts only boolean values. Defaults to false. If true, the output will be treated as Number, otherwise a String.
* `currency` - The currency character. Eg: `₹` or `$`. Accepts only string. Defaults to `₹`. **Note:** *Do not use `.` in the currency, it collides with the decimal dot. Like don't use `Rs.` You can however use multiple charecter units like `USD` or `INR`.*
* `decimalPlaces` - The number of decimal places in the number field. Accepts only integers. Defaults to 2.
* `isCurrencySuffix` - Determines wheather to show the currency symbol after the value. Accepts only boolean values. Defaults to false.
* `class` - Provide your custom classes as a string, if you want to add your own custom stylesheets and beautify this field.
* `step` - Step number in which the field appears. Accepts only integers. If you are going to use this, make sure you have marked `steps` as true in the `calculatorData` config.
* `hide` - Hide the field from the view. You can this option as an internal field. Defaults to `false`. Accepts **Boolean** or a function that returns **Boolean** or and Excel formula that returns either `true` or `false` as a string.

> **Note:** If your formula is dependent upon another output, make sure the dependent field is mentioned after the dependency in the [Fields](#fields) object.

> **Note:** `isCurrency`, `currency`, `decimalPlaces` and `isCurrencySuffix` is only applicable if the formula provided is a **String** and not a **Function**.

Examples:
```javascript
mathSum: {
  title: 'Normal math formula with variables',
  type: 'output',
  formula: 'a + b',
}
```
```javascript
excelSum: {
  title: 'Excel formula with variables',
  type: 'output',
  formula: 'SUM(a,b)',
}
```
```javascript
finalSum: {
  title: 'Output dependent on previous output',
  type: 'output',
  formula: 'mathSum + excelSum',
}
```
```javascript
asyncOutput: {
  title: 'Result which has a more complex function, and cannot be done in a formula',
  type: 'output',
  formula: function(fields) {
    // return us an HTML string that would go in the output box.
    if (fields.mathSum.value > 10) {
      return fields.finalSum.value; // This will be a number
    } else {
      return 'The bigger sum is ' + fields.finalSum.value; // This will return a string
    }
  },
}
```
```javascript
funnyOutput: {
  title: 'Formula where the result calculation is async, like an API call',
  type: 'output',
  formula: function(fields, callback) { 
    // call the callback function with the output value when the operations are done
    fetch('https://api.fixer.io/latest?base=USD')
      .then((resp) => resp.json())
      .then((data) => callback(data.rates.INR))
  },
}
```
```javascript
customView: {
  title: 'Normal formula and custom HTML',
  type: 'output',
  formula: 'mathSum + excelSum',
  customHtml: function(value) { // you will recieve the value of this field in the parameter.
    // Use it anyway you like and return us an HTML string.
    return '<h3>Your total assets are worth '+ convertToCurrency(value) +'</h3>';
  }
}
```

### Table

The Table field is only to output data in a tabular format.

* `title` - **Mandatory.** Title of the number field, shows above the input box. Accepts a string.
* `type` - `table` - **Mandatory.** This determines the type of the field, in this case, table.
* `options` - **Mandatory.** Array of [Option](#option) objects.
* `data` - Data for the table should be in the form of a 2D array of strings. The outer main is an array of rows, whereas the inner array is an array of columns.
* `formula`- Pass a function that generates and returns the data for the table. The function should return the value in the `data` format mentioned above.
* `hideTitle` - This determines if the title of the table is hidden. Accepts only Boolean. Defaults to false.
* `class` - Provide your custom classes as a string, if you want to add your own custom stylesheets and beautify this field.
* `step` - Step number in which the field appears. Accepts only integers. If you are going to use this, make sure you have marked `steps` as true in the `calculatorData` config.
* `hide` - Hide the field from the view. You can this option as an internal field. Defaults to `false`. Accepts **Boolean** or a function that returns **Boolean** or and Excel formula that returns either `true` or `false` as a string.

> **Important:** You need to provide either the `data` field or the `formula` field. It's mandatory.

> **Note:** If you provide both function and data, the output from the function will replace the data field provided.

Examples:
```javascript
addMore: {
  title: 'Simple Table',
  type: 'table',
  data: [
    ['Name', 'Age'], // The first row will always be considered as the header
    ['Tom', '18'],
    ['Jack', '16'],
    ['Harry', '17']
  ],
}
```
```javascript
addMore: {
  title: 'Simple Table',
  type: 'table',
  formula: function(fields) {
    return [
      ['Name', 'Age'],
      ['Sum One', fields.sumOne.value],
      ['Add More', fields.addMore.value],
      ['Funny Output', fields.funnyOutput.value]
    ]
  }
}
```

### Option
This the object that is a key value pair combo for Components like Radio, Checkbox and Dropdown. All the entries are mandatory to have the following keys and their values.

* `label` - The text to be shown as the option. Accepts only Strings.
* `value` - The value of the option. Accepts only Strings. Don't worry, if your value needs to be a number, put it as a string. Even if it is used in any of the formulas, it'll be parsed as a number.

## Custom methods

> We have exposed a few methods for easy usage with the calculators in the custom functions. These functions are used in the library itself.

### convertToCurrency

This function takes any number (even as a string) and adds commas and currency to it. Returns a string.
```javascript
convertToCurrency(number, decimalPlaces, currency, isCurrencySuffix)
```
Params:
* `number` - **Mandatory.** The value that needs decorated. Accepts only integers.
* `decimalPlaces` - The number of decimal places that the decorated output has. Accepts only integer.
* `currency` - The currency symbol that needs to be appended or prepended to the value. Defaults to `₹`. Accepts only string. **Note:** *Do not use `.` in the currency, it collides with the decimal dot. Like don't use `Rs.` You can however use multiple charecter units like `USD` or `INR`.*
* `isCurrencySuffix` - Determines wheather to show the currency symbol after the value. Accepts only boolean values. Defaults to false.

Example:
```javascript
const decoratedMoney = convertToCurrency(10000, 2, '$', true);
console.log(decoratedMoney);
```
Output:
```
10,000$
```

### addCommas
This function just adds commas to the number (even as a string). Returns a string.
```javascript
addCommas(number)
```
Params:
* `number` - **Mandatory.** The value that needs decorated. Accepts only integers.

Example:
```javascript
const numberWithCommas = addCommas(100000);
console.log(numberWithCommas);
```
Output:
```
1,00,000
```
