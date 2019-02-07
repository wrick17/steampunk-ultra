import { convertToCurrency } from 'common/utils';
import LEGEND from 'common/legend';

const TOOLS_DATA = [
  {
    title: 'Wealth Accumulation Calculator',
    route: '/wealth-calculator',
    fields: {
      period: {
        title: 'Investment period',
        type: 'number',
        min: 10,
        max: 100,
        name: 'investment-period',
        isCurrency: false,
        value: 10,
        className: 'investment-number-field',
      },
      capital: {
        title: 'Value for current investments',
        name: 'capital',
        type: 'number',
        isCurrency: true,
        value: 10000,
      },
      amount: {
        title: 'SIP amount / Regular investments (monthly)',
        type: 'number',
        isCurrency: true,
        name: 'amount-per-month',
        value: 1000,
      },
      interest: {
        title: 'Interest rate (prefilled at 14%)',
        type: 'slider',
        name: 'interest',
        min: 0.1,
        max: 25,
        stepValue: 0.1,
        value: 14,
        unit: '%',
        editValue: true
      },
      compound: {
        title: 'number of times the interest is compounded per year',
        type: 'dropdown',
        name: 'compound-per-year',
        value: '12',
        options: [
          {
            label: 'Daily',
            value: '365'
          },
          {
            label: 'Monthly',
            value: '12'
          },
          {
            label: 'Quarterly',
            value: '4'
          },
          {
            label: 'Half Yearly',
            value: '2'
          },
          {
            label: 'Yearly',
            value: '1'
          },
        ]
      },
      sip: {
        title: 'SIP:',
        type: 'output',
        isCurrency: true,
        formula: 'amount * [{(1 + (interest/1200))^(period * 12) - 1}/(interest/1200)] * (1 + (interest/1200))',
      },
      lumpsum: {
        title: 'Lumpsum:',
        type: 'output',
        isCurrency: true,
        formula: 'capital * (1 + (interest/(100 * compound)))^(compound * period)',
      },
      final: {
        title: 'new:',
        type: 'output',
        isCurrency: true,
        formula: 'sip + lumpsum',
      },
      total: {
        title: 'Accumulated Wealth',
        type: 'output',
        formula: function (fields) {
          return `comes up to ${convertToCurrency(fields.sip.value + fields.lumpsum.value)}`;
        },
      },
      tableView: {
        title: 'Overall View',
        name: 'table-view',
        type: 'table',
        data: [[]],
        formula: function (fields) {
          return [
            ['type', 'value'],
            ['sip', convertToCurrency(fields.sip.value)],
            ['lumpsum', convertToCurrency(fields.lumpsum.value)],
            ['total', fields.total.value]
          ];
        }
      }
    },
  },
  {
    title: 'Dummy Calculator',
    route: '/dummy-calculator',
    steps: true, // if steps is true, you have to mention step in each field.
    fields: {
      text: {
        title: 'output text',
        type: 'text',
        name: 'output label',
        value: 'the output is going to be: ',
        step: [1, 2, 3]
      },
      a: {
        title: 'A',
        type: 'number',
        name: 'a',
        value: 1,
        step: 1, // REQUIRED: must if you need steps.
      },
      b: {
        title: 'B',
        type: 'number',
        name: 'b',
        value: 2,
        step: 1,
      },
      c: {
        title: 'C',
        type: 'number',
        name: 'c',
        value: 3,
        step: 2,
      },
      d: {
        title: 'D',
        type: 'number',
        name: 'd',
        value: 4,
        step: [2, 3],
      },
      output: {
        title: 'Result',
        type: 'output',
        formula: function (fields) {
          return fields.text.value + (fields.a.value + fields.b.value + fields.c.value + fields.d.value).toString();
        },
        step: 3,
      },
      addition: {
        title: 'Result',
        type: 'output',
        formula: 'a + b + c + d',  // LIMITATION: Dependent outputs needs to go after the dependencies.
        step: 3,
      },
    }
  }
];

export default [...TOOLS_DATA, ...LEGEND];
