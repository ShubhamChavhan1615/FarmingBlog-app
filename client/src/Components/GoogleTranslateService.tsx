import { Translate } from "@google-cloud/translate/build/src/v2";
const translate = new Translate({
  key: 'YOUR_API_KEY',
});

export default translate;
