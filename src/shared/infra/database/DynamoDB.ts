import { DynamoDB } from "aws-sdk";
// import DynamoDBClient from "aws-sdk/clients/dynamodb";

const dynamoDB = new DynamoDB.DocumentClient({
  region: process.env.AWS_DYNAMO_REGION,
  endpoint: process.env.AWS_DYNAMO_END_POINT,
});

const TableName = process.env.AWS_DYNAMO_TABLE_NAME as string;
const minDateValue = "1850-01-01T00:00:00.001Z";
const pageSize = Number(process.env?.AWS_DYNAMO_PAGE_SIZE ?? "50");

export { dynamoDB, TableName, minDateValue, pageSize };
