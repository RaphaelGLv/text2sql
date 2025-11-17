export function extractSchemaFromSqlScript(fullSql: string): string {
  if (!fullSql) return "";

  // Remove comments
  const cleanSql = fullSql
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  // (?:CREATE|ALTER)\s+TABLE : Starts with CREATE TABLE or ALTER TABLE
  // [\s\S]+?                 : Matches any character (including new lines) non-greedily
  // ;                        : Stops at the first semicolon
  const schemaRegex = /(?:CREATE|ALTER)\s+TABLE\s+[\s\S]+?;/gim;

  const matches = cleanSql.match(schemaRegex);

  if (!matches) return "";

  return matches.map((statement) => statement.trim()).join("\n\n");
}
