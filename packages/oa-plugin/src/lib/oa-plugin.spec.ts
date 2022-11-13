import {
  getRestrictions,
  getTags,
  OAPluginTag,
  Restriction,
} from '@over-architecture-plugin/oa-plugin';

describe('getTags', () => {
  it('should work with example 1', () => {
    const testLibraryPath = 'libs/techA/scopeX/my-library';

    expect(getTags(testLibraryPath)).toEqual([
      'oa-plugin-level-0:techA',
      'oa-plugin-level-1:scopeX',
    ]);
  });

  it('should work with example 2', () => {
    const testLibraryPath = 'libs/techB/scopeShared/my-library';

    expect(getTags(testLibraryPath)).toEqual([
      'oa-plugin-level-0:techB',
      'oa-plugin-level-1:scopeShared',
    ]);
  });
});

describe('getRestrictions', () => {
  it('should return restrictions', () => {
    const given = Array<OAPluginTag>(
      'oa-plugin-level-0:techA',
      'oa-plugin-level-1:scopeX'
    );

    const expected = Array<Restriction>(
      {
        sourceTag: 'oa-plugin-level-0:techA',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-0:techA',
          'oa-plugin-level-0:shared',
        ],
      },
      {
        sourceTag: 'oa-plugin-level-1:scopeX',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-1:scopeX',
          'oa-plugin-level-1:shared',
          'oa-plugin-level-0:shared',
        ],
      }
    );

    expect(getRestrictions(given)).toEqual(expected);
  });

  it('should return restrictions - 2', () => {
    const given = Array<OAPluginTag>(
      'oa-plugin-level-0:techB',
      'oa-plugin-level-1:scopeY'
    );

    const expected = Array<Restriction>(
      {
        sourceTag: 'oa-plugin-level-0:techB',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-0:techB',
          'oa-plugin-level-0:shared',
        ],
      },
      {
        sourceTag: 'oa-plugin-level-1:scopeY',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-1:scopeY',
          'oa-plugin-level-1:shared',
          'oa-plugin-level-0:shared',
        ],
      }
    );

    expect(getRestrictions(given)).toEqual(expected);
  });

  it('should return restrictions - with shared libs', () => {
    const given = Array<OAPluginTag>(
      'oa-plugin-level-0:techB',
      'oa-plugin-level-1:scopeY',
      'oa-plugin-level-1:shared'
    );

    const expected = Array<Restriction>(
      {
        sourceTag: 'oa-plugin-level-0:techB',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-0:techB',
          'oa-plugin-level-0:shared',
        ],
      },
      {
        sourceTag: 'oa-plugin-level-1:scopeY',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-1:scopeY',
          'oa-plugin-level-1:shared',
          'oa-plugin-level-0:shared',
        ],
      },
      {
        sourceTag: 'oa-plugin-level-1:shared',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-1:shared',
          'oa-plugin-level-0:shared',
        ],
      }
    );

    expect(getRestrictions(given)).toEqual(expected);
  });

  it('should return restrictions - with shared libs 2', () => {
    const given = Array<OAPluginTag>(
      'oa-plugin-level-0:techA',
      'oa-plugin-level-0:techB',
      'oa-plugin-level-1:scopeY',
      'oa-plugin-level-1:shared'
    );

    const expected = Array<Restriction>(
      {
        sourceTag: 'oa-plugin-level-0:techA',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-0:techA',
          'oa-plugin-level-0:shared',
        ],
      },
      {
        sourceTag: 'oa-plugin-level-0:techB',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-0:techB',
          'oa-plugin-level-0:shared',
        ],
      },
      {
        sourceTag: 'oa-plugin-level-1:scopeY',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-1:scopeY',
          'oa-plugin-level-1:shared',
          'oa-plugin-level-0:shared',
        ],
      },
      {
        sourceTag: 'oa-plugin-level-1:shared',
        onlyDependOnLibsWithTags: [
          'oa-plugin-level-1:shared',
          'oa-plugin-level-0:shared',
        ],
      }
    );

    expect(getRestrictions(given)).toEqual(expected);
  });
});
