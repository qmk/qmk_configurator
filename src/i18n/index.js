import en from './en.csv';
import de from './de.csv';
import es from './es.csv';
import fr from './fr.csv';
import it from './it.csv';
import ja from './ja.csv';
import ms from './ms.csv';
import plPL from './pl-PL.csv';
import ptBR from './pt-BR.csv';
import ru from './ru.csv';
import zh from './zh.csv';
import zhCN from './zh-CN.csv';
import zhTW from './zh-TW.csv';
import zhHK from './zh-HK.csv';
// During the import of the csv files
// the loader will parse the files and generate
// the translation objects
export default {
  en,
  de,
  es,
  fr,
  it,
  ja,
  ms,
  ru,
  zh,
  'pl-PL': plPL,
  'pt-BR': ptBR,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'zh-HK': zhHK
};
