import * as path from 'path';

/*
 * techA
 *     scopeX
 *        * libX_A
 *        * libX_B
 *     scopeY
 *        * libY_A
 *        * libY_B
 *     shared
 *        * libShared_A
 *        * libShared_B
 * techB
 *     scopeX
 *        * libX_A
 *        * libX_B
 *     scopeY
 *        * libY_A
 *        * libY_B
 *     shared
 *        * libShared_A
 *        * libShared_B
 * shared
 * */

export function getTags(libPath: string): string[] {
  return libPath
    .split(path.sep)
    .slice(1, -1)
    .map((name, index) => `oa-plugin-level-${index}:${name}`);
}

type OAPluginCategory = `oa-plugin-level-${number}`;
export type OAPluginTag<TagName extends string = string> =
  `${OAPluginCategory}:${TagName}`;

export type Restriction = {
  sourceTag: OAPluginTag;
  onlyDependOnLibsWithTags: OAPluginTag[];
};

const range = (n: number) => {
  const r = [];
  for (let i = n; i >= 0; i--) {
    r.push(i);
  }
  return r;
};

export function getRestrictions<TagName extends string = string>(
  tags: OAPluginTag<TagName>[]
): Array<Restriction> {
  return tags.map((tag) => {
    const [category] = tag.split(':') as [OAPluginCategory, TagName];

    const [_, levelString] = category.split('oa-plugin-level-');
    const level = parseInt(levelString);

    return {
      sourceTag: tag,
      onlyDependOnLibsWithTags: [
        ...new Set([
          tag,
          ...range(level).map((l) => `oa-plugin-level-${l}:shared` as const),
        ]),
      ],
    };
  });
}
