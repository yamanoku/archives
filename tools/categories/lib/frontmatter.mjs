const FIELD_ORDER = ['category', 'topic'];

export function upsertFrontmatterFields(text, fields) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    throw new Error('Markdown file has no YAML frontmatter');
  }

  let yaml = match[1];
  for (const key of FIELD_ORDER) {
    if (fields[key] === undefined) {
      continue;
    }
    yaml = setYamlField(yaml, key, fields[key]);
  }

  return `---\n${yaml}\n---\n${text.slice(match[0].length)}`;
}

function setYamlField(yaml, key, value) {
  const line = `${key}: ${value}`;
  const re = new RegExp(`^${key}:.*$`, 'm');
  if (re.test(yaml)) {
    return yaml.replace(re, line);
  }
  if (/^noindex:/m.test(yaml)) {
    return yaml.replace(/^noindex:.*$/m, `${line}\n$&`);
  }
  return `${yaml}\n${line}`;
}
