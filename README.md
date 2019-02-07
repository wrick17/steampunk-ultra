# steampunk ⚙️

**Tools and Calculators Generator**

A small demo can be found here on [https://docs.internal.cleartax.co/steampunk-demo/](https://docs.internal.cleartax.co/steampunk-demo/)

API Documentation can be found on the [Docs](https://cleartax.github.io/steampunk/) page.

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

## Development

Clone the repo
```bash
git clone https://github.com/ClearTax/steampunk.git
```
or if you use SSH
```bash
git clone git@github.com:ClearTax/steampunk.git
```
To start the development server:
```bash
cd steampunk
npm install
npm start
```
Go to [http://localhost:9000](http://localhost:9000) on your browser and start working.

> **Note:** We are using [React](https://reactjs.org/) in Development mode and [Preact](https://preactjs.com/) in Production mode. Always check compatibility and perform tests to see if the build runs in production mode, while developing, and before releasing a new version.

## Building

```bash
npm run build
```
The lib files would be built in the `dist` folder

## Releasing
**Before you release**: 
* You'll also need to have `s3cmd` configured to upload the the lib files to our cloudfront CDN servers.

To release:
```bash
sh release.sh [--major] [--minor] [--patch]
```

Example:
```bash
sh release.sh --minor
```
