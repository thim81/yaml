import { DumpOptions as AstDumpOptions, safeDump } from '@stoplight/yaml-ast-parser';
import { dump as jsDump, DumpOptions as JsDumpOptions } from 'js-yaml';

export interface SafeStringifyOptions extends AstDumpOptions {
  /**
   * Prefered quoting style. If set, `js-yaml` will be used for stringification.
   * Defaults to single quotes when not specified.
   */
  quotingType?: '"' | "'";
  /**
   * Forces quoting of all string values. Requires `js-yaml` backend.
   */
  forceQuotes?: boolean;
}

export const safeStringify = (value: unknown, options: SafeStringifyOptions = {}): string => {
  if (typeof value === 'string') {
    return value;
  }

  const { quotingType, forceQuotes, ...astOptions } = options;

  if (quotingType !== undefined || forceQuotes !== undefined) {
    const jsOptions: JsDumpOptions = { quotingType, forceQuotes, ...astOptions } as JsDumpOptions;
    return jsDump(value, jsOptions);
  }

  return safeDump(value, astOptions);
};
