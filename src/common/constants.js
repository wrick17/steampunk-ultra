import Slider from 'components/Slider/Slider';
import Textbox from 'components/Textbox/Textbox';
import Dropdown from 'components/Dropdown/Dropdown';
import Checkbox from 'components/Checkbox/Checkbox';
import Radio from 'components/Radio/Radio';
import Table from 'components/Table/Table';
import Output from 'components/Output/Output';
import Numberbox from 'components/Number/Number';

import TOOLS_DATA from './tools_data';
import LEGEND from './legend';

export const COMPONENT_MAP = {
  checkbox: Checkbox,
  radio: Radio,
  dropdown: Dropdown,
  slider: Slider,
  text: Textbox,
  number: Numberbox,
  output: Output,
  table: Table, // specs still under process
};

export default TOOLS_DATA;
