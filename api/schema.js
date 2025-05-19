import { gql } from "apollo-server-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schemaString = readFileSync(
  join(__dirname, "schemas", "schema.graphql"),
  "utf8"
);

const typeDefs = gql`
  ${schemaString}
`;

export default typeDefs;
